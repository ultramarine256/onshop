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

	public static function get( $project_id ) {
		global $wpdb;

		return $wpdb->get_row( '
			SELECT id, name, description FROM projects 
			WHERE id = ' . $project_id );
	}

	public static function getAll() {
		global $wpdb;

		return $wpdb->get_results( 'SELECT id, name, description, address, code, market_segment, pricing_margin, estimated_start_date FROM projects' );
	}

	public static function getByUserId( $user_id ) {
		global $wpdb;

		return $wpdb->get_results( '
			SELECT p.id, p.name, p.description, p.address, p.code, p.market_segment, p.pricing_margin, p.estimated_start_date
			FROM projects as p INNER JOIN usersXprojects as up ON p.id = up.project_id
			WHERE up.user_id=' . $user_id );
	}

	public static function update( $project_id, $data ) {
		global $wpdb;

		$result = $wpdb->update(
			'projects',
			ONSHOP_MODEL_Projects::sanitize_project_for_database( $data ),
			[ 'id' => $project_id ]
		);

		return $result;
	}

	public static function delete( $project_id ) {
		global $wpdb;

		return $wpdb->get_results( '
			DELETE FROM projects 
			WHERE id = ' . $project_id );
	}

	public static function sanitize_project_for_database( $obj ) {
		$result = [];

		if ( $obj['name'] ) {
			$result['name'] = $obj['name'];
		}

		if ( $obj['description'] ) {
			$result['description'] = $obj['description'];
		}

        if ( $obj['description'] ) {
            $result['description'] = $obj['description'];
        }

        if ( $obj['market_segment'] ) {
            $result['market_segment'] = $obj['market_segment'];
        }

        if ( $obj['description'] ) {
            $result['description'] = $obj['description'];
        }

        if ( $obj['code'] ) {
            $result['code'] = $obj['code'];
        }

        if ( $obj['address'] ) {
            $result['address'] = $obj['address'];
        }

        if ( $obj['pricing_margin'] ) {
            $result['pricing_margin'] = $obj['pricing_margin'];
        }

        if ( $obj['estimated_start_date'] ) {
            $result['estimated_start_date'] = $obj['estimated_start_date'];
        }
		return $result;
	}
}
