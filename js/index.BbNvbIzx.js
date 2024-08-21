import{s as e,y as a,A as t,b as l,c as o,e as r,g as s,z as i,r as n,f as d,F as m,w as u,aa as p,ae as c}from"./index.C8pNQb-t.js";import{_ as f}from"./Search.vue_vue_type_script_setup_true_lang.Cp_oKFC1.js";import{C as h}from"./index.BQ5aJrVA.js";import{T as v}from"./Table.D6HFkYab.js";import{f as g,_ as b}from"./dateUtil.BxX4tQHJ.js";import{_ as w}from"./Form.vue_vue_type_script_lang.DsXMripE.js";import{u as j}from"./useForm.DyIg6q47.js";import{u as _}from"./useValidator.Bj_R0Ps1.js";import{D as y}from"./index.CNZLOtaJ.js";import{b as P}from"./el-overlay.tDao4uvE.js";import{u as x}from"./useCrudSchemas.CVScJs2q.js";import{A as R}from"./auth.BK4hJjr4.js";import"./cloneDeep.nDz-k2nn.js";import"./_baseClone.BPfS26kN.js";import"./_initCloneObject.Cqd3kJ-N.js";import"./el-tooltip.l0sNRNKZ.js";/* empty css                 *//* empty css               */import"./request.DiNQJJBl.js";import"./index.DTfrWyOT.js";import"./debounce.BuPGJDYu.js";import"./el-form-item.DurPJSl-.js";import"./el-row.BoE8vcTg.js";import"./_commonjsHelpers.lGe4XDVY.js";const S=e({__name:"managerWrite",props:{currentRow:{type:Object,default:()=>{}},formSchema:{type:Array,default:()=>[]}},setup(e,{expose:i}){var n;const{required:d,checkPhone:m,checkPassward:u}=_(),p=e,c=!!(null==(n=null==p?void 0:p.currentRow)?void 0:n.id),f=a({realName:[d()],account:[d()],password:[u(!c)],roleId:[d()],phone:[m()]}),{formRegister:h,formMethods:v}=j(),{setValues:g,getFormData:b,getElFormExpose:y}=v;return t((()=>p.currentRow),(e=>{e&&g(e)}),{deep:!0,immediate:!0}),i({submit:async()=>{const e=await y();if(await(null==e?void 0:e.validate())){return await b()}}}),(a,t)=>(l(),o("div",null,[r(s(w),{rules:f,onRegister:s(h),schema:e.formSchema},null,8,["rules","onRegister","schema"])]))}}),C=e({__name:"index",setup(e){const{currentRoute:t}=i(),w=t.value.meta.title,j=n({}),_=n(),C=n(),A=n(!1);(async()=>{const e=await R.getRoleList();_.value=e.items.map((e=>({label:e.name,value:e.id})))})();const{tableRegister:k,tableState:L,tableMethods:z}=P({fetchDataApi:async()=>{const{pageSize:e,currentPage:a}=L,t=await R.getManagerList({page:s(a),limit:s(e)});return{list:t.items||[],total:t.total||0}}}),{total:F,loading:I,dataList:D,pageSize:V,currentPage:N}=L,{delList:U,getList:q}=z,E=n(),M=n(""),W=()=>{J.value="新增用户",E.value=void 0,T.value=!0,M.value="add"},H=a([{field:"id",label:"ID",form:{hidden:!0},search:{hidden:!0},table:{width:100}},{field:"account",label:"账号",table:{width:150},form:{colProps:{span:24},component:"Input",componentProps:{maxlength:10,showWordLimit:!0}}},{field:"realName",label:"用户名",form:{colProps:{span:24},component:"Input",componentProps:{maxlength:10,showWordLimit:!0}}},{field:"roleId",label:"角色",table:{width:150},search:{hidden:!0},form:{component:"Select",colProps:{span:24},componentProps:{clearable:!1,options:_}},formatter:e=>e.roleName||"-"},{field:"phone",label:"手机号",table:{hidden:!0},search:{hidden:!0},form:{colProps:{span:24}}},{field:"password",label:"密码",form:{component:"InputPassword",colProps:{span:24},componentProps:{clearable:!1,type:"password"}},table:{hidden:!0},search:{hidden:!0}},{field:"createdAt",label:"创建时间",table:{width:250},formatter:e=>g(e.createdAt),form:{hidden:!0},search:{hidden:!0}},{field:"updatedAt",label:"更新时间",table:{width:250},formatter:e=>g(e.updatedAt),form:{hidden:!0},search:{hidden:!0}},{field:"action",label:"操作",form:{hidden:!0},detail:{hidden:!0},search:{hidden:!0},table:{width:250,slots:{default:e=>{const a=e.row;return r(m,null,[r(b,{type:"primary",onClick:()=>((e,a)=>{J.value="编辑",M.value=a,E.value=e,T.value=!0})(a,"edit")},{default:()=>[d("编辑")]}),r(b,{loading:A.value,type:"danger",onClick:()=>(async e=>{C.value=Number(e.id),await U(1).finally((()=>{A.value=!1}))})(a)},{default:()=>[d("删除")]})])}}}}]),{allSchemas:O}=x(H),T=n(!1),J=n(""),K=n(),B=n(!1),G=async()=>{try{const e=s(K);await(null==e?void 0:e.submit())&&(B.value=!0,"add"===M.value?c.success("添加成功"):"edit"===M.value&&c.success("修改成功"),q(),T.value=!1)}catch(e){}finally{B.value=!1}},Q=e=>{N.value=1,j.value=e,q()};return(e,a)=>(l(),o("div",null,[r(h,{title:s(w),class:"m-3"},{action:u((()=>[r(b,{type:"primary",onClick:W},{default:u((()=>[d("新增")])),_:1})])),default:u((()=>[r(s(f),{schema:s(O).searchSchema,onReset:Q,onSearch:Q},null,8,["schema"]),r(s(v),{"current-page":s(N),"onUpdate:currentPage":a[0]||(a[0]=e=>p(N)?N.value=e:null),"page-size":s(V),"onUpdate:pageSize":a[1]||(a[1]=e=>p(V)?V.value=e:null),columns:s(O).tableColumns,data:s(D),loading:s(I),onRegister:s(k),preview:["avatar"],pagination:{total:s(F)}},null,8,["current-page","page-size","columns","data","loading","onRegister","pagination"])])),_:1},8,["title"]),r(y,{modelValue:T.value,"onUpdate:modelValue":a[3]||(a[3]=e=>T.value=e),title:J.value,width:"400px","max-height":"200px"},{footer:u((()=>[r(b,{type:"primary",loading:B.value,onClick:G},{default:u((()=>[d("保存")])),_:1},8,["loading"]),r(b,{onClick:a[2]||(a[2]=e=>T.value=!1)},{default:u((()=>[d("取消")])),_:1})])),default:u((()=>[r(S,{ref_key:"writeRef",ref:K,"form-schema":s(O).formSchema,"current-row":E.value},null,8,["form-schema","current-row"])])),_:1},8,["modelValue","title"])]))}});export{C as default};
