if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>a(e,i),f={module:{uri:i},exports:c,require:r};s[i]=Promise.all(n.map((e=>f[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-946f13af"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/_a4XyR9K4QaY0i3YDb0AS/_buildManifest.js",revision:"b31a986c35280435af7f1ba76fdecf7f"},{url:"/_next/static/_a4XyR9K4QaY0i3YDb0AS/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/231-2f85d250607f3874.js",revision:"2f85d250607f3874"},{url:"/_next/static/chunks/475-978f1e3d4802151d.js",revision:"978f1e3d4802151d"},{url:"/_next/static/chunks/49-0938f4cbec0c035b.js",revision:"0938f4cbec0c035b"},{url:"/_next/static/chunks/581.941b894ff8064dbb.js",revision:"941b894ff8064dbb"},{url:"/_next/static/chunks/593.79a3a1221c370e4b.js",revision:"79a3a1221c370e4b"},{url:"/_next/static/chunks/74fdba35-69acaf647efc7bb8.js",revision:"69acaf647efc7bb8"},{url:"/_next/static/chunks/752.0416e7245e384237.js",revision:"0416e7245e384237"},{url:"/_next/static/chunks/953-af9abf8f2afb3f6b.js",revision:"af9abf8f2afb3f6b"},{url:"/_next/static/chunks/a908dc70-49b9f4ea10484565.js",revision:"49b9f4ea10484565"},{url:"/_next/static/chunks/c9184924-cab3ce0b2e7663ea.js",revision:"cab3ce0b2e7663ea"},{url:"/_next/static/chunks/framework-a87821de553db91d.js",revision:"a87821de553db91d"},{url:"/_next/static/chunks/main-86f1ce46715be0d4.js",revision:"86f1ce46715be0d4"},{url:"/_next/static/chunks/pages/_app-97f13a3fcd8af52b.js",revision:"97f13a3fcd8af52b"},{url:"/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js",revision:"a4ba2246ff8fb532"},{url:"/_next/static/chunks/pages/index-e5b3516cdd0e0350.js",revision:"e5b3516cdd0e0350"},{url:"/_next/static/chunks/pages/login-7c06878215805741.js",revision:"7c06878215805741"},{url:"/_next/static/chunks/pages/products-db60669dfe747d9d.js",revision:"db60669dfe747d9d"},{url:"/_next/static/chunks/pages/profile-af5896edb594a6ab.js",revision:"af5896edb594a6ab"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-e099c01e4be65b6b.js",revision:"e099c01e4be65b6b"},{url:"/_next/static/css/4c920f7d2a6a8084.css",revision:"4c920f7d2a6a8084"},{url:"/_next/static/media/amd.f5cd8fea.png",revision:"d00d9a381d5e8f778579ad8b7880f80d"},{url:"/_next/static/media/empty-box.bb853c10.gif",revision:"adddd0a810e36b5a766fe3264b3000d1"},{url:"/_next/static/media/pix-amd.8d34d96f.png",revision:"9030d0863d5e68e671ba2f9b7e04e7a8"},{url:"/budget-generator.svg",revision:"d47f5a5044e3e658f1ad0587acb243bf"},{url:"/favicon.ico",revision:"88f6cb0f0e68b148f0ce5af8905ddc88"},{url:"/fonts/Helvetica/Helvetica-Neue-Bold.ttf",revision:"7f281199258d96e249a7fce4101006b9"},{url:"/fonts/Helvetica/Helvetica-Neue-Light.ttf",revision:"0facaae97183b8fede52099930aefd8d"},{url:"/fonts/Helvetica/Helvetica-Neue-Medium.ttf",revision:"0a13c540938b1b7dd3996b02ea568e5f"},{url:"/icon-512x512.png",revision:"446645e638244706304e73e97bb995b4"},{url:"/icon.png",revision:"dfb8f3bd31e06d2031fbe561d7de0777"},{url:"/manifest.json",revision:"2dac9952f91918e0ce8c42f1dedded8f"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
