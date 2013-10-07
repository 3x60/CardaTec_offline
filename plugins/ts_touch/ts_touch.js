//v2


/**
 * touch events
*/



(function($) {

          
jQuery.fn.isTouchDevice = function(){

	return !!('ontouchstart' in window);
	
}		

} )(jQuery);




function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
         switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }

             //initMouseEvent(type, canBubble, cancelable, view, clickCount, 
    //           screenX, screenY, clientX, clientY, ctrlKey, 
    //           altKey, shiftKey, metaKey, button, relatedTarget);
    
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                              first.screenX, first.screenY, 
                              first.clientX, first.clientY, false, 
                              false, false, false, 0/*left*/, null);

                              first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

/*

document.addEventListener("touchstart", touchHandler, true);
document.addEventListener("touchmove", touchHandler, true);
document.addEventListener("touchend", touchHandler, true);
document.addEventListener("touchcancel", touchHandler, true);    

*/


  
 
/**
 * positioning
 */
 
 
 
// löst das margin-problem von position() / webkit
  
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
          
jQuery.fn.ts_moveTo = function(x,y){

	if(jQuery.browser.webkit){
	this.off( 'webkitTransitionEnd');
	this.css("-webkit-transition-property","");
	//this.css("-webkit-transition-duration","0s");
	
//	if ($(this).isTouchDevice()) {
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
	
		this.off( 'webkitTransitionEnd');

		this.css("-webkit-transition-property","opacity");
		this.css("-webkit-transition-duration",(duration/1000)+"s");
		
		this.css("opacity"  ,   opacity);	

		this.one( 'webkitTransitionEnd', callback );
		

	}else{
	
		this.fadeTo( duration,opacity, callback);
		
	}
	


}


})(jQuery);




(function($) {

          
jQuery.fn.ts_animateTo = function(x,y,duration,easing,callback){


	if(jQuery.browser.webkit==true){

		this.off( 'webkitTransitionEnd');
		this.css("-webkit-transition-property","-webkit-transform");
		this.css("-webkit-transition-duration",(duration/1000)+"s");
		this.css("-webkit-transition-timing-function",easing);
		this.one( 'webkitTransitionEnd', callback  );
		
//		if ($(this).isTouchDevice()) {
		this.css("-webkit-transform"  ,   "translate3d("+x +"px," +y+"px,0px) ");
		//	this.animate({ left: x,top: y}, duration, callback);	
//		}else{
		
//		this.css("-webkit-transform"  ,   "translate("+x +"px," +y+"px) ");
		
//		}
		
		
		
		

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
	this.off( 'webkitTransitionEnd');
	this.css("-webkit-transition-property","");
	//this.css("-webkit-transition-duration","0s");
	
	
//	if ($(this).isTouchDevice()) {
		this.css("-webkit-transform"  ,   "translate3d("+x +"px," +y+"px,0px) scale("+s+") rotate("+r+"deg)");	
/*	}else{
		this.css("-webkit-transform"  ,   "translate("+x +"px," +y+"px) scale("+s+") rotate("+r+"deg)");
	}*/

	}else if((jQuery.browser.mozilla && jQuery.browser.version.split(".")[0] > "1") ){
	this.off( 'transitionend');
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
var that=this;
	this.off( 'webkitTransitionEnd');
	this.css("-webkit-transition-property","-webkit-transform");
	this.css("-webkit-transition-duration",(duration/1000)+"s");
 	this.css("-webkit-transition-timing-function",easing);
	this.one( 'webkitTransitionEnd',callback);
// 	if ($(this).isTouchDevice()) {
	this.css("-webkit-transform"  ,   "translate3d("+x +"px," +y+"px,0px) scale("+s+") rotate("+r+"deg)");	
//	}else{
//		this.css("-webkit-transform"  ,   "translate("+x +"px," +y+"px) scale("+s+") rotate("+r+"deg)");
//	}


	
	
}else if( jQuery.browser.mozilla && jQuery.browser.version.split(".")[0] > "1"){
	this.off( 'transitionend');
	this.css("-moz-transition-property","-moz-transform");
	this.css("-moz-transition-duration",(duration/1000)+"s");
	this.css("-moz-transform"  ,   "translate("+x +"px," +y+"px) scale("+s+") rotate("+r+"deg)");
	this.one( 'transitionend', callback);

}else{
	
	this.css("left",x+"px");
	this.css("top",y+"px");
	
	
	callback();
	
		
}
	


}


})(jQuery);





(function($) {
          
jQuery.fn.ts_transform= function(r,s){

	this.css("transition-property","");
	this.css("transform"  ,   "scale("+s+") rotate("+r+"deg)");	

}


})(jQuery);






(function($) {

          
jQuery.fn.ts_transformTo = function(r,s,duration,easing,callback){

	this.off( 'webkitTransitionEnd');
	this.off( 'transitionend');
	this.css("transition-property","transform");
	this.css("transition-timing-function",easing);
	this.css("transition-duration",(duration/1000)+"s");
	this.css("transform"  ,   "scale("+s+") rotate("+r+"deg)");
	this.one( 'transitionend', callback  );	
	this.one( 'webkitTransitionEnd',callback);

}


})(jQuery);







(function($) {

          
jQuery.fn.getRotationDegrees=function() {
	
	
	var obj=$(this);
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    
    return angle;
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










