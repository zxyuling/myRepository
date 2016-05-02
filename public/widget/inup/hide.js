define(function(require,exports,module)
{
	function hide(sel)
	{
		var ele = document.querySelector(sel);
		ele.addEventListener('click',change,true);
		function change(e)
		{
			if(e.target.getAttribute('class')=='inup-a-change')
			{
				setTimeout(changedel,500);
			}
		}
		function changedel()
		{
			var active = document.querySelector('#inup-active');
			var hide = document.querySelector('#inup-hide');
			var aActive = document.querySelector('.inup-a-active');
			var aChange = document.querySelector('.inup-a-change');
			active.setAttribute('id','inup-hide');
			hide.setAttribute('id','inup-active');
			aActive.setAttribute('class','inup-a-change');
			aChange.setAttribute('class','inup-a-active');			
		}

	}
	exports.hide=hide;
})