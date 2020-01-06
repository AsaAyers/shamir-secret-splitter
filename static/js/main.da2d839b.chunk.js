(this["webpackJsonpshamir-secret-splitter"]=this["webpackJsonpshamir-secret-splitter"]||[]).push([[0],{135:function(e){e.exports=JSON.parse('{"name":"shamir-secret-splitter","version":"0.1.0","private":true,"homepage":"https://AsaAyers.github.io/shamir-secret-splitter","repository":"https://github.com/AsaAyers/shamir-secret-splitter","dependencies":{"@material-ui/core":"^4.8.2","@testing-library/jest-dom":"^4.2.4","@testing-library/react":"^9.4.0","@testing-library/user-event":"^7.2.1","@types/jest":"^24.0.25","@types/node":"^12.12.22","@types/react":"^16.9.17","@types/react-dom":"^16.9.4","classnames":"^2.2.6","gh-pages":"^2.1.1","pgp-word-list":"0.0.1","qrcode.react":"^1.0.0","react":"^16.12.0","react-dom":"^16.12.0","react-qr-reader":"^2.2.1","react-router-dom":"^5.1.2","react-scripts":"3.3.0","shamir":"^0.7.1","typeface-roboto":"0.0.75","typescript":"^3.7.4"},"scripts":{"predeploy":"npm run build","deploy":"gh-pages -d build","start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject"},"eslintConfig":{"extends":"react-app"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"devDependencies":{"@types/classnames":"^2.2.9","@types/qrcode.react":"^1.0.0","@types/react-qr-reader":"^2.1.2","@types/react-router-dom":"^5.1.3","text-encoder":"0.0.4"}}')},141:function(e,t,a){e.exports={page:"styles_page__2ydav"}},147:function(e,t,a){e.exports=a.p+"static/media/BEEPPURE.cc279eb8.mp3"},148:function(e,t,a){e.exports={nav:"styles_nav__2cd2r",printTab:"styles_printTab__1Y1BP"}},155:function(e,t,a){e.exports=a(257)},160:function(e,t,a){},173:function(e,t){},175:function(e,t){},209:function(e,t){},210:function(e,t){},257:function(e,t,a){"use strict";a.r(t);var n,r=a(0),o=a.n(r),l=a(10),c=a.n(l),s=(a(160),a(36)),u=a(294),i=a(295),m=a(143),p=a(288),d=a(289),f=a(292),h=a(135),b=10,v=2;!function(e){e.Edit="/",e.Print="/print",e.Assemble="/assemble"}(n||(n={}));var y=a(6),g=a(17),E=a(296),x=a(290),w=a(291),P=a(25),j=a(138),O=a.n(j),S=a(258),q=a(26),N=a(58);var _={hex:"",text:"",error:null};function C(e,t){var a=Object(N.b)(t);if("string"!==typeof a){var n=t.split(/\s+/g);n.pop(),a=Object(N.b)(n.join(" "))}return"string"==typeof a?{hex:a,text:t,error:null}:Object(q.a)({},e,{text:t,error:"".concat(a.word," not recognized")})}function k(e){var t,a=e.part,n=e.onChange,r=e.index,l=function(){var e=o.a.useMemo((function(){return Math.random().toString(16).substr(2)}),[]);return function(t){return t+"-"+e}}(),c=null!==(t=null===a||void 0===a?void 0:a.hex)&&void 0!==t?t:"",s=o.a.useReducer(C,_,(function(e){var t=Object(N.a)(c).join(" ");return"string"===typeof t?Object(q.a)({},e,{text:t}):e})),u=Object(g.a)(s,2),i=u[0],m=u[1];return o.a.createElement(E.a,{onChange:function(e){if(n){var t=e.target.value;m(t);var a=Object(N.b)(t);"string"===typeof a&&a!==c&&n(r,a)}},multiline:!0,id:l("part-".concat(r)),error:null!=i.error,helperText:i.error,value:i.text,name:"label",label:"Part ".concat(r)})}var A=a(141),I=a.n(A);function R(e){var t=e.part,a=e.children,r=Object(s.f)(),l=window.location.protocol+"//"+window.location.host+r.createHref({pathname:n.Assemble});return o.a.createElement(S.a,{className:I.a.page},o.a.createElement("h1",null,t.label),o.a.createElement("h2",null,t.index," of ",t.numParts),a,o.a.createElement("strong",null,l),o.a.createElement("p",null,"If the QR code doesn't scan, you can go to the URL above and type in the following into the textbox for ",o.a.createElement("strong",null,"Part ",t.index),":"),o.a.createElement(k,{part:t,index:t.index}))}var D=a(67),L=a(89),B=a.n(L);function Q(){var e=Object(s.g)();return o.a.useMemo((function(){if(!e.state)return null;var t=Number(e.state.numParts||0),a=Number(e.state.quorum||0);return!t||!a||a>=t?null:{label:e.state.label||"",text:e.state.text||"",numParts:t,quorum:a}}),[e.state])}function T(){var e=Object(s.f)(),t=Q(),a=function(e){return o.a.useMemo((function(){if(null!=e)return Object(D.b)(e)}),[e])}(t);return o.a.useEffect((function(){null!=a&&null!=t&&t.label&&t.text&&t.numParts&&t.quorum||e.push(n.Edit,t)}),[e,a,t]),null==a||null==t?null:o.a.createElement(o.a.Fragment,null,o.a.createElement(p.a,{className:B.a.noPrint},o.a.createElement(d.a,null,o.a.createElement("p",null,"Thew following pages contain your secret. Print them and distribute them to different locations. From the Assemble Secret page, if you scan any ",t.quorum," of these codes, it will display your secret.")),o.a.createElement(x.a,null,o.a.createElement(P.b,{to:{pathname:n.Edit,state:t}},o.a.createElement(w.a,{variant:"outlined"},"Edit")),o.a.createElement(w.a,{onClick:function(){return window.print()},variant:"outlined"},"Print"))),a.map((function(t){var a=new URLSearchParams;a.set("index",String(t.index)),a.set("hex",t.hex),a.set("numParts",String(t.numParts)),a.set("quorum",String(t.quorum)),a.set("label",String(t.label));var r={pathname:n.Assemble,search:a.toString()},l=window.location.protocol+"//"+window.location.host+e.createHref(r);return o.a.createElement(R,{part:t,key:t.index},o.a.createElement(P.b,{to:r},o.a.createElement(O.a,{className:B.a.qr,renderAs:"svg",size:512,value:l})))})))}var U=Object(m.a)({title:{fontSize:14},content:{display:"flex",flexDirection:"column"}}),J={label:"",text:"",numParts:4,quorum:3};function M(){for(var e=U(),t=Object(s.f)(),a=Q()||J,r=o.a.useState(a),l=Object(g.a)(r,2),c=l[0],u=l[1],i=function(e){var t=Object(y.a)({},e.target.name,e.target.value);u((function(e){return Object.assign({},e,t)}))},m=[],h=[],P=1;P<=b;P++)P>=v&&m.push(P),P<c.numParts&&h.push(P);return o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t.push(n.Print,c)}},o.a.createElement(p.a,null,o.a.createElement(d.a,{className:e.content},o.a.createElement(f.a,{className:e.title,color:"textSecondary",gutterBottom:!0},"Create Secret"),o.a.createElement(E.a,{onChange:i,value:c.label,id:"label",name:"label",label:"Label"}),o.a.createElement(E.a,{multiline:!0,label:"Secret Text",id:"secret-text",onChange:i,value:c.text,name:"text"}),o.a.createElement(E.a,{name:"quorum",select:!0,SelectProps:{native:!0},id:"quorum","data-testid":"quorum",label:"quorum",value:c.quorum,onChange:i},h.map((function(e){return o.a.createElement("option",{key:e,value:e},e)}))),o.a.createElement(E.a,{name:"numParts",select:!0,label:"Parts",id:"parts",SelectProps:{native:!0},"data-testid":"parts",value:c.numParts,onChange:i},m.map((function(e){return o.a.createElement("option",{key:e,value:e},e)}))),o.a.createElement("p",null,"In order to reassemble your secret, you will need ",c.quorum," out of ",c.numParts," pieces. Your label will be printed at the top of each page.")),o.a.createElement(x.a,null,o.a.createElement(w.a,{type:"submit",color:"primary",variant:"outlined"},"Done"))))}var F=a(144),Y=a.n(F),z=a(146),W=a.n(z),H=a(298),V=a(90),X=a.n(V),G=a(147),$=a.n(G),K=Object(m.a)({cardContent:{display:"flex",flexDirection:"column"}});function Z(e){return null!=e}var ee=function(e){};function te(e,t){switch(t.type){case"setNumParts":return Object(q.a)({},e,{numParts:t.payload,parts:{}});case"setPart":var a,n=t.payload,r="numParts"in n?n.numParts:e.numParts,o=e.parts;if(r!==e.numParts&&(o={}),""===n.hex.trim())return delete(o=Object(q.a)({},o))[n.index],Object(q.a)({},e,{parts:o,numParts:r});var l=(null===(a=t.meta)||void 0===a?void 0:a.scan)||e.scanIndex;return Object(q.a)({},e,{parts:Object(q.a)({},o,Object(y.a)({},n.index,n)),numParts:r,scanIndex:l});case"clearScan":return e.scanIndex===t.payload?Object(q.a)({},e,{scanIndex:void 0}):e;default:ee(t)}return e}var ae={numParts:4,parts:{},scanIndex:void 0};function ne(e){var t=Number(e.get("index")),a=e.get("hex"),n=Number(e.get("numParts")),r=e.get("label"),o=Number(e.get("quorum"));return!isNaN(t)&&t>0&&a&&!isNaN(n)&&n>0&&!isNaN(o)&&o>0&&null!=r?{index:t,hex:a,label:r,numParts:n,quorum:o}:null}function re(e){var t=ne(new URLSearchParams(Object(s.g)().search));o.a.useEffect((function(){null!=t&&e(t)}),[e,t])}function oe(){var e=K(),t=Object(s.f)(),a=o.a.useState(!1),r=Object(g.a)(a,2),l=r[0],c=r[1],u=o.a.useState(null),i=Object(g.a)(u,2),m=i[0],f=i[1],h=o.a.useMemo((function(){return new Audio($.a)}),[]),P=function(e,t){var a=o.a.useState((function(){try{var a=window.localStorage.getItem(e);return a?JSON.parse(a):t}catch(n){return console.error(n),t}})),n=Object(g.a)(a,2),r=n[0],l=n[1];return[r,function(t){try{var a=t instanceof Function?t(r):t;l(a),window.localStorage.setItem(e,JSON.stringify(a))}catch(n){console.error(n)}}]}("state",ae),j=Object(g.a)(P,2),O=j[0],S=j[1],N=o.a.useReducer(te,O),_=Object(g.a)(N,2),C=_[0],A=_[1];o.a.useEffect((function(){O!==C&&S(C)}),[S,C,O]),re(o.a.useCallback((function(e){A({type:"setPart",payload:e}),t.replace(n.Assemble)}),[t]));var I=C.numParts,R=C.parts,L=function(e,t){var a,n=null!==(a=R[e])&&void 0!==a?a:{index:e,hex:""};A({type:"setPart",payload:Object(q.a)({},n,{hex:t})})},B=o.a.useCallback((function(e){e&&e.preventDefault();try{var t=Object(D.a)(Object.values(R));f(t)}catch(e){console.error(e)}}),[R]);o.a.useEffect((function(){var e=Object.values(C.parts).filter(Z),t=e.every((function(t){return"label"in t&&"label"in e[0]&&t.label===e[0].label&&t.numParts===e[0].numParts&&t.quorum===e[0].quorum}));e[0]&&"quorum"in e[0]&&e.length===e[0].quorum&&t&&B()}),[B,C.parts]);o.a.useEffect((function(){if(null!=C.scanIndex){try{window.navigator.vibrate(200)}catch(e){console.error(e)}try{h.play()}catch(e){console.error(e)}}}),[h,C.scanIndex]);for(var Q=new Array(b-v).fill(0).map((function(e,t){return o.a.createElement(H.a,{key:t,value:t+v},t+v)})),T=[],U=1;U<=I;U++)T.push(o.a.createElement(k,{key:"".concat(U,"/").concat(I),index:U,part:R[U],onChange:L}));return m?o.a.createElement(p.a,null,o.a.createElement(d.a,null,m)):o.a.createElement("form",{onSubmit:B},o.a.createElement(p.a,null,o.a.createElement(d.a,{className:W()(e.cardContent,Object(y.a)({},X.a.success,null!=C.scanIndex))},l?o.a.createElement(o.a.Fragment,null,o.a.createElement(Y.a,{className:X.a.qr,delay:500,onError:function(e){console.error(e)},onScan:function(e){if(e)try{var t=ne(new URL(e).searchParams);if(null!=t){var a=Math.random();A({type:"setPart",payload:t,meta:{scan:a}}),setTimeout((function(){A({type:"clearScan",payload:a})}),1e3)}}catch(n){}}}),JSON.stringify(null!=C.scanIndex),o.a.createElement(w.a,{variant:"outlined",onClick:function(){return c(!1)}},"Stop Scanning")):o.a.createElement(w.a,{variant:"outlined",onClick:function(){return c(!0)}},"Scan QR Codes"),o.a.createElement("br",null),o.a.createElement(E.a,{name:"numParts",select:!0,label:"Parts",value:I,onChange:function(e){A({type:"setNumParts",payload:Number(e.target.value)})}},Q),T),o.a.createElement(x.a,null,o.a.createElement(w.a,{type:"submit",color:"primary",variant:"outlined"},"Done"))))}var le=a(297),ce=a(293),se=a(148),ue=a.n(se);function ie(){var e=Object(s.g)(),t=Object(s.f)(),a=n.Edit;switch(e.pathname){case n.Assemble:a=n.Assemble;break;case n.Edit:case n.Print:default:a=n.Edit}return o.a.createElement("nav",{className:ue.a.nav},o.a.createElement(le.a,{value:a,onChange:function(e,a){t.push(a)}},o.a.createElement(ce.a,{value:n.Edit,label:"New Secret"}),o.a.createElement(ce.a,{value:n.Assemble,label:"Assemble Secret"})))}var me=Object(m.a)({home:{margin:"1em 0"}});function pe(){var e=me();return o.a.createElement(p.a,{className:e.home},o.a.createElement(d.a,null,o.a.createElement(f.a,{component:"h1"},"Experimental"),o.a.createElement("p",null,"This project is still experimental and may continue to change. I cannot guarantee that pages printed today will continue to scan in the future."),o.a.createElement(f.a,{component:"h1"},"Overview"),o.a.createElement("p",null,"Say you have an important password to backup in case you ever forget it. Maybe you use a password manager for most passwords, but how do you backup your password for your password manager? You don\u2019t want to just write it down because anyone who finds it will have your password."),o.a.createElement("p",null,"Using the Shamir Secret Splitter you can split your password into pices and store them in different places. You might decide to split it into 4 pages and any set of 3 can be used to assemble the password."),o.a.createElement("p",null,"Each page contains a QR code with a link back to this site. No special software is needed, just point your phone's camera at the page and follow the link. From the limited testing I\u2019ve done, it seems like QR code scanners are built into the default camera apps on Android and iOS. When the camera finds a QR code you should get some kind of notification asking if you want to open the link in your browser. If it doesn\u2019t work, you may need to go change a setting to turn on QR code scanning."),o.a.createElement("p",null,'When you arrive on the "Assemble Secret" page it has a Scan QR Codes button that you can use to scan the remaining pages. But what if you can\'t scan a QR code? Every page also has a series of words that contain the same piece of your secret as the QR code. If you need to, you can simply type those into the "Assemble Secret" page.'),o.a.createElement("p",null,"For additional details view the project on ",o.a.createElement("a",{href:h.repository,target:"_blank",rel:"noopener noreferrer"},"GitHub"))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(P.a,{basename:"/shamir-secret-splitter"},o.a.createElement((function(){return o.a.createElement(u.a,{maxWidth:"sm"},o.a.createElement(i.a,null),o.a.createElement(ie,null),o.a.createElement(s.c,null,o.a.createElement(s.a,{path:n.Print},o.a.createElement(T,null)),o.a.createElement(s.a,{path:n.Assemble},o.a.createElement(oe,null)),o.a.createElement(s.a,{path:n.Edit},o.a.createElement(pe,null),o.a.createElement(M,null))))}),null)),document.getElementById("root"))},58:function(e,t,a){"use strict";(function(e){a.d(t,"a",(function(){return l})),a.d(t,"b",(function(){return c}));var n,r=a(17),o=a(68);function l(t){for(var a=e.from(t.toLowerCase().replace(/[^0-9a-f]+/g,""),"hex"),n=[],r=0;r<a.length;r++){var l=a[r];n.push(o[l][r%2])}return n}function c(t){if(null==n){n=[{},{}];for(var a=0;a<o.length;a++){var l=Object(r.a)(o[a],2),c=l[0],s=l[1];n[0][c.toLowerCase()]=a,n[1][s.toLowerCase()]=a}}var u=t.trim().toLowerCase().split(/\s+/g);if(0===t.trim().length)return"";for(var i=[],m=0;m<u.length;m++){var p=u[m],d=n[m%2][p];if(null==d)return{type:"INVALID_WORD",word:p};i.push(d)}return e.from(i).toString("hex").toUpperCase()}}).call(this,a(14).Buffer)},67:function(e,t,a){"use strict";(function(e){a.d(t,"b",(function(){return l})),a.d(t,"a",(function(){return c}));var n=a(17),r=a(88),o=a(142);function l(t){var a=(new TextEncoder).encode(t.text),l=r.split(o.randomBytes,t.numParts,t.quorum,a);return Object.entries(l).map((function(a){var r=Object(n.a)(a,2),o=r[0],l=r[1];return{label:t.label,numParts:t.numParts,quorum:t.quorum,index:Number(o),hex:e.from(l).toString("hex")}}))}function c(t){var a=t.reduce((function(t,a){return t[a.index]=Uint8Array.from(e.from(a.hex,"hex")),t}),{}),n=new TextDecoder,o=r.join(a);return n.decode(o)}}).call(this,a(14).Buffer)},89:function(e,t,a){e.exports={print:"styles_print__X66sV",qr:"styles_qr__3rz3I",noPrint:"styles_noPrint__2Y233"}},90:function(e,t,a){e.exports={success:"styles_success__1X2tx",qr:"styles_qr__1UJ4b"}}},[[155,1,2]]]);
//# sourceMappingURL=main.da2d839b.chunk.js.map