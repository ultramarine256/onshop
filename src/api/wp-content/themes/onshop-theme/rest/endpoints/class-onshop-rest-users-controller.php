<?php
defined('ABSPATH') || exit;

/**
 * REST API Users controller class.
 *
 * @extends WC_REST_Users_Controller
 */
class ONSHOP_REST_Users_Controller extends WC_REST_Customers_Controller
{
    /**
     * Endpoint namespace.
     *
     * @var string
     */
    protected $namespace = 'onshop/v1/';

    /**
     * Route registration
     */
    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            'user/register',
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => function (WP_REST_Request $request) {
                    $response = $this->create_item($request);
                    $data = $response->get_data();

                    wp_set_current_user($data['id']);
                    wp_set_auth_cookie($data['id'], false, true);

                    return $response;
                },
                'permission_callback' => function () {
                    $user_id = wp_validate_auth_cookie('', 'logged_in');

                    return !$user_id;
                },
                'args' => array(
                    'username' => array(
                        'required' => true,
                        'description' => __( 'Username for user sign up' ),
                        'type'        => 'string',
                        'validate_callback' => function ($value) {
                            return is_string($value);
                        }
                    ),
                    'password' => array(
                        'required' => true,
                        'description' => __( 'User\'s password' ),
                        'type'        => 'string',
                        'validate_callback' => function ($value) {
                            return is_string($value);
                        }
                    ),
                ),
            )
        );
        register_rest_route(
            $this->namespace,
            'user/login',
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => function (WP_REST_Request $request) {
                    $user_id = wp_validate_auth_cookie('', 'logged_in');

                    if ($user_id) {
                        wp_set_current_user($user_id);
                        $request['id'] = $user_id;

                        return $this->get_item($request);
                    }

                    $credentials = array(
                        'user_login' => sanitize_user($request->get_param('username')),
                        'user_password' => trim($request->get_param('password'))
                    );

                    if (empty( $credentials['user_login']) || empty($credentials['user_password'])) {
                         return new WP_Error(
                            'invalid_credentials',
                            __( 'Check your credentials.' )
                        );
                    }

                    do_action_ref_array( 'wp_authenticate', array( &$credentials['user_login'], &$credentials['user_password'] ) );

                    // wp_authenticate_username_password
                    $user = apply_filters( 'authenticate', null, $credentials['user_login'], $credentials['user_password'] );

                    if ( is_wp_error( $user ) ) {
                        return $user;
                    }

                    wp_set_auth_cookie( $user->ID, false, true );

                    $request['id'] = $user->ID;

                    return $this->get_item($request);
                },
                'args' => array(
                    'username' => array(
                        'required' => true,
                        'description' => __( 'Username for user sign up' ),
                        'type'        => 'string',
                        'validate_callback' => function ($value) {
                            return is_string($value);
                        }
                    ),
                    'password' => array(
                        'required' => true,
                        'description' => __( 'User\'s password' ),
                        'type'        => 'string',
                        'validate_callback' => function ($value) {
                            return is_string($value);
                        }
                    ),
                ),
            )
        );
        register_rest_route(
            $this->namespace,
            'user/logout',
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => function () {
                    wp_logout();

                    return 'OK';
                },
            )
        );
        register_rest_route(
            $this->namespace,
            'user',
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => function (WP_REST_Request $request) {
                    $user = wp_get_current_user();
                    $request['id'] = $user->ID;

                    return $this->get_item($request);
                },
                'permission_callback' => function () {
                    $user_id = wp_validate_auth_cookie('', 'logged_in');

                    if ($user_id) {
                        wp_set_current_user($user_id);
                    }

                    return $user_id;
                },
            )
        );
    }
}
