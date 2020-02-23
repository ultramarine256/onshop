<?php

defined( 'ABSPATH' ) || exit;

/**
 * Projects model class.
 *
 * @extends
 */
class ONSHOP_MODEL_Projects {

	public static function create( $obj ) {
		global $wpdb;

		$project = ONSHOP_MODEL_Projects::sanitize_project_for_database( $obj );

		$result = $wpdb->insert( 'projects', $project );

		if ( ! $result && ! empty( $wpdb->last_error ) ) {
			return false;
		}

		$project['id'] = $wpdb->insert_id;

		return $project;
	}

	public static function sanitize_project_for_database( $obj ) {
		return [
			'name'        => $obj['name'],
			'description' => $obj['description'],
		];
	}
}
