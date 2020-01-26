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
                    // wp_set_current_user((int)$request->get_param('id'));
                    // TODO autologin set cookie
                    return $this->create_item($request);
                },
                'args' => array(
                    'email' => array(
                        'required' => true,
                        'description' => __( 'Email for user sign up' ),
                        'type'        => 'email',
                        'validate_callback' => 'is_email'
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
                    // TODO check if already logged in
                    // TODO if yes return success maybe extend cookie
                    // TODO verify credentials and if ok set cookie

                    $credentials = array();
                    $secure_cookie = true; // could be false if we decide

                    $credentials['user_login'] = sanitize_user($request->get_param('username'));
                    $credentials['user_password'] = trim($request->get_param('password'));

                    if (empty( $credentials['user_login']) || empty($credentials['user_password'])) {
                        new WP_Error(
                            'invalid_credentials',
                            __( 'Check your credentials.' )
                        );
                    }

                    do_action_ref_array( 'wp_authenticate', array( &$credentials['user_login'], &$credentials['user_password'] ) );

                    // wp_authenticate_username_password
                    $user = apply_filters( 'authenticate', null, $credentials['user_login'], $credentials['user_password'] );

                    $auth_secure_cookie = apply_filters( 'secure_signon_cookie', $secure_cookie, $credentials );


                    add_filter( 'authenticate', 'wp_authenticate_cookie', 30, 3 );

                    $user = wp_authenticate( $credentials['user_login'], $credentials['user_password'] );

                    if ( is_wp_error( $user ) ) {
                        return $user;
                    }

                    wp_set_auth_cookie( $user->ID, false, $auth_secure_cookie );

                    return $user;
                },
                'args' => array(
//                    'email' => array(
//                        'required' => true,
//                        'description' => __( 'Email for user sign up' ),
//                        'type'        => 'email',
//                        'validate_callback' => 'is_email'
//                    ),
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
    }
}

// LOGGED_IN_COOKIE = 'wordpress_logged_in_' . COOKIEHASH
// $user = wp_signon( array(), true );
