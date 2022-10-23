function getCurrentTabUrl(callback) {  
    var queryInfo = {
      active: true, 
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0];
      var url = "";
      var tmp = document.createElement ('a');
      tmp.href = tab.url;
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
      for (let i = 0; i < 4 && i < websites_to_check[siteUrl][0].length; i++) {
        document.getElementById('heres-why').textContent += ('\n' + "● " + websites_to_check[siteUrl][0][i]);
      }
      document.getElementById('recommendations').textContent = websites_to_check[siteUrl][1];
      document.getElementById('recommendations').style.fontStyle = "italic";
      var theLink = document.getElementById('recommendations-link');
      var clean = websites_to_check[siteUrl][2][0];
      console.log(clean)
      theLink.href = clean;
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
  "nestle": [["slave labor", "child labor", "harms environment", "water thieves"], ["Earth's Best Organic"],["https://www.earthsbest.com/"]],
  "bp": [["unsafe workspace", "harms environment"],["Z energy"],["https://www.z.co.nz/"]],
  "facebook": [["electricity usage", "tax avoidance", "censorship policies", "mishandling of user data"],["Reddit"],["https://www.reddit.com/"]],
  "bayer": [["false advertisement"], ["takeda"],["https://www.takeda.com/en-us/"]],
  "amazon": [["misleading reviews", "poor working conditions", "product scams", "tax avoidance", "worker exploitation", "animal testing", "harms environment", "controversial technologies"],["Better World Books"],["https://www.betterworldbooks.com/"]],
  "db": [["falsified records", "tax avoidance", "money laundering"],["U-bahn"],["https://www.berlin.de/en/public-transportation/1742343-2913840-underground-subway.en.html"]],
  "hsbc": [["indigenous rights violations", "money laundering", "harms environment"],["BOA"],["https://www.bankofamerica.com/"]],
  "coca-cola": [["harms environment", "racial discrimination", "animal cruelty", "anti-abortion donations"],["Aura Bora"],["https://aurabora.com/"]],
  "google": [["tax avoidance", "mishandling of user data", "privacy violations", "censorship policies", "lax advertising content controls"],["Ecosia"],["https://www.ecosia.org/?c=en"]],
  "costco": [["pressured and humiiated workers", "animal cruelty", "chicken's inhumane treatment"],["Aldi"],["https://www.aldi.us/"]],
  "popeyes": [["animal cruelty "],["The crack shack"],["https://www.crackshack.com/"]],
  "chickfila": [["anti-LGBTQ+", "animal cruelty"],["The crack shack"],["https://www.crackshack.com/"]],
  "apple": [["extreme working conditions", "use of deadly chemicals", "child-labour abuses"],["Fairphone"],["https://www.fairphone.com/en/"]],
  "shein": [["child labor", "slave labor", "unsafe workspace", "poor working conditions", "harms environment", "worker exploitation"],["Kotn"],["https://kotn.com/"]],
  "nike": [["poor working conditions", "unsafe workspace", "worker exploitation"],["Hylo Aesthetics"],["https://hylotoglow.co.uk/"]],
  "tencent": [["controversial technologies", "harms environment", "mishandling of user data"],["Good Eggs"],["https://www.goodeggs.com/home"]],
  "activision": [["discriminated female workers", "psychological tormentation of female workers"],["Nintendo"],["https://www.nintendo.com/"]],
  "comcast": [["mishandling of user data", "worker exploitation"],["Liberty Global"],["https://www.libertyglobal.com/"]],
  "peta": [["sexist", "promote euthanasia"],["Animal Liberation Front"],["https://www.petside.com/animal-liberation-front/"]],
  "cargill": [["contaminated meat"],["Mosa Meat"],["https://mosameat.com/"]],
  "koch": [["harms environment", "misleading information"],["ThyssenKrupp"],["https://www.thyssenkrupp.com/en/home"]],
  "conagra": [["harms environment", "worker exploitation"],["Island bakery"],["https://www.islandbakery.scot/the-island-bakery-story/"]],
  "corteva": [["deathly chemical use", "misleading information"],["Bayer"],["https://mosameat.com/"]],
  "pfizer": [["corrupt marketing practices", "lack of proper research"],["Eli Lilly and Co."],["https://www.lilly.com/"]],
  "walmart": [["child labor", "sex discrimination", "disability discrimination", "worker exploitation"],["Trader Joe's"],["https://www.traderjoes.com/home"]],
  "twitter": [["censorship policies", "mishandling of user data"],["Reddit"],["https://www.reddit.com/"]],
  "disney": [["anti-union stance", "slave labor", "worker exploitation", "lack of diversity"],["Woobles"],["https://thewoobles.com/"]],
  "tesla": [["unsafe workspace", "corrupt marketing practices", "worker exploitation", "harms environment"],["Audi"],["https://www.audiusa.com/us/web/en.html"]],
  "hugoboss": [["slave labor", "worker exploitation", "unsafe workspace", "sex discrimination"],["Habibi"],["https://forhabibi.com/"]],
  "boohoo": [["worker exploitation", "harms environment", "animal cruelty"],["Seasalt Cornwall"],["https://www.seasaltcornwall.com/"]],
  "forever21": [["animal cruelty", "worker exploitation", "harms environment", "slave labor", "child labor"],["FarmRio"],["https://www.farmrio.com/"]],
  "zara": [["harms environment", "worker exploitation", "unsafe workspace", "animal testing", "child labor", "slave labor"],["Pact"],["https://wearpact.com/"]],
  "hm": [["unsafe workspace", "worker exploitation", "harms environment", "anti-union stance", "child labor", "slave labor"],["Sézane"],["https://www.sezane.com/us"]],
  "victoriassecret": [["lack of diversity", "sex discrimination", "worker exploitation", "poor working conditions"],["Spanks"],["https://spanx.com/"]],
  "mango": [["animal cruelty", "harms environment"],["Patagonia"],["https://www.patagonia.com/home/"]],
  "urbanoutfitters": [["worker exploitation", "harms environment", "animal cruelty", "racial discrimination"],["tentree"],["https://www.tentree.com/"]],
  "primark": [["poor working conditions", "harms environment", "worker exploitation", "tax avoidance", "animal testing"],["Girlfriend Collective"],["https://girlfriend.com/"]],
  "missguided": [["tax avoidance", "animal cruelty", "worker exploitation", "poor working conditions", "harms environment"],["BEEN london"],["https://been.london/"]],
  "fashionnova": [["poor working conditions", "worker exploitation", "child labor", "misleading information"],["Mother of Pearl"],["https://motherofpearl.co.uk/"]],
  "americaneagle": [["worker exploitation", "animal testing", "harms environment"],["337 BRAND"],["https://www.337brand.com/"]],
  "uniqlo": [["worker exploitation", "unsafe workspace", "harms environment"],["Katla"],["https://katla.com/"]],
  "romwe": [["harms environment", "worker exploitation", "unsafe workspace"],["ADAY"],["https://www.thisisaday.com/"]],
  "zaful": [["worker exploitation", "harms environment"],["People tree"],["https://www.peopletree.co.uk/"]],
  "hottopic": [["worker exploitation", "harms environment"],["aramco"],["https://www.aramco.com/"]],
  "cos": [["worker exploitation", "poor working conditions", "lack of diversity"],["Nudie jeans"],["https://www.nudiejeans.com/"]],
  "dillards": [["sex discrimination", "unsafe workspace", "harms environment", "disability discrimination"],["A SUSTAINABLE SEPT. STORE"],["https://sustainabledepartmentstore.com/"]],
  "familydollar": [["unsafe workspace", "worker exploitation"],["Trader Joe's"],["https://www.traderjoes.com/home"]],
  "childrensplace": [["racial discrimination", "harms environment", "worker exploitation"],["Bellabu Bear"],["https://bellabubear.com/"]],
  "mcdonalds": [["poor working conditions", "harms environment", "animal cruelty"],["Rubio's"],["https://www.rubios.com/"]],
  "kroger": [["poor working conditions", "animal cruelty"],["Trader Joe's"],["https://www.traderjoes.com/home"]],
  "hollister": [["body shamming", "negative body images", "promote a toxic beauty standard"],["ADIDAS"],["https://www.adidas.com/us"]],
  "gap": [["poor working conditions", "child labor", "worker exploitation"],["VETTA"],["https://www.vettacapsule.com/"]],
  "cvs": [["false advertisement", "lack of proper research", "worker exploitation"],["EcoloPharm"],["https://www.ecolopharm.com/en/"]],
  "kmart": [["worker exploitation", "child labor", "poor working conditions"],["Rothy's"],["https://rothys.com/"]]
}
