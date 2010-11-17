// ==UserScript==
// @name          javatart.com's better teamsite 
// @namespace     http://www.javatarts.com
// @description   Adds links to browse to other teamsite pages. 
// @include       *
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
  if (!window.document.forms[0]) {
    console.log('blah');
  }
  else {
    console.log('blah2');
    var dcform = window.document.forms[0];
    //console.log(window.document.forms[0]);
    for (i = 0; i < dcform.elements.length; i++) {
      var name = dcform.elements[i].name;
      var value = dcform.elements[i].value;
      if (startsWith(value, '/templatedata')) {
        //  console.log(dcform.elements[i].id + " - " + dcform.elements[i].value);
        var windowurl = window.parent.location.href;
        var mydiv = document.createElement('div');
        // _newtab might be FF only
        mydiv.innerHTML = '<a target="_newtab_'+dcform.elements[i].id+'_'+name+'" href="'+getGoToUrl(windowurl, value)+'" style="font-family: sans-serif">Open</a>';
        document.getElementById(dcform.elements[i].id).parentNode.appendChild(mydiv);
      }
    }
  }
}

function getGoToUrl(url, value) {
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
