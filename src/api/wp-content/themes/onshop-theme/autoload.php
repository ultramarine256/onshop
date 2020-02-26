<?php

spl_autoload_register( 'onshop_auth_autoloader' );

function onshop_auth_autoloader( $class_name ) {
	if ( false !== strpos( $class_name, 'ONSHOP_AUTH' ) ) {
		$classes_dir = realpath( plugin_dir_path( __FILE__ ) ) . DIRECTORY_SEPARATOR . 'rest' . DIRECTORY_SEPARATOR;
		$class_file  = 'class' . '-' . str_replace( '_', '-', $class_name ) . '.php';
		$class_file  = strtolower( $class_file );

		require_once $classes_dir . $class_file;
	}
}

spl_autoload_register( 'onshop_controllers_autoloader' );

function onshop_controllers_autoloader( $class_name ) {
	if ( false !== strpos( $class_name, 'ONSHOP_REST' ) ) {
		$classes_dir = realpath( plugin_dir_path( __FILE__ ) )
		               . DIRECTORY_SEPARATOR . 'rest' . DIRECTORY_SEPARATOR . 'endpoints' . DIRECTORY_SEPARATOR;
		$class_file  = 'class' . '-' . str_replace( '_', '-', $class_name ) . '.php';
		$class_file  = strtolower( $class_file );

		require_once $classes_dir . $class_file;
	}
}

spl_autoload_register( 'onshop_models_autoloader' );

function onshop_models_autoloader( $class_name ) {
	if ( false !== strpos( $class_name, 'ONSHOP_MODEL' ) ) {
		$classes_dir = realpath( plugin_dir_path( __FILE__ ) )
		               . DIRECTORY_SEPARATOR . 'models' . DIRECTORY_SEPARATOR;
		$class_file  = 'class' . '-' . str_replace( '_', '-', $class_name ) . '.php';
		$class_file  = strtolower( $class_file );
		require_once $classes_dir . $class_file;
	}
}
