<?php
/**
 * Plugin Name: Members1st
 * Description: Enterprise block collection including custom buttons and features
 * Version: 0.1.2
 * Author: Your Name
 * License: GPL-2.0-or-later
 * Text Domain: members1st
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('MEMBERS1ST_BLOCKS_VERSION', '0.1.2');
define('MEMBERS1ST_BLOCKS_PLUGIN_FILE', __FILE__);
define('MEMBERS1ST_BLOCKS_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('MEMBERS1ST_BLOCKS_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Enqueue block assets.
 */
function members1st_blocks_enqueue_assets() {
    // Custom Button styles
    if (file_exists(MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'build/blocks/custom-button/style-index.css')) {
        wp_enqueue_style(
            'members1st-custom-button',
            MEMBERS1ST_BLOCKS_PLUGIN_URL . 'build/blocks/custom-button/style-index.css',
            [],
            filemtime(MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'build/blocks/custom-button/style-index.css')
        );
    }
    
    // Showcase block styles
    if (file_exists(MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'build/blocks/custom-button-showcase/style-index.css')) {
        wp_enqueue_style(
            'members1st-custom-button-showcase',
            MEMBERS1ST_BLOCKS_PLUGIN_URL . 'build/blocks/custom-button-showcase/style-index.css',
            [],
            filemtime(MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'build/blocks/custom-button-showcase/style-index.css')
        );
    }
}
add_action('wp_enqueue_scripts', 'members1st_blocks_enqueue_assets');

/**
 * Enqueue block editor assets.
 */
function members1st_blocks_enqueue_block_editor_assets() {
    $deps = [
        'wp-blocks',
        'wp-i18n',
        'wp-element',
        'wp-block-editor',
        'wp-components',
        'wp-data',
        'wp-plugins'
    ];

    // Custom Button script
    wp_enqueue_script(
        'members1st-custom-button',
        MEMBERS1ST_BLOCKS_PLUGIN_URL . 'build/blocks/custom-button/index.js',
        $deps,
        filemtime(MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'build/blocks/custom-button/index.js'),
        true
    );

    // Showcase block script
    wp_enqueue_script(
        'members1st-custom-button-showcase',
        MEMBERS1ST_BLOCKS_PLUGIN_URL . 'build/blocks/custom-button-showcase/index.js',
        array_merge($deps, ['members1st-custom-button']),
        filemtime(MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'build/blocks/custom-button-showcase/index.js'),
        true
    );
}
add_action('enqueue_block_editor_assets', 'members1st_blocks_enqueue_block_editor_assets');

// Load block PHP files
require_once MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'src/blocks/custom-button/index.php';
require_once MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'src/blocks/custom-button-showcase/index.php';
require_once MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'src/features/color-mode-toggle/index.php';
require_once MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'src/shared/spacing-control/index.php';