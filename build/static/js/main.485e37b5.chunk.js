(window.webpackJsonpphonebook=window.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),l=(t(19),t(2)),i=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("p",null,n.name," ",n.number," ",r.a.createElement("button",{onClick:function(){return t(n)}},"Delete"))},c=function(e){var n=e.persons,t=e.filter,a=e.deletePerson;return r.a.createElement("div",null,n.filter(function(e){return e.name.toLowerCase().includes(t.toLowerCase())}).map(function(e){return r.a.createElement(i,{key:e.name,person:e,deletePerson:a})}))},m=function(e){var n=e.onSubmit,t=e.nameValue,a=e.handleNameChange,o=e.numberValue,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"Name:",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"Number:",r.a.createElement("input",{value:o,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.filter,t=e.handleFilterChange;return r.a.createElement("div",null,"Filter shown with:",r.a.createElement("input",{value:n,onChange:t}))},f=t(3),s=t.n(f),b="http://localhost:3001/api/persons",h=function(){return s.a.get(b)},p=function(e){return s.a.post(b,e)},g=function(e){return s.a.delete(b+"/"+e)},v=function(e,n){return s.a.put("".concat(b,"/").concat(e),n).then(function(e){return e.data})},E=function(e){var n=e.message,t=e.error;if(null===n)return null;return r.a.createElement("div",{style:t?{color:"red",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"}:{color:"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"}},n)},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),i=Object(l.a)(u,2),f=i[0],s=i[1],b=Object(a.useState)(""),w=Object(l.a)(b,2),j=w[0],C=w[1],O=Object(a.useState)(""),S=Object(l.a)(O,2),y=S[0],k=S[1],x=Object(a.useState)(null),N=Object(l.a)(x,2),P=N[0],T=N[1],V=Object(a.useState)(null),B=Object(l.a)(V,2),D=B[0],F=B[1];Object(a.useEffect)(function(){h().then(function(e){o(e.data)})},[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{message:P,error:D}),r.a.createElement(d,{filter:y,handleFilterChange:function(e){k(e.target.value)}},"/>"),r.a.createElement("h3",null,"Add a new"),r.a.createElement(m,{onSubmit:function(e){e.preventDefault();var n={name:f,number:j};if(t.map(function(e){return e.name}).includes(n.name)){if(window.confirm(n.name+" is already added to the phonebook, replace the old number with a new one?")){var a=t.find(function(e){return e.name===n.name}).id;v(a,n).then(function(e){o(t.map(function(e){return e.name===n.name?n:e})),T("Changed number of "+n.name),setTimeout(function(){T(null)},5e3)}).catch(function(e){F(!0),T("Information of "+n.name+"has already been removed from server"),setTimeout(function(){T(null),F(null)},5e3)})}}else p(n).then(function(e){o(t.concat(e.data)),T("Added "+n.name),setTimeout(function(){T(null),F(null)},5e3)});s(""),C("")},nameValue:f,handleNameChange:function(e){s(e.target.value)},numberValue:j,handleNumberChange:function(e){C(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(c,{persons:t,filter:y,deletePerson:function(e){window.confirm("Delete "+e.name+" ?")&&g(e.id).then(function(n){o(t.filter(function(n){return e.id!==n.id}))}).catch(function(n){F(!0),T("Information of "+e.name+"has already been removed from server"),setTimeout(function(){T(null),F(null)},5e3)})}}))};u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.485e37b5.chunk.js.map