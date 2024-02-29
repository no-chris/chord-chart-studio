"use strict";const n=function(e,o,s){return setTimeout(()=>window.postMessage(e),1e3),s("ok"),!0};chrome.runtime.onMessage.addListener(n);
