<?php
defined( 'ABSPATH' ) || exit;

/**
 * REST API Categories controller class.
 *
 * @extends WC_REST_Product_Categories_Controller
 */
class ONSHOP_REST_Categories_Controller extends WC_REST_Product_Categories_Controller {
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
			'categories',
			[
				'methods'  => WP_REST_Server::READABLE,
				'callback' => [ $this, 'get_items' ],
			]
		);
        register_rest_route(
            $this->namespace,
            'categories/products',
            [
                'methods'  => WP_REST_Server::READABLE,
                'callback' => function() {
                    $categories = get_terms('product_cat');
                    $products = [];
                    foreach ($categories as $category) {
                        $products[$category->slug] = (new WP_Query(array('product_cat' => $category->slug)))->get_posts();
                    }

                    return $products;
                },
            ]
        );
		register_rest_route(
			$this->namespace,
			'categories/(?P<id>\d+)',
			[
				'methods'  => WP_REST_Server::READABLE,
				'callback' => [ $this, 'get_item' ],
			]
		);
	}
}
