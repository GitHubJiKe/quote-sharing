import{i as C,R as $,a as M,b as S,W as V,S as v,G as N,V as y,_ as j}from"./index-DqQrPqkS.js";import{T as B}from"./Title-Dfrr4eZf.js";import{u as E}from"./vue-router-CYbh62Yw.js";import{d as I,o as P,f as L,M as R,X as t,N as b,u as s,c as T,b as q,a7 as z,E as G,I as W,S as w,a3 as o,R as D,a4 as e,a5 as F,a6 as H}from"./vue-BecU8e2X.js";import{N as k}from"./Image-D7SdjNMS.js";import"./Scrollbar-BWsRvojo.js";const U=t("h1",null,"反馈 ",-1),X={class:"flex justify-center",style:{gap:"12px"}},A=t("p",null,"付费成功，添加微信，备注邮箱及金额",-1),Q=I({__name:"QrcodeView",props:{type:{}},emits:["confirm"],setup(a,{emit:m}){const d=m,{type:p}=a,u={1:"10_yuan",2:"30_yuan",3:"50_yuan"},g=()=>`https://firebasestorage.googleapis.com/v0/b/talk-is-cheap-6695e.appspot.com/o/quotes%2F${u[p]}.jpg?alt=media&token=34c49950-8916-4de9-9af6-9266e87926b3`,c=C(),x=()=>c?"100%":"300px",i=()=>c?"100%":"400px";return(h,l)=>(P(),L(s($),{class:"confirm-modal","content-class":"confirm-modal-content","overlay-transition":"vfm-fade","content-transition":"vfm-fade"},{default:R(()=>[U,t("div",X,[b(s(k),{src:g(),width:x(),height:i(),alt:"qrcode",class:"flex-1"},null,8,["src","width","height"]),b(s(k),{class:"flex-1",src:"https://firebasestorage.googleapis.com/v0/b/talk-is-cheap-6695e.appspot.com/o/quotes%2Fpeteryuan.jpg?alt=media&token=cf85a75a-b23b-4d3f-a137-59d77fb4f085",width:x(),height:i(),alt:"wechat"},null,8,["width","height"])]),A,t("div",{onClick:l[0]||(l[0]=f=>d("confirm")),class:"rounded px-4 py-2 bg-sky"}," 关闭 ")]),_:1}))}}),r=a=>(F("data-v-0f245e2a"),a=a(),H(),a),J={class:"w-full flex flex-col h-full select-none h-dvh pay-page"},K={class:"px-8 py-0 flex justify-between items-center b-b-0.5 b-solid b-white b-t-0 b-x-0 text-white"},O={class:"flex-1 content flex justify-center items-center p-x-4"},Y={class:"rounded p-4 bg-neutral paycard"},Z=r(()=>t("h1",{class:"text-white my-0"}," 白银 ",-1)),tt=r(()=>t("p",{class:"text-5 text-white"}," 功能： ",-1)),et={class:"text-3"},st={class:"text-6 p-x-1 text-white"},ot={class:"text-6 p-x-1 text-white"},nt={class:"text-6 p-x-1 text-white"},at={class:"rounded p-4 paycard",style:{"background-image":"linear-gradient(135deg, rgb(253, 235, 113) 10%, rgb(248, 216, 0) 100%)"}},ct=r(()=>t("h1",{class:"text-white my-0"}," 黄金 ",-1)),it=r(()=>t("p",{class:"text-5 text-white"}," 功能： ",-1)),lt={class:"text-3"},rt={class:"text-6 p-x-1 text-white"},dt={class:"text-6 p-x-1 text-white"},pt={class:"text-6 p-x-1 text-white"},ut=r(()=>t("h1",{class:"text-white my-0"}," 铂金 ",-1)),xt=r(()=>t("p",{class:"text-5 text-white"}," 功能： ",-1)),ht={class:"text-3"},_t={class:"text-6 p-x-1 text-white"},bt={class:"text-6 p-x-1 text-white"},mt={class:"text-6 p-x-1 text-white"},gt={class:"text-center py-2 text-black text-3 bg-white"},ft=I({__name:"PayPage",setup(a){const m=M(),d=C(),p=T(()=>S[m.value]),u=q(1),g=E(),c=f=>{u.value=f;const{open:n,close:_}=N({component:Q,attrs:{onConfirm(){_()},type:u.value}});n()},x=()=>{g.back()};z(()=>{document.body.style.backgroundImage="url(https://githubjike.github.io/images/uPic/pay_bg.jpg)",document.body.style.backgroundSize="cover"}),G(()=>{document.body.style.backgroundImage="",document.body.style.backgroundSize=""});const i=y[1],h=y[2],l=y[3];return(f,n)=>(P(),W("div",J,[b(s(V)),t("header",K,[t("h3",{style:w(`background-image:${p.value}`),class:"p-4 header-title cursor-pointer",onClick:x},o(s(v)),5),b(B,{bg:p.value},null,8,["bg"])]),t("main",O,[t("div",{class:D(["flex justify-between",{"flex-col":s(d)}]),style:w(`${s(d)?"gap:12px":"gap:60px"}`)},[t("div",Y,[Z,tt,t("ul",et,[t("li",null,[e("最长输入文本"),t("b",st,o(s(i).maxContentLength),1),e("字符")]),t("li",null,[e("最多可保存"),t("b",ot,o(s(i).listMaxCount),1),e("个在线卡片")]),t("li",null,[e("可选择"),t("b",nt,o(s(i).templateCount),1),e("种模板")])]),t("div",{class:"btn text-white bg-sky text-center p-y-2 cursor-pointer paybtn",onClick:n[0]||(n[0]=_=>c(1))}," 选择 ")]),t("div",at,[ct,it,t("ul",lt,[t("li",null,[e("最长输入文本"),t("b",rt,o(s(h).maxContentLength),1),e("字符")]),t("li",null,[e("最多可保存"),t("b",dt,o(s(h).listMaxCount),1),e("个在线卡片")]),t("li",null,[e("可选择"),t("b",pt,o(s(h).templateCount),1),e("种模板")])]),t("div",{class:"btn text-white bg-sky text-center p-y-2 cursor-pointer paybtn",onClick:n[1]||(n[1]=_=>c(2))}," 选择 ")]),t("div",{class:"rounded p-4 paycard",style:w("background-image:linear-gradient(135deg, rgb(255, 150, 249) 10%, rgb(195, 43, 172) 100%)")},[ut,xt,t("ul",ht,[t("li",null,[e("最长输入文本"),t("b",_t,o(s(l).maxContentLength),1),e("字符")]),t("li",null,[e("最多可保存"),t("b",bt,o(s(l).listMaxCount),1),e("个在线卡片")]),t("li",null,[e("可选择"),t("b",mt,o(s(l).templateCount),1),e("种模板")])]),t("div",{class:"btn text-white bg-sky text-center p-y-2 cursor-pointer paybtn",onClick:n[2]||(n[2]=_=>c(3))}," 选择 ")],4)],6)]),t("footer",gt," @"+o(s(v)),1)]))}}),Pt=j(ft,[["__scopeId","data-v-0f245e2a"]]);export{Pt as default};
