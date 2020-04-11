<?php

defined( 'ABSPATH' ) || exit;

/**
 * Projects model class.
 *
 * @extends
 */
class ONSHOP_MODEL_ProductsFilter {
	/*
	 * Here introduced terms specific only for filters:
	 * Groups - it is group that has options and available in left sidebar for UI filters
	 *          Groups are come from product_cat and pa_<attribute-name> taxonomies records
	 * Options - is a specific chosen value/option in a scope of a group
	 *          Options are represented as terms related to specific groups.
	 */

	/*
	 * wp_posts.post_type = 'product' are records for products
	 * wp_term_taxonomy.taxonomy LIKE 'pa_%' are records for custom products attribute per attribute value
	 * wp_term_relationships is many-to-many between products and product attributes types
	 * wp_term_taxonomy is many-to-many between product attribute types and products attribute values
	 */

	public static function get_all_groups_with_options() {
		global $wpdb;

		$rows = $wpdb->get_results( "
			SELECT 
					wp_term_taxonomy.taxonomy as group_key,
					COALESCE(wp_woocommerce_attribute_taxonomies.attribute_label, 'category') as group_name,
					wp_terms.term_id as option_id,
					wp_terms.name as option_key
			FROM  wp_terms, wp_term_taxonomy LEFT JOIN wp_woocommerce_attribute_taxonomies
			    		ON CONCAT('pa_', wp_woocommerce_attribute_taxonomies.attribute_name) = wp_term_taxonomy.taxonomy
			WHERE 
				wp_term_taxonomy.term_id = wp_terms.term_id AND (
				    wp_term_taxonomy.taxonomy LIKE 'pa_%' OR wp_term_taxonomy.taxonomy = 'product_cat'
				)
			GROUP BY option_id;
		" );

		$groups_with_options = [];

		foreach ( $rows as $row ) {
			if ( empty( $groups_with_options[ $row->group_key ] ) ) {
				$groups_with_options[ $row->group_key ] = [
					'group_key'  => $row->group_key,
					'group_name' => $row->group_name,
					'options'    => [
						$row->option_id => $row->option_key
					]
				];
			} else {
				$groups_with_options[ $row->group_key ]['options'][ $row->option_id ] = $row->option_key;
			}
		}

		return $groups_with_options;
	}

	public static function get_all_records_for_filters() {
		global $wpdb;

		$rows = $wpdb->get_results( "
			SELECT
			        wp_posts.id as product_id,
					GROUP_CONCAT(
					    COALESCE(wp_term_taxonomy.taxonomy, 'category'),
					    '|',
					    wp_terms.term_id
					) as group_option_ids
			FROM
			     wp_posts, wp_term_relationships, wp_terms, wp_term_taxonomy
			WHERE
			      wp_posts.id = wp_term_relationships.object_id AND
			      wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id AND
			      wp_term_taxonomy.term_id = wp_terms.term_id AND (
				    wp_term_taxonomy.taxonomy LIKE 'pa_%' OR wp_term_taxonomy.taxonomy = 'product_cat'
				  ) AND
			      wp_posts.post_status != 'trash'
			GROUP BY wp_posts.id
			ORDER BY wp_posts.id
		" );

		return $rows;
	}

	public static function adopt_record_to_product_for_filter( $record ) {
		$groups = [];

		$group_options = explode(',', $record->group_option_ids);

		foreach ($group_options as $group_option) {
			$group_key = explode('|', $group_option)[0];
			$option_id = explode('|', $group_option)[1];

			if (empty($groups[$group_key])) {
				$groups[$group_key] = [$option_id];
			} else {
				array_push($groups[$group_key], $option_id);
			}
		}

		return [
			'product_id' => $record->product_id,
			'groups' => $groups,
		];
	}
}
