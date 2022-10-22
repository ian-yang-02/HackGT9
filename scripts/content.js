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
    if (siteUrl in websites_to_check) {
      document.getElementById('heres-why').textContent = "here's why:"
      for (let i = 0; i < 4; i++) {
        //var tbodyRef = document.getElementById('bad-reasons').getElementsByTagName('tbody')[0];

        // Insert a row at the end of table
        //var newRow = tbodyRef.insertRow();

        // Insert a cell at the end of the row
        //var newCell = newRow.insertCell();

        // Append a text node to the cell
        var newText = document.createTextNode(websites_to_check[siteUrl][0][i]);
        //newCell.appendChild(newText);
        document.getElementById('heres-why').textContent += ('\n' + websites_to_check[siteUrl][0][i]);
      }
      document.getElementById('recommendations').textContent = websites_to_check[siteUrl][1];
      document.getElementById('recommendations').style.fontStyle = "italic";
      var redflag = document.getElementById('the-green-flag');
      redflag.parentNode.removeChild(redflag);
    } else {
      document.getElementById('ethics').textContent = "approved!";
      document.getElementById('ethics').style.fontStyle = "italic";
      var theBar = document.getElementById('bottom-row');
      theBar.parentNode.removeChild(theBar);
      var remove = document.getElementById('remove_or_not');
      remove.parentNode.removeChild(remove);
      var greenflag = document.getElementById('the-red-flag');
      greenflag.parentNode.removeChild(greenflag);
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

const websites_to_check = {
  "monsanto": [],
  "nestle": [["slave labor", "child labor", "harms environment", "water thieves"], ["Earth's Best Organic"]],
  "bp": [["unsafe workspace", "harms environment"],["Z energy"]],
  "facebook": [["electricity usage", "tax avoidance", "real-name user requirement policies", "censorship policies", "mishandling of user data"],["Reddit"]],
  "bayer": [["false advertisement"], []],
  "amazon": [["misleading reviews", "poor working conditions", "product scams", "tax avoidance", "worker exploitation", "animal testing", "harms environment", "controversial technologies"],[]],
  "db": [],
  "hsbc": [],
  "coca-cola": [],
  "google": [],
  "costco": [],
  "popeyes": [],
  "chickfila": [],
  "apple": [],
  "shein": [],
  "nike": [],
  "tencent": [],
  "activision": [],
  "comcast": [],
  "peta": [],
  "cargill": [],
  "koch": [],
  "conagra": [],
  "conrteva": [],
  "pfizer": [],
  "walmart": [],
  "twitter": [],
  "disney": [],
  "att": [],
  "jnj": [],
  "tesla": [],
  "hugoboss": [],
  "boohoo": [],
  "forever21": [],
  "zara": [],
  "hm": [],
  "victoriassecret": [],
  "mango": [],
  "urbanoutfitters": [],
  "primark": [],
  "missguided": [],
  "fashionnova": [],
  "americaneagle": [],
  "uniqlo": [],
  "romwe": [],
  "zaful": [],
  "hottopic": [],
  "cos": [],
  "dillards": [],
  "familydollar": [],
  "childrensplace": [],
  "regmovies": [],
  "mcdonalds": [],
  "belk": [],
  "sears": [],
  "kroger": [],
  "hollister": [],
  "gap": [],
  "cvs": [["false advertisement", "lack of proper research", "worker exploitation"],[]],
  "kmart": [["worker exploitation", "child labor", "poor working conditions"],[]]
}

const websites_to_recommend =[
  "abercrombie"
]
