import{r,ai as u,aj as o,j as e,a9 as l,ak as c,ag as m}from"./index-37b3e965.js";import{C as d}from"./index-6332c94d.js";function f(s){var n=r.useRef(s);return n.current=s,n}var x=function(s){u&&o(s);var n=f(s);r.useEffect(function(){return function(){n.current()}},[])};const j=x;function h(){const[s,n]=r.useState(0),t=c(),i=()=>{const a=s+1;n(a),t.emit("change-number",a)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"title",children:"A组件"}),e.jsxs("div",{className:"title",children:["当前结果：",s]}),e.jsx(l,{className:"ml-64px",type:"primary",size:"small",onClick:i,children:"增加"})]})}function N(){const[s,n]=r.useState(0),t=c();return m(()=>{t.on("change-number",n)}),j(()=>{t.off("change-number",n)}),e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"title",children:"B组件"}),e.jsxs("div",{className:"title",children:["当前结果：",s]})]})}function v(){return e.jsxs(d,{className:"h-full",children:[e.jsx("div",{className:"title",children:"Bus-相邻组件传值"}),e.jsx("div",{className:"title",children:"可以通过点击A组件中的增加按钮，观察B组件的结果显示"}),e.jsx(h,{}),e.jsx("div",{className:"title",children:"---------------------------------------------------"}),e.jsx(N,{})]})}export{v as default};
