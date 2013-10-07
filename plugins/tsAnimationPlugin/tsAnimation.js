(function($) {
    jQuery.fn.tsAnimation = function(){
        
        return this.each(function(){
            var browserWidth = window.innerWidth;
            var browserHeight = window.innerHeight;
            var $this = $(this);
            initElementAnimation();
            
            
            function initElementAnimation(){
            /* -- backend Class = .slide_right --  */
            $this.find(".slide_right").each(function(){
                animateElement($(this));
            });
	
            /* -- backend Class = .slide_left --  */
            $this.find(".slide_left").each(function(){
                animateElement($(this));
            });
	
            /* -- backend Class = .fade_in --  */
            $this.find(".fade_in").each(function(){
                fadeElement($(this));
            });
	
            /* -- backend Class = .position --  */
            $this.find(".position").each(function(){
                animateElement($(this));
            });
            }

            //Eigentliche Elementanimationsfunktion

            function animateElement(e){
                var orientationY = e.attr("element_orientation_y");
                var orientationX = e.attr("element_orientation_x");
                var versatzX = e.attr("animationtarget_x");
                var versatzY = e.attr("animationtarget_y");
                versatzY = 0;
	
                switch (orientationX) {
                    case "left": 
                        var newPositionX = parseInt(versatzX); 
                    break;
                    case "right": 
                        var newPositionX = ((browserWidth) - (e.width()))+ parseInt(versatzX); 
                    break;
                    case "center": 
                        var newPositionX = ((browserWidth / 2) - (e.width() / 2)) + parseInt(versatzX); 
                    break;
                    default: 
                }
                switch (orientationY) {
                    case "top": 
                        var newPositionY = parseInt(versatzY); 
                    break;
                    case "bottom": 
                        var newPositionY = ((browserHeight) - (e.height()))- parseInt(versatzY); 
                    break;
                    case "middle": 
                        var newPositionY = ((browserHeight / 2) - (e.height() / 2)) - parseInt(versatzY); 
                    break;
                    default: 
                }	
                e.css({"-webkit-transform":"translate3d("+newPositionX+"px, "+newPositionY+"px, 0px)","opacity":"1"});
            }
            //Eigentliche Blendfunktion
            function fadeElement(e){
                //
                if(jQuery.browser.msie){
                    
                    e.fadeIn();
                    e.css('opacity','1.0');
                }else{
                    e.css({'opacity':'1','-webkit-transition-duration':'0.5','-webkit-transition-property':'opacity'});
                }
            }
        });
    }
})(jQuery);