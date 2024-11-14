<?php
/**
 * Plugin Name: Members1st
 * Description: Enterprise block collection including custom buttons and features
 * Version: 0.1.2
 * Author: Your Name
 * License: GPL-2.0-or-later
 * Text Domain: members1st
 */

namespace Members1st;

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
 * Auto enqueue all block assets
 */
function enqueue_block_assets() {
    $blocks_dir = MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'build/blocks';
    if (!is_dir($blocks_dir)) return;

    // Get all block directories
    $blocks = array_filter(scandir($blocks_dir), function($item) use ($blocks_dir) {
        return is_dir($blocks_dir . '/' . $item) && !in_array($item, ['.', '..']);
    });

    // Enqueue each block's style
    foreach ($blocks as $block) {
        // Check for both style.css and style-index.css
        $style_files = [
            $blocks_dir . '/' . $block . '/style.css',
            $blocks_dir . '/' . $block . '/style-index.css'
        ];
        
        foreach ($style_files as $style_file) {
            if (file_exists($style_file)) {
                $style_path = str_replace(MEMBERS1ST_BLOCKS_PLUGIN_PATH, '', $style_file);
                wp_enqueue_style(
                    "members1st-{$block}",
                    MEMBERS1ST_BLOCKS_PLUGIN_URL . $style_path,
                    [],
                    filemtime($style_file)
                );
                break; // Use the first style file found
            }
        }
    }
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_block_assets');
add_action('enqueue_block_assets', __NAMESPACE__ . '\enqueue_block_assets'); // Also load styles in editor

/**
 * Auto enqueue all block editor assets
 */
function enqueue_block_editor_assets() {
    $deps = [
        'wp-blocks',
        'wp-i18n',
        'wp-element',
        'wp-block-editor',
        'wp-components',
        'wp-data',
        'wp-plugins'
    ];

    $blocks_dir = MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'build/blocks';
    if (!is_dir($blocks_dir)) return;

    // Get all block directories
    $blocks = array_filter(scandir($blocks_dir), function($item) use ($blocks_dir) {
        return is_dir($blocks_dir . '/' . $item) && !in_array($item, ['.', '..']);
    });

    // Enqueue each block's script and editor styles
    foreach ($blocks as $block) {
        // Enqueue editor script
        $script_file = $blocks_dir . '/' . $block . '/index.js';
        if (file_exists($script_file)) {
            wp_enqueue_script(
                "members1st-{$block}",
                MEMBERS1ST_BLOCKS_PLUGIN_URL . "build/blocks/{$block}/index.js",
                $deps,
                filemtime($script_file),
                true
            );
        }

        // Enqueue editor styles
        $editor_style_file = $blocks_dir . '/' . $block . '/editor.css';
        if (file_exists($editor_style_file)) {
            wp_enqueue_style(
                "members1st-{$block}-editor",
                MEMBERS1ST_BLOCKS_PLUGIN_URL . "build/blocks/{$block}/editor.css",
                [],
                filemtime($editor_style_file)
            );
        }
    }
}
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets');

/**
 * Auto load all PHP files from blocks and features
 */
function auto_load_components() {
    $src_dir = MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'src';
    
    // Load Features
    $features_dir = $src_dir . '/features';
    if (is_dir($features_dir)) {
        $features = array_filter(scandir($features_dir), function($item) use ($features_dir) {
            return is_dir($features_dir . '/' . $item) && !in_array($item, ['.', '..']);
        });

        foreach ($features as $feature) {
            $feature_file = $features_dir . '/' . $feature . '/index.php';
            if (file_exists($feature_file)) {
                require_once $feature_file;
                do_action('members1st_feature_loaded', $feature);
            }
        }
    }

    // Load Blocks PHP files
    $blocks_dir = $src_dir . '/blocks';
    if (is_dir($blocks_dir)) {
        $blocks = array_filter(scandir($blocks_dir), function($item) use ($blocks_dir) {
            return is_dir($blocks_dir . '/' . $item) && !in_array($item, ['.', '..']);
        });

        foreach ($blocks as $block) {
            $block_file = $blocks_dir . '/' . $block . '/index.php';
            if (file_exists($block_file)) {
                require_once $block_file;
                do_action('members1st_block_loaded', $block);
            }
        }
    }

    do_action('members1st_components_loaded');
}
add_action('plugins_loaded', __NAMESPACE__ . '\auto_load_components');

/**
 * Plugin activation hook
 */
register_activation_hook(__FILE__, __NAMESPACE__ . '\activate');
function activate() {
    // Code to run on activation, if needed.
}

// Add debugging if WP_DEBUG is enabled
if (defined('WP_DEBUG') && WP_DEBUG) {
    add_action('wp_print_styles', function() {
        error_log('=== Members1st Registered Styles ===');
        global $wp_styles;
        foreach($wp_styles->registered as $handle => $style) {
            if (strpos($handle, 'members1st') !== false) {
                error_log($handle . ' => ' . $style->src);
            }
        }
    });
}