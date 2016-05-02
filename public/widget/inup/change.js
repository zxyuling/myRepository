define(function(require,exports,module)
{
	function change(sel,tar)
	{
		var ele = document.querySelector(sel);
		var tar = document.querySelector(tar);
		ele.addEventListener('click',trans,true)
		function trans(e)
		{
			if(e.target.getAttribute('class')=='inup-a-change')
			{
				trans1();
				setTimeout(trans2,500);
			}
		}
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