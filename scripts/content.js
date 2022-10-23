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
      var redflag = document.getElementById('the-green-flag');
      redflag.parentNode.removeChild(redflag);
      document.getElementById('heres-why-prompt').textContent = "red flags:";
      document.getElementById('heres-why').textContent = "";
      for (let i = 0; i < 4; i++) {
        document.getElementById('heres-why').textContent += ('\n' + "● " + websites_to_check[siteUrl][0][i]);
      }
      document.getElementById('recommendations').textContent = websites_to_check[siteUrl][1];
      document.getElementById('recommendations').style.fontStyle = "italic";
    } else {
      var greenflag = document.getElementById('the-red-flag');
      greenflag.parentNode.removeChild(greenflag);
      document.getElementById('ethics').textContent = "approved!";
      document.getElementById('ethics').style.fontStyle = "italic";
      var theBar = document.getElementById('bottom-row');
      theBar.parentNode.removeChild(theBar);
      var remove = document.getElementById('remove_or_not');
      remove.parentNode.removeChild(remove);
    }
    
  }

const websites_to_check = {
  "nestle": [["slave labor", "child labor", "harms environment", "water thieves"], ["Earth's Best Organic"]],
  "bp": [["unsafe workspace", "harms environment"],["Z energy"]],
  "facebook": [["electricity usage", "tax avoidance", "censorship policies", "mishandling of user data"],["Reddit"]],
  "bayer": [["false advertisement"], []],
  "amazon": [["misleading reviews", "poor working conditions", "product scams", "tax avoidance", "worker exploitation", "animal testing", "harms environment", "controversial technologies"],["Better World Books"]],
  "db": [["falsified records", "tax avoidance", "money laundering"],[]],
  "hsbc": [["indigenous rights violations", "money laundering", "harms environment"],[]],
  "coca-cola": [["harms environment", "racial discrimination", "animal cruelty", "anti-abortion donations"],["Aura Bora"]],
  "google": [["tax avoidance", "mishandling of user data", "privacy violations", "censorship policies", "lax advertising content controls"],["Ecosia"]],
  "costco": [["pressured and humiiated workers", "animal cruelty", "chicken's inhumane treatment"],["Aldi"]],
  "popeyes": [],
  "chickfila": [],
  "apple": [["extreme working conditions", "use of deadly chemicals", "child-labour abuses"],["Fairphone"]],
  "shein": [[],["Kotn"]],
  "nike": [[],["Hylo Aesthetics"]],
  "tencent": [[],["Good Eggs"]],
  "activision": [["discriminated female workers", "psychological tormentation of female workers"],["Nintendo"]],
  "comcast": [[],["Liberty Global"]],
  "peta": [["sexist", "promote euthanasia"],["Animal Liberation Front"]],
  "cargill": [["contaminated meat"],["Mosa Meat"]],
  "koch": [],
  "conagra": [],
  "corteva": [],
  "pfizer": [],
  "walmart": [["hurts local communities", "foreign and child labor", "discrimination against women and workers with dissabilities"],["Trader Joe's"]],
  "twitter": [[],["Reddit"]],
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
  "primark": [[],["girlfriend collective"]],
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
  "childrensplace": [["bellabu bear"]],
  "regmovies": [],
  "mcdonalds": [],
  "belk": [],
  "sears": [],
  "kroger": [],
  "hollister": [["body shamming", "negative body images", "promote a toxic beauty standard"],["ADIDAS"]],
  "gap": [["poor working conditions", "child labor", "worker exploitation"],["VETTA"]],
  "cvs": [["false advertisement", "lack of proper research", "worker exploitation"],[]],
  "kmart": [["worker exploitation", "child labor", "poor working conditions"],[]]
}
