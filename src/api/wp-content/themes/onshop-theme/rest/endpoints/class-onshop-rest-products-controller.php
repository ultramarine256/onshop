<?php

defined('ABSPATH') || exit;

/**
 * REST API Products controller class.
 *
 * @extends
 */
class ONSHOP_REST_Products_Controller extends WC_REST_Products_Controller
{
    /**
     * Endpoint namespace.
     *
     * @var string
     */
    protected $namespace = 'onshop/v3/';

    /**
     * Route registration
     */
    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            'product',
            array(
                array(
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => function (WP_REST_Request $request) {
                        $query_args    = $this->prepare_objects_query( $request );
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
                    'args'                => $this->get_collection_params(),
                ),
                'schema' => array( $this, 'get_public_item_schema' ),
            )
        );
        register_rest_route(
            $this->namespace,
            'product/(?P<id>\d+)',
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array($this, 'get_item'),
            )
        );
        register_rest_route(
            $this->namespace,
            'products/tags',
            [
                'methods'  => WP_REST_Server::READABLE,
                'callback' => function ( WP_REST_Request $request ) {
                    return get_terms(['product_tag']);
                },
            ]
        );
    }
}
