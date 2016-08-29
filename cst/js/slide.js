;(function($){
  $.fn.slide=function(opt){
    var defaults={
      dui:[{
                    img:'images/school1.jpg',
                    url:'#',
                    alt:'世纪同乐幼儿园'
                },
                {
                    img:'images/school2.jpg',
                    url:'#',
                    alt:'天闻幼儿园'
                },
                {
                    img:'images/school3.jpg',
                    url:'#',
                    alt:'周巷云城幼儿园'
                }],// 轮播图片
      frequency:500,//持续动画时间
      duration:2000,//延迟时间
      direction:"left",//left，top2种方向滚动
      width:null,//宽度大小
      height:null,//高度大小
      dot:true//圆点
    }
    var opt=$.extend({},defaults,opt);//扩展属性
    
    var currindex=0;//轮播页数
    var obj=$(this);//在外保存this 内部调用
    var liWidth=opt.width?opt.width:$(this).width();
    var liHeight=opt.height?opt.height:$(this).height();
    var ul=$('<ul id="slide"></ul>');
    var timer=null;
    for(var i=0;i<opt.dui.length;i++){
      ul.append('<li><img src="'+opt.dui[i].img+'" /><h2>'+opt.dui[i].alt+'</h2></li>');//添加li
    }
    $(this).append(ul);
    ul.html(ul.html()+ul.html());
    clearInterval(timer);
    timer=setInterval(function(){
  if(currindex<opt.dui.length){      //判断是否为最后一页
          currindex++;
    if(opt.direction=="left"){      //判断方向
      obj.find('ul').css({"width":liWidth*obj.find('li').size(),"height":liHeight});
        obj.find('ul').animate({left:""+(-liWidth)*currindex+"px"},opt.frequency,function(){   //回调函数判断最后一页，直接跳转
            if(currindex==opt.dui.length){
               obj.find('ul').css({left:"0px"});
               currindex=0;
             }
             $(".dot>div>span").eq(currindex).addClass('active').siblings().removeClass('active');
          })
        } 
    else if(opt.direction=="top"){
      obj.find('ul').css({"width":liWidth,"height":liHeight*obj.find('li').size()});
      console.log(1);
        obj.find('ul').animate({top:""+(-liHeight)*currindex+"px"},opt.frequency,function(){
            if(currindex==opt.dui.length){
               obj.find('ul').css({top:"0px"});
               currindex=0;
             }
             $(".dot>div>span").eq(currindex).addClass('active').siblings().removeClass('active');
          })
        } 
    }
    },opt.duration);


    if(opt.dot){  // 圆点
        for(var j=0;j<opt.dui.length;j++){
          $('.dot>div').append('<span></span>');
        }
        $(".dot>div>span:first").addClass('active');
          var spanWidth=parseInt($('.dot>div>span').css("margin-left"))*2*opt.dui.length+$('.dot>div>span').width()*opt.dui.length;
          $('.dot>div').width(spanWidth);
          if(opt.direction=="left"){
            obj.find('ul').css({"width":liWidth*obj.find('li').size(),"height":liHeight});
                $(".dot>div>span").click(function(){
                  clearInterval(timer);
                $(this).addClass('active').siblings().removeClass('active');
                obj.find('ul').css({left:-liWidth*$(this).index()});
                currindex=$(this).index();

                timer=setInterval(function(){
                    if(currindex<opt.dui.length){
                      currindex++;
                if(opt.direction=="left"){
                  obj.find('ul').css({"width":liWidth*obj.find('li').size(),"height":liHeight});
                    obj.find('ul').animate({left:""+(-liWidth)*currindex+"px"},opt.frequency,function(){
                        if(currindex==opt.dui.length){
                           obj.find('ul').css({left:"0px"});
                           currindex=0;
                         }
                      })
                    } 
                else if(opt.direction=="top"){
                  obj.find('ul').css({"width":liWidth,"height":liHeight*obj.find('li').size()});
                  console.log(1);
                    obj.find('ul').animate({top:""+(-liHeight)*currindex+"px"},opt.frequency,function(){
                        if(currindex==opt.dui.length){
                           obj.find('ul').css({top:"0px"});
                           currindex=0;
                         }
                      })
                    } 
                }
                },opt.duration); 
            })
          }
         
    }
  }
})(jQuery)