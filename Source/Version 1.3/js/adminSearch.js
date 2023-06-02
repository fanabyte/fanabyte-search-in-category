jQuery(document).ready(function(){
	fanabyteSearchInCategory.init();
});

var fanabyteSearchInCategory = {
	init : function(){
		const langResetSearchResult = fanabyteSearchInCategory.lang.resetSearchResults ? fanabyteSearchInCategory.lang.resetSearchResults : "Reset Search Results";

		jQuery.expr[':'].Contains = function(a, i, m) {
		  return jQuery(a).text().toUpperCase()
			  .indexOf(m[3].toUpperCase()) >= 0;
		};

		jQuery('body').on('change keyup', '.meta-box-search-field', function(){
			var s = jQuery(this).val();
			if ( jQuery.trim(s) == "" )
			{
				jQuery(this).parents('.inside').find('.categorydiv').first().find('.categorychecklist li').show();
			}
			else
			{
				var result = jQuery(this).parents('.inside').find('.categorydiv').first().find('.categorychecklist li:Contains("'+s+'")');
		
				jQuery(this).parents('.inside').find('.categorydiv').first().find('.categorychecklist li').hide();
				result.each(function(){
					jQuery(this).show();
					if (fanabyteSearchInCategory.showSubcategories) {
						jQuery(this).find('ul li').show();
					}
				});
			}
		});

		jQuery('body').on('click', '.clear-meta-box-search-field', function(e){
			e.preventDefault();
			jQuery(this).parents('.hide-if-no-js').find('.meta-box-search-field').val('');
			jQuery(this).parents('.hide-if-no-js').find('.meta-box-search-field').trigger('keyup');
		});

		jQuery('body').on('click', '.meta-box-show-all-link', function(e){
			e.preventDefault();
			
			jQuery(this).parents('.categorydiv').first().find('.categorychecklist li').show();
			jQuery(this).parents('.categorydiv').find('.meta-box-search-field').val('');
		});

		jQuery('.categorydiv').each(function(){
			jQuery(this).append('<p><a href="javascript:void(0);" class="meta-box-show-all-link">' + langResetSearchResult + '</a></p>');
		});

		jQuery('body').on('change keyup', '.postbox-search-field', function(){
			var s = jQuery(this).val();
			if ( jQuery.trim(s) == "" )
			{
				jQuery(this).parents('.inside').find('select').find('option').show();
			}
			else
			{
				var result = jQuery(this).parents('.inside').find('select option:Contains("'+s+'")');
		
				jQuery(this).parents('.inside').find('select option').hide();
				result.each(function(){
					jQuery(this).show();
					if (fanabyteSearchInCategory.showSubcategories) {
						jQuery(this).find('ul li').show();
					}
				});
			}
		});
	},

	lang: {}
};