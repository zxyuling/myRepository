define(function(require)
{
	var change=require('/widget/inup/change');
	var hide=require('/widget/inup/hide');
	change.change('.inup-link','.inup');
	hide.hide('.inup-link');
});