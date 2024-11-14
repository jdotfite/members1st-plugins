<?php
/**
 * Register the hero-full block
 */
if (!defined('ABSPATH')) {
    exit;
}

function members1st_register_hero_full_block() {
    // Register the block using the block.json file
    register_block_type( __DIR__ . '/block.json' );
}
add_action('init', 'members1st_register_hero_full_block');