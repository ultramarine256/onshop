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
	protected $namespace = 'onshop/v3/';

	/**
	 * Route registration
	 */
	public function register_routes() {
		// project
		register_rest_route(
			$this->namespace,
			'project',
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => function ( WP_REST_Request $request ) {
					$project = ONSHOP_MODEL_Projects::create( $request->get_params() );

					if ( ! $project ) {
						return new WP_Error(
							'invalid_data',
							__( 'Failed to create project' ),
							[ 'status' => 400 ]
						);
					}

					return $project;
				},
				'permission_callback' => function () {
					$result = ONSHOP_AUTH::verify_auth();

					if ( ! $result ) {
						return false;
					}

					$user          = wp_get_current_user();
					$allowed_roles = [ 'administrator','shop_manager'];

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
						'required'          => true,
						'description'       => __( 'Project\'s description' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						}
					],
                    'address' => [
						'required'          => false,
						'description'       => __( 'Project\'s address' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						}
					],
                    'code' => [
						'required'          => true,
						'description'       => __( 'Project\'s code' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						}
					],
                    'market_segment' => [
						'required'          => true,
						'description'       => __( 'Project\'s market segment' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						}
					],
                    'pricing_margin' => [
						'required'          => false,
						'description'       => __( 'Project\'s pricing margin' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						}
					],
                    'estimated_start_date' => [
						'required'          => true,
						'description'       => __( 'Project\'s estimated start date' ),
						'type'              => 'number',
                        'validate_callback' => function ( $value ) {
                            return is_numeric( $value );
                        }
                    ],

				],
			]
		);
		register_rest_route(
			$this->namespace,
			'project/(?P<id>\d+)',
			array(
				'args' => array(
					'id' => array(
						'description' => __( 'Unique identifier for the project.', 'onshop' ),
						'type'        => 'integer',
					),
				),
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => function ( WP_REST_Request $request ) {
						$params = $request->get_params();

						$user          = wp_get_current_user();
						$allowed_roles = [ 'administrator','shop_manager'];

						if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
							$user_ids = ONSHOP_MODEL_UsersXProjects::get_project_users( $params['id'] );

							if ( ! array_intersect( $user_ids, [ $user->ID ] ) ) {
								return new WP_Error(
									'rest_forbidden',
									__( 'Sorry, you are not allowed to do that.' ),
									[ 'status' => 401 ]
								);
							}
						}

						return ONSHOP_MODEL_Projects::get( $params['id'] );
					},
					'permission_callback' => function () {
						return ONSHOP_AUTH::verify_auth();
					},
				)
			)
		);
		register_rest_route(
			$this->namespace,
			'project',
			array(
				'args' => array(
					'id' => array(
						'description' => __( 'Unique identifier for the project.', 'onshop' ),
						'type'        => 'integer',
					),
				),
				[
					'methods' => WP_REST_Server::READABLE,
					'callback' => function() {
						$user = wp_get_current_user();
						$allowed_roles = [ 'administrator' , 'shop_manager'];
                        $projects = array_intersect( $allowed_roles, $user->roles)
                            ? ONSHOP_MODEL_Projects::getAll()
                            : ONSHOP_MODEL_Projects::getByUserId($user->ID);

                        // get all orders by user email
                        $args = array(
                            'customer_id' => $user->ID
                        );
                        $orders = wc_get_orders($args);

                        // modify each project by adding orders
						foreach ($projects as $project) {
						     $filteredOrders = array_filter($orders, function($order) use ($project) {
                                $contain = false;
                                foreach ($order->meta_data as $metaData) {
                                    $data = $metaData->get_data();
                                    if ($data['key'] === 'project-number' && $data['value'] === $project->name) {
                                        $contain = true;
                                    }
                                }
                                return $contain;
                             });

						     $ordersData = array_map(function($order) {
						         $orderData = $order->get_data();
						         $lineItems = array_map(function($item) {
						             return $item->get_data();
                                 }, $orderData['line_items']);
						         $orderData = $order->get_data();
						         $orderData['line_items'] = array_values((array)$lineItems);
						         return $orderData;
                             }, $filteredOrders);

                            $project->orders = array_values((array)$ordersData);
                        }

						return $projects;
					},
					'permission_callback' => function () {
						return ONSHOP_AUTH::verify_auth();
					},
				]
			)
		);
		register_rest_route(
			$this->namespace,
			'project/(?P<id>\d+)',
			[
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => function ( WP_REST_Request $request ) {
					$params = $request->get_params();

					$project_id = ONSHOP_MODEL_Projects::update(
						$params['id'],
						[
							'name'                 => $params['name'],
							'description'          => $params['description'],
                            'address'              => $params['address'],
                            'code'                 => $params['code'],
                            'market_segment'       => $params['market_segment'],
                            'pricing_margin'       => $params['pricing_margin'],
                            'estimated_start_date' => $params['estimated_start_date']

						]
					);

					if ( ! $project_id ) {
						return new WP_Error(
							'invalid_data',
							__( 'Failed to create project' ),
							[ 'status' => 400 ]
						);
					}

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
					$allowed_roles = [ 'administrator','shop_manager'];

					if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
						return false;
					}

					return true;
				},
				'args'                => [
					'name'        => [
						'required'          => false,
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
			'project/(?P<id>\d+)',
			array(
				'args' => array(
					'id' => array(
						'description' => __( 'Unique identifier for the project.', 'onshop' ),
						'type'        => 'integer',
					),
				),
				array(
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => function ( WP_REST_Request $request ) {
						$params = $request->get_params();

						ONSHOP_MODEL_Projects::delete( $params['id'] );

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
						$allowed_roles = [ 'administrator','shop_manager'];

						if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
							return false;
						}

						return true;
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
					$allowed_roles = [ 'administrator','shop_manager'];

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
					$allowed_roles = [ 'administrator','shop_manager'];

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
					$allowed_roles = [ 'administrator','shop_manager'];

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

