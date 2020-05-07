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

/**
 * ------------------------------------------------------------------------
 * Custom hooks
 * ------------------------------------------------------------------------
 */
add_action('woocommerce_new_order', function($order_id) {
    $API_KEY = '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';
    $TEMPLATE_ID = 'd-bd53b0a6026549b6a12e16ecd491f5cf';

    $orderData = getOrderDataById($order_id);

    $clientEmail = $orderData['email'];
    $senderEmail = 'leevitgen@gmail.com';
    $supportEmail = 'support@mail.com'; // TODO: Change to real email

    // Email sending for client
    $sendGrid = new SendGrid($API_KEY);
    try {
        $email = new \SendGrid\Mail\Mail();
        $email->setSubject('Order receipt #' . $order_id);
        $email->
        $email->setFrom($senderEmail);
        $toEmails = [
            $clientEmail => 'Client',
            $supportEmail => 'Support'
        ];
        $email->addTos($toEmails);
        $email->setTemplateId($TEMPLATE_ID);
        $email->addDynamicTemplateDatas($orderData);

        $sendGrid->send($email);
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "";
    }
}, 1, 1);

function getOrderDataById($orderId) {
    $orderData = wc_get_order($orderId)->get_data();
    $itemsTotal = number_format(array_reduce($orderData['line_items'], function($acc, $item) {
        return $acc += $item->get_data()['total'];
    }, 0), 2);
    $feeTotal = number_format(array_reduce($orderData['fee_lines'], function($acc, $item) {
        return $acc += $item->get_data()['total'];
    }, 0), 2);
    $shippingTotal = number_format($orderData['shipping_total'], 2);
    $total = number_format($orderData['total'], 2);
    return [
        'itemsTotal' => $itemsTotal,
        '$feeTotal' => $feeTotal,
        'shippingTotal' => $shippingTotal,
        'total' => $total,
        'email' => $orderData['billing']['email'],
        "name" => $orderData['billing']['first_name'] . ' ' . $orderData['billing']['last_name'],
        "address01" => $orderData['billing']['address_1'],
        "address02" => $orderData['billing']['address_2'],
        "city" => $orderData['billing']['city'],
        "state" => $orderData['billing']['state'],
        "zip" => $orderData['billing']['postcode'],
        "phone" => $orderData['billing']['phone'],
        "date" => $orderData['date_created']->date ? date('Y.m.d H:i:s', strtotime($orderData['date_created']->date)) : null,
        'items' => array_map(function($orderItem) {
            $orderItemData = $orderItem->get_data();
            return (object)[
                'text' => $orderItemData['name'],
                'count' => $orderItemData['quantity'],
                'price' => number_format($orderItemData['total'], 2),
            ];
        }, $orderData['line_items'])
    ];
}
