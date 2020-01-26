<?php
defined('ABSPATH') || exit;

/**
 * REST API Orders controller class.
 *
 * @extends WC_REST_Orders_Controller
 */
class ONSHOP_REST_Orders_Controller extends WC_REST_Orders_Controller
{

    /**
     * Endpoint namespace.
     *
     * @var string
     */
    protected $namespace = 'onshop/v1';

    /**
     * Route registration
     */
    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            'order',
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => array($this, 'create_item'),
            )
        );
        register_rest_route(
            $this->namespace,
            'user/orders',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => function (WP_REST_Request $request) {
                        $user = wp_get_current_user();

                        $request->set_param('customer', $user->ID);

                        $query_args = $this->prepare_objects_query( $request );
                        $query_results = $this->get_objects( $query_args );

                        $objects = array();
                        foreach ( $query_results['objects'] as $object ) {
                            $data = $this->prepare_object_for_response( $object, $request );
                            $objects[] = $this->prepare_response_for_collection( $data );
                        }

                        $page      = (int) $query_args['paged'];
                        $max_pages = $query_results['pages'];

                        $response = rest_ensure_response( $objects );
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
                                    $base  = str_replace( "(?P<$attrib_name>[\d]+)", $request[ $attrib_name ], $base );
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
                        $user_id = wp_validate_auth_cookie('', 'logged_in');

                        if ($user_id) {
                            wp_set_current_user($user_id);
                        }

                        return $user_id;
                    },
                    'args' => $this->get_collection_params(),
                ),
                'schema' => array($this, 'get_public_item_schema'),
            )
        );
        register_rest_route(
            $this->namespace,
            'user/orders/(?P<id>\d+)',
            array(
                'args' => array(
                    'id' => array(
                        'description' => __('Unique identifier for the resource.', 'woocommerce'),
                        'type' => 'integer',
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => function (WP_REST_Request $request) {
                        $user = wp_get_current_user();
                        $response =  $this->get_item($request);
                        $data = $response->get_data();

                        if ($data['customer_id'] != $user->ID) {
                            $response->set_data(null);

                            foreach ($response->get_links() as $key => $value) {
                                $response->remove_link($key);
                            }
                        }

                        return $response;
                    },
                    'permission_callback' => function () {
                        $user_id = wp_validate_auth_cookie('', 'logged_in');

                        if ($user_id) {
                            wp_set_current_user($user_id);
                        }

                        return $user_id;
                    },
                ),
                'schema' => array($this, 'get_public_item_schema'),
            )
        );
    }
}