import{a as k,i as N,w as S,t as U,b as I,c as M,u as B,S as V,V as E,p as j}from"./index-DqQrPqkS.js";import{u as z}from"./vue-router-CYbh62Yw.js";import{N as A}from"./Image-D7SdjNMS.js";import{d as P,c as m,b as f,o as a,I as r,X as e,u as t,R as l,a3 as o,S as R,$ as X,Y as D,N as F}from"./vue-BecU8e2X.js";import"./Scrollbar-BWsRvojo.js";const T={class:"px-2 py-0 card-box h-full bg-black"},$={class:"flex absolute bottom-20 info-card right-0"},q={class:"flex bg-white p-2 header-bar items-center flex-col relative",style:{"z-index":"9999"}},G={class:"flex flex-col items-center justify-center"},H=["src"],J={class:"m-b-1"},O={key:0,class:"text-white text-6 absolute top-100"},Q={class:"flex-1 flex flex-col"},Y={class:"p-y-1 m-0 b-0 text-center text-gray-300"},le=P({__name:"ListPage",setup(K){const v=k(),u=N(),n=z();S();const{fetchList:g,list:c}=U(),h=m(()=>I[v.value]),_=j();M(async()=>{await g(),s.value=await _(),i.value=E[s.value.vipLevel]},()=>{n.replace("/")});const d=B(),b=()=>{n.push("/writing")},i=f({maxContentLength:40,listMaxCount:0,templateCount:1,money:0}),s=f(),y=()=>{if(!s.value)return"";switch(s.value.vipLevel){case-1:return"";case 0:return"text-red fw-900";case 1:return"text-green fw-400";case 2:return"text-blue fw-600";case 3:return"text-yellow fw-800";default:return""}},p=m(()=>y()),C=()=>i.value.listMaxCount<Number.MAX_VALUE?i.value.listMaxCount-c.value.length:"∞",w=()=>{n.push("/payment")};return(W,Z)=>(a(),r("div",T,[e("div",$,[e("header",q,[e("div",G,[e("img",{src:t(d).avatar,alt:"avatar",srcset:"",class:"avatar"},null,8,H),e("label",{class:l(["username",p.value])},o(t(d).username),3),e("i",{class:l(["iconfont icon-vip",p.value])},null,2),e("label",J," 剩余： "+o(C())+" 卡片 ",1)]),e("div",{class:l(["flex",{"flex-col":t(u)}]),style:{gap:"4px"}},[e("div",{onClick:b,class:"btn py-1 px-2 cursor-pointer flex items-center text-black bg-gray-100"}," 返回分享 "),e("div",{onClick:w,class:"btn py-1 px-2 cursor-pointer flex items-center",style:R(`background-image:${h.value}`)}," 立即充值 ",4)],2)])]),e("div",{class:l(["flex m-t-2 flex-col justify-center items-center",{"p-x-140":!t(u)}]),style:{gap:"12px"}},[t(c).length===0?(a(),r("div",O," 空空荡荡~~，快去"+o(t(V)),1)):(a(!0),r(X,{key:1},D(t(c),(x,L)=>(a(),r("div",{key:x.id,class:"shining-card p-x-3 p-t-3 bg-white flex justify-center items-center m-b-4"},[e("div",Q,[F(t(A),{lazy:"",src:x.picURL,alt:"shining card",width:"100%",class:"flex-1"},null,8,["src"]),e("p",Y,o(L+1),1)])]))),128))],2)]))}});export{le as default};
