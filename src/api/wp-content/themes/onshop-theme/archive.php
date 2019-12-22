<?php get_header(); ?>

    <div class="container">
        <div class="row">
            <div class="col-3">
				<?php get_sidebar() ?>
            </div>
            <div class="col-9">
				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                    <div class="blog-post">
                        <a href="<?php the_permalink(); ?>">
                            <h1><?php the_title(); ?></h1>
                        </a>

						<?php if ( has_post_thumbnail() ) { ?>
                            <img src="<? the_post_thumbnail_url( 'post_image' ); ?>" class="img-fluid mb-5">
						<?php } ?>

						<?php the_excerpt(); ?>
                    </div>
				<?php endwhile; endif; ?>
            </div>
        </div>
    </div>

<?php get_footer(); ?>