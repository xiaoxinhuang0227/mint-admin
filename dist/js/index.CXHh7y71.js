import{s as e,y as a,A as t,b as l,D as s,g as o,o as r,r as i,c as n,e as u,w as m,d as c,E as d,f as p,F as f,aa as h,H as v}from"./index.C8pNQb-t.js";import{_ as g}from"./Search.vue_vue_type_script_setup_true_lang.Cp_oKFC1.js";import{D as y}from"./index.CNZLOtaJ.js";import{T as b}from"./Table.D6HFkYab.js";import{T as _}from"./table.Don80Ly_.js";import{b as w}from"./el-overlay.tDao4uvE.js";import{_ as S,E as j}from"./Form.vue_vue_type_script_lang.DsXMripE.js";import{u as x}from"./useForm.DyIg6q47.js";import{u as C}from"./useValidator.Bj_R0Ps1.js";import{_ as D}from"./Descriptions.vue_vue_type_script_lang.CfyUaxL8.js";import{_ as k}from"./index.DRMUb7sv.js";import{u as R}from"./useCrudSchemas.CVScJs2q.js";import"./cloneDeep.nDz-k2nn.js";import"./_baseClone.BPfS26kN.js";import"./_initCloneObject.Cqd3kJ-N.js";/* empty css                 *//* empty css               */import"./el-tooltip.l0sNRNKZ.js";import"./request.DiNQJJBl.js";import"./index.DTfrWyOT.js";import"./debounce.BuPGJDYu.js";import"./el-form-item.DurPJSl-.js";import"./el-row.BoE8vcTg.js";import"./_commonjsHelpers.lGe4XDVY.js";const P=e({__name:"write",props:{currentRow:{type:Object,default:()=>null},formSchema:{type:Array,default:()=>[]}},setup(e,{expose:r}){const{required:i}=C(),n=e,u=a({title:[i()],author:[i()]}),{formRegister:m,formMethods:c}=x(),{setValues:d,getFormData:p,getElFormExpose:f}=c;return t((()=>n.currentRow),(e=>{e&&d(e)})),r({submit:async()=>{const e=await f();if(await(null==e?void 0:e.validate())){return await p()}}}),(a,t)=>(l(),s(o(S),{rule:u,onRegister:o(m),schema:e.formSchema},null,8,["rule","onRegister","schema"]))}}),T=e({__name:"detail",props:{currentRow:{type:Object,default:()=>null},detailSchema:{type:Array,default:()=>[]}},setup:e=>(a,t)=>{const o=D;return l(),s(o,{schema:e.detailSchema,data:e.currentRow||{}},null,8,["schema","data"])}}),F={class:"page-table-example-basic"},z=c("p",null,"useCrudSchema Hook",-1),E=c("ol",null,[c("li",null,"统一配置 Search / Form / Table / Descriptions 组件的布局配置，更详细的用法可以看组件示例"),c("li",null,"const { allSchemas } = useCrudSchemas(crudSchemas)"),c("li",null,"allSchemas: { fromSchema, searchSchema, detailSchema, tableColumns } 存放四个组件需要的配置数据")],-1),V=c("p",{class:"table-header-section text-align-center"},"formSchema",-1),A=e({__name:"guide",setup(e){r((()=>{t()}));const a=i(),t=async()=>{try{const e=await _.getUseCurdData();a.value=e.items}catch(e){}},s=[{label:"属性",field:"name",width:300},{label:"说明",field:"desc"},{label:"类型",field:"dataType",width:300}];return(e,t)=>{const r=k;return l(),n("div",F,[u(r,null,{default:m((()=>[z,E])),_:1}),c("div",null,[V,u(o(b),{columns:s,data:a.value},null,8,["data"])])])}}}),H={class:"dialog-page-demo"},I={class:"flex-between table-header-section"},U=e({__name:"index",setup(e){const t=i([]),{tableRegister:r,tableState:S,tableMethods:x}=w({fetchDataApi:async()=>{const{currentPage:e,pageSize:a}=S,t=await _.getTableData({pageIndex:o(e),pageSize:o(a)});return{list:t.items,total:t.total}},fetchDelApi:async()=>!!(await _.delTableData(o(t)))}),{loading:C,dataList:D,total:k,currentPage:F,pageSize:z}=S,{getList:E,getElTableExpose:V,delList:U}=x,M=i({}),Y=e=>{M.value=e,E()},q=a([{field:"selection",search:{hidden:!0},form:{hidden:!0},detail:{hidden:!0},table:{type:"selection"}},{field:"title",label:"标题",search:{component:"Input"},form:{component:"Input",colProps:{span:24}},detail:{span:24}},{field:"author",label:"作者",form:{component:"Input",colProps:{span:24}},search:{hidden:!0}},{field:"display_time",label:"创建时间",search:{hidden:!0},form:{component:"DatePicker",colProps:{span:24},componentProps:{type:"datetime",valueFormat:"YYYY-MM-DD HH:mm:ss"}}},{field:"pageviews",label:"阅读数",table:{width:200,formatter:(e,a)=>u(j,{key:a.id,modelValue:a.pageviews,"onUpdate:modelValue":e=>a.pageviews=e,size:"small",min:1,max:9999999,precision:0},null)},search:{hidden:!0},form:{component:"InputNumber",value:0,colProps:{span:24}}},{field:"action",width:"300px",label:"操作",search:{hidden:!0},form:{hidden:!0},detail:{hidden:!0},table:{slots:{default:e=>u(f,null,[u(d,{type:"primary",onClick:()=>W(e.row,"edit")},{default:()=>[p("编辑")]}),u(d,{type:"success",onClick:()=>W(e.row,"detail")},{default:()=>[p("详情")]}),u(d,{type:"danger",onClick:()=>Q(e.row)},{default:()=>[p("删除")]})])}}}]),{allSchemas:L}=R(q),O=i(!1),B=i(""),J=i(null),K=i(""),N=()=>{B.value="新增",K.value="add",O.value=!0,J.value=null},G=i(!1),Q=async e=>{const a=(await V()).getSelectionRows();t.value=a.map((e=>e.id)),G.value=!0,await U(o(t).length).finally((()=>{G.value=!1}))},W=(e,a)=>{B.value="edit"===a?"编辑":"详情",K.value=a,J.value=e,O.value=!0},X=i(),Z=i(!1),$=async()=>{const e=o(X),a=await(null==e?void 0:e.submit());if(a){Z.value=!0;try{await _.saveTableData(a),O.value=!1,F.value=1,E()}catch(t){}finally{Z.value=!1}}};return(e,a)=>{const t=d;return l(),n("div",H,[c("div",I,[u(o(g),{schema:o(L).searchSchema,onSearch:Y,onReset:Y},null,8,["schema"]),c("div",null,[u(t,{type:"primary",onClick:N},{default:m((()=>[p("新增")])),_:1}),u(t,{type:"danger",loading:G.value,onClick:Q},{default:m((()=>[p("删除")])),_:1},8,["loading"])])]),u(o(b),{pageSize:o(z),"onUpdate:pageSize":a[0]||(a[0]=e=>h(z)?z.value=e:null),currentPage:o(F),"onUpdate:currentPage":a[1]||(a[1]=e=>h(F)?F.value=e:null),columns:o(L).tableColumns,data:o(D),loading:o(C),pagination:{total:o(k)},onRegister:o(r)},null,8,["pageSize","currentPage","columns","data","loading","pagination","onRegister"]),u(A),u(y,{modelValue:O.value,"onUpdate:modelValue":a[3]||(a[3]=e=>O.value=e),fullscreen:"",title:B.value},{footer:m((()=>["detail"!==K.value?(l(),s(t,{key:0,type:"primary",loading:Z.value,onClick:$},{default:m((()=>[p("保存")])),_:1},8,["loading"])):v("",!0),u(t,{onClick:a[2]||(a[2]=e=>O.value=!1)},{default:m((()=>[p("取消")])),_:1})])),default:m((()=>["detail"!==K.value?(l(),s(P,{key:0,ref_key:"writeRef",ref:X,"form-schema":o(L).formSchema,"current-row":J.value},null,8,["form-schema","current-row"])):(l(),s(T,{key:1,"detail-schema":o(L).detailSchema,"current-row":J.value},null,8,["detail-schema","current-row"]))])),_:1},8,["modelValue","title"])])}}});export{U as default};
