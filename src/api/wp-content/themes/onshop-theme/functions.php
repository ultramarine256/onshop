<?php

require_once get_template_directory() . '/redux-template/onshop-config.php';
function app_info() {
	global $redux_demo;

	return $redux_demo;
}

/**
 * ------------------------------------------------------------------------
 * Include Assets in to WordPress admin panel
 * ------------------------------------------------------------------------
 */

/// login styles
function the_dramatist_custom_login_css() {
	echo '<style type="text/css">
                .login h1 a {
                    background-image: url(/wp-content/themes/onshop-theme/styles/onshop-logo.svg);
                    background-size: 100% 100%;
                    width: auto !important;
                    height: 50px;
                    margin: 0 auto 10px;
                }

                #login #backtoblog {
                    display: none;
                }

                #login #nav {
                    display: none;
                }

                #loginform {
                    padding: 24px;
                }
          </style>';
}

add_action( 'login_head', 'the_dramatist_custom_login_css' );

/// admin CSS & JS
function my_enqueue() {
	wp_enqueue_script( 'my_custom_script', get_template_directory_uri() . '/app/dist/app.js' );
}

add_action( 'admin_enqueue_scripts', 'my_enqueue' );

/**
 * ------------------------------------------------------------------------
 * Roles & Visibility
 * ------------------------------------------------------------------------
 */

// Remove Administrator role from roles list
add_action( 'editable_roles', 'hide_adminstrator_editable_roles' );
function hide_adminstrator_editable_roles( $roles ) {
	if ( ! isset( $roles['administrator'] ) ) {
		unset( $roles['administrator'] );
	}

	// unset( $roles['administrator'] );
	unset( $roles['editor'] );
	unset( $roles['author'] );
	unset( $roles['contributor'] );
	unset( $roles['subscriber'] );

	return $roles;
}

// Hide WordPress menu items for non admin users
function custom_menu_page_removing() {
	if ( wp_get_current_user()->roles && wp_get_current_user()->roles[0] != 'administrator' ) {
		remove_menu_page( 'edit.php' ); // posts
		remove_menu_page( 'themes.php' ); // appereance
		remove_menu_page( 'tools.php' ); // tools
		remove_menu_page( 'edit-comments.php' ); // comments
		remove_menu_page( 'options-general.php' ); // options-general
		remove_menu_page( 'edit.php?post_type=page' ); // comments
        wp_enqueue_style( 'my_custom_style', get_template_directory_uri() . '/styles/client.css' );
	}
}

add_action( 'admin_menu', 'custom_menu_page_removing' );

// Hide WooCommerce menu items for non admin users
function wooninja_remove_items() {
	if ( wp_get_current_user()->roles[0] != 'administrator' ) {
		$remove = array( 'wc-settings', 'wc-status', 'wc-addons', );
		foreach ( $remove as $submenu_slug ) {
			remove_submenu_page( 'woocommerce', $submenu_slug );
		}
	}
}

add_action( 'admin_menu', 'wooninja_remove_items', 99, 0 );

//Change WooCommerce title in Admin side menu
function change_woocommerce_menu_title( $translated ) {
	$translated = str_replace( 'WooCommerce', 'Ecommerce', $translated );

	return $translated;
}

add_filter( 'gettext', 'change_woocommerce_menu_title' );

add_action( 'admin_bar_menu', 'add_links_to_admin_bar', 999 );

//Adding link in onshop-api admin menu
function add_links_to_admin_bar( $admin_bar ) {
	$args = array(
		'parent' => 'site-name',
		'id'     => 'wp-admin-bar-view-store-url',
		'title'  => 'Visit Store',
//		'href'   => app_info()['opt-store-url'],
		'meta'   => false
	);
	$admin_bar->add_node( $args );
}

// add projects admin panel page
function add_projects_menu_item() {
	$user          = wp_get_current_user();
	$jwt = ONSHOP_AUTH::generate_token( [
		"user_id" => $user->ID,
		"email"   => $user->data->user_email,
	] );

	add_menu_page(
		__( 'Projects' ),
		__( 'Projects' ),
		'edit_posts',
		'projects',
		function () use ($jwt) {
			?>
            <style>
                .admin-iframe {
                    width: 98.5%;
                    height: 85vh;
                    margin-top: 20px;
                }
            </style>
            <iframe class="admin-iframe" src="<?php echo ADMIN_URL ?>?token=<?php echo $jwt ?>"></iframe>
			<?php
		},
		'dashicons-schedule',
		60.8
	);
}

add_action( 'admin_menu', 'add_projects_menu_item' );

/**
 * ------------------------------------------------------------------------
 * Rest Api
 * ------------------------------------------------------------------------
 */
add_action( 'rest_api_init', function () {
	register_rest_route( 'app/', 'info', [
		'methods'  => 'GET',
		'callback' => 'app_info',
	] );
} );
/**
 * ------------------------------------------------------------------------
 * Initialize OnShop Api
 * ------------------------------------------------------------------------
 */
require_once( ABSPATH . '/vendor/autoload.php' );
require_once 'autoload.php';

add_action( 'rest_api_init', function () {
	$orders_Controller = new ONSHOP_REST_Orders_Controller();
	$orders_Controller->register_routes();

	$users_Controller = new ONSHOP_REST_Users_Controller();
	$users_Controller->register_routes();

	$categories_Controller = new ONSHOP_REST_Categories_Controller();
	$categories_Controller->register_routes();

	$products_Controller = new ONSHOP_REST_Products_Controller();
	$products_Controller->register_routes();

	$projects_Controller = new ONSHOP_REST_Projects_Controller();
	$projects_Controller->register_routes();
} );

function customerWoocommerceStatuses() {
    register_post_status('wc-in-rent', array(
        'label'                     => _x( 'in-rent', 'Order status', 'woocommerce' ),
        'public'                    => true,
        'exclude_from_search'       => false,
        'show_in_admin_all_list'    => true,
        'show_in_admin_status_list' => true,
        /* translators: %s: number of orders */
        'label_count'               => _n_noop( 'In rent', 'In rent', 'woocommerce' ),
    ));

    register_post_status('wc-waiting-return', array(
        'label'                     => _x( 'waiting', 'Order status', 'woocommerce' ),
        'public'                    => true,
        'exclude_from_search'       => false,
        'show_in_admin_all_list'    => true,
        'show_in_admin_status_list' => true,
        /* translators: %s: number of orders */
        'label_count'               => _n_noop( 'Waiting for return', 'Waiting for return', 'woocommerce' ),
    ));

    register_post_status('wc-returned', array(
        'label'                     => _x( 'returned', 'Order status', 'woocommerce' ),
        'public'                    => true,
        'exclude_from_search'       => false,
        'show_in_admin_all_list'    => true,
        'show_in_admin_status_list' => true,
        /* translators: %s: number of orders */
        'label_count'               => _n_noop( 'Returned', 'Returned', 'woocommerce' ),
    ));
}
add_filter( 'init', 'customerWoocommerceStatuses' );

function addOrderStatuses( $order_statuses ) {
    $order_statuses['wc-in-rent'] = _x( 'Product in rent', 'WooCommerce Order status', 'text_domain' );
    $order_statuses['wc-waiting-return'] = _x( 'Waiting to return', 'WooCommerce Order status', 'text_domain' );
    $order_statuses['wc-returned'] = _x( 'Returned', 'WooCommerce Order status', 'text_domain' );
    return $order_statuses;
}
add_filter( 'wc_order_statuses', 'addOrderStatuses' );

function removeRefundedStatus( $statuses ){
    if( isset( $statuses['wc-refunded'] ) ){
        unset( $statuses['wc-refunded'] );
    }
    return $statuses;
}
add_filter( 'wc_order_statuses', 'removeRefundedStatus' );

add_action( 'admin_menu', function() {
    add_menu_page(
        'My custom menu Settings',
        'Shop',
        'manage_options',
        'test',
        function () {
             echo "<script>window.open('https://blue-shop.xolutionz.com', '_blank')</script>";
        },
        'dashicons-cart',
        25
    );
});


