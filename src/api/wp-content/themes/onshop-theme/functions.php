<?php

function load_javascript() {
	wp_register_script( 'custom', get_template_directory_uri() . '/app/dist/app.js', null, 1, true );
	wp_enqueue_script( 'custom' );
}

add_action( 'admin_enqueue_scripts', 'load_javascript' );

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


function mytheme_add_woocommerce_support() {
	add_theme_support( 'woocommerce' );
}

add_action( 'after_setup_theme', 'mytheme_add_woocommerce_support' );

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

// Remove Administrator role from roles list
function custom_menu_page_removing() {
	if (wp_get_current_user()->roles[0] != 'administrator') {
		remove_menu_page( 'edit.php' ); // posts
		remove_menu_page( 'themes.php' ); // appereance
		remove_menu_page( 'tools.php' ); // tools
		remove_menu_page( 'edit-comments.php' ); // comments
		remove_menu_page('edit.php?post_type=page'); // comments

//		echo '<style type="text/css">
//                 #wp-admin-bar-comments,
//                 #wp-admin-bar-new-content,
//
//                 #wp-admin-bar-wp-logo,
//
//                 #dashboard_right_now,
//                 #dashboard_activity,
//                 #side-sortables
//                 {
//                   display: none;
//                 }
//             </style>';

	}
}

add_action( 'admin_menu', 'custom_menu_page_removing' );


require_once get_template_directory() . '/redux-template/onshop-config.php';


function my_awesome_func() {
//	$posts = get_posts( array(
//		'author' => $data['id'],
//	) );
//
//	if ( empty( $posts ) ) {
//		return null;
//	}

	global $redux_demo;

	return $redux_demo;
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'app/', 'info', array(
		'methods' => 'GET',
		'callback' => 'my_awesome_func',
	) );
} );