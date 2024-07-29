<?php
/**
 * Plugin Name: Custom Gutenberg Blocks
 * Plugin URI: https://www.miriamgoldman.ca
 * Description: Plugin to load custom Gutenberg blocks and filters.
 * Version: 1.1.0
 * Author: Miriam Goldman
 *
 * @package mag-blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registers multiple blocks, based on their parent directory.
 */
function register_multiple_blocks() {
	$build_dir = __DIR__ . '/build/blocks';

	foreach ( scandir( $build_dir ) as $result ) {
		$block_location = $build_dir . '/' . $result;

		if ( ! is_dir( $block_location ) || '.' === $result || '..' === $result ) {
			continue;
		}

		register_block_type( $block_location );
	}


}

add_action( 'init', 'register_multiple_blocks' );

/**
 * Registers all custom block filters and style variations.
 */
function register_block_filters() {
    wp_enqueue_script(
        'custom-block-filters',
        plugins_url('/build/filters.js', __FILE__),
        array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
        filemtime(plugin_dir_path(__FILE__) . '/build/filters.js')
    );

	wp_enqueue_script(
        'custom-block-styles',
        plugins_url( '/build/styles.js', __FILE__ ),
        array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' ),
        filemtime( plugin_dir_path( __FILE__ ) . '/build/styles.js' )
    );

	
}
add_action('enqueue_block_editor_assets', 'register_block_filters');


/**
 * Enqueues our custom block styles.
 */
function enqueue_block_styles() {
	wp_enqueue_style(
		'custom-block-style-variations',
		plugins_url( '/build/variations.css', __FILE__),
		[],
		filemtime( plugin_dir_path(__FILE__) . '/build/variations.css')
	);
}
add_action( 'wp_enqueue_scripts', 'enqueue_block_styles' );
