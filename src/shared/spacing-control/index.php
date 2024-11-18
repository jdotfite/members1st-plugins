<?php
/**
 * Spacing Control Component
 *
 * @package Members1st
 * @subpackage Shared
 */

namespace Members1st\Shared\SpacingControl;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
    exit;
}

/**
 * Enqueue component assets.
 */
function enqueue_assets() {
    // Only enqueue if file exists
    $style_path = MEMBERS1ST_BLOCKS_PLUGIN_PATH . 'dist/shared/spacing-control/index.css';
    
    if (file_exists($style_path)) {
        wp_register_style(
            "members1st-blocks-spacing-control",
            plugins_url("dist/shared/spacing-control/index.css", MEMBERS1ST_BLOCKS_PLUGIN_FILE),
            array(),
            filemtime($style_path)
        );
    }
}
add_action("init", __NAMESPACE__ . "\\enqueue_assets");