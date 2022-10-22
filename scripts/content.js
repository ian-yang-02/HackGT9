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

      checkForEthics(url);
      callback(url);
    });
  }
  
  function renderURL(statusText) {
    document.getElementById('status').textContent = statusText;
    document.getElementById('status').style.fontStyle = "italic";
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url) {
      renderURL(url); 
    });
  });

  function checkForEthics(siteUrl) {
    if (websites_to_check.includes(siteUrl)) {
      document.getElementById('ethics').textContent = "bad";
      document.getElementById('recommendations').textContent = websites_to_recommend[0];
    } else {
      document.getElementById('ethics').textContent = "approved";
      var remove = document.getElementById('remove_or_not');
      remove.parentNode.removeChild(remove);
    }
    
  }
  
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

const websites_to_check = [
  "monsanto",
  "nestle",
  "bp",
  "facebook",
  "bayer",
  "amazon",
  "db",
  "hsbc",
  "coca-cola",
  "google",
  "costco",
  "popeyes",
  "chickfila",
  "apple",
  "shein",
  "nike",
  "tencent",
  "activision",
  "comcast",
  "peta",
  "cargill",
  "koch",
  "conagra",
  "conrteva",
  "pfizer",
  "walmart",
  "twitter",
  "disney",
  "att",
  "jnj",
  "tesla",
  "hugoboss",
  "boohoo",
  "forever21",
  "zara",
  "hm",
  "victoriassecret",
  "mango",
  "urbanoutfitters",
  "primark",
  "missguided",
  "fashionnova",
  "americaneagle",
  "uniqlo",
  "romwe",
  "zaful",
  "hottopic",
  "cos",
  "dillards",
  "familydollar",
  "childrensplace",
  "regmovies",
  "mcdonalds",
  "belk",
  "sears",
  "kroger",
  "hollister",
  "gap",
  "cvs",
  "kmart"
]

const websites_to_recommend =[
  "abercrombie"
]
