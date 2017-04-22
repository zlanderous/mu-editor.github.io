/**
 * @fileoverview This file executes on load and is meant to check if the help
 *     page is the latest version and inject warnings into the page if not.
 */

'use strict';

(function() {
  // RegEx in semverRegex() function © Sindre Sorhus, MIT licensed
  // From https://github.com/sindresorhus/semver-regex
  var semverRegex = function () {
    return /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?\b/ig;
  };

  var semverNumbersOnly = function(verStr) {
    // Simple rules here, remove prepended 'v' and appended '-identifier'
    var verArray = verStr.split('.');
    if (verArray[0].startsWith('v')) {
      verArray[0] = verArray[0].substring(1);
    }
    verArray[2] = verArray[2].split('-')[0];
    return verArray.join('.');
  };

  var getUrlVersion = function() {
    var urlPath = window.location.pathname.split('/');
    for (var i = 0; i < urlPath.length; i++) {
      if (semverRegex().test(urlPath[i])) {
        return semverNumbersOnly(semverRegex().exec(urlPath[i])[0]);
      }
    }
    return null;
  };

  var getLatestReleaseVersion = function(cb) {
    // Setup a dummy console if window.console.error is unavaliable
    if (typeof console === "undefined") window.console = {};
    if (typeof console.error === "undefined") {
      console.error = function () {
        // Do nothing
      };
    }
    // Set a simple callback if none was provided
    if (typeof cb === "undefined") {
      cb = function (ver) {
        console.error('Latest Version is: ' + ver + '. No callback provided.');
      };
    }
    // On the basis Mu doesn't run on XP, IE6 support is irrelavent
    var xhr = new XMLHttpRequest();
    // We want the lastest release (doesn't include draft or preview releases)
    xhr.open('GET', 'https://api.github.com/repos/mu-editor/mu/releases/latest');
    xhr.onload = function() {
      // We got the data
      if (xhr.status === 200) {
        var lastest = {};
        try {
          // IE6 & IE7 support is superfluous
          lastest = JSON.parse(xhr.responseText);
        } catch (e) {
          console.error('Unable to parse release information', e);
        }
        // Run the callback
        cb(semverRegex().test(lastest.tag_name) ? semverNumbersOnly(semverRegex().exec(lastest.tag_name)[0]) : null);
      } else {
        // Something went wrong. Fail quietly
        console.error('Unable to fetch release information');
      }
    };
    // Unable to fetch (Blocked by filter, CORs or network error)
    xhr.onerror = function (err) {
      console.error('Unable to fetch release information', err);
    };
    // Send the request
    xhr.send();
  };

  var isVersionLowerThan = function(baseVersion, compareVersion) {
    // Version strings checked before, we trust they are formatted correctly
    var verBase = baseVersion.split('.');
    var verCompare = compareVersion.split('.');
    return (verBase[0] < verCompare[0]) || (verBase[1] < verCompare[1]) ||
           (verBase[2] < verCompare[2]);
  };

  window.addEventListener('load', function load(event) {
    window.removeEventListener('load', load, false);
    var helpInjectDiv = document.getElementById('mu-help-header-inject');
    if (helpInjectDiv) {
      var urlVersion = getUrlVersion();
      getLatestReleaseVersion(function (latestVersion) {
        if (urlVersion && latestVersion && isVersionLowerThan(urlVersion, latestVersion)) {
          helpInjectDiv.innerHTML = [
              '<div class="alert alert-danger" role="alert">',
              '  <h2><strong>Update Mu!</strong></h2>',
              '  <p>You appear to be using an old version of Mu. Please <a href="https://codewith.mu" target="_blank">download the latest version (' + latestVersion + ')</a>.</p>',
              '</div>',
              '<div role="alert" class="alert alert-warning">',
              '  <h2><strong>This is not the latest Documentation!</strong></h2>',
              '  <p>This documentation corresponds to Mu version (' + urlVersion + ') which seems to be what you are using, however documentation for newer versions of Mu might contain more content and troubleshooting information.</p>',
              '  <p><a href="/help">View documentation for latest version of Mu.</a></p>',
              '</div>'].join('\n');
        }
      });
    }
  });
})();
