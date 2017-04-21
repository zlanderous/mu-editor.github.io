/**
 * @fileoverview This file executes on load and is meant to check if the help
 *     page is the latest version and inject warnings into the page if not.
 * TODO: Need to use GitHub API to retrieve latest version published
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

  var getLatestReleaseVersion = function() {
    // TODO: This is a hard-coded version string, need to use GH API instead
    var version = "0.9.13";
    return semverRegex().test(version) ? semverRegex().exec(version)[0] : null;
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
      var latestVersion = getLatestReleaseVersion();
      if (urlVersion && latestVersion && isVersionLowerThan(urlVersion, latestVersion)) {
        helpInjectDiv.innerHTML = [
            '<div class="alert alert-danger" role="alert">',
            '  <h2><strong>Update Mu!</strong></h2>',
            '  <p>You appear to be using an old version of Mu. Please <a href="https://codewith.mu" target="_blank">download the latest version</a>.</p>',
            '</div>',
            '<div role="alert" class="alert alert-warning">',
            '  <h2><strong>This is not the latest Documentation!</strong></h2>',
            '  <p>This documentation corresponds to the Mu version you are using, however documentation for newer versions of Mu might contain more content and troubleshooting information.</p>',
            '  <p><a href="/help">View documentation for newest versions of Mu.</a></p>',
            '</div>'].join('\n');
      }
    }
  });
})();
