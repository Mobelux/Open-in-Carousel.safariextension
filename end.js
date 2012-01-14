$.fn.outerHTML = function() {
    return $(this).clone().wrap('<div>').parent().html();
};

function getMediaID(theMessageEvent) {
	if (theMessageEvent.name === "theMediaID") {
		var mediaID = theMessageEvent.message;
		
		// Link the photo with the URL scheme
		var currentPhotoHTML = $('img.photo:first').outerHTML();
		var newPhotoHTML = '<a href=\"x-mobelux-carousel://openmedia?mediaID=' + mediaID + '\" title=\"View photo in Carousel\">' + currentPhotoHTML + '</a>';
		$('img.photo:first').replaceWith(newPhotoHTML);
		
   }
}

safari.self.addEventListener("message", getMediaID, false);

if (window.top === window) {
	// Tell global.html to start fetching Instagram data
	safari.self.tab.dispatchMessage("startInstagramFetch", document.URL);
}

function wrapPhotoWithCarouselURL(mediaID) {
	if (window.top === window) {
		var currentPhotoHTML = $('body').html();
		alert(currentPhotoHTML);
	}
}