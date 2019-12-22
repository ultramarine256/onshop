<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>OnShop</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'test' ); ?>>

<header>
    <!--    <div class="container d-flex align-items-center justify-content-between">-->
    <!--        --><?php
	//	    wp_nav_menu(
	//		    array(
	//			    'theme_location' => 'top-menu',
	//                'menu_class' => 'd-flex'
	//		    )
	//	    );
	//	    ?>
    <!--    </div>-->

    <nav class="navbar navbar-expand-md navbar-light shadow-sm border-bottom mb-4">
        <a class="navbar-brand" href="/">
            <img src="../../../wp-content/themes/onshop/images/menu-logo.svg" style="height: 16px;">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/shop">Shop</a>
                </li>
            </ul>
            <form class="form-inline mt-2 mt-md-0">
                <a class="btn btn-outline-primary" href="/wp-admin">Login</a>
            </form>
        </div>
    </nav>
</header>