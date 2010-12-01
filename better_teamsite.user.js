// ==UserScript==
// @name          javatart.com's better teamsite 
// @author        donaldlittpie
// @version       0.7
// @namespace     http://www.javatarts.com
// @description   Adds links to browse to other teamsite pages. 
// @include       http://*/iw-cc/*
// @include       https://*/iw-cc/*
// ==/UserScript==
//

window.addEventListener('load', function() {
  if (window && window.document && window.document.forms[0]) {
    if (window.document.forms.namedItem('dcreditForm')) {
        wireUpExpandButtons();
    var dcform = window.document.forms.namedItem('dcreditForm');
    for (i = 0; i < dcform.elements.length; i++) {
      var input = dcform.elements[i];
      if (startsWith(input.value, '/templatedata')) {
        addOpenUrl(input); 
      }
    }
    }    
  }
}, false);

// this adds event handlers to all the expand buttons, just in case
// there are hidden paths that are populate after clicked
function wireUpExpandButtons() {
  var result = document.evaluate("//img[@src='/iw-cc/datacapture/images/icn_expand.gif']", document, null, XPathResult.ANY_TIME, null);
  var expandButton = result.iterateNext();
  while (expandButton) {
    expandButton.addEventListener("click", expandClick, true);
    expandButton = result.iterateNext();
  }
}

// is there a way to make this relative to the item that clicked?
function expandClick() {
    var result = document.evaluate('//input', document, null, XPathResult.ANY_TYPE, null);
    var input = result.iterateNext();
    var inputs = [];
    while (input) {
      if (startsWith(input.value,'/templatedata')) {
        inputs.push(input);
      } 
      input = result.iterateNext();
    }

    for (i = 0; i < inputs.length; i++) {
      addOpenUrl(inputs[i]);
    }
}


function addOpenUrl(input) {
  // check and only add once
  if (!document.getElementById(getLinkId(input.id))) {
    var div = document.createElement('div');
    div.id = getLinkId(input.id);
    div.innerHTML = '<a target="_blank" href="' + getViewUrl(window.parent.location.href, input.value) + '" class="iw-base-text-field-label">[View]</a>' +
    '&nbsp;-&nbsp;<a target="_blank" href="' + getEditUrl(window.parent.location.href, input.value)  + '" class="iw-base-text-field-label">[Edit]</a>';
    document.getElementById(input.id).parentNode.appendChild(div);
  }
}


// maybe i should look for this on the page first?
function getLinkId(id) {
  return 'javatarts_' + id;
}

function getEditUrl(url, value) {
  var areapath = document.evaluate('//input[@name="area_path"]', document, null, XPathResult.ANY_TIME, null).iterateNext().value; 
  return getBaseUrl(url) + '/iw-cc/command/iw.group.ccpro.edit?vpath=' + areapath + encodePage(value);
}

function getViewUrl(url, value) {
  var areapath = document.evaluate('//input[@name="area_path"]', document, null, XPathResult.ANY_TIME, null).iterateNext().value; 
  return getBaseUrl(url) + '/iw-cc/command/iw.group.preview_file?vpath=' + areapath + encodePage(value);
}

function getBaseUrl(url) {
  return url.substring(0,url.indexOf('/iw-cc'));
}

function encodePage(page) {
  var lastSlash = page.lastIndexOf('/') + 1; 
  // keeps the first part and encodes the page.  Think about why I cant just encode the whole thing...
  return page.substring(0,lastSlash) + encodeURIComponent(page.substring(lastSlash));
}

function startsWith(str, startWith) {
  return str && str.indexOf(startWith) === 0;
}
