import{r as o,j as e,ak as r,ah as g}from"./index-Bf4oMwZ6.js";import{S as v}from"./index-WAK7VDp4.js";import{u as w,F as S,g as k}from"./columns-DfzufdEE.js";import"./sortable.esm-jJ5SmKJK.js";import{c as y,a as M}from"./columns-fheMsNAI.js";import{C as N}from"./index-vAI0mefv.js";import"./index-Czt22uzl.js";function K(){const[n,i]=o.useState({name1:void 0,name2:void 0,name3:void 0,name4:void 0,name5:void 0}),m=o.useMemo(()=>y([{label:"性别",key:"name5",render:({model:a,onChange:s})=>e.jsxs(r,{value:a.name5,className:"!w-240px",allowClear:!0,placeholder:"请选择性别",getPopupContainer:t=>t.parentNode,onChange:t=>s("name5",t),children:[e.jsx(r.Option,{value:"male",children:"男"}),e.jsx(r.Option,{value:"female",children:"女"})]})}]),[]),l=o.useMemo(()=>M([{key:"operation",render:()=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"text-btn",onClick:f,children:"编辑"}),e.jsx("span",{className:"text-btn",onClick:C,children:"预览"})]})}]),[]),d=o.useMemo(()=>({...n}),[n]),{loading:u,data:p,pagination:h,init:x,onSearch:c,onTableChange:j}=w(k,{params:d});g(x);async function b(){const a={...n};Object.keys(a).forEach(s=>{a[s]=void 0}),i(a),await c(a)}function f(){window.open("https://baidu.com")}function C(){window.open("https://baidu.com")}return e.jsxs(e.Fragment,{children:[e.jsx(v,{className:"mb-4",columns:m,model:n,setModel:i,onSearch:c,onReset:b}),e.jsx(N,{children:e.jsx(S,{rowKey:"id",loading:u,pagination:h,columns:l,dataSource:p,onChange:j})})]})}export{K as default};