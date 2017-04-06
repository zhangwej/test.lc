
		function shows(obj){
			obj = $(obj);
			$(function(){
				$('#sexs').show();			
				$('#sexs .select_show li').click(function(e){
					e.stopPropagation();
					obj.val($(this).text());
					$('#sexs').hide();				
				})
			})
		}
		function shows_bed(obj){
			obj = $(obj);
			$(function(){
				$('#beds').show();			
				$('#beds .select_show li').click(function(e){
					e.stopPropagation();
					obj.val($(this).text());
					$('#beds').hide();				
				})
			})
		}
		$(function(){		
			
			console.log($('#sex').width());
				$('.button_div').css('padding-top',$('.page_container').height()/5);
				$('.model-content').css('margin-top',$('.page_container').height()/3);
			$(window).resize(function(){
				$('.button_div').css('padding-top',$('.page_container').height()/5);
				$('.model-content').css('margin-top',$('.page_container').height()/3);
			})
			
		})