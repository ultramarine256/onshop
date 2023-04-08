<?php

if ( ! class_exists( 'Redux' ) ) {
	return;
}

$opt_name = "redux_demo";

$args = array(
	'menu_title'           => __( 'Shop Options', 'shop-options' ),
	'page_title'           => __( 'Shop Options', 'shop-options' ),
	'page_icon'            => 'icon-themes',
	'page_slug'            => '_options',
	'dev_mode'             => false,
	'show_import_export'   => false,
	'show_options_object'   => false
);

Redux::setArgs( $opt_name, $args );

Redux::setSection( $opt_name, array(
	'title'  => __( 'Contacts', 'redux-framework-demo' ),
	'id'     => 'contacts',
	'desc'   => __( 'Basic field with no subsections.', 'redux-framework-demo' ),
	'icon'   => 'el el-home',
	'fields' => array(
		array(
			'id'       => 'opt-email',
			'type'     => 'text',
			'title'    => __( 'Email', 'redux-framework-demo' ),
			'subtitle' => __( 'Your shop email address', 'redux-framework-demo' )
		),
		array(
			'id'       => 'opt-address',
			'type'     => 'text',
			'title'    => __( 'Address', 'redux-framework-demo' ),
			'subtitle' => __( 'Example subtitle.', 'redux-framework-demo' )
		),
		array(
			'id'       => 'opt-phone-1',
			'type'     => 'text',
			'title'    => __( 'Phone #1', 'redux-framework-demo' ),
			'subtitle' => __( 'Example subtitle.', 'redux-framework-demo' )
		),
		array(
			'id'       => 'opt-phone-2',
			'type'     => 'text',
			'title'    => __( 'Phone #2', 'redux-framework-demo' ),
			'subtitle' => __( 'Example subtitle.', 'redux-framework-demo' )
		),
        array(
            'id'       => 'email-sender',
            'type'     => 'text',
            'title'    => __( 'Email sender', 'redux-framework-demo' ),
            'subtitle' => __( '', 'redux-framework-demo' )
        ),
        array(
            'id'       => 'email-manager',
            'type' => 'multi_text',
            'title' => __('Email manager', 'redux-framework-demo'),
            'subtitle' => __( '', 'redux-framework-demo' ),
        ),
	)
));

Redux::setSection( $opt_name, array(
    'title'  => __( 'Promo', 'redux-framework-demo' ),
    'id'     => 'promo',
    'desc'   => __( 'Promo messages.', 'redux-framework-demo' ),
    'icon'   => 'el el-home',
    'fields' => array(
        array(
            'id'       => 'opt-promo1',
            'type'     => 'text',
            'title'    => __( 'Promo 1', 'redux-framework-demo' ),
            'subtitle' => __( '', 'redux-framework-demo' )
        ),
        array(
            'id'       => 'opt-promo2',
            'type'     => 'text',
            'title'    => __( 'Promo 2', 'redux-framework-demo' ),
            'subtitle' => __( '', 'redux-framework-demo' )
        ),
        array(
            'id'       => 'opt-delivery-fee',
            'type'     => 'text',
            'title'    => __( 'Delivery fee', 'redux-framework-demo' ),
            'subtitle' => __( '', 'redux-framework-demo' )
        ),
        array(
            'id'       => 'opt-delivery-duration',
            'type'     => 'text',
            'title'    => __( 'Delivery duration', 'redux-framework-demo' ),
            'subtitle' => __( '', 'redux-framework-demo' )
        ),
    )
));

Redux::setSection( $opt_name, array(
	'title'  => __( 'Theme', 'redux-framework-demo' ),
	'id'     => 'settings',
	'desc'   => __( 'Basic field with no subsections.', 'redux-framework-demo' ),
	'icon'   => 'el el-home',
	'fields' => array(
		array(
			'id'       => 'opt-title',
			'type'     => 'text',
			'title'    => __( 'App Title', 'redux-framework-demo' ),
			'subtitle' => __( 'Logo', 'redux-framework-demo' )
		),
		array(
			'id'       => 'opt-logo-url',
			'type'     => 'text',
			'title'    => __( 'App Logo', 'redux-framework-demo' ),
			'subtitle' => __( 'Logo image URL.', 'redux-framework-demo' )
		),
		array(
			'id'       => 'opt-store-url',
			'type'     => 'text',
			'title'    => __( 'Store URL', 'redux-framework-demo' ),
			'subtitle' => __( 'URL of our actual Store', 'redux-framework-demo' )
		)
	)
));

