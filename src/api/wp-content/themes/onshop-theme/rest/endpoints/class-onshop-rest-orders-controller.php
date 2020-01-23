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
    protected $namespace = 'wc/onshop/v1';

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
                'callback' => function (WP_REST_Request $request) {
                    return $this->create_item($request);
                },
            )
        );
        register_rest_route(
            $this->namespace,
            'user/orders',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => function (WP_REST_Request $request) {
                        // wp_set_current_user((int)$request->get_param('id'));
                        return $this->get_items($request);
                    },
                    'permission_callback' => array($this, 'get_items_permissions_check'),
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
                    'callback' => array($this, 'get_item'),
                    'permission_callback' => array($this, 'get_item_permissions_check'),
                    'args' => array(
                        'context' => $this->get_context_param(array('default' => 'view')),
                    ),
                ),
                'schema' => array($this, 'get_public_item_schema'),
            )
        );
    }
}