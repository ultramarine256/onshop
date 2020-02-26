<?php

defined( 'ABSPATH' ) || exit;

/**
 * Projects model class.
 *
 * @extends
 */
class ONSHOP_MODEL_UsersXProjects {

	public static function add_users_to_project( $project_id, $user_ids ) {
		global $wpdb;

		foreach ( $user_ids as $user_id ) {
			$result = $wpdb->insert(
				'usersXprojects',
				[
					'user_id'    => $user_id,
					'project_id' => $project_id,
				]
			);

			// currently we have silent binding users to projects
		}

		return true;
	}

	public static function get_project_users( $project_id ) {
		global $wpdb;

		$rows = $wpdb->get_results( '
			SELECT user_id
			FROM usersXprojects 
			WHERE project_id = ' . $project_id . '
		' );

		$result = [];

		foreach ( $rows as $row ) {
			array_push( $result, intval( $row->user_id ) );
		}

		return $result;
	}

	public static function delete_users_from_project( $project_id, $user_ids ) {
		global $wpdb;

		$result = $wpdb->get_results( '
			DELETE FROM usersXprojects 
			WHERE project_id = ' . $project_id . '
			    AND user_id in (' . implode( ',', $user_ids ) . ')
		' );

		return $result;
	}
}
