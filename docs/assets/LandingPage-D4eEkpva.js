import{u as w,a as S,i as I,b as B,c as C,S as u,g as N,d as T,e as p,_ as $}from"./index-DqQrPqkS.js";import{T as L}from"./Title-Dfrr4eZf.js";import{u as j}from"./vue-router-CYbh62Yw.js";import{d as z,c as G,o as i,I as d,X as s,S as g,a3 as m,u as t,f as P,J as f,a4 as _,$ as R,Y as U,R as h,a5 as V,a6 as A}from"./vue-BecU8e2X.js";const D=o=>(V("data-v-717ba6f9"),o=o(),A(),o),E={class:"w-full flex flex-col h-full select-none h-dvh"},J={class:"px-8 py-0 flex justify-between items-center"},M={key:0,class:"absolute top-25 p-l-12 text-12 fw-900",style:{"z-index":"9999"}},X=D(()=>s("br",null,null,-1)),F=["src","alt"],H={class:"text-center py-2 text-black text-3"},Y=z({__name:"LandingPage",setup(o){const a=w(),b=S(),y=["tomato","driver","doggy"],v=e=>`https://githubjike.github.io/images/uPic/${e}.jpg`,r=I(),n=G(()=>B[b.value]),c=j(),x=async()=>{if(N()){c.push("/writing");return}await k()&&c.push("/writing")},k=async()=>{if(a.username&&a.avatar)return!0;const e=await T();return e?(a.username=e.username,a.avatar=e.avatar,a.email=e.email,!0):!1};return C(()=>{p.info("您已登录，开启分享之旅",{onClose:()=>{c.push("/writing")}})},()=>{p.warning("登录开启分享之旅")}),(e,q)=>(i(),d("div",E,[s("header",J,[s("h3",{style:g(`background-image:${n.value}`),class:"p-4 header-title"},m(t(u)),5),t(r)?f("",!0):(i(),P(L,{key:0,bg:n.value},null,8,["bg"])),s("div",{onClick:x,class:"btn p-4 cursor-pointer",style:g(`background-image:${n.value}`)},"立即登录",4)]),s("main",{class:"flex-1 content",style:g(`background-image:${n.value}`)},null,4),t(r)?(i(),d("h1",M,[_(m(t(u)),1),X,_("自然分享")])):f("",!0),s("div",{class:h({"images-mobile":t(r),"images-web":!t(r)})},[(i(),d(R,null,U(y,l=>s("img",{key:l,src:v(l),alt:l,srcset:"",class:h(l)},null,10,F)),64))],2),s("footer",H," @"+m(t(u)),1)]))}}),Z=$(Y,[["__scopeId","data-v-717ba6f9"]]);export{Z as default};
