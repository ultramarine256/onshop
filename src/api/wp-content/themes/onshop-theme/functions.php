<?php

function load_stylesheets() {
	wp_register_style( 'stylesheet', get_template_directory_uri() . '/dist/app.css', null, 1, 'all' );
	wp_enqueue_style('stylesheet');
}
add_action('wp_enqueue_scripts', 'load_stylesheets');

function load_javascript() {
	wp_register_script('custom', get_template_directory_uri() . '/dist/app.js',null, 1, true );
	wp_enqueue_script('custom');
}
add_action('wp_enqueue_scripts', 'load_javascript');


function admin_style() {
	wp_enqueue_style('admin-styles', get_template_directory_uri().'/src/admin.css');
}
add_action('admin_enqueue_scripts', 'admin_style');

function my_enqueue($hook) {
	// Only add to the edit.php admin page.
	// See WP docs.
//    if ('edit.php' !== $hook) {
//        return;
//    }
	// plugin_dir_url(__FILE__
	wp_enqueue_script('my_custom_script', get_template_directory_uri() . '/src/admin.js');
}
add_action('admin_enqueue_scripts', 'my_enqueue');

function the_dramatist_custom_login_css() {
	echo '<style type="text/css"> 
                .login h1 a {
                    background-image: url(/wp-content/themes/onshop/images/login-logo.svg);
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
add_action('login_head', 'the_dramatist_custom_login_css');


// Add Support
add_theme_support('menus');
add_theme_support('post-thumbnails');

function mytheme_add_woocommerce_support() {
	add_theme_support( 'woocommerce' );
}
add_action( 'after_setup_theme', 'mytheme_add_woocommerce_support' );

// Register some menus
register_nav_menus(
	array(
		'top-menu' => 'Top menu'
	)
);

// Add image sizes
add_image_size('post_image', 1100, 750, true);

// Add a widget
register_sidebar(
	array(
		'name' => 'Page Sidebar',
		'id' => 'page-sidebar',
		'class' => '',
		'before_title' => '<h4>',
		'after_title' => '</h4>'
	)
);

register_sidebar(
	array(
		'name' => 'Blog Sidebar',
		'id' => 'page-sidebar',
		'class' => '',
		'before_title' => '<h4>',
		'after_title' => '</h4>'
	)
);
