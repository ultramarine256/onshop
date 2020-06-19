<?php
defined( 'ABSPATH' ) || exit;

/**
 * REST API Users controller class.
 *
 * @extends WC_REST_Customers_Controller
 */
class ONSHOP_REST_Users_Controller extends WC_REST_Customers_Controller {
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
		register_rest_route(
			$this->namespace,
			'user/register',
			[
				'methods'  => WP_REST_Server::CREATABLE,
				'callback' => function ( WP_REST_Request $request ) {
					$response = $this->create_item( $request );

					if ( is_wp_error( $response ) ) {
						return $response;
					}

					return $response->get_data();
				},
				'args'     => [
					'username' => [
						'required'          => true,
						'description'       => __( 'Username for user sign up' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						},
					],
					'password' => [
						'required'          => true,
						'description'       => __( 'User\'s password' ),
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
			'user/login',
			[
				'methods'  => WP_REST_Server::CREATABLE,
				'callback' => function ( WP_REST_Request $request ) {
					$credentials = [
						'user_login'    => sanitize_user( $request->get_param( 'username' ) ),
						'user_password' => trim( $request->get_param( 'password' ) )
					];

					do_action_ref_array( 'wp_authenticate', [
						&$credentials['user_login'],
						&$credentials['user_password'],
					] );

					// wp_authenticate_username_password
					$result = apply_filters( 'authenticate', null, $credentials['user_login'], $credentials['user_password'] );

					if ( is_wp_error( $result ) ) {
						return new WP_Error(
							'invalid_credentials',
							__( 'Check your credentials.' ),
							[ 'status' => 401 ]
						);
					}

					if (!$result->caps['customer'] && !$result->caps['shop_manager']) {
                        return new WP_Error(
                            'access_denied',
                            __( 'Access denied.' ),
                            [ 'status' => 405 ]
                        );
                    }

					return [
						"jwt" => ONSHOP_AUTH::generate_token( [
							"user_id" => $result->ID,
							"email"   => @$result->data->user_email,
						] ),
					];
				},
				'args'     => [
					'username' => [
						'required'          => true,
						'description'       => __( 'Username for user sign up' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						}
					],
					'password' => [
						'required'          => true,
						'description'       => __( 'User\'s password' ),
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
			'user',
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => function ( WP_REST_Request $request ) {
					$user          = wp_get_current_user();
					$request['id'] = $user->ID;

					return $this->get_item( $request );
				},
				'permission_callback' => function () {
					return ONSHOP_AUTH::verify_auth();
				}
			]
		);
		register_rest_route(
			$this->namespace,
			'users',
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => function ( WP_REST_Request $request ) {
//					$user          = wp_get_current_user();
//					$request['id'] = $user->ID;

					return $this->get_items( $request );
				},
//				'permission_callback' => function () {
//					return ONSHOP_AUTH::verify_auth();
//				}
			]
		);
		register_rest_route(
			$this->namespace,
			'user',
			[
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => function ( WP_REST_Request $request ) {
					$user          = wp_get_current_user();
					$request['id'] = $user->ID;

					return $this->update_item( $request );
				},
				'permission_callback' => function () {
					return ONSHOP_AUTH::verify_auth();
				},
				'args'     => [
					'username' => [
						'required'          => false,
						'description'       => __( 'Username for user sign up' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						},
					],
					'password' => [
						'required'          => false,
						'description'       => __( 'User\'s password' ),
						'type'              => 'string',
						'validate_callback' => function ( $value ) {
							return is_string( $value );
						}
					],
				],
			]
		);
	}
}
