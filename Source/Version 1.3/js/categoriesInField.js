jQuery(document).ready(function(){
	fanabyteSearchInCategory.categoriesInField.init();
});

fanabyteSearchInCategory.categoriesInField = {
	init : function(){
		const langSearch = fanabyteSearchInCategory.lang.search ? fanabyteSearchInCategory.lang.search : "Search";
		const langReset = fanabyteSearchInCategory.lang.reset ? fanabyteSearchInCategory.lang.reset : "Reset";

		var search_div = '<div class="hide-if-no-js">';
		search_div += '<label>' + langSearch + '</label></br>';
		search_div += '<input type="text" name="search-field-in" class="meta-box-search-field" style="width: calc(100% - 65px);" />';
		search_div += '&nbsp;<button type="button" class="clear-meta-box-search-field button" style="cursor: pointer;">' + langReset + '</button>';
		search_div +='</div>';

		jQuery(search_div).insertBefore(jQuery('.categorydiv'));
	}
};