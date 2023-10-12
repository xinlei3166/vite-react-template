import{a2 as E,a5 as g,j as o,bV as w,bW as C,bX as D,bY as R}from"./index-37b3e965.js";var y="NOT_FOUND";function L(t){var r;return{get:function(n){return r&&t(r.key,n)?r.value:y},put:function(n,i){r={key:n,value:i}},getEntries:function(){return r?[r]:[]},clear:function(){r=void 0}}}function N(t,r){var e=[];function n(s){var c=e.findIndex(function(f){return r(s,f.key)});if(c>-1){var u=e[c];return c>0&&(e.splice(c,1),e.unshift(u)),u.value}return y}function i(s,c){n(s)===y&&(e.unshift({key:s,value:c}),e.length>t&&e.pop())}function a(){return e}function l(){e=[]}return{get:n,put:i,getEntries:a,clear:l}}var z=function(r,e){return r===e};function W(t){return function(e,n){if(e===null||n===null||e.length!==n.length)return!1;for(var i=e.length,a=0;a<i;a++)if(!t(e[a],n[a]))return!1;return!0}}function U(t,r){var e=typeof r=="object"?r:{equalityCheck:r},n=e.equalityCheck,i=n===void 0?z:n,a=e.maxSize,l=a===void 0?1:a,s=e.resultEqualityCheck,c=W(i),u=l===1?L(c):N(l,c);function f(){var d=u.get(arguments);if(d===y){if(d=t.apply(null,arguments),s){var p=u.getEntries(),v=p.find(function(h){return s(h.value,d)});v&&(d=v.value)}u.put(arguments,d)}return d}return f.clearCache=function(){return u.clear()},f}function H(t){var r=Array.isArray(t[0])?t[0]:t;if(!r.every(function(n){return typeof n=="function"})){var e=r.map(function(n){return typeof n=="function"?"function "+(n.name||"unnamed")+"()":typeof n}).join(", ");throw new Error("createSelector expects all input-selectors to be functions, but received the following types: ["+e+"]")}return r}function P(t){for(var r=arguments.length,e=new Array(r>1?r-1:0),n=1;n<r;n++)e[n-1]=arguments[n];var i=function(){for(var l=arguments.length,s=new Array(l),c=0;c<l;c++)s[c]=arguments[c];var u=0,f,d={memoizeOptions:void 0},p=s.pop();if(typeof p=="object"&&(d=p,p=s.pop()),typeof p!="function")throw new Error("createSelector expects an output function after the inputs, but received: ["+typeof p+"]");var v=d,h=v.memoizeOptions,x=h===void 0?e:h,k=Array.isArray(x)?x:[x],b=H(s),O=t.apply(void 0,[function(){return u++,p.apply(null,arguments)}].concat(k)),T=t(function(){for(var A=[],q=b.length,j=0;j<q;j++)A.push(b[j].apply(null,arguments));return f=O.apply(null,A),f});return Object.assign(T,{resultFunc:p,memoizedResultFunc:O,dependencies:b,lastResult:function(){return f},recomputations:function(){return u},resetRecomputations:function(){return u=0}}),T};return i}var M=P(U);function S(t){const r=E(a=>a.todo.visibilityFilter),e=t.filter===r,n=g(),i=()=>{n({type:"visibilityFilter/setVisibilityFilter",payload:t.filter})};return e?o.jsx("span",{className:"text-primary",children:t.children}):o.jsx("a",{href:"",onClick:a=>{a.preventDefault(),i()},children:t.children})}const V=()=>o.jsxs("p",{children:["Show: ",o.jsx(S,{filter:"SHOW_ALL",children:"All"}),", ",o.jsx(S,{filter:"SHOW_ACTIVE",children:"Active"}),", ",o.jsx(S,{filter:"SHOW_COMPLETED",children:"Completed"})]}),_=V;function $(){let t;const r=g(),e=n=>{n.preventDefault(),t.value.trim()&&(r(w(t.value)),t.value="")};return o.jsx("div",{style:{color:"black"},children:o.jsxs("form",{onSubmit:e,children:[o.jsx("input",{ref:n=>{t=n}}),o.jsx("button",{className:"border-1 border-solid px-1 ml-2",type:"submit",children:"Add Todo"})]})})}const I=t=>t.todo.todos.present,K=t=>t.todo.visibilityFilter,X=M([I,K],(t,r)=>{switch(r){case"SHOW_ALL":return t;case"SHOW_COMPLETED":return t.filter(e=>e.completed);case"SHOW_ACTIVE":return t.filter(e=>!e.completed)}}),F=({onClick:t,completed:r,text:e})=>o.jsxs("li",{className:"cursor-pointer",onClick:t,style:{textDecoration:r?"line-through":"none"},children:["* ",e]});F.propTypes={onClick:C.func.isRequired,completed:C.bool.isRequired,text:C.string.isRequired};function Y(){const t=E(X),r=g(),e=n=>{r(D(n))};return o.jsx("ul",{children:t==null?void 0:t.map((n,i)=>o.jsx(F,{...n,onClick:()=>e(i)},i))})}const B=()=>{const t=g(),r=E(l=>l.todo.todos),e=r.past.length>0,n=r.future.length>0,i=()=>t(R.undo()),a=()=>t(R.redo());return o.jsxs("p",{children:[o.jsx("button",{className:"border-1 border-solid px-1 mt-1 mr-2",onClick:i,disabled:!e,children:"Undo"}),o.jsx("button",{className:"border-1 border-solid px-1 mt-1",onClick:a,disabled:!n,children:"Redo"})]})},G=B;function Q(){return o.jsxs("div",{children:[o.jsx($,{}),o.jsx(Y,{}),o.jsx(_,{}),o.jsx(G,{})]})}export{Q as default};
