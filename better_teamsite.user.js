// ==UserScript==
// @name          javatart.com's better teamsite 
// @namespace     http://www.javatarts.com
// @description   Adds links to browse to other teamsite pages. 
// @include       http://*/iw-cc/*
// @include       https://*/iw-cc/*
// ==/UserScript==
//
// - remove log
// - parameterize '/templatedata'
// - figure out the back button issue, window open issue 
window.addEventListener("load", main, false);

function main() {
  //console.log(window);
  if (window && window.document && window.document.forms[0]) {
    var teamsitePathsInputs = document.evaluate("//input[starts-with(@value,'/templatedata')]", document, null, XPathResult.ANY_TYPE, null);
    var pathInput = teamsitePaths.iterateNext();
    while(pathInput) {
       addOpenUrl(pathInputs);
       pathInput = teamsitePaths.iterateNext();
    }
  }
}

function addOpenUrl(input) {
  var mydiv = document.createElement('div');
  mydiv.innerHTML = '<a target="_newtab_' + pathInputs.id + '_' + pathInputs.name + '" href="' + getUrl(window.parent.location.href, pathInputs.value) + '" style="font-family: sanserif">Open</a>';
  document.getElementById(dcform.elements[i].id).parentNode.appendChild(mydiv);
}

function getUrl(url, value) {
  var newurl = url;
  var index = url.search('/templatedata');

  if (index > -1) {
    newurl = newurl.substring(0,index) + value;  
  }

  return newurl;
}

function startsWith(str, startWith) {
  return str.indexOf(startWith) === 0;
}
