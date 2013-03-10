//@charset "utf-8";
var colArrs = ['#C9ECF8-#D6F0FA','#C5F7C1-#D0FECB','#F1C3F1-#F5D2F5','#D4CDF3-#DDD9FE','#F8F7B6-#FDFDCB'];

changeBGCol();


$('#changeBG').click(function(){
	changeBGCol();
});


function changeBGCol(){
	var secs = $('section');
	for (var i = 0; i < secs.length; i++) {

		var rnum = String(Math.random()*10).split('.')[0] % 5;

		secs.eq(i).css('background',colArrs[rnum].split(
			'-')[1]).find('div.note-t').css('background',colArrs[rnum].split(
			'-')[0]);

	}
}


$('.write a').click(function(){
	$('#mask').show();
	$('#putNote').animate({'top':'10px'},400,function(){
		
	});
});



$('#putNote .hd a, #login .hd a').click(function(){
	
	$('#putNote').animate({'top':'-610px'},400,function(){
		$('#mask').hide();
	});
	$('#login').animate({'top':'-280px'},400,function(){
		$('#mask').hide();
	});
});



$('#quickLogin').click(function(){
	
	$('#mask').show();

	$('#login').animate({'top':'100px'},400,function(){
		
	});
});


/**
 * @descrption : 判断出哪一栏最低 
 * @return 	   : $dom-->最低列的jQuery对象
 * @date 	   : 2013-03-08 
 */
function getLowHCol(){
	var lows = [],dom;
	try{
		for(var i=1; i<6; i++){
			var curCol = $('div[col='+i+']').find('section').last();
			lows[i-1] = curCol.offset().top + curCol.height()+'-'+i;
		}

		var min = Math.min(lows[0].split('-')[0],lows[1].split('-')[0],lows[2].split('-')[0],
			lows[3].split('-')[0],lows[4].split('-')[0]) || '';	

		for(var i=0; i<5; i++){
			if(min == lows[i].split('-')[0]){
				return $('div[col='+lows[i].split('-')[1]+']') || $('');
			}
		}
	}catch(e){
		console.log("errer:判断出哪一栏最低出错！"+e.message);
	}
	
}


var totalheight = 0;
/**
 * @descrption : 向服务器获取数据
 * @return     : null
 * @date 	   : 2013-03-08 
 */
function loadData()
{

    totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
 
  //  console.log($(document).height() +'    '+ totalheight)

    if ($(document).height() <= totalheight){
    	$('.load').show();
        //加载数据
        setTimeout(function(){
			for(var i=0; i<10; i++){
		   		
				var rnum = String(Math.random()*10).split('.')[0] % 5;
		   		var h = (rnum+1)*100+'px';

		   		var str = "<section style='height:"+h+"; background:"+colArrs[rnum].split(
			'-')[1]+";'>"+
							"<div class='note-t' style='background:"+colArrs[rnum].split(
			'-')[0]+"'></div>"+
		    				"44444444444444444444444444444444444"+
		    			"</section>";

		   		$(str).insertBefore(getLowHCol().find('.load'));
		   		getLowHCol().find('.load').hide();
		   		
		   	}
        },4000);
	   	
     	

    }

}

 
/**
 * @descrption : 页面滚动条事件监听
 * @return     : null
 * @date 	   : 2013-03-08 
 */
$(window).scroll( function() {

    loadData();

    var tht = parseFloat($(window).scrollTop());
    if(tht > 200){
    	$("#posTools").show();
    }else{
		$("#posTools").hide();
    }
});


/**
 * @descrption : 发布便签
 * @return     : null
 * @date 	   : 2013-03-10 
 */
function putNote(){

}



$('.foot-bts').find('a').click(function(){
	var name = this.name;
	switch(name){
		case 'pub':
			pubCheck();
			
			break;
		case 'reset':

			break;
		case 'login':

			break;
		case 'cancel':

			break;
		default :
			//do nothing
	}


});

function pubCheck(){
	
	if($.trim($('input[name=title]').val())== ''){
		$('input[name=title]').addClass('errorstyle');
	}
	if($.trim($('textarea[name=content]').val()) == ''){
		$('textarea[name=content]').addClass('errorstyle');
	}

}



$('input,textarea[name=content]').keyup(function(){
	if($.trim($(this).val()) != '' && $(this).hasClass('errorstyle')){
		$(this).removeClass('errorstyle');
	}
})

//跳到顶部
function posTop(){
	$(document).scrollTop(0);
}
//跳到中部
function posMid(){
	$(document).scrollTop($(document).height()/2);
}
//跳到底部
function posBtm(){
	$(document).scrollTop($(document).height());
}

