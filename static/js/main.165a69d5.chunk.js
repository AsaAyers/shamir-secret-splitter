(this["webpackJsonpshamir-secret-splitter"]=this["webpackJsonpshamir-secret-splitter"]||[]).push([[0],{106:function(e,t,n){e.exports={page:"styles_page__2ydav"}},108:function(e,t,n){e.exports={qr:"styles_qr__3rz3I",noPrint:"styles_noPrint__2Y233"}},111:function(e,t,n){e.exports={reader:"styles_reader__3noBR"}},112:function(e,t,n){e.exports=n(214)},117:function(e,t,n){},130:function(e,t){},132:function(e,t){},166:function(e,t){},167:function(e,t){},214:function(e,t,n){"use strict";n.r(t);var a,r=n(0),l=n.n(r),u=n(102),c=n.n(u),o=(n(117),n(18)),s=10,m=2;!function(e){e.Edit="/",e.Print="/print",e.Assemble="/assemble"}(a||(a={}));var i=n(6),f=n(15),b=n(10),d=n(103),p=n.n(d);function E(){var e=l.a.useMemo((function(){return Math.random().toString(16).substr(2)}),[]);return function(t){return t+"-"+e}}function h(e){var t,n=e.part,a=e.onChange,r=e.index,u=E(),c=null!==(t=null===n||void 0===n?void 0:n.hex)&&void 0!==t?t:"";return l.a.createElement("div",null,l.a.createElement("label",{htmlFor:u("hex")},"Part ",r),l.a.createElement("input",{onChange:function(e){a(r,e.target.value)},value:c,name:"hex",id:u("hex")}))}var v=n(106),g=n.n(v);function x(e){var t=e.part,n=e.children;return l.a.createElement("div",{className:g.a.page},l.a.createElement("h1",null,t.label),l.a.createElement("h2",null,t.index," of ",t.numParts),n,l.a.createElement("p",null,"If the QR code doesn't scan, you can type in the following:"),l.a.createElement("div",null,l.a.createElement(h,{part:t,onChange:function(){},index:t.index})))}var P=n(37),y=n(108),S=n.n(y);function O(){var e=Object(o.g)();return l.a.useMemo((function(){if(!e.state)return null;var t=Number(e.state.numParts||0),n=Number(e.state.quorum||0);return!t||!n||n>=t?null:{label:e.state.label||"",text:e.state.text||"",numParts:t,quorum:n}}),[e.state])}function w(){var e=Object(o.f)(),t=O(),n=function(e){return l.a.useMemo((function(){if(null!=e)return Object(P.b)(e)}),[e])}(t);return l.a.useEffect((function(){null!=n&&null!=t&&t.label&&t.text&&t.numParts&&t.quorum||e.push(a.Edit,t)}),[e,n,t]),null==n?null:l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:S.a.noPrint},l.a.createElement("h1",null,"Secret"),l.a.createElement("pre",null,JSON.stringify(t,null,2)),l.a.createElement(b.b,{to:{pathname:a.Edit,state:t}},"Edit")),n.map((function(t){var n=new URLSearchParams;n.set("index",String(t.index)),n.set("hex",t.hex),n.set("numParts",String(t.numParts)),n.set("quorum",String(t.quorum)),n.set("label",String(t.label)),console.log("search",n.toString());var r={pathname:a.Assemble,search:n.toString()},u=window.location.protocol+"//"+window.location.host+e.createHref(r);return l.a.createElement(x,{part:t,key:t.index},l.a.createElement(b.b,{to:r},l.a.createElement(p.a,{renderAs:"svg",size:512,value:u})))})))}var N={label:"",text:"",numParts:4,quorum:3};function j(){for(var e=Object(o.f)(),t=E(),n=O()||N,r=l.a.useState(n),u=Object(f.a)(r,2),c=u[0],b=u[1],d=function(e){var t=Object(i.a)({},e.target.name,e.target.value);b((function(e){return Object.assign({},e,t)}))},p=[],h=[],v=1;v<=s;v++)v>=m&&p.push(v),v<=c.numParts&&h.push(v);return l.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.push(a.Print,c)}},l.a.createElement("h2",null,"NewSecret"),l.a.createElement("label",{htmlFor:t("label")},"Label"),l.a.createElement("input",{onChange:d,value:c.label,name:"label",id:t("label")}),l.a.createElement("br",null),l.a.createElement("label",{htmlFor:t("text")},"Secret Text"),l.a.createElement("textarea",{onChange:d,value:c.text,name:"text",id:t("text")}),l.a.createElement("br",null),l.a.createElement("label",{htmlFor:t("quorum")},"quorum"),l.a.createElement("select",{name:"quorum",id:t("quorum"),value:c.quorum,onChange:d},h.map((function(e){return l.a.createElement("option",{key:e,value:e},e)}))),l.a.createElement("br",null),l.a.createElement("label",{htmlFor:t("numParts")},"Parts"),l.a.createElement("select",{name:"numParts",id:t("numParts"),value:c.numParts,onChange:d},p.map((function(e){return l.a.createElement("option",{key:e,value:e},e)}))),l.a.createElement("br",null),l.a.createElement("button",{type:"submit"},"Done"))}var q=n(22),_=n(109),C=n.n(_),A=n(111),k=n.n(A),F=function(e){};function J(e,t){switch(t.type){case"scan":return Object(q.a)({},e,{scanning:!0});case"setNumParts":return Object(q.a)({},e,{numParts:t.payload,parts:{}});case"setPart":var n=t.payload,a="numParts"in n?n.numParts:e.numParts,r=e.parts;return a!==e.numParts&&(r={}),Object(q.a)({},e,{parts:Object(q.a)({},r,Object(i.a)({},n.index,n)),numParts:a});case"setSecret":return Object(q.a)({},e,{secret:t.payload});default:F(t)}return e}var R={scanning:!1,secret:null,numParts:4,parts:{}};function B(e){var t=new URLSearchParams(Object(o.g)().search),n=Number(t.get("index")),a=t.get("hex"),r=Number(t.get("numParts")),u=t.get("label"),c=Number(t.get("quorum"));l.a.useEffect((function(){if(console.log({index:n,hex:a,numParts:r,label:u,quorum:c}),!isNaN(n)&&n>0&&a&&!isNaN(r)&&r>0&&!isNaN(c)&&c>0&&null!=u){var t={index:n,hex:a,label:u,numParts:r,quorum:c};console.log("query part",t),e(t)}}),[e,a,n,u,r,c])}function D(){var e=E(),t=Object(o.f)(),n=function(e,t){var n=l.a.useState((function(){try{var n=window.localStorage.getItem(e);return n?JSON.parse(n):t}catch(a){return console.log(a),t}})),a=Object(f.a)(n,2),r=a[0],u=a[1];return[r,function(t){try{var n=t instanceof Function?t(r):t;u(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(a){console.log(a)}}]}("state",R),r=Object(f.a)(n,2),u=r[0],c=r[1],i=l.a.useReducer(J,u),b=Object(f.a)(i,2),d=b[0],p=b[1];l.a.useEffect((function(){u!==d&&c(d)}),[c,d,u]),B(l.a.useCallback((function(e){p({type:"setPart",payload:e}),t.replace(a.Assemble)}),[t]));for(var v=d.secret,g=d.numParts,x=d.scanning,y=d.parts,S=function(e,t){var n,a=null!==(n=y[e])&&void 0!==n?n:{index:e,hex:""};p({type:"setPart",payload:Object(q.a)({},a,{hex:t})})},O=new Array(s-m).fill(0).map((function(e,t){return l.a.createElement("option",{key:t,value:t+m},t+m)})),w=[],N=1;N<=g;N++)w.push(l.a.createElement(h,{key:N,index:N,part:y[N],onChange:S}));return l.a.createElement("form",{onSubmit:function(e){e.preventDefault();try{var t=Object(P.a)(Object.values(y));p({type:"setSecret",payload:t})}catch(e){console.error(e)}}},l.a.createElement("h2",null,"AssembleSecret"),x?l.a.createElement(C.a,{className:k.a.reader,delay:500,onError:function(e){console.error(e)},onScan:function(e){if(console.log("scan",e),e)try{var t=JSON.parse(e);t.hex&&t.numParts&&t.index&&p({type:"setPart",payload:t})}catch(n){}}}):l.a.createElement("button",{onClick:function(){return p({type:"scan"})}},"Scan QR Codes"),l.a.createElement("br",null),l.a.createElement("label",{htmlFor:e("numParts")},"Parts"),l.a.createElement("select",{name:"numParts",id:e("numParts"),value:g,onChange:function(e){p({type:"setNumParts",payload:Number(e.target.value)})}},O),w,l.a.createElement("button",{type:"submit"},"Done"),v&&l.a.createElement("div",null,"Secret: ",v))}var I=n(58),M=n.n(I);function L(){return l.a.createElement("nav",{className:M.a.nav},l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(b.b,{to:a.Edit},"New Secret")),l.a.createElement("li",null,l.a.createElement(b.b,{to:a.Assemble},"Assemble Secret"))))}console.log("nav",M.a);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(b.a,{basename:"/shamir-secret-splitter"},l.a.createElement((function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(L,null),l.a.createElement(o.c,null,l.a.createElement(o.a,{path:a.Print},l.a.createElement(w,null)),l.a.createElement(o.a,{path:a.Assemble},l.a.createElement(D,null)),l.a.createElement(o.a,{path:a.Edit},l.a.createElement(j,null))))}),null)),document.getElementById("root"))},37:function(e,t,n){"use strict";(function(e){n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return c}));var a=n(15),r=n(57),l=n(107);function u(t){var n=(new TextEncoder).encode(t.text),u=r.split(l.randomBytes,t.numParts,t.quorum,n);return Object.entries(u).map((function(n){var r=Object(a.a)(n,2),l=r[0],u=r[1];return{label:t.label,numParts:t.numParts,quorum:t.quorum,index:Number(l),hex:e.from(u).toString("hex")}}))}function c(t){var n=t.reduce((function(t,n){return t[n.index]=Uint8Array.from(e.from(n.hex,"hex")),t}),{}),a=new TextDecoder,l=r.join(n);return a.decode(l)}}).call(this,n(5).Buffer)},58:function(e,t,n){e.exports={nav:"styles_nav__2cd2r"}}},[[112,1,2]]]);
//# sourceMappingURL=main.165a69d5.chunk.js.map