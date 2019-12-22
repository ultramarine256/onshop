<?php
/**
 Template Name: Shop Page
 */
?>

<?php get_header(); ?>

<div class="container">
	<div class="row">

		<div class="col-12">
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
