<?php 

function enqueue_tailwind(){
    wp_enqueue_style('tailwind-css',get_template_directory_uri().'/src/output.css');
}

add_action('wp_enqueue_scripts', 'enqueue_tailwind');

add_filter( 'block_categories_all', 'misha_new_block_category' );

