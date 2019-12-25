<?php

if (!defined('UPDRAFTCENTRAL_CLIENT_DIR')) die('No access.');

/**
 * Handles Posts Commands
 */
class UpdraftCentral_Posts_Commands extends UpdraftCentral_Commands {

	private $switched = false;

	/**
	 * Function that gets called before every action
	 *
	 * @param string $command    a string that corresponds to UDC command to call a certain method for this class.
	 * @param array  $data       an array of data post or get fields
	 * @param array  $extra_info extrainfo use in the udrpc_action, e.g. user_id
	 *
	 * link to udrpc_action main function in class UpdraftPlus_UpdraftCentral_Listener
	 */
	public function _pre_action($command, $data, $extra_info) {// phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.Found
		// Here we assign the current blog_id to a variable $blog_id
		$blog_id = get_current_blog_id();
		if (!empty($data['site_id'])) $blog_id = $data['site_id'];
	
		if (function_exists('switch_to_blog') && is_multisite() && $blog_id) {
			$this->switched = switch_to_blog($blog_id);
		}
	}
	
	/**
	 * Function that gets called after every action
	 *
	 * @param string $command    a string that corresponds to UDC command to call a certain method for this class.
	 * @param array  $data       an array of data post or get fields
	 * @param array  $extra_info extrainfo use in the udrpc_action, e.g. user_id
	 *
	 * link to udrpc_action main function in class UpdraftPlus_UpdraftCentral_Listener
	 */
	public function _post_action($command, $data, $extra_info) {// phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.Found
		// Here, we're restoring to the current (default) blog before we switched
		if ($this->switched) restore_current_blog();
	}
	
	/**
	 * Method to fetch all posts which depends on parameters passed in site_post.js, on success return posts object
	 *
	 * @param  array $params An array containing the "site_id" and "paged" parameters needed to pull all posts
	 * @return array
	 *
	 * @link {https://developer.wordpress.org/reference/functions/get_posts/}
	 * @link {https://developer.wordpress.org/reference/functions/wp_count_posts}
	 * @link {https://developer.wordpress.org/reference/functions/get_the_author_meta/}
	 * @link {https://developer.wordpress.org/reference/functions/get_the_category}
	 */
	public function get_requested_posts($params) {

		if (empty($params['numberposts'])) return $this->_generic_error_response('numberposts_parameter_missing', $params);

		// check paged parameter; if empty set to 1
		$paged = !empty($params['paged']) ? (int) $params['paged'] : 1;

		$args = array(
			'posts_per_page' => $params['numberposts'],
			'paged' => $paged,
			'post_type' => 'post',
			'post_status' => !empty($params['post_status']) ? $params['post_status'] : 'any'
		);

		if (!empty($params['category'][0])) {
			$term_id = (int) $params['category'][0];
			$args['category__in'] = array($term_id);
		}

		// Using default function get_posts to fetch all posts object from passed parameters
		// Count all fetch posts objects
		// get total fetch posts and divide to number of posts for pagination
		$query = new WP_Query($args);
		$result = $query->posts;

		$count_posts = $query->found_posts;
		$page_count = 0;
		$postdata = array();
		
		if ((int) $count_posts > 0) {
			$page_count = absint((int) $count_posts / (int) $params['numberposts']);
			$remainder = absint((int) $count_posts % (int) $params['numberposts']);

			$page_count = ($remainder > 0) ? ++$page_count : $page_count;
		}
		
		$info = array(
			'page' => $paged,
			'pages' => $page_count,
			'results' => $count_posts
		);

		if (empty($result)) {
			$error_data = array(
				'count' => $page_count,
				'paged' => $paged,
				'info' => $info
			);
			return $this->_generic_error_response('post_not_found_with_keyword', $error_data);
		} else {
			foreach ($result as $post) {
				// initialize our stdclass variable data
				$data = new stdClass();

				// get the author name
				$author = get_the_author_meta('display_name', $post->post_author);

				// get categories associated with the post
				$categories = get_the_category($post->ID);

				$cat_array = array();
				foreach ($categories as $category) {
					$cat_array[] = $category->name;
				}

				// Adding author name and category assigned to the post object
				$data->author_name = $author;
				$data->category_name = $cat_array;
				$data->post_title = $post->post_title;
				$data->post_status = $post->post_status;
				$data->ID = $post->ID;
				$postdata[] = $data;
			}

			$response = array(
				'posts' => $postdata,
				'count' => $page_count,
				'paged' => $paged,
				'categories' => $this->get_requested_categories(array('parent' => 0, 'return_object' => true)),
				'message' => "found_posts_count",
				'params' => $params,
				'info' => $info
			);
		}

		return $this->_response($response);
	}

	/**
	 * Method to fetch post object based on parameter ID, on success return post object
	 *
	 * @param  array $params An array containing the "site_id" and "ID" parameters needed to pull a single post
	 * @return array
	 *
	 * @link {https://developer.wordpress.org/reference/functions/get_post/}
	 * @link {https://developer.wordpress.org/reference/functions/switch_to_blog/}
	 */
	public function get_requested_post($params) {

		// Check parameter ID if empty
		if (empty($params['ID'])) {
			return $this->_generic_error_response('post_id_not_set', array());
		}

		// initialize stdclass variable data
		$data = new stdClass();

		// assign parameter ID to a variable
		$post_id = $params['ID'];

		// using default get_post to get post object by its ID
		$post = get_post($post_id);

		// assign
		$visibility = get_post_status($post_id);

		// Get all associated category of the post

		$categories = $this->get_requested_post_categories($post_id);

		if (is_wp_error($post)) {
			// Return the wp_error
			$error_data = array(
				'visibility' => $visibility,
				'categories' => $categories,
			);
			return $this->_generic_error_response('posts_not_found', $error_data);

		} else {

			$data->ID = $post->ID;
			$data->post_title = $post->post_title;
			$data->post_content = $post->post_content;
			$data->post_status = $post->post_status;
			$data->guid = $post->guid;
			$data->post_date = $post->post_date;

			$response = array(
				'posts' => $data,
				'visibility' => $visibility,
				'categories' => $categories,
				'message' => "found_post"
			);

			return $this->_response($response);
		}

	}

	/**
	 * Method to fetch array of categories loop through all children
	 *
	 * @param  array $params An array containing the "site_id" and "parent" parameters needed to pull a collection of categories
	 * @return array
	 *
	 * @link {https://developer.wordpress.org/reference/functions/get_categories/}
	 * @link {https://developer.wordpress.org/reference/functions/switch_to_blog/}
	 */
	public function get_requested_categories($params) {

		$parent = $params['parent'];

		$categories = $this->get_taxonomy_hierarchy('category', $parent);
		$category = new stdClass();
		$arrobj = array();

		// Add to existing category list | parent->children
		$category->children = $categories;
		$category->default = get_option('default_category');
		$arrobj[] = $category;

		if (!empty($params['return_object'])) {
			return $arrobj;
		}

		return $this->_response($arrobj);
	}

	/**
	 * Method to get category on assigned to a post
	 *
	 * @param  int $post_id The ID of the post where the categories are to be retrieve from
	 * @return array - returns an array of category
	 *
	 * @link {https://developer.wordpress.org/reference/functions/get_categories/}
	 * @link {https://developer.wordpress.org/reference/functions/switch_to_blog/}
	 */
	public function get_requested_post_categories($post_id) {

		$categories = $this->get_taxonomy_hierarchy('category');
		$category = new stdClass();
		$arrobj = array();

		// Add to existing category list | parent->children
		$category->children = $categories;
		$category->default = get_option('default_category');
		
		$arrterms = array();
		$post_terms = get_the_terms($post_id, 'category');
		
		foreach ($category->children as $term) {
			foreach ($post_terms as $post_term) {
				$arrterms[] = $post_term->term_id;
				if ($term->term_id == $post_term->term_id) {
					$term->selected = 1;
				}
			}
		}
		
		$arrobj[] = $category;

		return $arrobj;
	}

	/**
	 * Method used to insert post from UDC to remote site
	 * Using the default wp_insert_post function
	 *
	 * @param  array $post_array Default post_type "post" and basic parameters post_title, post_content, category, post_status
	 * @return array - Containing information whether the process was successful or not.
	 * 					Post ID on success, custom error object on failure.
	 *
	 * @link {https://developer.wordpress.org/reference/functions/wp_insert_post/}
	 * @link {https://developer.wordpress.org/reference/functions/get_current_user_id/}
	 * @link {https://developer.wordpress.org/reference/functions/current_user_can/}
	 * @link {https://developer.wordpress.org/reference/functions/switch_to_blog/}
	 */
	public function insert_requested_post($post_array) {

		// Check if post_title parameter is not set
		if (empty($post_array['post_title'])) {
			return $this->_generic_error_response('post_title_not_set', array());
		}

		// Check if user has capability
		if (!current_user_can('edit_posts')) {
			return $this->_generic_error_response('user_no_permission_to_edit_post', array());
		}

		$author = get_current_user_id();
		$category = get_option('default_category');
		$post_category = empty($post_array['post_category']) ? array($category) : $post_array['post_category'];
		$post_title = $post_array['post_title'];
		$post_content = $post_array['post_content'];
		$post_status = $post_array['post_status'];

		// Create post array
		$post = array(
			'post_title' => wp_strip_all_tags($post_title),
			'post_content' => $post_content,
			'post_author' => $author,
			'post_category' => $post_category,
			'post_status' => $post_status
		);

		// Insert the post array into the database, return post_id on success
		$post_id = wp_insert_post($post);

		// Check if result is false
		if (is_wp_error($post_id)) {
			$error_data = array(
				'message' => __('Error inserting post')
			);

			return $this->_generic_error_response('post_insert_error', $error_data);

		} else {

			$result = array(
				'ID' => $post_id,
				'message' => "post_save_success",
				'status' => $post_status
			);
		}
		
		return $this->_response($result);

	}

	/**
	 * Method used to update post
	 * Using default wp_update_post
	 *
	 * @param  array $params Post array to update specific post by ID
	 * @return array - Containing information whether the process was successful or not.
	 *					Post ID on success, custom error object on failure.
	 *
	 * @link {https://developer.wordpress.org/reference/functions/wp_update_post/}
	 * @link {https://developer.wordpress.org/reference/functions/current_user_can/}
	 * @link {https://developer.wordpress.org/reference/functions/switch_to_blog/}
	 */
	public function update_requested_post($params) {

		// Check post_id parameter if set
		if (empty($params['ID'])) {
			return $this->_generic_error_response('post_id_not_set', array());
		}

		// Check if user has capability
		if (!current_user_can('edit_posts') && !current_user_can('edit_other_posts')) {
			return $this->_generic_error_response('user_no_permission_to_edit_post', array());
		}

		$category = get_option('default_category');
		$post_category = empty($post_array['post_category']) ? array($category) : $post_array['post_category'];

		// Assign post array values
		$post = array(
			'post_title' => wp_strip_all_tags($params['post_title']),
			'post_content' => $params['post_content'],
			'ID' => (int) $params['ID'],
			'post_status' => $params['post_status'],
			'post_category' => $post_category
		);

		// Do post update
		$response = wp_update_post($post);

		$result = array();

		// Check if response is false
		if (is_wp_error($response)) {
			$error_data = array(
				'message' => __('Error updating post')
			);

			return $this->_generic_error_response('post_update_error', $error_data);
		}

		$result = array(
			'ID' => $response,
			'message' => "post_update_success",
			'status' => $params['post_status']
		);

		return $this->_response($result);
	}

	/**
	 * Method used to move post to trash, default action trash
	 * If delete set to true will delete permanently following all wp process
	 * If force_delete is true bypass process and force delete post
	 *
	 * @param  array $params An array containing the ID of the post to delete and a
	 *						couple of flags ("delete" and "force_delete") that will determine whether
	 *						the post will be moved to trash or permanently deleted.
	 * @return array - Containing information whether the process was successful or not. True on success, false on failure.
	 *
	 * @link {https://developer.wordpress.org/reference/functions/wp_trash_post/}
	 * @link {https://developer.wordpress.org/reference/functions/wp_delete_post/}
	 * @link {https://developer.wordpress.org/reference/functions/current_user_can/}
	 * @link {https://developer.wordpress.org/reference/functions/switch_to_blog/}
	 */
	public function trash_requested_post($params) {

		// Check if post_id is set
		if (empty($params['ID'])) {
			return $this->_generic_error_response('post_id_not_set', array());
		}

		// Check user capability
		if (!current_user_can('delete_posts')) {
			return $this->_generic_error_response('user_no_permission_to_delete_post', array());
		}

		$post_id = (int) $params['ID'];
		$forcedelete = !empty($params['force_delete']);
		$trash = false;

		// Here check if force_delete is set from UDC. then permanently delete bypass wp_trash_post.
		if ($forcedelete) {
			$response = wp_delete_post($post_id, $forcedelete);
		} else {
			$response = wp_trash_post($post_id);
			$trash = true;
		}

		$result = array();

		// Check if response if false
		if (is_wp_error($response)) {
			$error_data = array(
				'message' => __('Error deleting post')
			);
			return $this->_generic_error_response('post_delete_error', $error_data);
		}

		$result = array(
			'posts' => $response,
			'error' => false,
		);

		if ($trash) {
			$result["message"] = "post_has_been_moved_to_trash";
			$status["status"] = "trash";
		} else {
			$result["message"] = "post_has_been_deleted_permanently";
			$status["status"] = "delete";
		}

		return $this->_response($result);
	}

	/**
	 * Method used to insert/create a category
	 * Using default taxonomy "category"
	 * Will create slug based on cat_name parameter
	 *
	 * @param  array $params cat_name parameter to insert category
	 * @return array - Containing the result of the process. Category ID, category object, etc.
	 *
	 * @link {https://developer.wordpress.org/reference/functions/wp_insert_category/}
	 * @link {https://developer.wordpress.org/reference/functions/current_user_can/}
	 * @link {https://developer.wordpress.org/reference/functions/switch_to_blog/}
	 */
	public function insert_requested_category($params) {

		/**
		 * Include admin taxonomy.php file to enable us to use all necessary functions for post category
		 */
		$this->_admin_include('taxonomy.php');

		$result = array();

		// Check if parameter cat_name is set
		if (empty($params['cat_name'])) {
			return $this->_generic_error_response('category_name_not_set', array());
		}

		// Check user capability
		if (!current_user_can('manage_categories')) {
			return $this->_generic_error_response('user_no_permission_to_add_category', array());
		}

		// set category array
		$args = array(
			'cat_name' => $params["cat_name"],
			'category_nicename' => sanitize_title($params["cat_name"])
		);

		// Do wp_insert_category
		$term_id = wp_insert_category($args, true);

		if (is_wp_error($response)) {
			$error_data = array(
				'message' => __('Error inserting category')
			);
			return $this->_generic_error_response('category_insert_error', $error_data);
		}

		$category = array(
			'cat_name' => $params["cat_name"],
			'term_id' => $term_id,
			'parent' => 0
		);

		$result = array(
			'ID' => $term_id,
			'category' => $category,
			'error' => false,
			'message' => "category_added"
		);

		return $this->_response($result);
	}

	/**
	 * Method used to update/edit a category by its term_id
	 *
	 * @param  array $param An array containing the "term_id" and "cat_name" parameters needed to edit the category
	 * @return array - Containing information as a result fo the process. True on success, false on failure.
	 *
	 * @link {https://developer.wordpress.org/reference/functions/wp_udpate_category/}
	 * @link {https://developer.wordpress.org/reference/functions/current_user_can/}
	 * @link {https://developer.wordpress.org/reference/functions/switch_to_blog/}
	 */
	public function edit_requested_category($param) {
		/**
		 * Include admin taxonomy.php file to enable us to use all necessary functions for post category
		 */
		$this->_admin_include('taxonomy.php');

		$result = array();

		// Check if term_id is set
		if (empty($param['term_id']) && empty($param['cat_name'])) {
			return $this->_generic_error_response('term_id_or_category_not_set', array($params));
		}

		$term_id = $param['term_id'];
		$cat_name = $param['cat_name'];

		// Check user capability
		if (!current_user_can('manage_categories')) {
			return $this->_generic_error_response('user_no_permission_to_edit_category', array());
		}

		// Do term update
		$response = wp_update_term($term_id, 'category', array('name' => $cat_name, 'slug' => sanitize_title($cat_name)));

		// Check if response is false
		if (is_wp_error($response)) {
			$error_data = array(
				'message' => __('Error updating category')
			);
			return $this->_generic_error_response('category_update_error', $error_data);
		}

		$result = array(
			'category' => $cat_name,
			'message' => "category_updated_to"
		);

		return $this->_response($result);
	}

	/**
	 * Method used to delete a category by term_id
	 *
	 * @param  array $param An array containing the "term_id" needed to delete the category
	 * @return array - Containing information as a result fo the process. True on success, false on failure.
	 *
	 * @link {https://developer.wordpress.org/reference/functions/wp_delete_category/}
	 * @link {https://developer.wordpress.org/reference/functions/current_user_can/}
	 * @link {https://developer.wordpress.org/reference/functions/switch_to_blog/}
	 */
	public function delete_requested_category($param) {
		/**
		 * Include admin taxonomy.php file to enable us to use all necessary functions for post category
		 */
		$this->_admin_include('taxonomy.php');

		$result = array();

		// Check if term_id is set
		if (empty($param['term_id'])) {
			return $this->_generic_error_response('term_id_not_set', array($params));
		}

		$term_id = $param['term_id'];

		// Check user capability
		if (!current_user_can('manage_categories')) {
			return $this->_generic_error_response('user_no_permission_to_delete_category', array());
		}

		// Do wp_delete_category
		$response = wp_delete_category($term_id);

		if (is_wp_error($response)) {
			$error_data = array(
				'message' => __('Error deleting category')
			);
			return $this->_generic_error_response('user_no_permission_to_delete_category', $error_data);
		}

		$result = array(
			'error' => false,
			'message' => "category_deleted"
		);

		return $this->_response($result);
	}

	/**
	 * Method to fetch post search by post title
	 * Will return all posts if no match was found
	 *
	 * @param  array $params An array containing the keyword to be used to search all available posts
	 * @return array - Containing the result of the process. Post object on success, a no matched message on failure.
	 *
	 * @link {https://developer.wordpress.org/reference/functions/get_post/}
	 * @link {https://developer.wordpress.org/reference/functions/switch_to_blog/}
	 */
	public function find_post_by_title($params) {

		$paged = !empty($params['paged']) ? (int) $params['paged'] : 1;

		// Check if keyword is empty or null
		if (empty($params['s'])) {
			return $this->_generic_error_response('search_generated_no_result', array());
		}

		// Set an array with post_type to search only post
		$query_string = array(
			's' => $params['s'],
			'post_type' => 'post',
			'posts_per_page' => $params['numberposts'],
			'paged' => $paged
		);
		$query = new WP_Query($query_string);
		$postdata = array();

		$count_posts = $query->found_posts;
		if ((int) $count_posts > 0) {
			if (empty($params['numberposts'])) return $this->_generic_error_response('numberposts_parameter_missing', $params);

			$page_count = absint((int) $count_posts / (int) $params['numberposts']);
			$remainder = absint((int) $count_posts % (int) $params['numberposts']);

			$page_count = ($remainder > 0) ? ++$page_count : $page_count;
		}

		$info = array(
			'page' => $paged,
			'pages' => $page_count,
			'results' => $count_posts
		);

		$response = array();
		if ($query->have_posts()) {
			
			foreach ($query->posts as $post) {

				// initialize stdclass variable data
				$data = new stdClass();
				
				// get the author name
				$author = get_the_author_meta('display_name', $post->post_author);

				// get categories associated with the post
				$categories = get_the_category($post->ID);

				$cat_array = array();
				foreach ($categories as $category) {
					$cat_array[] = $category->name;
				}

				// Adding author name and category assigned to the post object
				$data->author_name = $author;
				$data->category_name = $cat_array;
				$data->post_title = $post->post_title;
				$data->post_status = $post->post_status;
				$postdata[] = $data;
			}

			$response = array(
				'categories' => $this->get_requested_categories(array('parent' => 0, 'return_object' => true)),
				'posts' => $postdata,
				'n' => $arr,
				'count' => $count_posts,
				'paged' => $paged,
				'message' => "found_post",
				'info' => $info
			);
		} else {
			$error_data = array(
				'count' => $count_posts,
				'paged' => $paged,
				'info' => $info
			);
			return $this->_generic_error_response('post_not_found_with_keyword', $error_data);
		}

		return $this->_response($response);
	}

	/**
	 * Recursively get taxonomy and its children
	 *
	 * @param  string $taxonomy name e.g. category, post_tags
	 * @param  int	  $parent   id of the category to be fetch
	 * @return array  Containing all the categories with children
	 *
	 * @link {https://developer.wordpress.org/reference/functions/get_terms/}
	 */
	public function get_taxonomy_hierarchy($taxonomy, $parent = 0) {

		// only 1 taxonomy
		$taxonomy = is_array($taxonomy) ? array_shift($taxonomy) : $taxonomy;

		// get all direct decendants of the $parent
		$terms = get_terms($taxonomy, array( 'parent' => $parent, 'hide_empty' => false));

		// prepare a new array.  these are the children of $parent
		// we'll ultimately copy all the $terms into this new array, but only after they
		// find their own children
		$children = array();

		// go through all the direct decendants of $parent, and gather their children
		foreach ($terms as $term) {
			// recurse to get the direct decendants of "this" term
			$term->children = $this->get_taxonomy_hierarchy($taxonomy, $term->term_id);
			// add the term to our new array
			$children[] = $term;
		}

		// send the results back to the caller
		return $children;
	}

	/**
	 * Recursively get all taxonomies as complete hierarchies
	 *
	 * @param  array $taxonomies array of taxonomy slugs
	 * @param  int   $parent     starting id to fetch
	 *
	 * @return array Containing all the taxonomies
	 */
	public function get_taxonomy_hierarchy_multiple($taxonomies, $parent = 0) {
		if (!is_array($taxonomies)) {
			$taxonomies = array($taxonomies);
		}
		$results = array();
		foreach ($taxonomies as $taxonomy) {
			$terms = $this->get_taxonomy_hierarchy($taxonomy, $parent);
			if ($terms) {
				$results[$taxonomy] = $terms;
			}
		}
		return $results;
	}
}
