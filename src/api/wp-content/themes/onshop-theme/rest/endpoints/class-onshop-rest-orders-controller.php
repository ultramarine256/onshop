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
    protected $namespace = 'onshop/v1';

    /**
     * Route registration
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace,
            'order',
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => function (WP_REST_Request $request) {
                    return $this->create_item($request);
                },
            )
        );
    }
}