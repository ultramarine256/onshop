<?php get_header(); ?>

    <div class="container">
        <div class="row">
            <div class="col-3">
				<?php get_sidebar() ?>
            </div>
            <div class="col-9">
                <h1>
					<?php
					the_title();
					?>
                </h1>

				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
					<?php the_content(); ?>
				<?php endwhile; endif; ?>

				<?php the_post_thumbnail_url( 'post_image' ); ?>

            </div>
        </div>
    </div>

<?php get_footer(); ?>