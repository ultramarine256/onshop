<?php

defined( 'ABSPATH' ) || exit;

/**
 * Projects model class.
 *
 * @extends
 */
class ONSHOP_MODEL_Projects {
	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $table_name = 'projects';

	// TODO we need created_at, updated_at field in table

	/**
	 * @return string
	 */
	public function create( $obj ) {
		global $wpdb;

		$wpdb->insert(
			$this->table_name,
			$this->sanitize_obj_for_database( $obj )
		);

		return $wpdb->insert_id;
	}

	public function get_by_id( $project_id ) {
		global $wpdb;

		$row = $wpdb->get_row("
	     	select *
			from " . $this->table_name . "
			where projects.id = " . $project_id . ";"
	     );

		return $row;
	}

	protected function sanitize_obj_for_database( $obj ) {
		return [
			'name'        => $obj['name'],
			'description' => $obj['description'],
		];
	}
}

