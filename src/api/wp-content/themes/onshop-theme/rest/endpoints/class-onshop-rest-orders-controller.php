<?php
defined( 'ABSPATH' ) || exit;

/**
 * REST API Orders controller class.
 *
 * @extends WC_REST_Orders_Controller
 */
class ONSHOP_REST_Orders_Controller extends WC_REST_Orders_Controller {

	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'onshop/v3';

	/**
	 * Route registration
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'order',
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => function ( WP_REST_Request $request ) {
					$user = wp_get_current_user();
					$request->set_param( 'customer_id', $user->ID );

					$response = $this->create_item( $request );

					if ( is_wp_error( $response ) ) {
						return $response;
					}

					return $response->get_data();
				},
				'permission_callback' => function () {
					return ONSHOP_AUTH::verify_auth();
				}
			]
		);
        register_rest_route(
            $this->namespace,
            'user/order/note',
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => function ( WP_REST_Request $request ) {
                    $order = wc_get_order($request->get_param('id'));
                    $order->add_order_note($request->get_param('note'), true);
                    $order->set_status('waiting-return');
                    $order->save();
                    return $order->get_data();
                },
                'permission_callback' => function () {
                    return ONSHOP_AUTH::verify_auth();
                }
            ]
        );
		register_rest_route(
			$this->namespace,
			'user/orders',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => function ( WP_REST_Request $request ) {
						$user = wp_get_current_user();

						$request->set_param( 'customer', $user->ID );

						$query_args    = $this->prepare_objects_query( $request );
						$query_results = $this->get_objects( $query_args );

						$objects = array();
						foreach ( $query_results['objects'] as $object ) {
							$data      = $this->prepare_object_for_response( $object, $request );
							$objects[] = $this->prepare_response_for_collection( $data );
						}

						$page      = (int) $query_args['paged'];
						$max_pages = $query_results['pages'];

						$response = rest_ensure_response( $objects );

						if ( is_wp_error( $response ) ) {
							return $response;
						}

						$response->header( 'X-WP-Total', $query_results['total'] );
						$response->header( 'X-WP-TotalPages', (int) $max_pages );

						$base          = $this->rest_base;
						$attrib_prefix = '(?P<';
						if ( strpos( $base, $attrib_prefix ) !== false ) {
							$attrib_names = array();
							preg_match( '/\(\?P<[^>]+>.*\)/', $base, $attrib_names, PREG_OFFSET_CAPTURE );
							foreach ( $attrib_names as $attrib_name_match ) {
								$beginning_offset = strlen( $attrib_prefix );
								$attrib_name_end  = strpos( $attrib_name_match[0], '>', $attrib_name_match[1] );
								$attrib_name      = substr( $attrib_name_match[0], $beginning_offset, $attrib_name_end - $beginning_offset );
								if ( isset( $request[ $attrib_name ] ) ) {
									$base = str_replace( "(?P<$attrib_name>[\d]+)", $request[ $attrib_name ], $base );
								}
							}
						}
						$base = add_query_arg( $request->get_query_params(), rest_url( sprintf( '/%s/%s', $this->namespace, $base ) ) );

						if ( $page > 1 ) {
							$prev_page = $page - 1;
							if ( $prev_page > $max_pages ) {
								$prev_page = $max_pages;
							}
							$prev_link = add_query_arg( 'page', $prev_page, $base );
							$response->link_header( 'prev', $prev_link );
						}
						if ( $max_pages > $page ) {
							$next_page = $page + 1;
							$next_link = add_query_arg( 'page', $next_page, $base );
							$response->link_header( 'next', $next_link );
						}

						return $response;
					},
					'permission_callback' => function () {
						return ONSHOP_AUTH::verify_auth();
					},
					'args'                => $this->get_collection_params(),
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
		register_rest_route(
			$this->namespace,
			'user/orders/(?P<id>\d+)',
			[
				'args'   => [
					'id' => [
						'description' => __( 'Unique identifier for the resource.', 'woocommerce' ),
						'type'        => 'integer',
					],
				],
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => function ( WP_REST_Request $request ) {
						$user     = wp_get_current_user();
						$response = $this->get_item( $request );

						if ( is_wp_error( $response ) ) {
							return $response;
						}

						$data = $response->get_data();

						if ( $data['customer_id'] != $user->ID ) {
							return new WP_Error(
								'rest_forbidden',
								__( 'Sorry, you are not allowed to do that.' ),
								[ 'status' => 401 ]
							);
						}

						return $response;
					},
					'permission_callback' => function () {
						return ONSHOP_AUTH::verify_auth();
					},
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);

		register_rest_route(
			$this->namespace,
			'project/(?P<id>\d+)/orders',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => function ( WP_REST_Request $request ) {
						$params = $request->get_params();

						$query_args               = $this->prepare_objects_query( $request );
						$query_args['meta_key']   = 'project_id';
						$query_args['meta_value'] = $params['id'];

						$query_results            = $this->get_objects( $query_args );

						$objects = array();
						foreach ( $query_results['objects'] as $object ) {
							$data      = $this->prepare_object_for_response( $object, $request );
							$objects[] = $this->prepare_response_for_collection( $data );
						}

						$page      = (int) $query_args['paged'];
						$max_pages = $query_results['pages'];

						$response = rest_ensure_response( $objects );

						if ( is_wp_error( $response ) ) {
							return $response;
						}

						$response->header( 'X-WP-Total', $query_results['total'] );
						$response->header( 'X-WP-TotalPages', (int) $max_pages );

						$base          = $this->rest_base;
						$attrib_prefix = '(?P<';
						if ( strpos( $base, $attrib_prefix ) !== false ) {
							$attrib_names = array();
							preg_match( '/\(\?P<[^>]+>.*\)/', $base, $attrib_names, PREG_OFFSET_CAPTURE );
							foreach ( $attrib_names as $attrib_name_match ) {
								$beginning_offset = strlen( $attrib_prefix );
								$attrib_name_end  = strpos( $attrib_name_match[0], '>', $attrib_name_match[1] );
								$attrib_name      = substr( $attrib_name_match[0], $beginning_offset, $attrib_name_end - $beginning_offset );
								if ( isset( $request[ $attrib_name ] ) ) {
									$base = str_replace( "(?P<$attrib_name>[\d]+)", $request[ $attrib_name ], $base );
								}
							}
						}
						$base = add_query_arg( $request->get_query_params(), rest_url( sprintf( '/%s/%s', $this->namespace, $base ) ) );

						if ( $page > 1 ) {
							$prev_page = $page - 1;
							if ( $prev_page > $max_pages ) {
								$prev_page = $max_pages;
							}
							$prev_link = add_query_arg( 'page', $prev_page, $base );
							$response->link_header( 'prev', $prev_link );
						}
						if ( $max_pages > $page ) {
							$next_page = $page + 1;
							$next_link = add_query_arg( 'page', $next_page, $base );
							$response->link_header( 'next', $next_link );
						}

						return $response;
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
					'args'                => $this->get_collection_params(),
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}
}
