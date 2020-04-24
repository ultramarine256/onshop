<?php

defined( 'ABSPATH' ) || exit;

/**
 * REST API Products controller class.
 *
 * @extends
 */
class ONSHOP_REST_Products_Controller extends WC_REST_Products_Controller {
	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'onshop/v1/';

	/**
	 * Route registration
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'product',
			[
				[
					'methods'  => WP_REST_Server::READABLE,
					'callback' => function ( WP_REST_Request $request ) {
						$query_args = $this->prepare_objects_query( $request );

						$filter_str = $request->get_param( 'filter' );

						if ( ! empty( $filter_str ) ) {
							$filter_labeled = json_decode( $filter_str, true );

							$query_args['tax_query'] = array_merge(
								empty( $query_args['tax_query'] ) ? [] : $query_args['tax_query'],
								$this->get_tax_query( $filter_labeled )
							);
						}

						$query_results = $this->get_objects( $query_args );

						$objects = [];
						foreach ( $query_results['objects'] as $object ) {
							$data      = $this->prepare_object_for_response( $object, $request );
							$objects[] = $this->prepare_response_for_collection( $data );
						}

						$page      = (int) $query_args['paged'];
						$max_pages = $query_results['pages'];

						$response = rest_ensure_response( $objects );
						$response->header( 'X-WP-Total', $query_results['total'] );
						$response->header( 'X-WP-TotalPages', (int) $max_pages );

						$base          = $this->rest_base;
						$attrib_prefix = '(?P<';
						if ( strpos( $base, $attrib_prefix ) !== false ) {
							$attrib_names = array();
							preg_match( '/\(\?P<[^>]+>.*\)/', $base, $attrib_names, PREG_OFFSET_CAPTURE );
							foreach ( $attrib_names as $attrib_name_match ) {
								$beginning_offset = strlen( $attrib_prefix );
								$attrib_name_end  = strpos( $attrib_name_match[0], '>', $attrib_name_match[1] );
								$attrib_name      = substr( $attrib_name_match[0], $beginning_offset, $attrib_name_end - $beginning_offset );
								if ( isset( $request[ $attrib_name ] ) ) {
									$base = str_replace( "(?P<$attrib_name>[\d]+)", $request[ $attrib_name ], $base );
								}
							}
						}
						$base = add_query_arg( $request->get_query_params(), rest_url( sprintf( '/%s/%s', $this->namespace, $base ) ) );

						if ( $page > 1 ) {
							$prev_page = $page - 1;
							if ( $prev_page > $max_pages ) {
								$prev_page = $max_pages;
							}
							$prev_link = add_query_arg( 'page', $prev_page, $base );
							$response->link_header( 'prev', $prev_link );
						}
						if ( $max_pages > $page ) {
							$next_page = $page + 1;
							$next_link = add_query_arg( 'page', $next_page, $base );
							$response->link_header( 'next', $next_link );
						}

						$response->set_data( [
							'items'   => $response->get_data(),
							'filters' => $this->get_filters( empty( $query_args['tax_query'] ) ? [] : $query_args['tax_query'] ),
						] );

						return $response;
					},
					'args'     => $this->get_collection_params(),
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
		register_rest_route(
			$this->namespace,
			'product/(?P<id>\d+)',
			[
				'methods'  => WP_REST_Server::READABLE,
				'callback' => [ $this, 'get_item' ],
			]
		);
	}

	private function get_tax_query( $filter_labeled ) {
		$tax_query = [];

		global $wpdb;

		$labels_used_in_filter = array_map( function ( $el ) {
			return "'" . esc_sql( $el ) . "'";
		}, array_keys( $filter_labeled ) );

		// get all results in one db transaction to load to memory but faster processing
		$terms_with_taxonomy = $wpdb->get_results( "
				SELECT *
				FROM wp_terms inner JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
				    LEFT JOIN wp_woocommerce_attribute_taxonomies ON CONCAT('pa_', wp_woocommerce_attribute_taxonomies.attribute_name) = wp_term_taxonomy.taxonomy
				WHERE wp_woocommerce_attribute_taxonomies.attribute_label in (" . implode( ',', $labels_used_in_filter ) . ") OR
					wp_term_taxonomy.taxonomy = 'product_cat';
			"
		);

		foreach ( $filter_labeled as $attribute_label => $term_labels ) {
			$data_for_label = [];

			if ($attribute_label !== 'category') {
				$data_for_label = array_filter( $terms_with_taxonomy, function ( $row ) use ( $attribute_label ) {
					return $row->attribute_label === $attribute_label;
				} );
			} else {
				$data_for_label = array_filter( $terms_with_taxonomy, function ( $row ) use ( $attribute_label ) {
					return $row->taxonomy === 'product_cat';
				} );
			}

			if ( empty( $data_for_label ) ) {
				continue;
			}

			$term_ids = [];

			foreach ( $term_labels as $term_label ) {
				$rows = array_filter( $data_for_label, function ( $row ) use ( $term_label ) {
					return $row->name === $term_label;
				} );
				$row  = array_pop( $rows );

				$term_ids[] = $row->term_id;
			}

			$tax_query[] = [
				'taxonomy' => array_pop( $data_for_label )->taxonomy,
				'field'    => 'term_id',
				'terms'    => $term_ids
			];
		}

		return $tax_query;
	}

	private function get_filters( $tax_query ) {
		/*
		 * group options object:
		 * [
		 *      group_key => option_ids[]
		 * ]
		 */
		global $wpdb;

		// transform tax_query to groups options object
		$checked_group_with_options_to_match = [];

		foreach ( $tax_query as $tax ) {
			$checked_group_with_options_to_match[ $tax['taxonomy'] ] = array_map( function ( $str ) {
				return (int) $str;
			}, $tax['terms'] );
		}

		$groups_with_options_counters = [];

		$groups_with_options = ONSHOP_MODEL_ProductsFilter::get_all_groups_with_options();

		$records = ONSHOP_MODEL_ProductsFilter::get_all_records_for_filters();


		foreach ( $records as $record ) {
			$product_for_filter = ONSHOP_MODEL_ProductsFilter::adopt_record_to_product_for_filter( $record );

			foreach ( $groups_with_options as $group_key => $group ) {
				foreach ( $group['options'] as $option => $option_value ) {
					if ( $this->match_group_options(
						$this->unite_groups_checked_with_option( $checked_group_with_options_to_match, $group_key, $option ),
						$product_for_filter['groups'] )
					) {
						if ( empty( $groups_with_options_counters[ $group_key ] ) ) {
							$groups_with_options_counters[ $group_key ] = [
								'name'         => $group['group_name'],
								'filter_items' => [
									$option => [
										'name'       => $option_value,
										'is_checked' => $this->is_option_checked( $checked_group_with_options_to_match, $group_key, $option),
										'count'      => 1,
									],
								]
							];
						} else {
							if ( empty( $groups_with_options_counters[ $group_key ]['filter_items'][ $option ] ) ) {
								$groups_with_options_counters[ $group_key ]['filter_items'][ $option ] = [
									'name'       => $option_value,
									'is_checked' => $this->is_option_checked( $checked_group_with_options_to_match, $group_key, $option),
									'count'      => 1,
								];
							} else {
								$groups_with_options_counters[ $group_key ]['filter_items'][ $option ]['count'] ++;
							}
						}
					}
				}
			}
		}

		// TODO min max calc from calculation
		$prices = $wpdb->get_row( "
	     	select min(meta_value) as min_price, max(meta_value) as max_price
			from wp_posts, wp_postmeta
			where wp_posts.ID = wp_postmeta.post_id AND wp_posts.post_type = 'product'
			AND wp_postmeta.meta_key = '_price' AND wp_posts.post_status != 'trash';
	     " );

		$groups_with_options_counters['Price'] = [
			'min' => $prices->min_price,
			'max' => $prices->max_price,
		];

		return $groups_with_options_counters;
	}

	private function unite_groups_checked_with_option( $checked_group_with_options_to_match, $group_key, $option ) {
		$groups_with_options = [];

		// do a copy TODO make it cleaner
		foreach ( $checked_group_with_options_to_match as $checked_group => $checked_option_ids ) {
			$groups_with_options[ $checked_group ] = $checked_option_ids;
		}

		if ( in_array( $group_key, array_keys( $groups_with_options ) ) ) {
			array_push( $groups_with_options[ $group_key ], $option );
		} else {
			$groups_with_options[ $group_key ] = [ $option ];
		}

		return $groups_with_options;
	}

	private function match_group_options( $checked_groups, $record_groups ) {
		foreach ( $checked_groups as $group_key => $option_ids ) {
			if ( in_array( $group_key, array_keys( $record_groups ) ) ) {
				if ( count( array_intersect( $record_groups[ $group_key ], $option_ids ) ) == 0 ) {
					return false;
				}
			} else {
				return false;
			}
		}

		return true;
	}

	private function is_option_checked( $checked_group_with_options_to_match, $group_key, $option) {
		if (empty($checked_group_with_options_to_match[$group_key])) {
			return false;
		}

		return in_array($option, $checked_group_with_options_to_match[$group_key]);
	}
}
