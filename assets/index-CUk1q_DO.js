import{r as l,b as ve,m as qe,u as U,C as ce,d as Q,e as st,z as De,f as Be,F as Ce,h as we,i as Me,_ as Y,k as it,l as ct,n as ut,o as dt,D as mt,p as ft,V as pt,q as gt,s as ht,S as bt,t as ke,v as le,R as yt,w as xt,x as me,y as Ne,A as $t,B as vt,I as Ge,E as Xe,G as Ct,T as wt,H as St,J as It,K as Ot,L as jt,M as Et,N as Mt,O as Nt,P as Ft,Q as Ke,U as Pt,W as Rt,X as Vt,Y as Lt,Z as _t,$ as Tt,a0 as Wt,a1 as Ht,a2 as At,a3 as zt,a4 as qt,a5 as Dt,a6 as Bt,j as R,a7 as kt,a8 as Fe,a9 as Gt,aa as Xt,ab as Kt,ac as Yt,ad as Jt,ae as Ut,af as Qt}from"./index-Bf4oMwZ6.js";import{u as Zt,r as fe,C as en}from"./index-Czt22uzl.js";const Pe=e=>typeof e=="object"&&e!=null&&e.nodeType===1,Re=(e,t)=>(!t||e!=="hidden")&&e!=="visible"&&e!=="clip",ye=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const r=getComputedStyle(e,null);return Re(r.overflowY,t)||Re(r.overflowX,t)||(n=>{const o=(a=>{if(!a.ownerDocument||!a.ownerDocument.defaultView)return null;try{return a.ownerDocument.defaultView.frameElement}catch{return null}})(n);return!!o&&(o.clientHeight<n.scrollHeight||o.clientWidth<n.scrollWidth)})(e)}return!1},de=(e,t,r,n,o,a,s,i)=>a<e&&s>t||a>e&&s<t?0:a<=e&&i<=r||s>=t&&i>=r?a-e-n:s>t&&i<r||a<e&&i>r?s-t+o:0,tn=e=>{const t=e.parentElement;return t??(e.getRootNode().host||null)},Ve=(e,t)=>{var r,n,o,a;if(typeof document>"u")return[];const{scrollMode:s,block:i,inline:u,boundary:m,skipOverflowHiddenElements:x}=t,p=typeof m=="function"?m:q=>q!==m;if(!Pe(e))throw new TypeError("Invalid target");const j=document.scrollingElement||document.documentElement,S=[];let $=e;for(;Pe($)&&p($);){if($=tn($),$===j){S.push($);break}$!=null&&$===document.body&&ye($)&&!ye(document.documentElement)||$!=null&&ye($,x)&&S.push($)}const I=(n=(r=window.visualViewport)==null?void 0:r.width)!=null?n:innerWidth,N=(a=(o=window.visualViewport)==null?void 0:o.height)!=null?a:innerHeight,{scrollX:d,scrollY:O}=window,{height:c,width:h,top:v,right:b,bottom:V,left:w}=e.getBoundingClientRect(),{top:C,right:g,bottom:L,left:B}=(q=>{const f=window.getComputedStyle(q);return{top:parseFloat(f.scrollMarginTop)||0,right:parseFloat(f.scrollMarginRight)||0,bottom:parseFloat(f.scrollMarginBottom)||0,left:parseFloat(f.scrollMarginLeft)||0}})(e);let E=i==="start"||i==="nearest"?v-C:i==="end"?V+L:v+c/2-C+L,F=u==="center"?w+h/2-B+g:u==="end"?b+g:w-B;const T=[];for(let q=0;q<S.length;q++){const f=S[q],{height:H,width:P,top:G,right:A,bottom:D,left:Z}=f.getBoundingClientRect();if(s==="if-needed"&&v>=0&&w>=0&&V<=N&&b<=I&&v>=G&&V<=D&&w>=Z&&b<=A)return T;const re=getComputedStyle(f),ee=parseInt(re.borderLeftWidth,10),X=parseInt(re.borderTopWidth,10),y=parseInt(re.borderRightWidth,10),_=parseInt(re.borderBottomWidth,10);let M=0,z=0;const K="offsetWidth"in f?f.offsetWidth-f.clientWidth-ee-y:0,te="offsetHeight"in f?f.offsetHeight-f.clientHeight-X-_:0,ae="offsetWidth"in f?f.offsetWidth===0?0:P/f.offsetWidth:0,oe="offsetHeight"in f?f.offsetHeight===0?0:H/f.offsetHeight:0;if(j===f)M=i==="start"?E:i==="end"?E-N:i==="nearest"?de(O,O+N,N,X,_,O+E,O+E+c,c):E-N/2,z=u==="start"?F:u==="center"?F-I/2:u==="end"?F-I:de(d,d+I,I,ee,y,d+F,d+F+h,h),M=Math.max(0,M+O),z=Math.max(0,z+d);else{M=i==="start"?E-G-X:i==="end"?E-D+_+te:i==="nearest"?de(G,D,H,X,_+te,E,E+c,c):E-(G+H/2)+te/2,z=u==="start"?F-Z-ee:u==="center"?F-(Z+P/2)+K/2:u==="end"?F-A+y+K:de(Z,A,P,ee,y+K,F,F+h,h);const{scrollLeft:W,scrollTop:ne}=f;M=oe===0?0:Math.max(0,Math.min(ne+M/oe,f.scrollHeight-H/oe+te)),z=ae===0?0:Math.max(0,Math.min(W+z/ae,f.scrollWidth-P/ae+K)),E+=ne-M,F+=W-z}T.push({el:f,top:M,left:z})}return T},nn=e=>e===!1?{block:"end",inline:"nearest"}:(t=>t===Object(t)&&Object.keys(t).length!==0)(e)?e:{block:"start",inline:"nearest"};function rn(e,t){if(!e.isConnected||!(o=>{let a=o;for(;a&&a.parentNode;){if(a.parentNode===document)return!0;a=a.parentNode instanceof ShadowRoot?a.parentNode.host:a.parentNode}return!1})(e))return;const r=(o=>{const a=window.getComputedStyle(o);return{top:parseFloat(a.scrollMarginTop)||0,right:parseFloat(a.scrollMarginRight)||0,bottom:parseFloat(a.scrollMarginBottom)||0,left:parseFloat(a.scrollMarginLeft)||0}})(e);if((o=>typeof o=="object"&&typeof o.behavior=="function")(t))return t.behavior(Ve(e,t));const n=typeof t=="boolean"||t==null?void 0:t.behavior;for(const{el:o,top:a,left:s}of Ve(e,nn(t))){const i=a-r.top+r.bottom,u=s-r.left+r.right;o.scroll({top:i,left:u,behavior:n})}}const Ye=l.createContext({}),on=e=>{const{componentCls:t}=e;return{[t]:{display:"flex",flexFlow:"row wrap",minWidth:0,"&::before, &::after":{display:"flex"},"&-no-wrap":{flexWrap:"nowrap"},"&-start":{justifyContent:"flex-start"},"&-center":{justifyContent:"center"},"&-end":{justifyContent:"flex-end"},"&-space-between":{justifyContent:"space-between"},"&-space-around":{justifyContent:"space-around"},"&-space-evenly":{justifyContent:"space-evenly"},"&-top":{alignItems:"flex-start"},"&-middle":{alignItems:"center"},"&-bottom":{alignItems:"flex-end"}}}},ln=e=>{const{componentCls:t}=e;return{[t]:{position:"relative",maxWidth:"100%",minHeight:1}}},an=(e,t)=>{const{prefixCls:r,componentCls:n,gridColumns:o}=e,a={};for(let s=o;s>=0;s--)s===0?(a[`${n}${t}-${s}`]={display:"none"},a[`${n}-push-${s}`]={insetInlineStart:"auto"},a[`${n}-pull-${s}`]={insetInlineEnd:"auto"},a[`${n}${t}-push-${s}`]={insetInlineStart:"auto"},a[`${n}${t}-pull-${s}`]={insetInlineEnd:"auto"},a[`${n}${t}-offset-${s}`]={marginInlineStart:0},a[`${n}${t}-order-${s}`]={order:0}):(a[`${n}${t}-${s}`]=[{"--ant-display":"block",display:"block"},{display:"var(--ant-display)",flex:`0 0 ${s/o*100}%`,maxWidth:`${s/o*100}%`}],a[`${n}${t}-push-${s}`]={insetInlineStart:`${s/o*100}%`},a[`${n}${t}-pull-${s}`]={insetInlineEnd:`${s/o*100}%`},a[`${n}${t}-offset-${s}`]={marginInlineStart:`${s/o*100}%`},a[`${n}${t}-order-${s}`]={order:s});return a[`${n}${t}-flex`]={flex:`var(--${r}${t}-flex)`},a},$e=(e,t)=>an(e,t),sn=(e,t,r)=>({[`@media (min-width: ${U(t)})`]:Object.assign({},$e(e,r))}),cn=()=>({}),un=()=>({}),dn=ve("Grid",on,cn),mn=ve("Grid",e=>{const t=qe(e,{gridColumns:24}),r={"-sm":t.screenSMMin,"-md":t.screenMDMin,"-lg":t.screenLGMin,"-xl":t.screenXLMin,"-xxl":t.screenXXLMin};return[ln(t),$e(t,""),$e(t,"-xs"),Object.keys(r).map(n=>sn(t,r[n],n)).reduce((n,o)=>Object.assign(Object.assign({},n),o),{})]},un);var fn=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};function Le(e){return typeof e=="number"?`${e} ${e} auto`:/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?`0 0 ${e}`:e}const pn=["xs","sm","md","lg","xl","xxl"],Je=l.forwardRef((e,t)=>{const{getPrefixCls:r,direction:n}=l.useContext(ce),{gutter:o,wrap:a}=l.useContext(Ye),{prefixCls:s,span:i,order:u,offset:m,push:x,pull:p,className:j,children:S,flex:$,style:I}=e,N=fn(e,["prefixCls","span","order","offset","push","pull","className","children","flex","style"]),d=r("col",s),[O,c,h]=mn(d),v={};let b={};pn.forEach(C=>{let g={};const L=e[C];typeof L=="number"?g.span=L:typeof L=="object"&&(g=L||{}),delete N[C],b=Object.assign(Object.assign({},b),{[`${d}-${C}-${g.span}`]:g.span!==void 0,[`${d}-${C}-order-${g.order}`]:g.order||g.order===0,[`${d}-${C}-offset-${g.offset}`]:g.offset||g.offset===0,[`${d}-${C}-push-${g.push}`]:g.push||g.push===0,[`${d}-${C}-pull-${g.pull}`]:g.pull||g.pull===0,[`${d}-rtl`]:n==="rtl"}),g.flex&&(b[`${d}-${C}-flex`]=!0,v[`--${d}-${C}-flex`]=Le(g.flex))});const V=Q(d,{[`${d}-${i}`]:i!==void 0,[`${d}-order-${u}`]:u,[`${d}-offset-${m}`]:m,[`${d}-push-${x}`]:x,[`${d}-pull-${p}`]:p},j,b,c,h),w={};if(o&&o[0]>0){const C=o[0]/2;w.paddingLeft=C,w.paddingRight=C}return $&&(w.flex=Le($),a===!1&&!w.minWidth&&(w.minWidth=0)),O(l.createElement("div",Object.assign({},N,{style:Object.assign(Object.assign(Object.assign({},w),I),v),className:V,ref:t}),S))});var gn=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};function _e(e,t){const[r,n]=l.useState(typeof e=="string"?e:""),o=()=>{if(typeof e=="string"&&n(e),typeof e=="object")for(let a=0;a<fe.length;a++){const s=fe[a];if(!t[s])continue;const i=e[s];if(i!==void 0){n(i);return}}};return l.useEffect(()=>{o()},[JSON.stringify(e),t]),r}const hn=l.forwardRef((e,t)=>{const{prefixCls:r,justify:n,align:o,className:a,style:s,children:i,gutter:u=0,wrap:m}=e,x=gn(e,["prefixCls","justify","align","className","style","children","gutter","wrap"]),{getPrefixCls:p,direction:j}=l.useContext(ce),[S,$]=l.useState({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),[I,N]=l.useState({xs:!1,sm:!1,md:!1,lg:!1,xl:!1,xxl:!1}),d=_e(o,I),O=_e(n,I),c=l.useRef(u),h=Zt();l.useEffect(()=>{const f=h.subscribe(H=>{N(H);const P=c.current||0;(!Array.isArray(P)&&typeof P=="object"||Array.isArray(P)&&(typeof P[0]=="object"||typeof P[1]=="object"))&&$(H)});return()=>h.unsubscribe(f)},[]);const v=()=>{const f=[void 0,void 0];return(Array.isArray(u)?u:[u,void 0]).forEach((P,G)=>{if(typeof P=="object")for(let A=0;A<fe.length;A++){const D=fe[A];if(S[D]&&P[D]!==void 0){f[G]=P[D];break}}else f[G]=P}),f},b=p("row",r),[V,w,C]=dn(b),g=v(),L=Q(b,{[`${b}-no-wrap`]:m===!1,[`${b}-${O}`]:O,[`${b}-${d}`]:d,[`${b}-rtl`]:j==="rtl"},a,w,C),B={},E=g[0]!=null&&g[0]>0?g[0]/-2:void 0;E&&(B.marginLeft=E,B.marginRight=E);const[F,T]=g;B.rowGap=T;const q=l.useMemo(()=>({gutter:[F,T],wrap:m}),[F,T,m]);return V(l.createElement(Ye.Provider,{value:q},l.createElement("div",Object.assign({},x,{className:L,style:Object.assign(Object.assign({},B),s),ref:t}),i)))});function pe(e){const[t,r]=l.useState(e);return l.useEffect(()=>{const n=setTimeout(()=>{r(e)},e.length?0:10);return()=>{clearTimeout(n)}},[e]),t}const bn=e=>{const{componentCls:t}=e,r=`${t}-show-help`,n=`${t}-show-help-item`;return{[r]:{transition:`opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`,"&-appear, &-enter":{opacity:0,"&-active":{opacity:1}},"&-leave":{opacity:1,"&-active":{opacity:0}},[n]:{overflow:"hidden",transition:`height ${e.motionDurationSlow} ${e.motionEaseInOut},
                     opacity ${e.motionDurationSlow} ${e.motionEaseInOut},
                     transform ${e.motionDurationSlow} ${e.motionEaseInOut} !important`,[`&${n}-appear, &${n}-enter`]:{transform:"translateY(-5px)",opacity:0,"&-active":{transform:"translateY(0)",opacity:1}},[`&${n}-leave-active`]:{transform:"translateY(-5px)"}}}}},yn=e=>({legend:{display:"block",width:"100%",marginBottom:e.marginLG,padding:0,color:e.colorTextDescription,fontSize:e.fontSizeLG,lineHeight:"inherit",border:0,borderBottom:`${U(e.lineWidth)} ${e.lineType} ${e.colorBorder}`},'input[type="search"]':{boxSizing:"border-box"},'input[type="radio"], input[type="checkbox"]':{lineHeight:"normal"},'input[type="file"]':{display:"block"},'input[type="range"]':{display:"block",width:"100%"},"select[multiple], select[size]":{height:"auto"},"input[type='file']:focus,\n  input[type='radio']:focus,\n  input[type='checkbox']:focus":{outline:0,boxShadow:`0 0 0 ${U(e.controlOutlineWidth)} ${e.controlOutline}`},output:{display:"block",paddingTop:15,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight}}),Te=(e,t)=>{const{formItemCls:r}=e;return{[r]:{[`${r}-label > label`]:{height:t},[`${r}-control-input`]:{minHeight:t}}}},xn=e=>{const{componentCls:t}=e;return{[e.componentCls]:Object.assign(Object.assign(Object.assign({},Be(e)),yn(e)),{[`${t}-text`]:{display:"inline-block",paddingInlineEnd:e.paddingSM},"&-small":Object.assign({},Te(e,e.controlHeightSM)),"&-large":Object.assign({},Te(e,e.controlHeightLG))})}},$n=e=>{const{formItemCls:t,iconCls:r,componentCls:n,rootPrefixCls:o,antCls:a,labelRequiredMarkColor:s,labelColor:i,labelFontSize:u,labelHeight:m,labelColonMarginInlineStart:x,labelColonMarginInlineEnd:p,itemMarginBottom:j}=e;return{[t]:Object.assign(Object.assign({},Be(e)),{marginBottom:j,verticalAlign:"top","&-with-help":{transition:"none"},[`&-hidden,
        &-hidden${a}-row`]:{display:"none"},"&-has-warning":{[`${t}-split`]:{color:e.colorError}},"&-has-error":{[`${t}-split`]:{color:e.colorWarning}},[`${t}-label`]:{flexGrow:0,overflow:"hidden",whiteSpace:"nowrap",textAlign:"end",verticalAlign:"middle","&-left":{textAlign:"start"},"&-wrap":{overflow:"unset",lineHeight:e.lineHeight,whiteSpace:"unset"},"> label":{position:"relative",display:"inline-flex",alignItems:"center",maxWidth:"100%",height:m,color:i,fontSize:u,[`> ${r}`]:{fontSize:e.fontSize,verticalAlign:"top"},[`&${t}-required:not(${t}-required-mark-optional)::before`]:{display:"inline-block",marginInlineEnd:e.marginXXS,color:s,fontSize:e.fontSize,fontFamily:"SimSun, sans-serif",lineHeight:1,content:'"*"',[`${n}-hide-required-mark &`]:{display:"none"}},[`${t}-optional`]:{display:"inline-block",marginInlineStart:e.marginXXS,color:e.colorTextDescription,[`${n}-hide-required-mark &`]:{display:"none"}},[`${t}-tooltip`]:{color:e.colorTextDescription,cursor:"help",writingMode:"horizontal-tb",marginInlineStart:e.marginXXS},"&::after":{content:'":"',position:"relative",marginBlock:0,marginInlineStart:x,marginInlineEnd:p},[`&${t}-no-colon::after`]:{content:'"\\a0"'}}},[`${t}-control`]:{"--ant-display":"flex",flexDirection:"column",flexGrow:1,[`&:first-child:not([class^="'${o}-col-'"]):not([class*="' ${o}-col-'"])`]:{width:"100%"},"&-input":{position:"relative",display:"flex",alignItems:"center",minHeight:e.controlHeight,"&-content":{flex:"auto",maxWidth:"100%",lineHeight:"100%"}}},[t]:{"&-explain, &-extra":{clear:"both",color:e.colorTextDescription,fontSize:e.fontSize,lineHeight:e.lineHeight},"&-explain-connected":{width:"100%"},"&-extra":{minHeight:e.controlHeightSM,transition:`color ${e.motionDurationMid} ${e.motionEaseOut}`},"&-explain":{"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning}}},[`&-with-help ${t}-explain`]:{height:"auto",opacity:1},[`${t}-feedback-icon`]:{fontSize:e.fontSize,textAlign:"center",visibility:"visible",animationName:De,animationDuration:e.motionDurationMid,animationTimingFunction:e.motionEaseOutBack,pointerEvents:"none","&-success":{color:e.colorSuccess},"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning},"&-validating":{color:e.colorPrimary}}})}},We=(e,t)=>{const{formItemCls:r}=e;return{[`${t}-horizontal`]:{[`${r}-label`]:{flexGrow:0},[`${r}-control`]:{flex:"1 1 0",minWidth:0},[`${r}-label[class$='-24'], ${r}-label[class*='-24 ']`]:{[`& + ${r}-control`]:{minWidth:"unset"}}}}},vn=e=>{const{componentCls:t,formItemCls:r,inlineItemMarginBottom:n}=e;return{[`${t}-inline`]:{display:"flex",flexWrap:"wrap",[r]:{flex:"none",marginInlineEnd:e.margin,marginBottom:n,"&-row":{flexWrap:"nowrap"},[`> ${r}-label,
        > ${r}-control`]:{display:"inline-block",verticalAlign:"top"},[`> ${r}-label`]:{flex:"none"},[`${t}-text`]:{display:"inline-block"},[`${r}-has-feedback`]:{display:"inline-block"}}}}},J=e=>({padding:e.verticalLabelPadding,margin:e.verticalLabelMargin,whiteSpace:"initial",textAlign:"start","> label":{margin:0,"&::after":{visibility:"hidden"}}}),Ue=e=>{const{componentCls:t,formItemCls:r,rootPrefixCls:n}=e;return{[`${r} ${r}-label`]:J(e),[`${t}:not(${t}-inline)`]:{[r]:{flexWrap:"wrap",[`${r}-label, ${r}-control`]:{[`&:not([class*=" ${n}-col-xs"])`]:{flex:"0 0 100%",maxWidth:"100%"}}}}}},Cn=e=>{const{componentCls:t,formItemCls:r,antCls:n}=e;return{[`${t}-vertical`]:{[`${r}:not(${r}-horizontal)`]:{[`${r}-row`]:{flexDirection:"column"},[`${r}-label > label`]:{height:"auto"},[`${r}-control`]:{width:"100%"},[`${r}-label,
        ${n}-col-24${r}-label,
        ${n}-col-xl-24${r}-label`]:J(e)}},[`@media (max-width: ${U(e.screenXSMax)})`]:[Ue(e),{[t]:{[`${r}:not(${r}-horizontal)`]:{[`${n}-col-xs-24${r}-label`]:J(e)}}}],[`@media (max-width: ${U(e.screenSMMax)})`]:{[t]:{[`${r}:not(${r}-horizontal)`]:{[`${n}-col-sm-24${r}-label`]:J(e)}}},[`@media (max-width: ${U(e.screenMDMax)})`]:{[t]:{[`${r}:not(${r}-horizontal)`]:{[`${n}-col-md-24${r}-label`]:J(e)}}},[`@media (max-width: ${U(e.screenLGMax)})`]:{[t]:{[`${r}:not(${r}-horizontal)`]:{[`${n}-col-lg-24${r}-label`]:J(e)}}}}},wn=e=>{const{formItemCls:t,antCls:r}=e;return{[`${t}-vertical`]:{[`${t}-row`]:{flexDirection:"column"},[`${t}-label > label`]:{height:"auto"},[`${t}-control`]:{width:"100%"}},[`${t}-vertical ${t}-label,
      ${r}-col-24${t}-label,
      ${r}-col-xl-24${t}-label`]:J(e),[`@media (max-width: ${U(e.screenXSMax)})`]:[Ue(e),{[t]:{[`${r}-col-xs-24${t}-label`]:J(e)}}],[`@media (max-width: ${U(e.screenSMMax)})`]:{[t]:{[`${r}-col-sm-24${t}-label`]:J(e)}},[`@media (max-width: ${U(e.screenMDMax)})`]:{[t]:{[`${r}-col-md-24${t}-label`]:J(e)}},[`@media (max-width: ${U(e.screenLGMax)})`]:{[t]:{[`${r}-col-lg-24${t}-label`]:J(e)}}}},Sn=e=>({labelRequiredMarkColor:e.colorError,labelColor:e.colorTextHeading,labelFontSize:e.fontSize,labelHeight:e.controlHeight,labelColonMarginInlineStart:e.marginXXS/2,labelColonMarginInlineEnd:e.marginXS,itemMarginBottom:e.marginLG,verticalLabelPadding:`0 0 ${e.paddingXS}px`,verticalLabelMargin:0,inlineItemMarginBottom:0}),Qe=(e,t)=>qe(e,{formItemCls:`${e.componentCls}-item`,rootPrefixCls:t}),Se=ve("Form",(e,t)=>{let{rootPrefixCls:r}=t;const n=Qe(e,r);return[xn(n),$n(n),bn(n),We(n,n.componentCls),We(n,n.formItemCls),vn(n),Cn(n),wn(n),st(n),De]},Sn,{order:-1e3}),He=[];function xe(e,t,r){let n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return{key:typeof e=="string"?e:`${t}-${n}`,error:e,errorStatus:r}}const Ze=e=>{let{help:t,helpStatus:r,errors:n=He,warnings:o=He,className:a,fieldId:s,onVisibleChanged:i}=e;const{prefixCls:u}=l.useContext(Ce),m=`${u}-item-explain`,x=we(u),[p,j,S]=Se(u,x),$=l.useMemo(()=>Me(u),[u]),I=pe(n),N=pe(o),d=l.useMemo(()=>t!=null?[xe(t,"help",r)]:[].concat(Y(I.map((c,h)=>xe(c,"error","error",h))),Y(N.map((c,h)=>xe(c,"warning","warning",h)))),[t,r,I,N]),O={};return s&&(O.id=`${s}_help`),p(l.createElement(it,{motionDeadline:$.motionDeadline,motionName:`${u}-show-help`,visible:!!d.length,onVisibleChanged:i},c=>{const{className:h,style:v}=c;return l.createElement("div",Object.assign({},O,{className:Q(m,h,S,x,a,j),style:v,role:"alert"}),l.createElement(ct,Object.assign({keys:d},Me(u),{motionName:`${u}-show-help-item`,component:!1}),b=>{const{key:V,error:w,errorStatus:C,className:g,style:L}=b;return l.createElement("div",{key:V,className:Q(g,{[`${m}-${C}`]:C}),style:L},w)}))}))},In=["parentNode"],On="form_item";function ie(e){return e===void 0||e===!1?[]:Array.isArray(e)?e:[e]}function et(e,t){if(!e.length)return;const r=e.join("_");return t?`${t}_${r}`:In.includes(r)?`${On}_${r}`:r}function tt(e,t,r,n,o,a){let s=n;return a!==void 0?s=a:r.validating?s="validating":e.length?s="error":t.length?s="warning":(r.touched||o&&r.validated)&&(s="success"),s}function Ae(e){return ie(e).join("_")}function jn(e,t){const r=t.getFieldInstance(e),n=dt(r);if(n)return n;const o=et(ie(e),t.__INTERNAL__.name);if(o)return document.getElementById(o)}function nt(e){const[t]=ut(),r=l.useRef({}),n=l.useMemo(()=>e??Object.assign(Object.assign({},t),{__INTERNAL__:{itemRef:o=>a=>{const s=Ae(o);a?r.current[s]=a:delete r.current[s]}},scrollToField:function(o){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const s=jn(o,n);s&&rn(s,Object.assign({scrollMode:"if-needed",block:"nearest"},a))},getFieldInstance:o=>{const a=Ae(o);return r.current[a]}}),[e,t]);return[n]}var En=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const Mn=(e,t)=>{const r=l.useContext(mt),{getPrefixCls:n,direction:o,form:a}=l.useContext(ce),{prefixCls:s,className:i,rootClassName:u,size:m,disabled:x=r,form:p,colon:j,labelAlign:S,labelWrap:$,labelCol:I,wrapperCol:N,hideRequiredMark:d,layout:O="horizontal",scrollToFirstError:c,requiredMark:h,onFinishFailed:v,name:b,style:V,feedbackIcons:w,variant:C}=e,g=En(e,["prefixCls","className","rootClassName","size","disabled","form","colon","labelAlign","labelWrap","labelCol","wrapperCol","hideRequiredMark","layout","scrollToFirstError","requiredMark","onFinishFailed","name","style","feedbackIcons","variant"]),L=ft(m),B=l.useContext(pt),E=l.useMemo(()=>h!==void 0?h:d?!1:a&&a.requiredMark!==void 0?a.requiredMark:!0,[d,h,a]),F=j??(a==null?void 0:a.colon),T=n("form",s),q=we(T),[f,H,P]=Se(T,q),G=Q(T,`${T}-${O}`,{[`${T}-hide-required-mark`]:E===!1,[`${T}-rtl`]:o==="rtl",[`${T}-${L}`]:L},P,q,H,a==null?void 0:a.className,i,u),[A]=nt(p),{__INTERNAL__:D}=A;D.name=b;const Z=l.useMemo(()=>({name:b,labelAlign:S,labelCol:I,labelWrap:$,wrapperCol:N,vertical:O==="vertical",colon:F,requiredMark:E,itemRef:D.itemRef,form:A,feedbackIcons:w}),[b,S,I,N,O,F,E,A,w]),re=l.useRef(null);l.useImperativeHandle(t,()=>{var y;return Object.assign(Object.assign({},A),{nativeElement:(y=re.current)===null||y===void 0?void 0:y.nativeElement})});const ee=(y,_)=>{if(y){let M={block:"nearest"};typeof y=="object"&&(M=y),A.scrollToField(_,M)}},X=y=>{if(v==null||v(y),y.errorFields.length){const _=y.errorFields[0].name;if(c!==void 0){ee(c,_);return}a&&a.scrollToFirstError!==void 0&&ee(a.scrollToFirstError,_)}};return f(l.createElement(gt.Provider,{value:C},l.createElement(ht,{disabled:x},l.createElement(bt.Provider,{value:L},l.createElement(ke,{validateMessages:B},l.createElement(le.Provider,{value:Z},l.createElement(yt,Object.assign({id:b},g,{name:b,onFinishFailed:X,form:A,ref:re,style:Object.assign(Object.assign({},a==null?void 0:a.style),V),className:G}))))))))},Nn=l.forwardRef(Mn);function Fn(e){if(typeof e=="function")return e;const t=xt(e);return t.length<=1?t[0]:t}const rt=()=>{const{status:e,errors:t=[],warnings:r=[]}=l.useContext(me);return{status:e,errors:t,warnings:r}};rt.Context=me;function Pn(e){const[t,r]=l.useState(e),n=l.useRef(null),o=l.useRef([]),a=l.useRef(!1);l.useEffect(()=>(a.current=!1,()=>{a.current=!0,Ne.cancel(n.current),n.current=null}),[]);function s(i){a.current||(n.current===null&&(o.current=[],n.current=Ne(()=>{n.current=null,r(u=>{let m=u;return o.current.forEach(x=>{m=x(m)}),m})})),o.current.push(i))}return[t,s]}function Rn(){const{itemRef:e}=l.useContext(le),t=l.useRef({});function r(n,o){const a=o&&typeof o=="object"&&o.ref,s=n.join("_");return(t.current.name!==s||t.current.originRef!==a)&&(t.current.name=s,t.current.originRef=a,t.current.ref=$t(e(n),a)),t.current.ref}return r}const Vn=e=>{const{formItemCls:t}=e;return{"@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)":{[`${t}-control`]:{display:"flex"}}}},Ln=vt(["Form","item-item"],(e,t)=>{let{rootPrefixCls:r}=t;const n=Qe(e,r);return[Vn(n)]}),_n=e=>{const{prefixCls:t,status:r,wrapperCol:n,children:o,errors:a,warnings:s,_internalItemRender:i,extra:u,help:m,fieldId:x,marginBottom:p,onErrorVisibleChanged:j}=e,S=`${t}-item`,$=l.useContext(le),I=n||$.wrapperCol||{},N=Q(`${S}-control`,I.className),d=l.useMemo(()=>Object.assign({},$),[$]);delete d.labelCol,delete d.wrapperCol;const O=l.createElement("div",{className:`${S}-control-input`},l.createElement("div",{className:`${S}-control-input-content`},o)),c=l.useMemo(()=>({prefixCls:t,status:r}),[t,r]),h=p!==null||a.length||s.length?l.createElement("div",{style:{display:"flex",flexWrap:"nowrap"}},l.createElement(Ce.Provider,{value:c},l.createElement(Ze,{fieldId:x,errors:a,warnings:s,help:m,helpStatus:r,className:`${S}-explain-connected`,onVisibleChanged:j})),!!p&&l.createElement("div",{style:{width:0,height:p}})):null,v={};x&&(v.id=`${x}_extra`);const b=u?l.createElement("div",Object.assign({},v,{className:`${S}-extra`}),u):null,V=i&&i.mark==="pro_table_render"&&i.render?i.render(e,{input:O,errorList:h,extra:b}):l.createElement(l.Fragment,null,O,h,b);return l.createElement(le.Provider,{value:d},l.createElement(Je,Object.assign({},I,{className:N}),V),l.createElement(Ln,{prefixCls:t}))};var Tn={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"question-circle",theme:"outlined"},Wn=function(t,r){return l.createElement(Ge,Xe({},t,{ref:r,icon:Tn}))},Hn=l.forwardRef(Wn),An=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};function zn(e){return e?typeof e=="object"&&!l.isValidElement(e)?e:{title:e}:null}const qn=e=>{let{prefixCls:t,label:r,htmlFor:n,labelCol:o,labelAlign:a,colon:s,required:i,requiredMark:u,tooltip:m,vertical:x}=e;var p;const[j]=Ct("Form"),{labelAlign:S,labelCol:$,labelWrap:I,colon:N}=l.useContext(le);if(!r)return null;const d=o||$||{},O=a||S,c=`${t}-item-label`,h=Q(c,O==="left"&&`${c}-left`,d.className,{[`${c}-wrap`]:!!I});let v=r;const b=s===!0||N!==!1&&s!==!1;b&&!x&&typeof r=="string"&&r.trim()&&(v=r.replace(/[:|：]\s*$/,""));const w=zn(m);if(w){const{icon:B=l.createElement(Hn,null)}=w,E=An(w,["icon"]),F=l.createElement(wt,Object.assign({},E),l.cloneElement(B,{className:`${t}-item-tooltip`,title:"",onClick:T=>{T.preventDefault()},tabIndex:null}));v=l.createElement(l.Fragment,null,v,F)}const C=u==="optional",g=typeof u=="function";g?v=u(v,{required:!!i}):C&&!i&&(v=l.createElement(l.Fragment,null,v,l.createElement("span",{className:`${t}-item-optional`,title:""},(j==null?void 0:j.optional)||((p=St.Form)===null||p===void 0?void 0:p.optional))));const L=Q({[`${t}-item-required`]:i,[`${t}-item-required-mark-optional`]:C||g,[`${t}-item-no-colon`]:!b});return l.createElement(Je,Object.assign({},d,{className:h}),l.createElement("label",{htmlFor:n,className:L,title:typeof r=="string"?r:""},v))},Dn={success:It,warning:Ot,error:jt,validating:Et};function ot(e){let{children:t,errors:r,warnings:n,hasFeedback:o,validateStatus:a,prefixCls:s,meta:i,noStyle:u}=e;const m=`${s}-item`,{feedbackIcons:x}=l.useContext(le),p=tt(r,n,i,null,!!o,a),{isFormItemInput:j,status:S,hasFeedback:$,feedbackIcon:I}=l.useContext(me),N=l.useMemo(()=>{var d;let O;if(o){const h=o!==!0&&o.icons||x,v=p&&((d=h==null?void 0:h({status:p,errors:r,warnings:n}))===null||d===void 0?void 0:d[p]),b=p&&Dn[p];O=v!==!1&&b?l.createElement("span",{className:Q(`${m}-feedback-icon`,`${m}-feedback-icon-${p}`)},v||l.createElement(b,null)):null}const c={status:p||"",errors:r,warnings:n,hasFeedback:!!o,feedbackIcon:O,isFormItemInput:!0};return u&&(c.status=(p??S)||"",c.isFormItemInput=j,c.hasFeedback=!!(o??$),c.feedbackIcon=o!==void 0?c.feedbackIcon:I),c},[p,o,u,j,S]);return l.createElement(me.Provider,{value:N},t)}var Bn=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};function kn(e){const{prefixCls:t,className:r,rootClassName:n,style:o,help:a,errors:s,warnings:i,validateStatus:u,meta:m,hasFeedback:x,hidden:p,children:j,fieldId:S,required:$,isRequired:I,onSubItemMetaChange:N,layout:d}=e,O=Bn(e,["prefixCls","className","rootClassName","style","help","errors","warnings","validateStatus","meta","hasFeedback","hidden","children","fieldId","required","isRequired","onSubItemMetaChange","layout"]),c=`${t}-item`,{requiredMark:h,vertical:v}=l.useContext(le),b=v||d==="vertical",V=l.useRef(null),w=pe(s),C=pe(i),g=a!=null,L=!!(g||s.length||i.length),B=!!V.current&&Mt(V.current),[E,F]=l.useState(null);Nt(()=>{if(L&&V.current){const P=getComputedStyle(V.current);F(parseInt(P.marginBottom,10))}},[L,B]);const T=P=>{P||F(null)},f=function(){let P=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;const G=P?w:m.errors,A=P?C:m.warnings;return tt(G,A,m,"",!!x,u)}(),H=Q(c,r,n,{[`${c}-with-help`]:g||w.length||C.length,[`${c}-has-feedback`]:f&&x,[`${c}-has-success`]:f==="success",[`${c}-has-warning`]:f==="warning",[`${c}-has-error`]:f==="error",[`${c}-is-validating`]:f==="validating",[`${c}-hidden`]:p,[`${c}-${d}`]:d});return l.createElement("div",{className:H,style:o,ref:V},l.createElement(hn,Object.assign({className:`${c}-row`},Ft(O,["_internalItemRender","colon","dependencies","extra","fieldKey","getValueFromEvent","getValueProps","htmlFor","id","initialValue","isListField","label","labelAlign","labelCol","labelWrap","messageVariables","name","normalize","noStyle","preserve","requiredMark","rules","shouldUpdate","trigger","tooltip","validateFirst","validateTrigger","valuePropName","wrapperCol","validateDebounce"])),l.createElement(qn,Object.assign({htmlFor:S},e,{requiredMark:h,required:$??I,prefixCls:t,vertical:b})),l.createElement(_n,Object.assign({},e,m,{errors:w,warnings:C,prefixCls:t,status:f,help:a,marginBottom:E,onErrorVisibleChanged:T}),l.createElement(Ke.Provider,{value:N},l.createElement(ot,{prefixCls:t,meta:m,errors:m.errors,warnings:m.warnings,hasFeedback:x,validateStatus:f},j)))),!!E&&l.createElement("div",{className:`${c}-margin-offset`,style:{marginBottom:-E}}))}const Gn="__SPLIT__";function Xn(e,t){const r=Object.keys(e),n=Object.keys(t);return r.length===n.length&&r.every(o=>{const a=e[o],s=t[o];return a===s||typeof a=="function"||typeof s=="function"})}const Kn=l.memo(e=>{let{children:t}=e;return t},(e,t)=>Xn(e.control,t.control)&&e.update===t.update&&e.childProps.length===t.childProps.length&&e.childProps.every((r,n)=>r===t.childProps[n]));function ze(){return{errors:[],warnings:[],touched:!1,validating:!1,name:[],validated:!1}}function Yn(e){const{name:t,noStyle:r,className:n,dependencies:o,prefixCls:a,shouldUpdate:s,rules:i,children:u,required:m,label:x,messageVariables:p,trigger:j="onChange",validateTrigger:S,hidden:$,help:I,layout:N}=e,{getPrefixCls:d}=l.useContext(ce),{name:O}=l.useContext(le),c=Fn(u),h=typeof c=="function",v=l.useContext(Ke),{validateTrigger:b}=l.useContext(Pt),V=S!==void 0?S:b,w=t!=null,C=d("form",a),g=we(C),[L,B,E]=Se(C,g);Wt();const F=l.useContext(Rt),T=l.useRef(),[q,f]=Pn({}),[H,P]=Vt(()=>ze()),G=y=>{const _=F==null?void 0:F.getKey(y.name);if(P(y.destroy?ze():y,!0),r&&I!==!1&&v){let M=y.name;if(y.destroy)M=T.current||M;else if(_!==void 0){const[z,K]=_;M=[z].concat(Y(K)),T.current=M}v(y,M)}},A=(y,_)=>{f(M=>{const z=Object.assign({},M),te=[].concat(Y(y.name.slice(0,-1)),Y(_)).join(Gn);return y.destroy?delete z[te]:z[te]=y,z})},[D,Z]=l.useMemo(()=>{const y=Y(H.errors),_=Y(H.warnings);return Object.values(q).forEach(M=>{y.push.apply(y,Y(M.errors||[])),_.push.apply(_,Y(M.warnings||[]))}),[y,_]},[q,H.errors,H.warnings]),re=Rn();function ee(y,_,M){return r&&!$?l.createElement(ot,{prefixCls:C,hasFeedback:e.hasFeedback,validateStatus:e.validateStatus,meta:H,errors:D,warnings:Z,noStyle:!0},y):l.createElement(kn,Object.assign({key:"row"},e,{className:Q(n,E,g,B),prefixCls:C,fieldId:_,isRequired:M,errors:D,warnings:Z,meta:H,onSubItemMetaChange:A,layout:N}),y)}if(!w&&!h&&!o)return L(ee(c));let X={};return typeof x=="string"?X.label=x:t&&(X.label=String(t)),p&&(X=Object.assign(Object.assign({},X),p)),L(l.createElement(Lt,Object.assign({},e,{messageVariables:X,trigger:j,validateTrigger:V,onMetaChange:G}),(y,_,M)=>{const z=ie(t).length&&_?_.name:[],K=et(z,O),te=m!==void 0?m:!!(i!=null&&i.some(W=>{if(W&&typeof W=="object"&&W.required&&!W.warningOnly)return!0;if(typeof W=="function"){const ne=W(M);return(ne==null?void 0:ne.required)&&!(ne!=null&&ne.warningOnly)}return!1})),ae=Object.assign({},y);let oe=null;if(Array.isArray(c)&&w)oe=c;else if(!(h&&(!(s||o)||w))){if(!(o&&!h&&!w))if(l.isValidElement(c)){const W=Object.assign(Object.assign({},c.props),ae);if(W.id||(W.id=K),I||D.length>0||Z.length>0||e.extra){const se=[];(I||D.length>0)&&se.push(`${K}_help`),e.extra&&se.push(`${K}_extra`),W["aria-describedby"]=se.join(" ")}D.length>0&&(W["aria-invalid"]="true"),te&&(W["aria-required"]="true"),_t(c)&&(W.ref=re(z,c)),new Set([].concat(Y(ie(j)),Y(ie(V)))).forEach(se=>{W[se]=function(){for(var Ie,Oe,ge,je,he,Ee=arguments.length,be=new Array(Ee),ue=0;ue<Ee;ue++)be[ue]=arguments[ue];(ge=ae[se])===null||ge===void 0||(Ie=ge).call.apply(Ie,[ae].concat(be)),(he=(je=c.props)[se])===null||he===void 0||(Oe=he).call.apply(Oe,[je].concat(be))}});const at=[W["aria-required"],W["aria-invalid"],W["aria-describedby"]];oe=l.createElement(Kn,{control:ae,update:c,childProps:at},Tt(c,W))}else h&&(s||o)&&!w?oe=c(M):oe=c}return ee(oe,K,te)}))}const lt=Yn;lt.useStatus=rt;var Jn=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const Un=e=>{var{prefixCls:t,children:r}=e,n=Jn(e,["prefixCls","children"]);const{getPrefixCls:o}=l.useContext(ce),a=o("form",t),s=l.useMemo(()=>({prefixCls:a,status:"error"}),[a]);return l.createElement(Ht,Object.assign({},n),(i,u,m)=>l.createElement(Ce.Provider,{value:s},r(i.map(x=>Object.assign(Object.assign({},x),{fieldKey:x.key})),u,{errors:m.errors,warnings:m.warnings})))};function Qn(){const{form:e}=l.useContext(le);return e}const k=Nn;k.Item=lt;k.List=Un;k.ErrorList=Ze;k.useForm=nt;k.useFormInstance=Qn;k.useWatch=At;k.Provider=ke;k.create=()=>{};var Zn={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"}}]},name:"lock",theme:"outlined"},er=function(t,r){return l.createElement(Ge,Xe({},t,{ref:r,icon:Zn}))},tr=l.forwardRef(er);function or(){zt(i=>i.theme);const e=qt(),[t]=Dt(),r=Bt();k.useForm();const n="React App",[o,a]=l.useState(!1),s=async i=>{a(!0);const u=await Kt({account:i.userAccount,password:i.password});if(a(!1),!u||u.code!==0)return;Yt(u.data.accessToken);const m={...t},{redirect:x}=m;x&&Reflect.deleteProperty(m,"redirect");const p="/";await r(Jt()),await r(Ut()),Qt.success({content:"登录成功",duration:1,onClose:()=>{e(p)}})};return R.jsx("div",{className:"user-layout box-border border-border",children:R.jsxs("div",{className:"login-wrap",children:[R.jsxs("div",{className:"login",children:[R.jsxs("div",{className:"login-title",children:[R.jsx("img",{className:"login-title-img",src:kt}),R.jsx("span",{className:"login-title-text",children:n})]}),R.jsx("div",{className:"text-text2 text-center mt-4 mb-12",children:"React 是一款非常流行的 JavaScript 前端框架"}),R.jsxs(k,{className:"login-form",colon:!1,labelCol:{flex:"50px"},labelAlign:"right",onFinish:s,children:[R.jsx(k.Item,{className:"login-form-item",name:"account",rules:[{required:!0,message:"请输入账号",validateTrigger:"onBlur"}],children:R.jsx(Fe,{size:"large",allowClear:!0,placeholder:"账号：admin",prefix:R.jsx(Gt,{className:"text-primary text-3.5",type:"user"})})}),R.jsx(k.Item,{className:"login-form-item",name:"password",rules:[{required:!0,message:"请输入密码",validateTrigger:"onBlur"}],children:R.jsx(Fe.Password,{size:"large",type:"password",allowClear:!0,placeholder:"密码：123456",prefix:R.jsx(tr,{className:"text-primary text-3.5",type:"user"})})}),R.jsxs(k.Item,{name:"remember",children:[R.jsx(en,{children:"自动登录"}),R.jsx("a",{className:"float-right text-btn",href:"#",children:"忘记密码"})]}),R.jsx(k.Item,{className:"login-form-btn-wrap",children:R.jsx(Xt,{className:"login-btn",size:"large",type:"primary",htmlType:"submit",loading:o,children:"登 录"})})]})]}),R.jsxs("div",{className:"footer",children:[R.jsxs("div",{className:"links",children:[R.jsx("a",{className:"link",href:"/login",target:"_self",children:"帮助"}),R.jsx("a",{className:"link",href:"/login",target:"_self",children:"隐私"}),R.jsx("a",{className:"link",href:"/login",target:"_self",children:"条款"})]}),R.jsx("div",{className:"copyright",children:"Copyright © 2023 君惜 (xinlei3166)"})]})]})})}export{or as default};
