<?php

/*
Plugin Name: FanaByte Search In Category
Plugin URI: https://fanabyte.com/themes-plugins/plugins/fanabyte-plugins/fanabyte-search-in-category/
Description: This plugin adds a search feature to content and product categories
Version: 1.3
Author: FanaByte
Author URI: https://fanabyte.com
Text Domain: fanabyte-search-in-category
Domain Path: /languages
*/

class fanabyteSearchInCategory {
	private $_options = array(
		'categoriesTab' => array(
			'name' => 'Taxonomy(Categories) Search Tab',
			'value' => '1',
			'description' => 'Adds a search tab to taxonomies after Most Used'
		),
		'categoriesInField' => array(
			'name' => 'Taxonomy(Categories) In-field search',
			'value' => '0',
			'description' => 'Adds a search field after the taxonomy title that filters the list below'
		),
		'author' => array(
			'name' => 'Dropdowns(author) search',
			'value' => '0',
			'description' => 'Adds a search field after the dropdown that filters the dropdown elements'
		),
		'showSubcategories' => array(
			'name' => 'Show subcategories when results found',
			'value' => '0',
			'description' => 'If a found category has subcategories, those will be shown'
		)
	);

	private $_optionsGroup = 'fanabyte-search-in-category_options';

	private $_optionsPrefix = 'fanabyte-search-in-category_';

	function __construct() {
		load_plugin_textdomain( 'fanabyte-search-in-category', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' ); 

		add_action('admin_init', array($this, 'register_settings'));
		add_action('admin_menu', array($this, 'admin_menu' ));
		add_action('admin_footer', array($this, 'set_lang_constants'));
	}

	function admin_menu() {
		add_options_page(
			__('FanaByte Search In Category Settings', 'fanabyte-search-in-category'),
			__('Category search', 'fanabyte-search-in-category'),
			'manage_options',
			'fanabyte-search-in-category_settings',
			array(
				$this,
				'settings_page'
			)
		);
	}

	/**
	 * Goes trough the options and adds loads scripts where needed
	 *
	 * @return void
	 */
	function load_scripts(){
		//First add the main js
		add_action( 'admin_enqueue_scripts', function($hook){
			if ( 'post.php' != $hook && $hook != 'post-new.php' )
			{
				return;
			}	
			
			wp_register_script($this->_optionsPrefix.'main_js', site_url().'/wp-content/plugins/fanabyte-search-in-category/js/adminSearch.js');
			wp_enqueue_script($this->_optionsPrefix.'main_js', false, array(), false, true);
		});
		foreach ( $this->_options as $key => $option ){
			if ( $option['value'] === '1' ){
				add_action( 'admin_enqueue_scripts', function($hook) use ($key){
					if ( 'post.php' != $hook && $hook != 'post-new.php' )
					{
						return;
					}	
					
					wp_register_script($this->_optionsPrefix.$key, site_url().'/wp-content/plugins/fanabyte-search-in-category/js/'.$key.'.js');
					wp_enqueue_script($this->_optionsPrefix.$key, false, array(), false, true);
				});
			}
		}
	}

	/**
	 * Iterates trough options and checks if they exist
	 * If the option exists, it loads the value, otherwise creates the option
	 *
	 * @return void
	 */
	function register_settings() {
		foreach( $this->_options as $key => $option ){
			register_setting( $this->_optionsGroup, $this->_optionsPrefix.$key );
			$value = get_option($this->_optionsPrefix.$key);
			if ( $value === false ){
				add_option($this->_optionsPrefix.$key, $option['value']);
			} else {
				$this->_options[$key]['value'] = $value;
			}
		}
		$this->load_scripts();
	}

	function settings_page() {
		include_once('settings.php');
	}

	function set_lang_constants() {
	?>
  	<script>
		  jQuery(document).ready(function(){
			if (typeof fanabyteSearchInCategory != 'undefined') {
				fanabyteSearchInCategory.lang.search = '<?php _e("Search", 'fanabyte-search-in-category'); ?>';
				fanabyteSearchInCategory.lang.reset = '<?php _e("Reset", 'fanabyte-search-in-category') ?>';
				fanabyteSearchInCategory.lang.resetSearchResults = '<?php _e("Reset Search Results", 'fanabyte-search-in-category'); ?>';
				fanabyteSearchInCategory.lang.go = '<?php _e("Go", 'fanabyte-search-in-category'); ?>';
			}
		  });
	</script>
  	<?php
	}
}

new fanabyteSearchInCategory;