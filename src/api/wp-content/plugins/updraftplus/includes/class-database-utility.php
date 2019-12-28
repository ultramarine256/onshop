<?php

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed');

class UpdraftPlus_Database_Utility {

	private $whichdb;

	private $table_prefix_raw;

	private $dbhandle;

	/**
	 * Constructor
	 */
	/**
	 * Constructor
	 *
	 * @param String $whichdb          - which database is being backed up
	 * @param String $table_prefix_raw - the base table prefix
	 * @param Object $dbhandle         - WPDB object
	 */
	public function __construct($whichdb, $table_prefix_raw, $dbhandle) {
		$this->whichdb = $whichdb;
		$this->table_prefix_raw = $table_prefix_raw;
		$this->dbhandle = $dbhandle;
	}

	/**
	 * The purpose of this function is to make sure that the options table is put in the database first, then the users table, then the site + blogs tables (if present - multisite), then the usermeta table; and after that the core WP tables - so that when restoring we restore the core tables first
	 *
	 * @param Array $a_arr the first array
	 * @param Array $b_arr the second array
	 *
	 * @return Integer - the sort result, according to the rules of PHP custom sorting functions
	 */
	public function backup_db_sorttables($a_arr, $b_arr) {

		$a = $a_arr['name'];
		$a_table_type = $a_arr['type'];
		$b = $b_arr['name'];
		$b_table_type = $b_arr['type'];
	
		// Views must always go after tables (since they can depend upon them)
		if ('VIEW' == $a_table_type && 'VIEW' != $b_table_type) return 1;
		if ('VIEW' == $b_table_type && 'VIEW' != $a_table_type) return -1;
	
		if ('wp' != $this->whichdb) return strcmp($a, $b);

		global $updraftplus;
		if ($a == $b) return 0;
		$our_table_prefix = $this->table_prefix_raw;
		if ($a == $our_table_prefix.'options') return -1;
		if ($b == $our_table_prefix.'options') return 1;
		if ($a == $our_table_prefix.'site') return -1;
		if ($b == $our_table_prefix.'site') return 1;
		if ($a == $our_table_prefix.'blogs') return -1;
		if ($b == $our_table_prefix.'blogs') return 1;
		if ($a == $our_table_prefix.'users') return -1;
		if ($b == $our_table_prefix.'users') return 1;
		if ($a == $our_table_prefix.'usermeta') return -1;
		if ($b == $our_table_prefix.'usermeta') return 1;

		if (empty($our_table_prefix)) return strcmp($a, $b);

		try {
			$core_tables = array_merge($this->dbhandle->tables, $this->dbhandle->global_tables, $this->dbhandle->ms_global_tables);
		} catch (Exception $e) {
			$updraftplus->log($e->getMessage());
		}
		
		if (empty($core_tables)) $core_tables = array('terms', 'term_taxonomy', 'termmeta', 'term_relationships', 'commentmeta', 'comments', 'links', 'postmeta', 'posts', 'site', 'sitemeta', 'blogs', 'blogversions', 'blogmeta');

		$na = UpdraftPlus_Manipulation_Functions::str_replace_once($our_table_prefix, '', $a);
		$nb = UpdraftPlus_Manipulation_Functions::str_replace_once($our_table_prefix, '', $b);
		if (in_array($na, $core_tables) && !in_array($nb, $core_tables)) return -1;
		if (!in_array($na, $core_tables) && in_array($nb, $core_tables)) return 1;
		return strcmp($a, $b);
	}

	/**
	 * Set MySQL server system variable
	 *
	 * @param String          $variable  The name of the system variable
	 * @param String          $value     The variable value
	 * @param Resource|Object $db_handle The database link identifier(resource) given by mysqli_init or mysql_connect
	 * @return Boolean Returns true on success, false otherwise
	 */
	public static function set_system_variable($variable, $value, $db_handle) {

		$is_mysqli = is_a($db_handle, 'mysqli');
		if (!is_resource($db_handle) && !$is_mysqli) return false;

		$sql = "SET SESSION %s='%s'";
		if ($is_mysqli) {
			// @codingStandardsIgnoreLine
			$res = @mysqli_query($db_handle, sprintf($sql, mysqli_real_escape_string($db_handle, $variable), mysqli_real_escape_string($db_handle, $value)));
		} else {
			// @codingStandardsIgnoreLine
			$res = @mysql_query(sprintf($sql, mysql_real_escape_string($variable, $db_handle), mysql_real_escape_string($value, $db_handle)), $db_handle);
		}

		return $res;
	}

	/**
	 * Get MySQL server system variable.
	 *
	 * @param String          $variable  The name of the system variable
	 * @param Resource|Object $db_handle The database link identifier(resource) given by mysqli_init or mysql_connect
	 * @return String|Boolean|Null Returns value of the system variable, false on query failure or null if there is no result for the corresponding variable
	 */
	public static function get_system_variable($variable, $db_handle) {

		$is_mysqli = is_a($db_handle, 'mysqli');
		if (!is_resource($db_handle) && !$is_mysqli) return false;

		$sql = 'SELECT @@SESSION.%s';

		if ($is_mysqli) {
			// @codingStandardsIgnoreLine
			$res = @mysqli_query($db_handle, sprintf($sql, mysqli_real_escape_string($db_handle, $variable)));
		} else {
			// @codingStandardsIgnoreLine
			$res = @mysql_query(sprintf($sql, mysql_real_escape_string($variable, $db_handle)), $db_handle);
		}
		if (false === $res) {
			return $res;
		}
		if ($is_mysqli) {
			// @codingStandardsIgnoreLine
			$res = mysqli_fetch_array($res);
			return isset($res[0]) ? $res[0] : null;
		} else {
			// @codingStandardsIgnoreLine
			$res = mysql_result($res, 0);
			return false === $res ? null : $res;
		}
	}

	/**
	 *
	 * This function is adapted from the set_sql_mode() method in WordPress wpdb class but with few modifications applied, this can be used to switch between different sets of SQL modes.
	 *
	 * @see https://developer.wordpress.org/reference/classes/wpdb/set_sql_mode/
	 * @see https://dev.mysql.com/doc/refman/5.6/en/sql-mode.html
	 * @see https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html
	 * @see https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html
	 * @see https://dev.mysql.com/doc/refman/5.6/en/server-system-variables.html#sysvar_sql_mode
	 * @see https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_sql_mode
	 * @see https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_sql_mode
	 * @see https://mariadb.com/kb/en/library/sql-mode/#strict-mode
	 * @see https://mariadb.com/kb/en/library/sql-mode/#setting-sql_mode
	 *
	 * @param Array                $modes     Optional. A list of SQL modes to set.
	 * @param Resource|Object|NULL $db_handle Optional. If specified, it should either the valid database link identifier(resource) given by mysql(i) or null to instead use the global WPDB object.
	 */
	public static function set_sql_mode($modes = array(), $db_handle = null) {

		global $updraftplus, $wpdb;

		$strict_modes = array(
			// according to mariadb and mysql docs, strict mode can be one of these or both
			'STRICT_TRANS_TABLES',
			'STRICT_ALL_TABLES',
		);

		$incompatible_modes = array_unique(array_merge(array(
			'NO_ZERO_DATE',
			'ONLY_FULL_GROUP_BY',
			'TRADITIONAL',
		), $strict_modes));

		$class = get_class();

		if (is_null($db_handle)) {
			$initial_modes_str = $wpdb->get_var('SELECT @@SESSION.sql_mode');
		} else {
			$initial_modes_str = call_user_func_array(array($class, 'get_system_variable'), array('sql_mode', $db_handle));
		}
		if (is_scalar($initial_modes_str) && !is_bool($initial_modes_str)) {
			$modes = array_unique(array_merge($modes, array_change_key_case(explode(',', $initial_modes_str), CASE_UPPER)));
		} else {
			unset($initial_modes_str);
			$updraftplus->log("Couldn't get the sql_mode value");
		}

		$modes = array_change_key_case($modes, CASE_UPPER);

		foreach ($modes as $i => $mode) {
			if (in_array($mode, $incompatible_modes)) {
				unset($modes[$i]);
			}
		}

		$modes_str = implode(',', $modes);

		if (is_null($db_handle)) {
			$res = $wpdb->query($wpdb->prepare("SET SESSION sql_mode = %s", $modes_str));
		} else {
			$res = call_user_func_array(array($class, 'set_system_variable'), array('sql_mode', $modes_str, $db_handle));
		}

		if (isset($initial_modes_str) && false == array_diff(explode(',', $initial_modes_str), $modes)) {
			$updraftplus->log("SQL compatibility mode is: $modes_str");
		} else {
			$updraftplus->log("SQL compatibility mode".((false === $res) ? " not" : "")." successfully changed".(isset($initial_modes_str) ? " from $initial_modes_str" : "")." to $modes_str");
		}
	}
}

class UpdraftPlus_WPDB_OtherDB_Utility extends wpdb {
	/**
	 * This adjusted bail() does two things: 1) Never dies and 2) logs in the UD log
	 *
	 * @param String $message    a string containing a message
	 * @param String $error_code a string containing an error code
	 * @return Boolean returns false
	 */
	public function bail($message, $error_code = '500') {
		global $updraftplus;
		if ('db_connect_fail' == $error_code) $message = 'Connection failed: check your access details, that the database server is up, and that the network connection is not firewalled.';
		$updraftplus->log("WPDB_OtherDB error: $message ($error_code)");
		// Now do the things that would have been done anyway
		$this->error = class_exists('WP_Error') ? new WP_Error($error_code, $message) : $message;
		return false;
	}
}
