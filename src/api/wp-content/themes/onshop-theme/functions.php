<?php

/**
 * ------------------------------------------------------------------------
 * Include Assets in to WordPress admin panel
 * ------------------------------------------------------------------------
 */

/// login styles
function the_dramatist_custom_login_css() {
	echo '<style type="text/css"> 
                .login h1 a {
                    background-image: url(/wp-content/themes/onshop-theme/app/src/assets/img/onshop-logo.svg);
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
	wp_enqueue_script('my_custom_script', get_template_directory_uri() . '/app/dist/app.js');
}
add_action('admin_enqueue_scripts', 'my_enqueue');

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
	if (wp_get_current_user()->roles && wp_get_current_user()->roles[0] != 'administrator') {
		remove_menu_page( 'edit.php' ); // posts
		remove_menu_page( 'themes.php' ); // appereance
		remove_menu_page( 'tools.php' ); // tools
		remove_menu_page( 'edit-comments.php' ); // comments
		remove_menu_page( 'options-general.php' ); // options-general
		remove_menu_page('edit.php?post_type=page'); // comments
		wp_enqueue_script('my_custom_script', get_template_directory_uri() . '/app/dist/test.js');
	}
}
add_action( 'admin_menu', 'custom_menu_page_removing' );

// Hide WooCommerce menu items for non admin users
function wooninja_remove_items() {
	if (wp_get_current_user()->roles[0] != 'administrator') {
		$remove = array( 'wc-settings', 'wc-status', 'wc-addons', );
		foreach ( $remove as $submenu_slug ) {
			remove_submenu_page( 'woocommerce', $submenu_slug );
		}
	}
}
add_action( 'admin_menu', 'wooninja_remove_items', 99, 0 );

/**
 * ------------------------------------------------------------------------
 * Rest Api
 * ------------------------------------------------------------------------
 */
require_once get_template_directory() . '/redux-template/onshop-config.php';
function app_info() {
	global $redux_demo;
	return $redux_demo;
}
add_action('rest_api_init', function () {
	register_rest_route( 'app/', 'info', array(
		'methods' => 'GET',
		'callback' => 'app_info',
	));
});
/**
 * ------------------------------------------------------------------------
 * Initialize OnShop Api
 * ------------------------------------------------------------------------
 */
require_once 'autoload.php';

add_action('rest_api_init', function () {
    $orders_Controller =     new ONSHOP_REST_Orders_Controller();
    $orders_Controller->register_routes();
    $users_Controller =      new ONSHOP_REST_Users_Controller();
    $users_Controller->register_routes();
    $categories_Controller = new ONSHOP_REST_Categories_Controller();
    $categories_Controller->register_routes();
    $products_Controller =   new ONSHOP_REST_Products_Controller();
    $products_Controller->register_routes();
});