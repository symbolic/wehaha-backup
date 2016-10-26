/* by lanyes.org 蓝叶 */
$(document).ready(function(){
//点击发布评论
$(".comm_tijiao").click(function(){
$(".comm_infobox").fadeIn('slow');
}) 
$(".comm_close,#comment_submit").click(function(){
$(".comm_infobox").fadeOut('slow');
}) 
//清空输入
$(".comm_rest").click(function(){
$("#inpName,#inpEmail,#inpHomePage,#txaArticle").attr("value","");
$(".comm_infobox").fadeOut('slow');
});
//鼠标离开隐藏表情
$(".smilebg").mouseleave(function(){
$(".smilebg").slideUp(200);
});
});
//评论工具栏
function tool_code() {
		document.getElementById('txaArticle').value = document.getElementById('txaArticle').value + '[code]代码内容[/code]';
}
function tool_bold() {
		document.getElementById('txaArticle').value = document.getElementById('txaArticle').value + '[b]粗体[/b]';
}
function tool_qiand() {
 var myDate = new Date();
 var ShiJian = myDate.toLocaleString();
		document.getElementById('txaArticle').value = document.getElementById('txaArticle').value + '[code]签到成功！签到时间：'+ ShiJian + '，每日签到，生活更精彩！[/code]';
  $('.tool_qiand').hide();
}
function tool_bq() {
	if($('.smilebg').css('display')=='none'){
		$('.smilebg').slideDown(200)
	}else{
		$('.smilebg').slideUp(200)
	}
}
function grin(tag) {
    	var myField;
    	tag = '' + tag + '';
        if (document.getElementById('txaArticle') && document.getElementById('txaArticle').type == 'textarea') {
    		myField = document.getElementById('txaArticle');
    	} else {
    		return false;
    	}
    	if (document.selection) {
    		myField.focus();
    		sel = document.selection.createRange();
    		sel.text = tag;
    		myField.focus();
    	}
    	else if (myField.selectionStart || myField.selectionStart == '0') {
    		var startPos = myField.selectionStart;
    		var endPos = myField.selectionEnd;
    		var cursorPos = endPos;
    		myField.value = myField.value.substring(0, startPos)
    					  + tag
    					  + myField.value.substring(endPos, myField.value.length);
    		cursorPos += tag.length;
    		myField.focus();
    		myField.selectionStart = cursorPos;
    		myField.selectionEnd = cursorPos;
    	}
    	else {
    		myField.value += tag;
    		myField.focus();
    	}
    }
