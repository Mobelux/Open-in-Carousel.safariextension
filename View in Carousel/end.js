$.fn.outerHTML = function() {
    return $(this).clone().wrap('<div>').parent().html();
};

function getMediaID(theMessageEvent) {
	if (theMessageEvent.request === "theInstagramData") {
		var mediaID = theMessageEvent.data.media_id;
		var authorID = theMessageEvent.data.author_id;
		var authorName = theMessageEvent.data.author_name;
		
		// Link the photo with the URL scheme
		var currentPhotoHTML = $('img.photo:first').outerHTML();
		var newPhotoHTML = '<a href=\"x-mobelux-carousel://openmedia?mediaID=' + mediaID + '\" title=\"View photo in Carousel\">' + currentPhotoHTML + '</a>';
		$('img.photo:first').replaceWith(newPhotoHTML);
		
		// Link the author avatar with the URL scheme
		var currentUserNameImageHTML = $('.user-avatar:first').outerHTML();
		var newUserNameImageHTML = '<a href=\"x-mobelux-carousel://openuser?userID=' + authorID + '\" title=\"View ' + authorName + ' in Carousel\">' + currentUserNameImageHTML + '</a>';
		$('.user-avatar').replaceWith(newUserNameImageHTML);
   }
}

chrome.extension.onRequest.addListener(
	function(request) {
		getMediaID(request);
	});

if (window.top === window) {
	// Tell global.html to start fetching Instagram data
	chrome.extension.sendRequest({request: "startInstagramFetch", documentURL: document.URL});
}