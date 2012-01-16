$.fn.outerHTML = function() {
    return $(this).clone().wrap('<div>').parent().html();
};

function getMediaID(theMessageEvent) {
	if (theMessageEvent.name === "theInstagramData") {
		var mediaID = theMessageEvent.message.media_id;
		var authorID = theMessageEvent.message.author_id
		
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
		//alert(currentAuthorNameHTML);
		
		// Link the author avatar with the URL scheme
		var currentAuthorHTML = $('img.profile-picture:first').outerHTML();
		var newAuthorHTML = '<a href=\"x-mobelux-carousel://openuser?userID=' + authorID + '\" title=\"View ' + usernameText + ' in Carousel\">' + currentAuthorHTML + '</a>';
		$('img.profile-picture:first').replaceWith(newAuthorHTML);
   }
}

safari.self.addEventListener("message", getMediaID, false);

if (window.top === window) {
	// Tell global.html to start fetching Instagram data
	safari.self.tab.dispatchMessage("startInstagramFetch", document.URL);
}