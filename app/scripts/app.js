
(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered

    // getData();
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  addEventListener('paper-header-transform', function(e) {
    var appName = document.querySelector('#mainToolbar .app-name');
    var middleContainer = document.querySelector('#mainToolbar .middle-container');
    var bottomContainer = document.querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1-maxMiddleScale))  + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onDataRouteClick = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    document.getElementById('mainContainer').scrollTop = 0;
  };

  app._equal = function(value1, value2) {
    return value1 === value2;
  };

  app.handleResponse = function(aa, bb, cc) {
    console.log(aa);
    console.log(bb);
    console.log(cc);
  };

  // var createXhr = function(method, url) {
  //   var xhr = new XMLHttpRequest();
  //
  //   if (!('withCredentials' in xhr)) {
  //     alert('Browser does not support CORS.');
  //     return;
  //   }
  //
  //   xhr.onerror = function() {
  //     alert('There was an error.');
  //   };
  //
  //   xhr.open(method, url, true);
  //
  //   return xhr;
  // };


  // var getData = function() {
  //   var xhr = createXhr('GET', 'http://127.0.0.1:3000/api');
  //   xhr.setRequestHeader('Timezone-Offset', new Date().getTimezoneOffset());
  //   xhr.setRequestHeader('Sample-Source', 'CORS in Action');
  //   // xhr.setRequestHeader('Cache-Control', 'max-age=100');
  //   xhr.setRequestHeader("Content-Type", "application/json");
  //   xhr.onload = function() {
  //     var data = JSON.parse(xhr.responseText);
  //
  //     console.log(data);
  //   };
  //   xhr.send();
  // };

})(document);
