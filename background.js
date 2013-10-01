//based on "Page action by URL" example at:
//http://developer.chrome.com/extensions/samples.html#


function isUrlNewTab(url){
    return true;
}

function isTitleNewTab(title){
    return (title == "New Tab");
}

function processTabAction(tab){
 //check to make sure this is the New Tab page
 if( isUrlNewTab(tab.url) && isTitleNewTab(tab.title) ){
    // alert(tab.status);
     //hide the most-visited section
     chrome.tabs.executeScript(tab.id, {code:"document.getElementById('most-visited').style.display = 'none'"});
 //alert(tab.url);
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