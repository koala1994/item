/*
* tableUI 0.1 
* Copyright (c) 2009 duziteng 
* Date: 2016-04-12
* 使用tableUI可以方便地将表格提示使用体验。先提供的功能有奇偶行颜色交替，鼠标移上高亮显示  
*/
(function($){
$.fn.tableUI=function(options){
  var defaults={
    evenClass:"evenClass",
    oddClass:"oddClass",
    activeClass:"active",
  };
  var options=$.extend(defaults,options);
  var tb=$(this);
  tb.find('tr:even').addClass(options.evenClass);
  tb.find('tr:odd').addClass(options.oddClass);
  tb.find('tr').on('mouseover',function(){
    $(this).addClass(options.activeClass);
  })
  tb.find('tr').on('mouseout',function(){
    $(this).removeClass(options.activeClass);
  })
}
})(jQuery);
