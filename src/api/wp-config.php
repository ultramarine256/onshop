<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

//Using environment variables for DB connection information
$connectstr_dbhost = 'localhost'; // 176.37.8.120, localhost:3308
$connectstr_dbname = 'onshop_blue_prod';
$connectstr_dbusername = 'root';
$connectstr_dbpassword = 'WgAaXsdb6dgTtwDg';

$wp_debug = false;

foreach ($_SERVER as $key => $value) {
	if (strpos($key, "MYSQLCONNSTR_") !== 0) {
		continue;
	}

	// Data Source=HOST; Database=DB-NAME; User Id=USER; Password=PASSWORD;
	$connectstr_dbhost = preg_replace("/^.*Data Source=(.+?);.*$/", "\\1", $value);
	$connectstr_dbname = preg_replace("/^.*Database=(.+?);.*$/", "\\1", $value);
	$connectstr_dbusername = preg_replace("/^.*User Id=(.+?);.*$/", "\\1", $value);
	$connectstr_dbpassword = preg_replace("/^.*Password=(.+?);$/", "\\1", $value);
	$wp_debug = false;
}

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', $connectstr_dbname);

/** MySQL database username */
define('DB_USER', $connectstr_dbusername);

/** MySQL database password */
define('DB_PASSWORD', $connectstr_dbpassword);

/** MySQL hostname */
define('DB_HOST', $connectstr_dbhost);

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY', 'MELz;a:Izu/:wdmr3u-?8:9.A$EyBZXbau_-Yd_^{r7/7W4QpN6XZ@bZ)3-]`}wx' );
define( 'SECURE_AUTH_KEY', ':t3k90/A74+=1(=5nX86ezjG9e?[`xeya>]rZ}0kbuvt-9%$X7D$4N:3sZdj$1RM' );
define( 'LOGGED_IN_KEY', 'OSv$_&cN]}]Yj{ZNX/aY_S<Uo|L5OHG+vQgH~raVgl}T5?{V5mcD_5wD)uLD59<R' );
define( 'NONCE_KEY', '>_08fetHF74=eO}2nDPMYx:}$CW{(g@AXIl4I8ebRZump}860Da`a^W?$v[&FRZ ' );
define( 'AUTH_SALT', 'BAH_MurFnGwb{X{3(4CVx6~YY`aD3inN9Db4p=qq#ITCzd&06(vL:f&Q3;|l:W!?' );
define( 'SECURE_AUTH_SALT', 'O-:l9;=Mi_Ie;gryniFBHk=-6p N:jX=!HlrDf$7iXjup?H.Yl&eQW9j*7$JxGJ9' );
define( 'LOGGED_IN_SALT', 'BIj7@CYwH*kfc2Q&bMIw2Ev:osUb^TQqen(x5qUAbZ=|^EA$p1>1eb#kuTZGY,CF' );
define( 'NONCE_SALT', '{=l.?T@Z;P@wqth3`*yy$.ME0`FeVKyo^vXL7TG2Ve(3Z[g=+-rHFw-2E9?,*[}E' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', $wp_debug );

/* That's all, stop editing! Happy publishing. */

//Relative URLs for swapping across app service deployment slots
define( 'WP_HOME', 'http://' . filter_input( INPUT_SERVER, 'HTTP_HOST', FILTER_SANITIZE_STRING ) );
define( 'WP_SITEURL', 'http://' . filter_input( INPUT_SERVER, 'HTTP_HOST', FILTER_SANITIZE_STRING ) );
define( 'WP_CONTENT_URL', '/wp-content' );
define( 'DOMAIN_CURRENT_SITE', filter_input( INPUT_SERVER, 'HTTP_HOST', FILTER_SANITIZE_STRING ) );

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

// MICROSOFT_AZURE_ACCOUNT_KEY

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );