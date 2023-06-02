jQuery(document).ready(function(){
	fanabyteSearchInCategory.author.init();
});

fanabyteSearchInCategory.author = {
	init : function(){
		const langSearch = fanabyteSearchInCategory.lang.search ? fanabyteSearchInCategory.lang.search : "Search";

		jQuery('.postbox select').each(function(){
			var select = jQuery(this);
			var search_field = '<br style="display:block;clear:both;width:100%;"><label>' + langSearch + '</label><br><input type="text" class="postbox-search-field" id="'+select.attr('id')+'_search">';
			select.after(search_field);
		});
	}
};