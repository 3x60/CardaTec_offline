(function($){
    $.fn.ts_float = function() {
    

        var raster=240;
        var padding=0;
        var _this=$(this);
        var childs=_this.children();
        var filterTag="";
        var child;
        var maxHeight=0;
      
        _this.css("display","block");
            
            
       var filterelem=  _this.find(".mod_article.filter");
        
       if (filterelem.length!=0){
        filterTag=filterelem.attr('id'); 
        filterelem.remove();
       }         
        
        
        $.each(childs,function(i){
            child=$(this);
            flag=false;
           child.ts_moveTo($(window).width()/2-child.outerWidth()/2,$(window).height()+200);
            
            /*$.each(child.find(".tagged a"),function(){	
            	
                $(this).click(function(){	
                    filterTag=$(this).html();
                    filter();	
                });
            });
            
            */
    
        });        
        

      
        
        
        function filter(){
        
        
        
            var child;
            var flag;
            $.each(childs,function(i){
                child=$(this);
                flag=false;
                $.each(child.find(".ts_tag span"),function(){
                    if($(this).html()==filterTag) flag=true;	        	
                });
                if(filterTag=="" ) flag=true;
                if(!flag){
                    child.hide();
                    child.ts_moveTo($(window).width()/2-child.outerWidth()/2,$(window).height()+200);
                    }else{
                	
                    child.show();
                    
                    
                }
            });
            
        
	 
	     resize();  
	     
	     

         
        }
        function Numsort(a,b){
	        return a-b;
        }
        
        
        
        function resize(){
      

            var screen=_this.outerWidth(true);
            var tx=0;
            var column=0;
            var columns=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
            var child;
            var ty=0;
            var icols;
            $.each(childs,function(i){
            	
            	
                var child=$(this);
                if(!child.is(":visible")) return true; 
                
                if(tx+child.outerWidth(true)>screen) {
                    tx=0;
                    column=0;
                }
                
                ty=0;
                icols=Math.round(child.outerWidth(true)/raster);
                for(j=0;j<icols;j++){
                    ty=Math.max(columns[column+j],ty);	
                }
              
                child.ts_animateTo(tx,ty,1000,null,function(){
                	
            	  //child.css("opacity","1"); 
	            //  child.animate({opacity:1},500);
	                
                });

                
                
                for(j=0;j<icols;j++){
                    columns[column+j]=ty+child.outerHeight(true);	
                }
                column+=icols;
                tx+=child.outerWidth(true);	
            });	
            
            
            heights = columns
            heights = columns.sort(Numsort);
            maxHeight = (heights[(heights.length)-1]);
            
            
         
  
            if($("body").scrollTop()>maxHeight-$(window).height()+$("#header").outerHeight()){
            
            $("body").scrollTop(0);
           
            }
            
            _this.css("height",maxHeight);


            
                  }
        
        
        
        
        
        
        
        this.filterBy=function(tag){
       
            filterTag=tag;
            filter();	
        }
        
        
        filter();
        
        
        var ow=$(window).width();
        var oh=$(window).height();
        
        $(this).everyTime(1000,"resize",function(){

	        
	       if($(window).width()!=ow || $(window).height()!=oh) resize(); 
	        ow=$(window).width();
	        oh=$(window).height();
	        
        });
        
        
        
        
        return this;
    }
})(jQuery);