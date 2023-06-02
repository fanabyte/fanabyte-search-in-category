jQuery(document).ready(function(){
	fanabyteSearchInCategory.categoriesTab.init();
});

fanabyteSearchInCategory.categoriesTab = {
	init : function(){
		const langSearch = fanabyteSearchInCategory.lang.search ? fanabyteSearchInCategory.lang.search : "Search";
		const langGo = fanabyteSearchInCategory.lang.go ? fanabyteSearchInCategory.lang.go : "Go";

		var search_tab = '<li class="hide-if-no-js"><a href="javascript:void(0);" class="search-tab" tabindex="4">' + langSearch + '</a></li>';
		jQuery('.category-tabs').append(search_tab);
		
		jQuery('.search-tab').each(function(){
			var parent_id = jQuery(this).parents('.categorydiv').first().attr('id');
			parent_id = parent_id.substring(9);
			jQuery(this).attr('id', parent_id+'-search-tab');
			jQuery(this).attr('href', '#'+parent_id+'-search');
			
			var search_div = '<div id="'+parent_id+'-search" style="display:none;padding-top:0.9em;" class="tabs-panel">';
			search_div += '<input type="text" name="'+parent_id+'-search-field" id="'+parent_id+'-search-field" class="meta-box-search-field" style="width: calc(100% - 65px); margin-right: 4px;"/>';
			search_div += '<button type="button" id="'+parent_id+'-search-button" class="meta-box-search-button button">' + langGo + '</button>';
			search_div += '<ul id="'+parent_id+'-search-results" class="meta-box-search-results"></ul>';
			search_div += '</div>';
			
			jQuery(search_div).insertBefore(jQuery(this).parents('.categorydiv').first().find('.wp-hidden-children'));
		});
		
		jQuery('body').on('click', '.search-tab', function(e){
			e.preventDefault();
			
			jQuery(this).parents('.categorydiv').find('.category-tabs li').removeClass('tabs');
			jQuery(this).parent().addClass('tabs');
			
			jQuery(this).parents('.categorydiv').find('.tabs-panel').hide();
			jQuery( jQuery(this).attr('href') ).show();
			jQuery( jQuery(this).attr('href') ).find('.meta-box-search-field').focus();
		});
		
		jQuery('body').on('click', '.meta-box-search-button', function(e){
			e.preventDefault();
			
			jQuery(this).parents('.categorydiv').first().find('ul li').first().find('a').trigger('click');
		});
		
		jQuery('.meta-box-search-field').keydown(function(e){
			if(e.keyCode == 13){
				jQuery(this).parents('.categorydiv').find('.meta-box-search-button').click();
				return false;
			}
		});
	}
};