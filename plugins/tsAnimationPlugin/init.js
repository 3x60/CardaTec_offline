if(typeof $ts != "object"){
    $ts = jQuery.noConflict();
}
$ts(document).ready(function(){
    //Globale Variablen
    var jWindow = window;
//    var browserWidth = window.innerWidth;
//    var browserHeight = window.innerHeight;
    $ts('.fade_in,.slide_right,.slide_left,.position').each(function(){
        $ts(this).tsAnimation();
    });
    $ts('.mod_article').each(function(){
        $ts(this).tsAnimation();
    });
});
