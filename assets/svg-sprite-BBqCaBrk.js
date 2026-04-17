import{o as e}from"./chunk-zsgVPwQN.js";import{n as t}from"./jsx-runtime-C_z8YJsg.js";function n(e){"@babel/helpers - typeof";return n=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},n(e)}function r(e,t){if(n(e)!=`object`||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var i=r.call(e,t||`default`);if(n(i)!=`object`)return i;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function i(e){var t=r(e,`string`);return n(t)==`symbol`?t:t+``}function a(e,t,n){return(t=i(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;n[r]=e[r]}return n}function s(e,t){if(e==null)return{};var n,r,i=o(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c={exports:{}};(function(e){(function(){var t={}.hasOwnProperty;function n(){for(var e=[],r=0;r<arguments.length;r++){var i=arguments[r];if(i){var a=typeof i;if(a===`string`||a===`number`)e.push(i);else if(Array.isArray(i)&&i.length){var o=n.apply(null,i);o&&e.push(o)}else if(a===`object`)for(var s in i)t.call(i,s)&&i[s]&&e.push(s)}}return e.join(` `)}e.exports?(n.default=n,e.exports=n):window.classNames=n})()})(c);var l=c.exports,u=e(t()),d=(0,u.createContext)({classPrefix:`t`,locale:`zh-CN`}),f=(function(){return(0,u.useContext)(d)});function p(){var e=f().classPrefix;return(0,u.useMemo)(function(){return{SIZE:{default:``,xs:`${e}-size-xs`,small:`${e}-size-s`,medium:`${e}-size-m`,large:`${e}-size-l`,xl:`${e}-size-xl`,block:`${e}-size-full-width`},STATUS:{loading:`${e}-is-loading`,disabled:`${e}-is-disabled`,focused:`${e}-is-focused`,success:`${e}-is-success`,error:`${e}-is-error`,warning:`${e}-is-warning`,selected:`${e}-is-selected`,active:`${e}-is-active`,checked:`${e}-is-checked`,current:`${e}-is-current`,hidden:`${e}-is-hidden`,visible:`${e}-is-visible`,expanded:`${e}-is-expanded`,indeterminate:`${e}-is-indeterminate`}}},[e])}function m(e){var t=p().SIZE;return e===void 0?{}:e in t?{className:t[e],style:{}}:{className:``,style:{fontSize:e}}}function h(e,t){if(!(!document||!e||typeof e!=`string`)&&!(document.querySelectorAll(`.${t}[src="${e}"]`).length>0)){var n=document.createElement(`script`);n.setAttribute(`class`,t),n.setAttribute(`src`,e),document.body.appendChild(n)}}function g(){var e=`__TDESIGN_ICON_STYLE__`,t=`@keyframes t-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .t-icon {
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
  }
  .t-icon::before {
    font-family: unset;
  }
  .t-icon-loading {
    animation: t-spin 1s linear infinite;
  }
  .t-icon.t-size-s,
  i.t-size-s {
    font-size: 14px;
  }
  .t-icon.t-size-m,
  i.t-size-m {
    font-size: 16px;
  }
  .t-icon.t-size-l,
  i.t-size-l {
    font-size: 18px;
  }
  `;if(!(!document||document.getElementById(e))){var n=document.createElement(`style`);n.setAttribute(`id`,e),n.innerHTML=t,document.head.appendChild(n)}}var _=[`name`,`size`,`url`,`loadDefaultIcons`,`className`,`style`];function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?v(Object(n),!0).forEach(function(t){a(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var b=`https://tdesign.gtimg.com/icon/0.4.2/fonts/index.js`,x=(0,u.forwardRef)(function(e,t){var n=f().classPrefix,r=e.name,i=e.size,a=e.url,o=e.loadDefaultIcons,c=o===void 0?!0:o,d=e.className,p=e.style,v=s(e,_),x=m(i),S=x.className,C=x.style,w=(0,u.useMemo)(function(){var e=a?r:`${n}-icon-${r}`;return l(`${n}-icon`,e,S,d)},[n,d,r,S]);return(0,u.useEffect)(function(){g()},[]),(0,u.useEffect)(function(){c&&h(b,`${n}-svg-js-stylesheet--unique-class`)},[n,c]),(0,u.useEffect)(function(){(Array.isArray(a)?a:[a]).forEach(function(e){h(e,`${n}-svg-js-stylesheet--unique-class`)})},[n,a]),u.createElement(`svg`,y({ref:t,className:w,style:y(y({},p),C)},v),u.createElement(`use`,{xlinkHref:a?`#${r}`:`#t-icon-${r}`}))});x.displayName=`Icon`;export{s as a,a as i,g as n,l as o,m as r,x as t};