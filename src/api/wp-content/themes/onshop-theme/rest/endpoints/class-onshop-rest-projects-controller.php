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

	/**
	 * Route registration
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'project',
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => function ( WP_REST_Request $request ) {
					$project_id = ONSHOP_MODEL_Projects::create( $request->get_params() );

					if ( ! $project_id ) {
						return new WP_Error(
							'invalid_data',
							__( 'Failed to create project' ),
							[ 'status' => 400 ]
						);
					}

					return [
						'project_id' => $project_id,
					];
				},
				'permission_callback' => function () {
					$result = ONSHOP_AUTH::verify_auth();

					if ( ! $result ) {
						return false;
					}

					$user          = wp_get_current_user();
					$allowed_roles = [ 'administrator' ];

					if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
						return false;
					}

					return true;
				},
				'args'                => [
					'name'        => [
						'required'          => true,
						'description'       => __( 'Name of the project' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						}
					],
					'description' => [
						'required'          => false,
						'description'       => __( 'Project\'s description' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						}
					],
				],
			]
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
						$user    = wp_get_current_user();
						$user_id = $user->ID;

						// TODO get specific project

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


		register_rest_route(
			$this->namespace,
			'project/(?P<id>\d+)/users',
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => function ( WP_REST_Request $request ) {
					$params = $request->get_params();

					ONSHOP_MODEL_UsersXProjects::add_users_to_project(
						$params['id'],
						$params['user_ids']
					);

					return [
						'project_id' => $params['id'],
					];
				},
				'permission_callback' => function () {
					$result = ONSHOP_AUTH::verify_auth();

					if ( ! $result ) {
						return false;
					}

					$user          = wp_get_current_user();
					$allowed_roles = [ 'administrator' ];

					if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
						return false;
					}

					return true;
				},
				'args'                => [
					'id'       => [
						'description' => __( 'Unique identifier for the project.', 'woocommerce' ),
						'type'        => 'integer',
					],
					'user_ids' => [
						'required'          => true,
						'description'       => __( 'Users ids assign to the project' ),
						'type'              => 'array',
						'validate_callback' => function ( $value ) {
							if ( ! is_array( $value ) ) {
								return false;
							}

							foreach ( $value as $el ) {
								if ( ! is_numeric( $el ) ) {
									return false;
								}
							}

							return true;
						}
					],
				],
			]
		);
		register_rest_route(
			$this->namespace,
			'project/(?P<id>\d+)/users',
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => function ( WP_REST_Request $request ) {
					$params = $request->get_params();

					$user_ids = ONSHOP_MODEL_UsersXProjects::get_project_users(
						$params['id']
					);

					return [
						'user_ids' => $user_ids,
					];
				},
				'permission_callback' => function () {
					$result = ONSHOP_AUTH::verify_auth();

					if ( ! $result ) {
						return false;
					}

					$user          = wp_get_current_user();
					$allowed_roles = [ 'administrator' ];

					if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
						return false;
					}

					return true;
				},
				'args'                => [
					'id' => [
						'description' => __( 'Unique identifier for the project.', 'woocommerce' ),
						'type'        => 'integer',
					]
				],
			]
		);
		register_rest_route(
			$this->namespace,
			'project/(?P<id>\d+)/users',
			[
				'methods'             => WP_REST_Server::DELETABLE,
				'callback'            => function ( WP_REST_Request $request ) {
					$params = $request->get_params();

					ONSHOP_MODEL_UsersXProjects::delete_users_from_project(
						$params['id'],
						$params['user_ids']
					);

					return [
						'project_id' => $params['id'],
					];
				},
				'permission_callback' => function () {
					$result = ONSHOP_AUTH::verify_auth();

					if ( ! $result ) {
						return false;
					}

					$user          = wp_get_current_user();
					$allowed_roles = [ 'administrator' ];

					if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
						return false;
					}

					return true;
				},
				'args'                => [
					'id'       => [
						'description' => __( 'Unique identifier for the project.', 'woocommerce' ),
						'type'        => 'integer',
					],
					'user_ids' => [
						'required'          => true,
						'description'       => __( 'Users ids assign to the project' ),
						'type'              => 'array',
						'validate_callback' => function ( $value ) {
							if ( ! is_array( $value ) ) {
								return false;
							}

							foreach ( $value as $el ) {
								if ( ! is_numeric( $el ) ) {
									return false;
								}
							}

							return true;
						}
					],
				],
			]
		);
	}
}

