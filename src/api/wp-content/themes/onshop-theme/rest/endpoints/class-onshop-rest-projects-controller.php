<?php

defined( 'ABSPATH' ) || exit;

/**
 * REST API Products controller class.
 *
 * @extends
 */
class ONSHOP_REST_Projects_Controller extends WC_REST_CRUD_Controller {
	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'onshop/v1/';
	protected $post_type = 'project';

	/**
	 * Route registration
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'project',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => function ( WP_REST_Request $request ) {
					$request_body = $request->get_params();

					$project_model = new ONSHOP_MODEL_Projects();
					$project_id    = $project_model->create( $request_body );

					if ( $project_id ) {
						return [
							'id' => $project_id
						];
					} else {
						return new WP_Error( "woocommerce_rest_{$this->post_type}_invalid_id", __( 'Validation failure.', 'woocommerce' ), array( 'status' => 400 ) );
					}
				},
				'permission_callback' => function () {
					$user_id = wp_validate_auth_cookie( '', 'logged_in' );

					if ( $user_id ) {
						wp_set_current_user( $user_id );
					}

					return $user_id;
				},
				'args'                => array(
					'name'        => array(
						'required'          => true,
						'description'       => __( 'Name of the project' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						}
					),
					'description' => array(
						'required'          => false,
						'description'       => __( 'Project\'s description' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						}
					),
				),
			)
		);
		register_rest_route(
			$this->namespace,
			'project',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => function ( WP_REST_Request $request ) {
					$user          = wp_get_current_user();
					$request['id'] = $user->ID;

					// TODO get all projects

					return 'OK';
				},
				'permission_callback' => function () {
					$user_id = wp_validate_auth_cookie( '', 'logged_in' );

					if ( $user_id ) {
						wp_set_current_user( $user_id );
					}

					return $user_id;
				},
			)
		);
		register_rest_route(
			$this->namespace,
			'project/(?P<id>\d+)',
			array(
				'args' => array(
					'id' => array(
						'description' => __( 'Unique identifier for the resource.', 'onshop' ),
						'type'        => 'integer',
					),
				),
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => function ( WP_REST_Request $request ) {
// 						TODO relation to users?
//						$user = wp_get_current_user();
//						$user_id = $user->ID;

						$project_id = (int) $request['id'];

						$project_model = new ONSHOP_MODEL_Projects();
						$project       = $project_model->get_by_id( $project_id );

						if ($project) {
							return [
								'id' => $project['id'],
								'name' => $project['name'],
								'description' => $project['description'],
							];
						} else {
							return new WP_Error( "woocommerce_rest_{$this->post_type}_invalid_id", __( 'Not found.', 'woocommerce' ), array( 'status' => 404 ) );
						}

					},
					'permission_callback' => function () {
						$user_id = wp_validate_auth_cookie( '', 'logged_in' );

						if ( $user_id ) {
							wp_set_current_user( $user_id );
						}

						return $user_id;
					},
				)
			)
		);
		register_rest_route(
			$this->namespace,
			'project/(?P<id>\d+)',
			array(
				'args' => array(
					'id' => array(
						'description' => __( 'Unique identifier for the resource.', 'onshop' ),
						'type'        => 'integer',
					),
				),
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => function ( WP_REST_Request $request ) {
						$user    = wp_get_current_user();
						$user_id = $user->ID;

						// TODO update specific project

						return 'OK';
					},
					'permission_callback' => function () {
						$user_id = wp_validate_auth_cookie( '', 'logged_in' );

						if ( $user_id ) {
							wp_set_current_user( $user_id );
						}

						return $user_id;
					},
				)
			)
		);
		register_rest_route(
			$this->namespace,
			'project/(?P<id>\d+)',
			array(
				'args' => array(
					'id' => array(
						'description' => __( 'Unique identifier for the resource.', 'onshop' ),
						'type'        => 'integer',
					),
				),
				array(
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => function ( WP_REST_Request $request ) {
						$user    = wp_get_current_user();
						$user_id = $user->ID;

						// TODO delete specific project

						return 'OK';
					},
					'permission_callback' => function () {
						$user_id = wp_validate_auth_cookie( '', 'logged_in' );

						if ( $user_id ) {
							wp_set_current_user( $user_id );
						}

						return $user_id;
					},
				)
			)
		);

	}

	private function sql_example() {
//		global $wpdb;
//
//		$prices = $wpdb->get_row("
//	     	select min(meta_value) as min_price, max(meta_value) as max_price
//			from wp_posts, wp_postmeta
//			where wp_posts.ID = wp_postmeta.post_id AND wp_posts.post_type = 'product'
//			AND wp_postmeta.meta_key = '_price';
//	     ");
//
//		return [
//			[
//				"category_name" => "price",
//				"min_price" => $prices->min_price,
//				"max_price" => $prices->max_price,
//			],
//		];
	}
}

