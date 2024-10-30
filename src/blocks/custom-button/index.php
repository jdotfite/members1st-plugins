<?php
/**
 * Custom Button Block
 *
 * @package Members1st
 * @subpackage Blocks
 */

namespace Members1st\Blocks\CustomButton;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
    exit;
}

/**
 * Enqueue block assets for both editor and frontend.
 */
function enqueue_assets() {
    $dir = dirname(__FILE__);
    $block_json = json_decode(file_get_contents("$dir/block.json"), true);

    register_block_type($block_json["name"], array(
        "editor_script" => "members1st-custom-button",
        "editor_style"  => "members1st-custom-button-editor",
        "style"         => "members1st-custom-button",
        "view_script"   => "members1st-custom-button-view"
    ));
}
add_action("init", __NAMESPACE__ . "\\enqueue_assets");
