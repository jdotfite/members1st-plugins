<?php
/**
 * Color Mode Toggle Feature
 *
 * @package Members1st
 * @subpackage Features
 */

namespace Members1st\Features\ColorModeToggle;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
    exit;
}

/**
 * Enqueue editor assets.
 */
function enqueue_editor_assets() {
    $screen = get_current_screen();
    
    if ($screen && $screen->is_block_editor) {
        wp_enqueue_script(
            "members1st-color-mode-toggle",
            plugins_url("dist/features/color-mode-toggle/index.js", MEMBERS1ST_BLOCKS_PLUGIN_FILE),
            array("wp-plugins", "wp-element", "wp-edit-post"),
            filemtime(MEMBERS1ST_BLOCKS_PLUGIN_PATH . "dist/features/color-mode-toggle/index.js"),
            true
        );
    }
}
add_action("admin_enqueue_scripts", __NAMESPACE__ . "\\enqueue_editor_assets");
