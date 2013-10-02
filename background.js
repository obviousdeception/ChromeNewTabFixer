//based on "Page action by URL" example at:
//http://developer.chrome.com/extensions/samples.html#

function isUrlNewTab(url){
	if( url ){
		return url.match(/google\.com\/webhp\?sourceid=chrome-instant/g) ;
	}
    return false;
}

function isTitleNewTab(title){
	return (title == "New Tab");
}

function processTabAction(tab){
	//check to make sure this is the New Tab page
	if( isUrlNewTab(tab.url) && isTitleNewTab(tab.title) ){
		//hide the most-visited section
		chrome.tabs.executeScript(tab.id, {code:"document.getElementById('most-visited').style.display = 'none'"});

	}
};

// Called when the url of a tab changes.
function handleTabUrlChange(tabId, changeInfo, tab) { 	
	processTabAction(tab);
};

// Called when the new tab is created.
function handleNewTabCreated(tab) {
	processTabAction(tab);
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(handleTabUrlChange);
chrome.tabs.onCreated.addListener(handleNewTabCreated);