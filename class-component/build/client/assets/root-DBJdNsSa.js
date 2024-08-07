import{u as h,e as x,f,r as i,j as e,P as y,s as S,O as g}from"./store-CdRNTWRs.js";import{T as j}from"./context-Ceb_irxG.js";import{f as w,_ as k,M,L as O}from"./components-DR-M2SFk.js";/**
 * @remix-run/react v2.11.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function R({getKey:r,...l}){let{isSpaMode:c}=w(),o=h(),u=x();f({getKey:r,storageKey:a});let m=i.useMemo(()=>{if(!r)return null;let t=r(o,u);return t!==o.key?t:null},[]);if(c)return null;let d=((t,p)=>{if(!window.history.state||!window.history.state.key){let s=Math.random().toString(32).slice(2);window.history.replaceState({key:s},"")}try{let n=JSON.parse(sessionStorage.getItem(t)||"{}")[p||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(s){console.error(s),sessionStorage.removeItem(t)}}).toString();return i.createElement("script",k({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${d})(${JSON.stringify(a)}, ${JSON.stringify(m)})`}}))}const T=()=>[{rel:"icon",href:"/icon.png",type:"image/svg+xml"}],W=()=>[{title:"Star Wars"},{name:"Star Wars",content:"Welcome to Remix!"}];function E(){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx(M,{}),e.jsx(O,{})]}),e.jsx(y,{store:S,children:e.jsx(j,{children:e.jsxs("body",{children:[e.jsx(g,{}),e.jsx(R,{})]})})})]})}export{E as default,T as links,W as meta};
