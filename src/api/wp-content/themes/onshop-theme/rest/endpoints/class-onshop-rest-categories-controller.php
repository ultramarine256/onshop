<?php
defined('ABSPATH') || exit;

/**
 * REST API Categories controller class.
 *
 * @extends
 */
class ONSHOP_REST_Categories_Controller extends WC_REST_Product_Categories_Controller
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
            'categories',
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array($this, 'get_items'),
            )
        );
        register_rest_route(
            $this->namespace,
            'categories/(?P<id>\d+)',
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array($this, 'get_item'),
            )
        );
    }
}

