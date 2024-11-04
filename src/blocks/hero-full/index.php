<?php
/**
 * Plugin Name: Hero Full
 * Description: A customizable hero section block with background image, opacity controls, and custom heading styles.
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: hero-full
 */

if (!defined('ABSPATH')) {
    exit;
}

function hero_block_register() {
    register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'hero_block_register' );

// Register custom button block as a dependency
function hero_block_register_dependencies() {
    wp_register_script(
        'custom-button',
        plugins_url('members1st/build/blocks/custom-button/index.js'),
        array('wp-blocks', 'wp-element', 'wp-editor')
    ); 
}
add_action('init', 'hero_block_register_dependencies');
