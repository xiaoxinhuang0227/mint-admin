import{s as e,aj as t,ak as l,Z as a,C as s,$ as n,ab as r,al as i,B as o,Q as c,g as d,b as u,c as p,d as f,F as y,k as b,D as m,e as v,J as g,am as h,an as S,W as w,ao as k,q as x,n as $,L as O,f as D,t as N,H as j,ap as z,O as E,P as A,p as _,aq as C,ar as W}from"./index.C8pNQb-t.js";const I=Symbol("elDescriptions");var q=e({name:"ElDescriptionsCell",props:{cell:{type:Object},tag:{type:String,default:"td"},type:{type:String}},setup:()=>({descriptions:t(I,{})}),render(){var e,t,o,c,d,u,p;const f=l(this.cell),y=((null==(e=this.cell)?void 0:e.dirs)||[]).map((e=>{const{dir:t,arg:l,modifiers:a,value:s}=e;return[t,s,l,a]})),{border:b,direction:m}=this.descriptions,v="vertical"===m,g=(null==(c=null==(o=null==(t=this.cell)?void 0:t.children)?void 0:o.label)?void 0:c.call(o))||f.label,h=null==(p=null==(u=null==(d=this.cell)?void 0:d.children)?void 0:u.default)?void 0:p.call(u),S=f.span,w=f.align?`is-${f.align}`:"",k=f.labelAlign?`is-${f.labelAlign}`:w,x=f.className,$=f.labelClassName,O={width:a(f.width),minWidth:a(f.minWidth)},D=s("descriptions");switch(this.type){case"label":return n(r(this.tag,{style:O,class:[D.e("cell"),D.e("label"),D.is("bordered-label",b),D.is("vertical-label",v),k,$],colSpan:v?S:1},g),y);case"content":return n(r(this.tag,{style:O,class:[D.e("cell"),D.e("content"),D.is("bordered-content",b),D.is("vertical-content",v),w,x],colSpan:v?S:2*S-1},h),y);default:return n(r("td",{style:O,class:[D.e("cell"),w],colSpan:S},[i(g)?void 0:r("span",{class:[D.e("label"),$]},g),r("span",{class:[D.e("content"),x]},h)]),y)}}});const B=o({row:{type:c(Array),default:()=>[]}}),F={key:1},H=e({name:"ElDescriptionsRow"});var J=g(e({...H,props:B,setup(e){const l=t(I,{});return(e,t)=>"vertical"===d(l).direction?(u(),p(y,{key:0},[f("tr",null,[(u(!0),p(y,null,b(e.row,((e,t)=>(u(),m(d(q),{key:`tr1-${t}`,cell:e,tag:"th",type:"label"},null,8,["cell"])))),128))]),f("tr",null,[(u(!0),p(y,null,b(e.row,((e,t)=>(u(),m(d(q),{key:`tr2-${t}`,cell:e,tag:"td",type:"content"},null,8,["cell"])))),128))])],64)):(u(),p("tr",F,[(u(!0),p(y,null,b(e.row,((e,t)=>(u(),p(y,{key:`tr3-${t}`},[d(l).border?(u(),p(y,{key:0},[v(d(q),{cell:e,tag:"td",type:"label"},null,8,["cell"]),v(d(q),{cell:e,tag:"td",type:"content"},null,8,["cell"])],64)):(u(),m(d(q),{key:1,cell:e,tag:"td",type:"both"},null,8,["cell"]))],64)))),128))]))}}),[["__file","descriptions-row.vue"]]);const L=o({border:Boolean,column:{type:Number,default:3},direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},size:h,title:{type:String,default:""},extra:{type:String,default:""}}),P=e({name:"ElDescriptions"});var Q=g(e({...P,props:L,setup(e){const t=e,l=s("descriptions"),a=S(),n=w();k(I,t);const r=x((()=>[l.b(),l.m(a.value)])),i=(e,t,l,a=!1)=>(e.props||(e.props={}),t>l&&(e.props.span=l),a&&(e.props.span=t),e),o=()=>{if(!n.default)return[];const e=z(n.default()).filter((e=>{var t;return"ElDescriptionsItem"===(null==(t=null==e?void 0:e.type)?void 0:t.name)})),l=[];let a=[],s=t.column,r=0;return e.forEach(((n,o)=>{var c;const d=(null==(c=n.props)?void 0:c.span)||1;if(o<e.length-1&&(r+=d>s?s:d),o===e.length-1){const e=t.column-r%t.column;return a.push(i(n,e,s,!0)),void l.push(a)}d<s?(s-=d,a.push(n)):(a.push(i(n,d,s)),l.push(a),s=t.column,a=[])})),l};return(e,t)=>(u(),p("div",{class:$(d(r))},[e.title||e.extra||e.$slots.title||e.$slots.extra?(u(),p("div",{key:0,class:$(d(l).e("header"))},[f("div",{class:$(d(l).e("title"))},[O(e.$slots,"title",{},(()=>[D(N(e.title),1)]))],2),f("div",{class:$(d(l).e("extra"))},[O(e.$slots,"extra",{},(()=>[D(N(e.extra),1)]))],2)],2)):j("v-if",!0),f("div",{class:$(d(l).e("body"))},[f("table",{class:$([d(l).e("table"),d(l).is("bordered",e.border)])},[f("tbody",null,[(u(!0),p(y,null,b(o(),((e,t)=>(u(),m(J,{key:t,row:e},null,8,["row"])))),128))])],2)],2)],2))}}),[["__file","description.vue"]]);const R=e({name:"ElDescriptionsItem",props:o({label:{type:String,default:""},span:{type:Number,default:1},width:{type:[String,Number],default:""},minWidth:{type:[String,Number],default:""},align:{type:String,default:"left"},labelAlign:{type:String,default:""},className:{type:String,default:""},labelClassName:{type:String,default:""}})}),Z=E(Q,{DescriptionsItem:R}),G=A(R);const K=e({name:"description",props:{title:_.string.def(""),message:_.string.def(""),border:_.bool.def(!0),column:_.number.def(1),size:_.oneOf(["large","default","small"]).def("default"),direction:_.oneOf(["horizontal","vertical"]).def("horizontal"),extra:_.string.def(""),schema:{type:Array,default:()=>[]},data:{type:Object,default:()=>({})}},setup(e,{attrs:t}){const l=x((()=>{const l=["schema","data"],a={...t,...e};for(const e in a)-1!==l.indexOf(e)&&delete a[e];return a}));return()=>{let t;return v(Z,d(l),"function"==typeof(a=t=e.schema.map((t=>v(G,(e=>{const t=["field"],l={...e};for(const a in l)-1!==t.indexOf(a)&&delete l[a];return l})(t),{default:()=>{var l,a;return[(null==(l=t.slots)?void 0:l.default)?null==(a=t.slots)?void 0:a.default(e.data):C(e.data,t.field)||"-"]}}))))||"[object Object]"===Object.prototype.toString.call(a)&&!W(a)?t:{default:()=>[t]});var a}}});export{K as _};
