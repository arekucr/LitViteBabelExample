if(!self.define){let e,s={};const i=(i,t)=>(i=new URL(i+".js",t).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(t,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let c={};const o=e=>i(e,r),d={module:{uri:r},exports:c,require:o};s[r]=Promise.all(t.map((e=>d[e]||o(e)))).then((e=>(n(...e),c)))}}define(["./workbox-3ccbc1a0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"bdx-live-redesign"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Cjw0BFtw.js",revision:null},{url:"assets/index-PqsltLGF.css",revision:null},{url:"index.html",revision:"46344362df557d8052d5669fc0937484"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"settings/app.settings.development.js",revision:"21edb2ce52cdd7b99ce0fcbbc0886673"},{url:"settings/app.settings.s1.js",revision:"84cc8d05e588b721f2ee296e9b0d76d3"},{url:"settings/app.settings.s2.js",revision:"77f5510ee274d3103b506291416b2f0e"},{url:"settings/app.settings.s3.js",revision:"188c55bbb8fc7c164547e81602602671"},{url:"manifest.webmanifest",revision:"0bb5e131cb744484df9f25b74bbbfc3e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/\.(?:png|jpg|jpeg|svg)$/,new e.StaleWhileRevalidate({cacheName:"image-cache",fetchOptions:{mode:"no-cors"},plugins:[new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
//# sourceMappingURL=sw.js.map
