function tab()
{
	$(document).ready(function(){
		$(".nav-single").click(function(){					//点击导航按钮事件
			$(".nav-select").removeClass('nav-select');		//移除以前的导航选中印记
			$(this).addClass('nav-select');					//将印记添加到当前导航按钮
			$(".section-select").removeClass('section-select'); //移除内容选中印记
			$("."+$(this).data('section')).addClass('section-select'); //添加给与导航按钮相关的选项内容印记
			//console.log($(this).data('section'))
		})
	});
}
window.onload=tab;