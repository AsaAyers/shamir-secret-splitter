(this["webpackJsonpshamir-secret-splitter"]=this["webpackJsonpshamir-secret-splitter"]||[]).push([[0],{137:function(e,t,a){e.exports={page:"styles_page__2ydav"}},139:function(e,t,a){e.exports={qr:"styles_qr__3rz3I",noPrint:"styles_noPrint__2Y233"}},141:function(e,t,a){e.exports={form:"styles_form__2Hoej",quorum:"styles_quorum__36Y8D",parts:"styles_parts__3k7x6"}},149:function(e,t,a){e.exports=a(251)},154:function(e,t,a){},166:function(e,t){},168:function(e,t){},202:function(e,t){},203:function(e,t){},251:function(e,t,a){"use strict";a.r(t);var n,r=a(0),l=a.n(r),u=a(10),o=a.n(u),c=(a(154),a(35)),s=a(284),m=a(289),i=10,f=2;!function(e){e.Edit="/",e.Print="/print",e.Assemble="/assemble"}(n||(n={}));var b=a(6),p=a(24),d=a(281),v=a(285),h=a(288),E=a(282),g=a(27),x=a(135),y=a.n(x);function P(e){var t,a=e.part,n=e.onChange,r=e.index,u=null!==(t=null===a||void 0===a?void 0:a.hex)&&void 0!==t?t:"";return l.a.createElement(v.a,{onChange:function(e){n(r,e.target.value)},value:u,name:"label",label:"Part ".concat(r)})}var O=a(137),w=a.n(O);function j(e){var t=e.part,a=e.children;return l.a.createElement("div",{className:w.a.page},l.a.createElement("h1",null,t.label),l.a.createElement("h2",null,t.index," of ",t.numParts),a,l.a.createElement("p",null,"If the QR code doesn't scan, you can type in the following:"),l.a.createElement("div",null,l.a.createElement(P,{part:t,onChange:function(){},index:t.index})))}var S=a(66),N=a(139),_=a.n(N);function q(){var e=Object(c.g)();return l.a.useMemo((function(){if(!e.state)return null;var t=Number(e.state.numParts||0),a=Number(e.state.quorum||0);return!t||!a||a>=t?null:{label:e.state.label||"",text:e.state.text||"",numParts:t,quorum:a}}),[e.state])}function C(){var e=Object(c.f)(),t=q(),a=function(e){return l.a.useMemo((function(){if(null!=e)return Object(S.b)(e)}),[e])}(t);return l.a.useEffect((function(){null!=a&&null!=t&&t.label&&t.text&&t.numParts&&t.quorum||e.push(n.Edit,t)}),[e,a,t]),null==a?null:l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:_.a.noPrint},l.a.createElement("h1",null,"Secret"),l.a.createElement("pre",null,JSON.stringify(t,null,2)),l.a.createElement(g.b,{to:{pathname:n.Edit,state:t}},"Edit")),a.map((function(t){var a=new URLSearchParams;a.set("index",String(t.index)),a.set("hex",t.hex),a.set("numParts",String(t.numParts)),a.set("quorum",String(t.quorum)),a.set("label",String(t.label)),console.log("search",a.toString());var r={pathname:n.Assemble,search:a.toString()},u=window.location.protocol+"//"+window.location.host+e.createHref(r);return l.a.createElement(j,{part:t,key:t.index},l.a.createElement(g.b,{to:r},l.a.createElement(y.a,{renderAs:"svg",size:512,value:u})))})))}var k=a(141),A=a.n(k),D={label:"",text:"",numParts:4,quorum:3};function I(){for(var e=Object(c.f)(),t=q()||D,a=l.a.useState(t),r=Object(p.a)(a,2),u=r[0],o=r[1],s=function(e){var t=Object(b.a)({},e.target.name,e.target.value);o((function(e){return Object.assign({},e,t)}))},m=[],g=[],x=1;x<=i;x++)x>=f&&m.push(x),x<u.numParts&&g.push(x);return l.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.push(n.Print,u)}},l.a.createElement(d.a,{className:A.a.form},l.a.createElement(v.a,{onChange:s,value:u.label,name:"label",label:"Label"}),l.a.createElement(v.a,{multiline:!0,label:"Secret Text",onChange:s,value:u.text,name:"text"}),l.a.createElement(v.a,{name:"quorum",select:!0,label:"Quorum",value:u.quorum,onChange:s},g.map((function(e){return l.a.createElement(h.a,{key:e,value:e},e)}))),l.a.createElement(v.a,{name:"numParts",select:!0,label:"Parts",value:u.numParts,onChange:s},m.map((function(e){return l.a.createElement(h.a,{key:e,value:e},e)}))),l.a.createElement(E.a,{type:"submit",color:"primary",variant:"outlined"},"Done")))}var J=a(56),R=a(142),B=a.n(R);var H=a(67),L=a.n(H),Q=function(e){};function T(e,t){switch(t.type){case"setNumParts":return Object(J.a)({},e,{numParts:t.payload,parts:{}});case"setPart":var a=t.payload,n="numParts"in a?a.numParts:e.numParts,r=e.parts;return n!==e.numParts&&(r={}),Object(J.a)({},e,{parts:Object(J.a)({},r,Object(b.a)({},a.index,a)),numParts:n});default:Q(t)}return e}var U={numParts:4,parts:{}};function z(e){var t=new URLSearchParams(Object(c.g)().search),a=Number(t.get("index")),n=t.get("hex"),r=Number(t.get("numParts")),u=t.get("label"),o=Number(t.get("quorum"));l.a.useEffect((function(){if(console.log({index:a,hex:n,numParts:r,label:u,quorum:o}),!isNaN(a)&&a>0&&n&&!isNaN(r)&&r>0&&!isNaN(o)&&o>0&&null!=u){var t={index:a,hex:n,label:u,numParts:r,quorum:o};console.log("query part",t),e(t)}}),[e,n,a,u,r,o])}function F(){var e=Object(c.f)(),t=l.a.useState(!1),a=Object(p.a)(t,2),r=a[0],u=a[1],o=l.a.useState(null),s=Object(p.a)(o,2),m=s[0],b=s[1],g=function(e,t){var a=l.a.useState((function(){try{var a=window.localStorage.getItem(e);return a?JSON.parse(a):t}catch(n){return console.log(n),t}})),n=Object(p.a)(a,2),r=n[0],u=n[1];return[r,function(t){try{var a=t instanceof Function?t(r):t;u(a),window.localStorage.setItem(e,JSON.stringify(a))}catch(n){console.log(n)}}]}("state",U),x=Object(p.a)(g,2),y=x[0],O=x[1],w=l.a.useReducer(T,y),j=Object(p.a)(w,2),N=j[0],_=j[1];l.a.useEffect((function(){y!==N&&O(N)}),[O,N,y]),z(l.a.useCallback((function(t){_({type:"setPart",payload:t}),e.replace(n.Assemble)}),[e]));for(var q=N.numParts,C=N.parts,k=function(e,t){var a,n=null!==(a=C[e])&&void 0!==a?a:{index:e,hex:""};_({type:"setPart",payload:Object(J.a)({},n,{hex:t})})},A=new Array(i-f).fill(0).map((function(e,t){return l.a.createElement(h.a,{key:t,value:t+f},t+f)})),D=[],I=1;I<=q;I++)D.push(l.a.createElement(P,{key:I,index:I,part:C[I],onChange:k}));return m?l.a.createElement(d.a,{className:L.a.assemble},m):l.a.createElement("form",{onSubmit:function(e){e.preventDefault();try{var t=Object(S.a)(Object.values(C));b(t)}catch(e){console.error(e)}}},l.a.createElement(d.a,{className:L.a.assemble},r?l.a.createElement(B.a,{className:L.a.reader,delay:500,onError:function(e){console.error(e)},onScan:function(t){if(console.log("scan",t),t){var a=window.location.protocol+"//"+window.location.host+e.createHref({pathname:"/"});0===t.indexOf(a)&&e.replace(t.replace(a,""))}}}):l.a.createElement(E.a,{variant:"outlined",onClick:function(){return u(!0)}},"Scan QR Codes"),l.a.createElement("br",null),l.a.createElement(v.a,{name:"numParts",select:!0,label:"Parts",value:q,onChange:function(e){_({type:"setNumParts",payload:Number(e.target.value)})}},A),D,l.a.createElement(E.a,{type:"submit",color:"primary",variant:"outlined"},"Done"),m&&l.a.createElement("div",null,"Secret: ",m)))}var M=a(287),Y=a(283),W=a(88),$=a.n(W);function G(){var e=Object(c.g)(),t=Object(c.f)();return l.a.createElement("nav",{className:$.a.nav},l.a.createElement(M.a,{value:e.pathname,onChange:function(e,a){t.push(a)}},l.a.createElement(Y.a,{value:n.Edit,label:"New Secret"}),l.a.createElement(Y.a,{value:n.Assemble,label:"Assemble Secret"})))}console.log("nav",$.a);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(g.a,{basename:"/shamir-secret-splitter"},l.a.createElement((function(){return l.a.createElement(s.a,{maxWidth:"sm"},l.a.createElement(m.a,null),l.a.createElement(G,null),l.a.createElement(c.c,null,l.a.createElement(c.a,{path:n.Print},l.a.createElement(C,null)),l.a.createElement(c.a,{path:n.Assemble},l.a.createElement(F,null)),l.a.createElement(c.a,{path:n.Edit},l.a.createElement(I,null))))}),null)),document.getElementById("root"))},66:function(e,t,a){"use strict";(function(e){a.d(t,"b",(function(){return u})),a.d(t,"a",(function(){return o}));var n=a(24),r=a(85),l=a(138);function u(t){var a=(new TextEncoder).encode(t.text),u=r.split(l.randomBytes,t.numParts,t.quorum,a);return Object.entries(u).map((function(a){var r=Object(n.a)(a,2),l=r[0],u=r[1];return{label:t.label,numParts:t.numParts,quorum:t.quorum,index:Number(l),hex:e.from(u).toString("hex")}}))}function o(t){var a=t.reduce((function(t,a){return t[a.index]=Uint8Array.from(e.from(a.hex,"hex")),t}),{}),n=new TextDecoder,l=r.join(a);return n.decode(l)}}).call(this,a(14).Buffer)},67:function(e,t,a){e.exports={assemble:"styles_assemble__1ky0g"}},88:function(e,t,a){e.exports={nav:"styles_nav__2cd2r"}}},[[149,1,2]]]);
//# sourceMappingURL=main.b0d0b2d1.chunk.js.map