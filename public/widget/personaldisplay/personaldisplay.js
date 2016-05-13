define(function(require,exports,module)
{
	function yulan()
	{
		$(function () 
		{
			$("#file").uploadPreview({ Img: "ImgPr", Width: 150, Height: 150 });
		});
	}

	exports.yulan=yulan;
})