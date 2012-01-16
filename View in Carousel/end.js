$.fn.outerHTML = function() {
    return $(this).clone().wrap('<div>').parent().html();
};

function getMediaID(theMessageEvent) {
	if (theMessageEvent.request === "theInstagramData") {
		var mediaID = theMessageEvent.data.media_id;
		var authorID = theMessageEvent.data.author_id
		
		// Link the photo with the URL scheme
		var currentPhotoHTML = $('img.photo:first').outerHTML();
		var newPhotoHTML = '<a href=\"x-mobelux-carousel://openmedia?mediaID=' + mediaID + '\" title=\"View photo in Carousel\">' + currentPhotoHTML + '</a>';
		$('img.photo:first').replaceWith(newPhotoHTML);
		
		// Get username and link with the URL scheme
		var usernameElement = $('.username:first');
		var usernameText = usernameElement.text();
		var currentAuthorNameHTML = usernameElement.outerHTML();
		var newAuthorNameHTML = '<a href=\"x-mobelux-carousel://openuser?userID=' + authorID + '\" title=\"View ' + usernameText + ' in Carousel\">' + currentAuthorNameHTML + '</a>';
		usernameElement.replaceWith(newAuthorNameHTML);
		
		// Link the author avatar with the URL scheme
		var currentAuthorHTML = $('img.profile-picture:first').outerHTML();
		var newAuthorHTML = '<a href=\"x-mobelux-carousel://openuser?userID=' + authorID + '\" title=\"View ' + usernameText + ' in Carousel\">' + currentAuthorHTML + '</a>';
		$('img.profile-picture:first').replaceWith(newAuthorHTML);
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