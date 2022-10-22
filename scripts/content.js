function getCurrentTabUrl(callback) {  
    var queryInfo = {
      active: true, 
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0];
      var url = "";
      var tmp = document.createElement ('a');
;     tmp.href = tab.url;
      url = tmp.hostname;
      var numPeriods = (url.split(".").length - 1);

      
      if (numPeriods === 3) {
        url = url.split(".")[1];
        url = url.split(".")[1];
        url = url.split(".")[0];
      } else if (numPeriods === 2) {
        url = url.split(".")[1];
        url = url.split(".")[0];
      } else {
        url = url.split(".")[0];
      }


      callback(url);
    });
  }
  
  function renderURL(statusText) {
    document.getElementById('status').textContent = statusText;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url) {
      renderURL(url); 
    });
  });
/*chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      alert(tabs[0].url);
   }
);
(() => {
    let currentSite = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, siteId } = obj;

        if (type === "NEW") {
            currentSite = siteId;
            newSiteLoaded();
        }
    });
})*/