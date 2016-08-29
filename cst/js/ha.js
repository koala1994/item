;(function($){
	$.slide=function(options){
		var defaults={
			obj:[{
				img:null,
				url:null,
				alt:null,
			}],
			frequency:500,
			duration:2000,
			width:null,
			height:null,
			dot:true
		}
		var liWidth=options.width>0?options.width:$(this).width();
    	var liHeight=options.height>0?options.height:$(this).height();
		var that=this;
		var options=$.extend({},defaults,options);
		slide.fn=slide.prototype={
			wrap:that,
			wrap_ul:$('<ul class="slide"></ul>'),
			dot:$("<div class='dot'></div>"),
			dot_Div:$("<div></div>"),
			dot_Span:"<span></span>",
			left_btn:$("<div class='left'></div>"),
			right_btn:$("<div class='right'></div>"), 
   			getImg:function(index){
   				var imgStr=[];
   				for(var i=0;i<options.obj.length;i++){
   					imgStr.push('<li><a href="'+options.obj[i].url+'"><img src="'+options.obj[i].img+'" alt="'+options.obj[i].alt+'" ></a></li>');
   				}
   				return imgStr.join('');
   			},
   			getDot:function(){
   				for(var i=0;i<options.obj.length;i++){
   					if(i==0){
   						this.dot_Div.append("<span class='active'></span>");
   					}
   					else{
   						this.dot_Div.append("<span></span>");
   					}
   				}
   				this.dot.append(this.dot_Div);
   				return this.dot;
   			},
			initLi:function(){
				var length=this.wrap_ul.find('li').size();
				this.wrap_ul.width(liWidth*length).find('li').width(liWidth).height(liHeight);
				var spanWidth=parseInt(this.dot.find('span').css("margin-left"))*2*options.obj.length+this.dot.find('span').width()*options.obj.length;
          		this.dot.find('div').width(spanWidth);
			},
			addLi:function(){
				this.wrap_ul.html(this.wrap_ul.html()+this.wrap_ul.html());
			},
			slideImg:function(index){
				var ths=this;
				this.wrap_ul.animate({"left":""+(-liWidth)*index+"px"},options.frequency,function(){
					if(index==options.obj.length){
						ths.wrap_ul.css({"left":"0px"});
						
					}
				});
			},
			bindEvent:function(){
				var thiss=this;
				var currIndex=0;
				var rightBtn=function(){
					if(currIndex<options.obj.length){
						currIndex++;
						thiss.slideImg(currIndex);
						addCurrent(currIndex);
					}
					else{
						currIndex=1;
						thiss.slideImg(currIndex);
						addCurrent(currIndex);
					}
					clearInterval(timer);
					timer=setInterval(function(){
					that.trigger('click');
				},options.duration);
					return false;
						
				}
				var addCurrent=function(index){
					if(index==options.obj.length){
					thiss.dot.find('span').eq(0).addClass('active').siblings().removeClass('active');
					}
					else{
						thiss.dot.find('.active').removeClass('active');
						thiss.dot.find('span').eq(index).addClass('active');
					}
					
				}
				var leftBtn=function(){
					if(currIndex<1){
						currIndex=options.obj.length-1;
						thiss.slideImg(currIndex);
						addCurrent(currIndex);
					}
					else{
						currIndex--;
						thiss.slideImg(currIndex);
						addCurrent(currIndex);
					}
					clearInterval(timer);
					timer=setInterval(function(){
					that.trigger('click');
				},options.duration);
					return false;
				}
				var dotBtn=function(){
					var thisdot=$(this);
					currIndex=thisdot.index();
					thiss.slideImg(currIndex);
					thisdot.addClass('active').siblings().removeClass('active');
					clearInterval(timer);
					timer=setInterval(function(){
					that.trigger('click');
				},options.duration);
					return false;
				}
				var timer=setInterval(function(){
					that.trigger('click');
				},options.duration)
				that.bind('click',rightBtn);
				that.find('span').bind('click',dotBtn);
				thiss.left_btn.bind('click',leftBtn);
				thiss.right_btn.bind('click',rightBtn);
			},
			init:function(){
				this.wrap.append(this.wrap_ul.append(this.getImg())).append(this.left_btn).append(this.right_btn);
				if(options.dot){
					this.wrap.append(this.getDot());
				}
				this.bindEvent();
				this.addLi();
				this.initLi();
				console.log(this.wrap);
			}
		}
		return this.each(function(){
			slide.fn.init();
		})

	}
})(jQuery)