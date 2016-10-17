/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var protocol = document.location.protocol;
protocol = protocol.replace(':', '');
if(protocol=='file') protocol = 'http';

$(document).ready(function(){
  
if(typeof(lang) == 'undefined' || lang === null){	 
         var L_lang='en';

	}
        else {L_lang=lang;}
            
       
            
           if(typeof(hname) == 'undefined' || hname === null){	 
         var H_hname='http://www.ifc-markets.cn/js/www.ifcmarkets.com';

	}else{
            H_hname = hname;
        }
        if(typeof(protocol) == 'undefined' || protocol === null) protocol = 'https';
//   if ($('#ifc_nedmarketsentiment a').attr('href') == 'http://'+hname+'/'+lang+'/partnership/informers')
    if ($('#ifc_nedmarketsentiment a').attr('href').indexOf("ifcm") > -1)
    { 
   $('#ifc_widgetmarketsentiment').html('<ul>  <li><ul id="marketsentiment" >  </ul> </li></ul>');
      
   $('#ifc_widgetmarketsentiment').append('<div id="ifc_anonsemarketsentiment" class="ifc_anonse"><div></div><ul></ul></div>');

   //$('#ifc_anonsemarketsentiment > div').click(function(){$('#ifc_anonsemarketsentiment').css({'display':'none'})});
    

   jQuery.getJSON(protocol+"://"+H_hname+"/"+L_lang+"/widgets/Msent?callback=?",  function(data) {
       
            $('#ifc_nedmarketsentiment').html($('#ifc_nedmarketsentiment').html().replace('Provided', data.BlockTrName));
       
            $('#marketsentiment').parent().html('<img class="widget_block_header_img" src="'+protocol+'://'+H_hname+'/images/widget/forex_bottom_markets_2_hover.png" /><span class="widget_block_header">'+data.BlockTrName+'</span><ul id="marketsentiment">  </ul>');
            $.each(data.elements, function(i,item){
            
            $('#marketsentiment').append('<li>'+item.title+'<br><span class="widget_datespan">'+item.date+'</span><ul><li class="widgetHeader"><a href="'+item.url+'" target="blank">'+item.title+'</a></li><li class="widget_datespan">'+item.date+'<span class="closeButton"></span></li><li>'+item.text+'</li></ul></li>');

            });

            $('#marketsentiment li').click(function(){
                                            $('#ifc_anonsemarketsentiment ul').html($(this).children().filter('ul:first').html());
                                            $('.closeButton').click(function() { $('#ifc_anonsemarketsentiment').css({'display':'none'})});
                                            $('#ifc_anonsemarketsentiment').css({
                                            'display':'block'
                                            });                                                                                                                            

                                            });
            
            $('#marketsentiment').css('display','block');
            $('#marketsentiment li ul').css('display','none');
            $('#marketsentiment > li').css('cursor','pointer');

        })
  

 
   }

})