/* Extend jQuery with functions for PUT and DELETE requests. */
function _ajax_request(url, data, callback, type, method) {
    if (jQuery.isFunction(data)) {
        callback = data;
        data = {};
    }
    return jQuery.ajax({
        type: method,
        url: url,
        data: data,
        success: callback,
        dataType: type
        });
}
jQuery.extend({
    put: function(url, data, callback, type) {
        return _ajax_request(url, data, callback, type, 'PUT');
    },
    delete_: function(url, data, callback, type) {
        return _ajax_request(url, data, callback, type, 'DELETE');
    }
});


/*
 * jQuery plugin: fieldSelection - v0.1.0 - last change: 2006-12-16
 * (c) 2006 Alex Brem <alex@0xab.cd> - http://blog.0xab.cd
 */
(function() {
	var fieldSelection = {
		getSelection: function() {
			var e = this.jquery ? this[0] : this;
			return (
				/* mozilla / dom 3.0 */
				('selectionStart' in e && function() {
					var l = e.selectionEnd - e.selectionStart;
					return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
				}) ||
				/* exploder */
				(document.selection && function() {
					e.focus();
					var r = document.selection.createRange();
					if (r === null) {
						return { start: 0, end: e.value.length, length: 0 };
					}
					var re = e.createTextRange();
					var rc = re.duplicate();
					re.moveToBookmark(r.getBookmark());
					rc.setEndPoint('EndToStart', re);
					return { start: rc.text.length, end: rc.text.length + r.text.length, length: r.text.length, text: r.text };
				}) ||
				/* browser not supported */
				function() {
					return { start: 0, end: e.value.length, length: 0 };
				}
			)();
		},

		replaceSelection: function() {
			var e = this.jquery ? this[0] : this;
			var text = arguments[0] || '';
			return (
				/* mozilla / dom 3.0 */
				('selectionStart' in e && function() {
					e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
					return this;
				}) ||
				/* exploder */
				(document.selection && function() {
					e.focus();
					document.selection.createRange().text = text;
					return this;
				}) ||
				/* browser not supported */
				function() {
					e.value += text;
					return this;
				}
			)();
		}
	};
	jQuery.each(fieldSelection, function(i) { jQuery.fn[i] = this; });
})();
/*
 * jQuery Flickr - jQuery plug-in
 * Version 1.0, Released 2008.04.17
 *
 * Copyright (c) 2008 Daniel MacDonald (www.projectatomic.com)
 * Dual licensed GPL http://www.gnu.org/licenses/gpl.html 
 * and MIT http://www.opensource.org/licenses/mit-license.php
 */
(function($) {
$.fn.flickr = function(o){
var s = {
    api_key: null,              // [string]    required, see http://www.flickr.com/services/api/misc.api_keys.html
    type: null,                 // [string]    allowed values: 'photoset', 'search', default: 'flickr.photos.getRecent'
    photoset_id: null,          // [string]    required, for type=='photoset'  
    text: null,			            // [string]    for type=='search' free text search
    user_id: null,              // [string]    for type=='search' search by user id
    group_id: null,             // [string]    for type=='search' search by group id
    tags: null,                 // [string]    for type=='search' comma separated list
    tag_mode: 'any',            // [string]    for type=='search' allowed values: 'any' (OR), 'all' (AND)
    sort: 'relevance',    // [string]    for type=='search' allowed values: 'date-posted-asc', 'date-posted-desc', 'date-taken-asc', 'date-taken-desc', 'interestingness-desc', 'interestingness-asc', 'relevance'
    thumb_size: 's',            // [string]    allowed values: 's' (75x75), 't' (100x?), 'm' (240x?)
    size: null,                 // [string]    allowed values: 'm' (240x?), 'b' (1024x?), 'o' (original), default: (500x?)
    per_page: 100,              // [integer]   allowed values: max of 500
    page: 1,     	              // [integer]   see paging notes
    attr: '',                   // [string]    optional, attributes applied to thumbnail <a> tag
    api_url: null,              // [string]    optional, custom url that returns flickr JSON or JSON-P 'photos' or 'photoset'
    params: '',                 // [string]    optional, custom arguments, see http://www.flickr.com/services/api/flickr.photos.search.html
    api_callback: '?',          // [string]    optional, custom callback in flickr JSON-P response
    callback: null              // [function]  optional, callback function applied to entire <ul>

    // PAGING NOTES: jQuery Flickr plug-in does not provide paging functionality, but does provide hooks for a custom paging routine
    // within the <ul> created by the plug-in, there are two hidden <input> tags, 
    // input:eq(0): current page, input:eq(1): total number of pages, input:eq(2): images per page, input:eq(3): total number of images
    
    // SEARCH NOTES: when setting type to 'search' at least one search parameter  must also be passed text, user_id, group_id, or tags
    
    // SIZE NOTES: photos must allow viewing original size for size 'o' to function, if not, default size is shown
  };
  if(o) $.extend(s, o);
  return this.each(function(){
    // create unordered list to contain flickr images
		var list = $('<ul>').appendTo(this);
    var url = $.flickr.format(s);
		$.getJSON(url, function(r){
      if (r.stat != "ok"){
        for (i in r){
	        $('<li>').text(i+': '+ r[i]).appendTo(list);
        };
      } else {
        if (s.type == 'photoset') r.photos = r.photoset;
        // add hooks to access paging data
        list.append('<input type="hidden" value="'+r.photos.page+'" />');
        list.append('<input type="hidden" value="'+r.photos.pages+'" />');
        list.append('<input type="hidden" value="'+r.photos.perpage+'" />');
        list.append('<input type="hidden" value="'+r.photos.total+'" />');
        for (var i=0; i<r.photos.photo.length; i++){
          var photo = r.photos.photo[i];
          // format thumbnail url
          var t = 'http://farm'+photo['farm']+'.static.flickr.com/'+photo['server']+'/'+photo['id']+'_'+photo['secret']+'_'+s.thumb_size+'.jpg';
          //format image url
          var h = 'http://farm'+photo['farm']+'.static.flickr.com/'+photo['server']+'/'+photo['id']+'_';
          switch (s.size){
            case 'm':
              h += photo['secret'] + '_m.jpg';
              break;
            case 'b':
              h += photo['secret'] + '_b.jpg';
              break;
            case 'o':
              if (photo['originalsecret'] && photo['originalformat']) {
                h += photo['originalsecret'] + '_o.' + photo['originalformat'];
              } else {
                h += photo['secret'] + '_b.jpg';
              };
              break;
            default:
              h += photo['secret'] + '.jpg';
          };
          list.append('<li><a href="'+h+'" '+s.attr+' title="'+photo['title']+'"><img src="'+t+'" alt="'+photo['title']+'" /></a></li>');
        };
        if (s.callback) s.callback(list);
      };
		});
  });
};
// static function to format the flickr API url according to the plug-in settings 
$.flickr = {
    format: function(s){
        if (s.url) return s.url;
        var url = 'http://api.flickr.com/services/rest/?format=json&jsoncallback='+s.api_callback+'&api_key='+s.api_key;
        switch (s.type){
            case 'photoset':
                url += '&method=flickr.photosets.getPhotos&photoset_id=' + s.photoset_id;
                break;
            case 'search':
                url += '&method=flickr.photos.search&sort=' + s.sort;
                if (s.user_id) url += '&user_id=' + s.user_id;
                if (s.group_id) url += '&group_id=' + s.group_id;
                if (s.tags) url += '&tags=' + s.tags;
                if (s.tag_mode) url += '&tag_mode=' + s.tag_mode;
                if (s.text) url += '&text=' + s.text;
                break;
            default:
                url += '&method=flickr.photos.getRecent';
        };
        if (s.size == 'o') url += '&extras=original_format';
        url += '&per_page=' + s.per_page + '&page=' + s.page + s.params;
        return url;
    }
};
})(jQuery);