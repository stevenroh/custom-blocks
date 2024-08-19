<?php

/**
 * Plugin Name:       Custom blocks
 * Description:
 * Version:           0.0.1
 * Author:            Steven Roh
 * Text Domain:       rohs-custom-blocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function rohs_register_blocks()
{
    register_block_type(__DIR__ . '/build/blocks/filterable-posts-swiper');
    register_block_type(__DIR__ . '/build/blocks/filterable-posts-modal');
}
add_action('init', 'rohs_register_blocks');

// function rohs_add_block_category($categories)
// {
//     // Adding a new category.
//     $categories[] = array(
//         'slug' => 'rohs',
//         'title' => 'rohs',
//     );

//     return $categories;
// }
// add_filter('block_categories_all', 'rohs_add_block_category');
