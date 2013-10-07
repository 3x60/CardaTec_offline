
/**
 * touch events
*/

jQuery.event.special.touchclick = {
                setup: function (data, namespaces) {
                    var elem = this, $elem = jQuery(elem);

                    if (window.Touch) {
                        $elem.bind('touchstart', jQuery.event.special.touchclick.onTouchStart);
                        $elem.bind('touchmove', jQuery.event.special.touchclick.onTouchMove);
                        $elem.bind('touchend', jQuery.event.special.touchclick.onTouchEnd);
                    } else {
                        
                        
                        function touchclick_up(event) {
                        
                    	   if (!elem.moved && elem.down) {
                    	   
                    	   	event.type = "touchclick";
							jQuery.event.handle.apply(elem, arguments);
							
                    	   }
                    	   
                    	   elem.down=false;
                    	   
               	    	}

                        
                        $elem.bind('mousedown', jQuery.event.special.touchclick.down);
                        $elem.bind('mousemove', jQuery.event.special.touchclick.onTouchMove);
                        $elem.bind('click',function(e){	e.preventDefault();});
                           
                        jQuery(document).bind('mouseup', touchclick_up);
                        
                                                
                    }
                },

                down: function (event) {
             
                	  this.moved = false;
                	  this.down=true;
                	  event.preventDefault();
                },

                teardown: function (namespaces) {
                    if (window.Touch) {
                        //$elem.unbind('touchstart', jQuery.event.special.touchclick.onTouchStart);
                        //$elem.unbind('touchmove', jQuery.event.special.touchclick.onTouchMove);
                        //$elem.unbind('touchend', jQuery.event.special.touchclick.onTouchEnd);
                    } else {
                        //$elem.unbind('mousedown', jQuery.event.special.touchclick.down);
                        //$elem.unbind('mousemove', jQuery.event.special.touchclick.onTouchMove);
                        //jQuery(document).unbind('mouseup', elem.touchclick_up);
                    }
                },

                onTouchStart: function (e) {
                    this.moved = false;
                },

                onTouchMove: function (e) {
                    this.moved = true;
                },

                onTouchEnd: function (event) {
                    if (!this.moved) {
                        event.type = "touchclick";
                        jQuery.event.handle.apply(this, arguments);
                    }
                }
            };
            
            

jQuery.event.special.touchdown = {
                setup: function (data, namespaces) {
                    var elem = this, $elem = jQuery(elem);

                    if (window.Touch) {
                        $elem.bind('touchstart', jQuery.event.special.touchdown.onTouchStart);
                    } else {
                        $elem.bind('mousedown', jQuery.event.special.touchdown.click);
                    }
                },

                click: function (event) {
                    event.type = "touchdown";
                    
                    
 
             
                    jQuery.event.handle.apply(this, arguments);
                },

                teardown: function (namespaces) {
                    if (window.Touch) {
                        //$elem.unbind('touchstart', jQuery.event.special.touchdown.onTouchStart);
                    } else {
                        //$elem.unbind('mousedown', jQuery.event.special.touchdown.click);
                    }
                },

                onTouchStart: function (event) {
                
                      event.type = "touchdown";
                   
                      
                      event.pageX=event.originalEvent.targetTouches[0].pageX;
                      event.pageY=event.originalEvent.targetTouches[0].pageY;
                      event.screenX=event.originalEvent.targetTouches[0].screenX;
                      event.screenY=event.originalEvent.targetTouches[0].screenY;
                      event.clientX=event.originalEvent.targetTouches[0].clientX;
                      event.clientY=event.originalEvent.targetTouches[0].clientY;
 
                      jQuery.event.handle.apply(this, arguments);
                }

};
            
 
 
 
jQuery.event.special.touchdrag = {
                setup: function (data, namespaces) {
                    var elem = this, $elem = jQuery(elem);

                    if (window.Touch) {
                       $elem.bind('touchstart', jQuery.event.special.touchdrag.onTouchStart);
                       jQuery(document).bind('touchmove', onTouchMove);
                       jQuery(document).bind('touchend', touchdrag_up);
                 
                    } else {
                        

                    	function touchdrag_up(event) {
                    		elem.down = false;
               	    	}
               	    	
               	    	function onTouchMove  (event) {
                			if(elem.down){
                			event.preventDefault();
                        	event.type = "touchdrag";
                        	
                        	event.pageX=event.originalEvent.targetTouches[0].pageX;
                        	event.pageY=event.originalEvent.targetTouches[0].pageY;
                        	event.screenX=event.originalEvent.targetTouches[0].screenX;
                        	event.screenY=event.originalEvent.targetTouches[0].screenY;
                        	event.clientX=event.originalEvent.targetTouches[0].clientX;
                        	event.clientY=event.originalEvent.targetTouches[0].clientY;
                        	event.touchX= elem.touchX;
                        	event.touchY= elem.touchY;
                        	event.startX= elem.startX;
                        	event.startY= elem.startY;

                        	jQuery.event.handle.apply(elem, arguments);
                        	}
               			}
               			
               			function move(event) {
                
                			if(elem.down){
                			
                    			event.type = "touchdrag";
                    			event.touchX= elem.touchX;
                        		event.touchY= elem.touchY;
                        		event.startX= elem.startX;
                        		event.startY= elem.startY;

                    			jQuery.event.handle.apply(elem, arguments);
                    		}
                    
                		}   
                		
                		$elem.bind('mousedown', jQuery.event.special.touchdrag.click);
                        jQuery(document).bind('mousemove', move);
                        jQuery(document).bind('mouseup', touchdrag_up);   
                         

               	    	
               	    	
                   }
                    
                    

               	    
               	    
                    
                    
                },
                
                onTouchStart: function (event) {
                	
                
                      this.touchX=event.originalEvent.targetTouches[0].screenX-jQuery(this).ts_position().left;
                      this.touchY=event.originalEvent.targetTouches[0].screenY-jQuery(this).ts_position().top;
                      this.startX=event.originalEvent.targetTouches[0].screenX;
                      this.startY=event.originalEvent.targetTouches[0].screenY; 
                      this.down = true;
                     
                },

               
                click: function (event) {
                	this.touchX=event.screenX-jQuery(this).ts_position().left;
                    this.touchY=event.screenY-jQuery(this).ts_position().top; 
                    this.startX=event.screenX;
                    this.startY=event.screenY;
                	this.down = true;
                	

                   
                },
                
                
               
                teardown: function (namespaces) {
                    if (window.Touch) {
                        //$elem.unbind('touchstart', jQuery.event.special.touchdown.onTouchStart);
                        //jQuery(document).unbind('touchmove', onTouchMove);
           
                    } else {
                        //$elem.unbind('mousedown', jQuery.event.special.touchdrag.click);
                       //jQuery(document).unbind('mousemove', move);
                        //jQuery(document).unbind('up', elem.touchdrag_up);
                    }
                }

            
          

               
            };
            
                        
    
    
 jQuery.event.special.touchup = {
                setup: function (data, namespaces) {
                    var elem = this, $elem = jQuery(elem);
                    var doc=jQuery(document);

                    if (window.Touch) {
                        $elem.bind('touchend', jQuery.event.special.touchup.onTouchEnd);
                    } else {
                  
                   	function touchup_up(event) {
                    		event.type = "touchup";
                    		jQuery.event.handle.apply(elem, arguments);
               	    	}
               	    	
                        doc.bind('mouseup', touchup_up);

                   
                    }
                    
                    

               	    
               	      
                },

    
        
                teardown: function (namespaces) {
                    if (window.Touch) {
                //        $elem.unbind('touchend', jQuery.event.special.touchup.onTouchEnd);
                    } else {
                //         doc.unbind('mouseup', elem.touchup_up);
                    }
                },

         
                onTouchEnd: function (event) {
                        event.type = "touchup";
                        jQuery.event.handle.apply(this, arguments);
                    
                }
                
 };   
           
            
  
 
  
 
/**
 * positioning
 */
 
 
 
// lšst das margin-problem von position() / webkit
  
(function($) { 
 
jQuery.fn.ts_position = function() {
thisLeft = this.offset().left;
thisTop = this.offset().top; 
thisParent = this.parent();
parentLeft = thisParent.offset().left;
parentTop = thisParent.offset().top;
return {
left: thisLeft-parentLeft, 
top: thisTop-parentTop
}
} 
 
})(jQuery);



    


(function($) {
          
jQuery.fn.ts_scale= function(s){

if(jQuery.browser.webkit){

	this.css("-webkit-transition-duration","0s");
	this.css("-webkit-transform"  ,   "scale("+s+")");	

}else if(jQuery.browser.mozilla){

	this.css("-moz-transition-duration","0s");
	this.css("-moz-transform","scale("+s+")");	
	
}else{	

	this.css("transition-duration","0s");
	this.css("transform","scale("+s+")");

}


}

})(jQuery);




    
    
(function($) {
          
jQuery.fn.ts_moveTo = function(x,y){

	if(jQuery.browser.webkit){
	
	this.css("-webkit-transition-duration","0s");
	
//	if (window.Touch) {
		this.css("-webkit-transform"  ,   "translate3d("+x +"px," +y+"px,0px) ");	
//	}else{
//		this.css("-webkit-transform"  ,   "translate("+x +"px," +y+"px) ");
//	}

	/*}else if((jQuery.browser.mozilla && jQuery.browser.version.split(".")[0] > "1") ){
	
	this.css("-moz-transition-duration","0s");
	this.css("-moz-transform"  ,   "translate("+x +"px," +y+"px) ");
	*/
	}else{
	
	
	this.css("left",x );
	this.css("top", y );
		
	}

}


})(jQuery);







(function($) {

          
jQuery.fn.ts_fadeTo = function(opacity,duration,easing,callback){


	if(jQuery.browser.webkit==true){
	

		this.css("-webkit-transition-property","opacity");
		this.css("-webkit-transition-duration",(duration/1000)+"s");
		
		this.css("opacity"  ,   opacity);	

		this.bind( 'webkitTransitionEnd', callback , false );
		

	}else{
	
		this.fadeTo( duration,opacity, callback);
		
	}
	


}


})(jQuery);




(function($) {

          
jQuery.fn.ts_animateTo = function(x,y,duration,easing,callback){


	if(jQuery.browser.webkit==true){
	

		this.css("-webkit-transition-property","-webkit-transform");
		this.css("-webkit-transition-duration",(duration/1000)+"s");
		
		
//		if (window.Touch) {
		this.css("-webkit-transform"  ,   "translate3d("+x +"px," +y+"px,0px) ");	
//		}else{
		
//		this.css("-webkit-transform"  ,   "translate("+x +"px," +y+"px) ");
		
//		}
		
		
		this.bind( 'webkitTransitionEnd', callback , false );
		

	/*} else if( jQuery.browser.mozilla && jQuery.browser.version.split(".")[0] > "1"){
		this.css("-moz-transition-property","-moz-transform");
		this.css("-moz-transition-duration",(duration/1000)+"s");
		this.css("-moz-transform"  ,   "translate("+x +"px," +y+"px)");
		this.bind( 'transitionend', callback , false );
*/
	}else{
	
		this.animate({ left: x,top: y}, duration, callback);
		
	}
	


}


})(jQuery);





(function($) {
          
jQuery.fn.ts_translate= function(x,y,s,r){

	if(jQuery.browser.webkit){
	this.css("-webkit-transition-duration","0s");
	
	if (window.Touch) {
		this.css("-webkit-transform"  ,   "translate3d("+x +"px," +y+"px,0px) scale("+s+") rotate("+r+"deg)");	
	}else{
		this.css("-webkit-transform"  ,   "translate("+x +"px," +y+"px) scale("+s+") rotate("+r+"deg)");
	}

	}else if((jQuery.browser.mozilla && jQuery.browser.version.split(".")[0] > "1") ){
	
	this.css("-moz-transition-duration","0s");
	this.css("-moz-transform","translate("+x+"px,"+y+"px) scale("+s+") rotate("+r+"deg)");

	}else{
	
	this.css("left",x );
	this.css("top", y );
		
	}

}


})(jQuery);





(function($) {

          
jQuery.fn.ts_translateTo = function(x,y,s,r,duration,easing,callback){


if(jQuery.browser.webkit){


	this.css("-webkit-transition-property","-webkit-transform");
	this.css("-webkit-transition-duration",(duration/1000)+"s");

 	if (window.Touch) {
		this.css("-webkit-transform"  ,   "translate3d("+x +"px," +y+"px,0px) scale("+s+") rotate("+r+"deg)");	
	}else{
		this.css("-webkit-transform"  ,   "translate("+x +"px," +y+"px) scale("+s+") rotate("+r+"deg)");
	}

	this.bind( 'webkitTransitionEnd', callback , false );
	
	
}else if( jQuery.browser.mozilla && jQuery.browser.version.split(".")[0] > "1"){
	this.css("-moz-transition-property","-moz-transform");
	this.css("-moz-transition-duration",(duration/1000)+"s");
	this.css("-moz-transform"  ,   "translate("+x +"px," +y+"px) scale("+s+") rotate("+r+"deg)");
	this.bind( 'transitionend', callback , false );

}else{
	
	this.css("left",x+"px");
	this.css("top",y+"px");
	
	
	callback();
	
		
}
	


}


})(jQuery);



/**
 * unselectable
*/
 
 
(function($) {
	$.fn.unselectable = function() {
		return this.each(function() {
			
			$(this)
				.css('-moz-user-select', 'none')		
				.css('-khtml-user-select', 'none')		
				.css('user-select', 'none');			
			
			if ($.browser.msie) {						
				$(this).each(function() {
					this.ondrag = function() {
						return false;
					};
				});
				$(this).each(function() {
					this.onselectstart = function() {
						return (false);
					};
				});
			} else if($.browser.opera) {
				$(this).attr('unselectable', 'on');
			}
		});
	};
})(jQuery);








/**
 * timers
*/
 




jQuery.fn.extend({
	everyTime: function(interval, label, fn, times, belay) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, times, belay);
		});
	},
	oneTime: function(interval, label, fn) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, 1);
		});
	},
	stopTime: function(label, fn) {
		return this.each(function() {
			jQuery.timer.remove(this, label, fn);
		});
	}
});

jQuery.extend({
	timer: {
		guid: 1,
		global: {},
		regex: /^([0-9]+)\s*(.*s)?$/,
		powers: {
			// Yeah this is major overkill...
			'ms': 1,
			'cs': 10,
			'ds': 100,
			's': 1000,
			'das': 10000,
			'hs': 100000,
			'ks': 1000000
		},
		timeParse: function(value) {
			if (value == undefined || value == null)
				return null;
			var result = this.regex.exec(jQuery.trim(value.toString()));
			if (result[2]) {
				var num = parseInt(result[1], 10);
				var mult = this.powers[result[2]] || 1;
				return num * mult;
			} else {
				return value;
			}
		},
		add: function(element, interval, label, fn, times, belay) {
			var counter = 0;
			
			if (jQuery.isFunction(label)) {
				if (!times) 
					times = fn;
				fn = label;
				label = interval;
			}
			
			interval = jQuery.timer.timeParse(interval);

			if (typeof interval != 'number' || isNaN(interval) || interval <= 0)
				return;

			if (times && times.constructor != Number) {
				belay = !!times;
				times = 0;
			}
			
			times = times || 0;
			belay = belay || false;
			
			if (!element.$timers) 
				element.$timers = {};
			
			if (!element.$timers[label])
				element.$timers[label] = {};
			
			fn.$timerID = fn.$timerID || this.guid++;
			
			var handler = function() {
				if (belay && this.inProgress) 
					return;
				this.inProgress = true;
				if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
					jQuery.timer.remove(element, label, fn);
				this.inProgress = false;
			};
			
			handler.$timerID = fn.$timerID;
			
			if (!element.$timers[label][fn.$timerID]) 
				element.$timers[label][fn.$timerID] = window.setInterval(handler,interval);
			
			if ( !this.global[label] )
				this.global[label] = [];
			this.global[label].push( element );
			
		},
		remove: function(element, label, fn) {
			var timers = element.$timers, ret;
			
			if ( timers ) {
				
				if (!label) {
					for ( label in timers )
						this.remove(element, label, fn);
				} else if ( timers[label] ) {
					if ( fn ) {
						if ( fn.$timerID ) {
							window.clearInterval(timers[label][fn.$timerID]);
							delete timers[label][fn.$timerID];
						}
					} else {
						for ( var fn in timers[label] ) {
							window.clearInterval(timers[label][fn]);
							delete timers[label][fn];
						}
					}
					
					for ( ret in timers[label] ) break;
					if ( !ret ) {
						ret = null;
						delete timers[label];
					}
				}
				
				for ( ret in timers ) break;
				if ( !ret ) 
					element.$timers = null;
			}
		}
	}
});

if (jQuery.browser.msie)
	jQuery(window).one("unload", function() {
		var global = jQuery.timer.global;
		for ( var label in global ) {
			var els = global[label], i = els.length;
			while ( --i )
				jQuery.timer.remove(els[i], label);
		}
	});










