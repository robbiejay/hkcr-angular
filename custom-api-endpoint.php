add_action( 'post_updated', 'run_my_cron_job');
function run_my_cron_job(){
 wp_schedule_single_event( time(), 'my_cron' );
 spawn_cron();
}
add_action( 'my_cron','update_post_cache_file' );

function update_post_cache_file() {
  global $wpdb;
  $query = "
    SELECT p.*,
    GROUP_CONCAT(pm.meta_key ORDER BY pm.meta_key DESC SEPARATOR
    '||')
    as meta_keys,
    GROUP_CONCAT(pm.meta_value ORDER BY pm.meta_key DESC SEPARATOR
    '||')
    as meta_values
    FROM $wpdb->posts p
    LEFT JOIN $wpdb->postmeta pm on pm.post_id = p.ID
    WHERE p.post_type = 'post' and p.post_status = 'publish'
    GROUP BY p.ID
  ";
  $posts = $wpdb->get_results($query);

  function map_meta($a){
    $a->meta = array_combine(
      explode('||',$a->meta_keys),
      array_map('maybe_unserialize',explode('||',$a->meta_values))
    );
    unset($a->meta_keys);
    unset($a->meta_values);
    return $a;
 }
 $products = array_map('map_meta',$posts);

 $_wfs_cache = [];
 foreach($posts as $post){
   $_wfs_cache[$post->ID]= array(
     'title' => $post->post_title,
     'content' =>  $product->post_content,
     'date' => strtotime($post->post_modified),
   );
  }
  file_put_contents(plugin_dir_path( __FILE__ ) .
    'data/_wfs_cache.json'  , json_encode($_wfs_cache) );
 }

}
