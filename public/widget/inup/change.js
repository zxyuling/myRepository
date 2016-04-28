define(function(require,exports,module)
{
	function change(sel,tar)
	{
		var ele = document.querySelector(sel);
		var tar = document.querySelector(tar);
		ele.addEventListener('click',function(){trans1();setTimeout(trans2,500);},true)
		function trans1()
		{
			tar.style.transition="all 0.5s ease-in";
			tar.style.transform="rotateY(90deg)";
		}
		function trans2()
		{
			tar.style.transition="all 0.5s ease-out";
			tar.style.transform="rotateY(0deg)";
		}
	}
	exports.change=change;
})