import{a3 as i,a6 as l,r as c,ah as u,j as e,a8 as p,aa as m,ai as x}from"./index-Btk-EsWo.js";import{C as d}from"./index-CVZLShpJ.js";function j(){const a=i(s=>s.user),o=l(),[t,n]=c.useState("君惜"),r=()=>{o(x({...a.userinfo,name:t}))};return u(r),e.jsxs(d,{className:"h-full",children:[e.jsx("div",{className:"title",children:"Store"}),e.jsx(p,{className:"!ml-64px !mr-16px !w-240px",value:t,placeholder:"请输入用户名",onChange:s=>n(s.target.value)}),e.jsx(m,{type:"primary",onClick:r,children:"提交"}),e.jsxs("div",{className:"title dark:text-color-green",children:["当前用户：",a.userinfo.name]})]})}export{j as default};