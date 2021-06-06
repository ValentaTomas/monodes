import{q as e,N as t,u as n,r,R as o,H as c,S as l,a,b as i,c as s}from"./vendor.97512b89.js";var d,u,p,m;(u=d||(d={}))[u.STAGE_1=1]="STAGE_1",u[u.STAGE_2=2]="STAGE_2",(m=p||(p={})).EMPTY="empty",m.HORIZONTAL="horizontal",m.VERTICAL="vertical";const f=[[[d.STAGE_1,p.HORIZONTAL,d.STAGE_2,p.HORIZONTAL,d.STAGE_1],[p.VERTICAL,p.EMPTY,p.VERTICAL,p.EMPTY,p.EMPTY],[d.STAGE_1,p.EMPTY,d.STAGE_1,p.HORIZONTAL,d.STAGE_1]]],g=e.div`
  display: flex;
  justify-content: center;
`,h=e(t)`
  background: green;
  /* margin:  0 auto; */
  margin: 0px 5px;
  padding: 10px;
  :hover {
    cursor: pointer;
    background: darkgreen;
  }
  text-decoration: none;
  color: white;
`,E=e.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
  background: #1C1B26;
`,k=e.div`
  display: flex;
  margin: auto;
`,x=e.div`
  display: flex;
  flex-direction: column;
`,v=e.div`
  display: flex;
`,y=e.div`
  width: 38px;
  border-radius: 3px;
  font-weight: 400;
  font-size: 27px;
  margin: 10px;
  height: 38px;
  display: flex;
  font-family: Fira Code;
  text-align: center;
  justify-content: center;
  white-space: nowrap;
`,T=e.div`
  background: green;
  /* margin:  0 auto; */
  margin: 0px 5px;
  padding: 10px;
  :hover {
    cursor: pointer;
    background: darkgreen;
  }
`,B=e(y)`
  border: 2px solid gold;
  
  :hover {
    cursor: pointer;
    background: darkorange;
  }
`;function A(e){return null!=e}function S(e,t){try{return{type:e[t[0]][t[1]],position:t}}catch(n){return}}function b(e,t){return function(e,t){return[S(e,[t[0]+1,t[1]]),S(e,[t[0]-1,t[1]]),S(e,[t[0],t[1]+1]),S(e,[t[0],t[1]-1])].filter(A).filter((e=>e.type===p.VERTICAL||e.type===p.HORIZONTAL))}(e,t).map((n=>{if(n.position[0]!==t[0]||n.position[1]!==t[1])switch(n.type){case p.HORIZONTAL:const r=n.position[1]-(t[1]-n.position[1]);return S(e,[t[0],r]);case p.VERTICAL:const o=n.position[0]-(t[0]-n.position[0]);return S(e,[o,t[1]]);default:return}})).filter(A)}function L(e){return e.map((e=>e.slice()))}function R(e,t){let n=!1;const r=L(e),o=function(e){return e.map((e=>e.slice().fill(0)))}(e);e.forEach(((c,l)=>{c.forEach(((c,a)=>{if("number"==typeof c){if(t[0]===l&&t[1]===a)return;const[i,s]=function(e){if(e<=2)return[e,0];const t=e%2,n=Math.floor(e/2);return 0===t?[1,n]:[t,n]}(c);if(r[l][a]=i,s>0){n=!0;b(e,[l,a]).map((e=>{o[e.position[0]][e.position[1]]=o[e.position[0]][e.position[1]]+s}))}}}))}));const c=r.map(((e,t)=>e.map(((e,n)=>"number"==typeof e?e+o[t][n]:e))));return n?R(c,t):c}function I(){const e=n(),t=(null==e?void 0:e.level)?parseInt(e.level):0,c=t>=0&&t<f.length?f[t]:f[0],[l,a]=r.exports.useState((()=>L(c))),[i,s]=r.exports.useState(!1);function u(e,t){if(i)return;const n=function(e,t){const n=e[t[0]][t[1]],r=b(e,t),o=1===r.length&&r[0].type>=n;if(0===t[0]&&0===t[1])return e;if(!o)return e;const c=r[0],l=n+c.type;e[c.position[0]][c.position[1]]=l;const a=R(e,t);a[t[0]][t[1]]=p.EMPTY;const i=(s=t,d=c.position,[(s[0]+d[0])/2,(s[1]+d[1])/2]);var s,d;return a[i[0]][i[1]]=p.EMPTY,a}(l,[e,t]);a(n),s(1===n.flat().reduce(((e,t)=>{switch(t){case d.STAGE_1:case d.STAGE_2:return e+1;default:return e}}),0))}return r.exports.useEffect((()=>{a(L(c)),s(!1)}),[c]),o.createElement(E,null,o.createElement(g,null,o.createElement(h,{to:{pathname:"/test-mechanic/"+(0===t?0:t-1)}}," ","<"," "),o.createElement(T,{onClick:function(){a(L(c)),s(!1)}},"RESET LEVEL ",t),o.createElement(h,{to:{pathname:`/test-mechanic/${t===f.length-1?f.length-1:t+1}`}}," ",">"," ")),o.createElement(k,null,o.createElement(y,null,i?"END":"|-"),!i&&o.createElement(x,null,l.map(((e,t)=>o.createElement(v,{key:t.toString()},e.map(((e,n)=>{switch(e){case p.EMPTY:return o.createElement(y,{key:n.toString()});case p.HORIZONTAL:return o.createElement(y,{key:n.toString()}," —— ");case p.VERTICAL:return o.createElement(y,{key:n.toString()}," | ");case d.STAGE_1:return o.createElement(B,{key:n.toString(),onClick:()=>u(t,n)}," 1 ");case d.STAGE_2:return o.createElement(B,{key:n.toString(),onClick:()=>u(t,n)}," 2 ")}}))))))))}const w=new class{constructor(){this.blocks=[],this.targets=[]}addBlock(e,t){this.blocks.find((n=>n.x===e&&n.y===t))||this.blocks.push({x:e,y:t})}addTarget(e,t){this.targets.find((n=>n.x===e&&n.y===t))||this.targets.push({x:e,y:t})}removeBlock(e,t){const n=this.blocks.findIndex((n=>n.x===e&&n.y===t));n>=0&&this.blocks.splice(n,1)}removeTarget(e,t){const n=this.targets.findIndex((n=>n.x===e&&n.y===t));n>=0&&this.targets.splice(n,1)}addBlocks(e,t){const n=e.x<t.x?e.x:t.x,r=e.x>t.x?e.x:t.x,o=e.y<t.y?e.y:t.y,c=e.y>t.y?e.y:t.y;for(let l=n;l<=r;l++)for(let e=o;e<=c;e++)this.addBlock(l,e)}removeBlocks(e,t){const n=e.x<t.x?e.x:t.x,r=e.x>t.x?e.x:t.x,o=e.y<t.y?e.y:t.y,c=e.y>t.y?e.y:t.y;for(let l=n;l<=r;l++)for(let e=o;e<=c;e++)this.removeBlock(l,e)}clear(){this.blocks=[],this.targets=[]}constructLevel(){const e={blocks:this.blocks,targets:this.targets};return this.clear(),e}},G=[];var O,C;w.addBlock(0,1),w.addBlock(1,0),w.addTarget(0,0),G.push(w.constructLevel()),w.addBlock(0,1),w.addBlock(1,0),w.addBlock(2,1),w.addTarget(1,1),G.push(w.constructLevel()),w.addBlock(0,1),w.addBlock(1,0),w.addBlock(2,1),w.addBlock(1,2),w.addTarget(1,1),G.push(w.constructLevel()),w.addBlock(0,2),w.addBlock(1,1),w.addBlock(1,0),w.addTarget(0,0),G.push(w.constructLevel()),w.addBlock(0,1),w.addBlock(1,0),w.addBlock(1,1),w.addBlock(2,0),w.addTarget(1,0),G.push(w.constructLevel()),w.addBlock(0,0),w.addBlock(2,1),w.addBlock(0,2),w.addBlock(0,1),w.addBlock(1,3),w.addBlock(1,2),w.addBlock(1,1),w.addTarget(0,1),G.push(w.constructLevel()),w.addBlocks({x:0,y:0},{x:3,y:3}),w.removeBlock(1,2),w.removeBlock(0,0),w.removeBlock(3,3),w.removeBlock(3,0),w.removeBlock(0,3),w.removeBlock(2,1),w.addTarget(1,1),G.push(w.constructLevel()),w.addBlocks({x:0,y:0},{x:3,y:3}),w.removeBlock(1,2),w.removeBlock(3,3),w.removeBlock(1,1),w.removeBlock(0,3),w.removeBlock(3,2),w.removeBlock(2,1),w.removeBlock(1,1),w.removeBlock(0,0),w.addTarget(3,1),G.push(w.constructLevel()),w.addBlocks({x:0,y:0},{x:7,y:7}),w.removeBlock(0,0),w.removeBlock(7,7),w.removeBlock(7,0),w.removeBlock(0,7),w.removeBlock(4,3),w.removeBlock(3,4),w.addTarget(3,3),G.push(w.constructLevel()),function(e){e.SQUARE="square",e.TARGET="target"}(O||(O={})),(C||(C={})).POINT="point";const N=e.div`
  display: flex;
  justify-content: center;
`,_=e(t)`
  background: green;
  /* margin:  0 auto; */
  margin: 0px 5px;
  padding: 10px;
  :hover {
    cursor: pointer;
    background: darkgreen;
  }
  text-decoration: none;
  color: white;
`,P=e.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
  background: #1C1B26;
`,M=e.div`
  display: flex;
  margin: auto;
`,H=e.div`
  display: flex;
  flex-direction: column;
`,V=e.div`
  display: flex;
`,Y=e.div`
  width: 38px;
  border-radius: 3px;
  font-weight: 400;
  font-size: 27px;
  margin: 10px;
  height: 38px;
  display: flex;
  font-family: Fira Code;
  text-align: center;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  ${e=>e.isTarget&&"background: blue;"}
`,Z=e(Y)`
  border-radius: 40px;
  border: 3px solid gold;
  align-self: center;
  justify-content: center;

  width: 15px;
  height: 15px;

  :hover {
    cursor: pointer;
  }
`,j=e.div`
  background: green;
  /* margin:  0 auto; */
  margin: 0px 5px;
  padding: 10px;
  :hover {
    cursor: pointer;
    background: darkgreen;
  }
`,Q=e(Y)`
  border: 2px solid gold;
`;function U(e){return e.reduce(((e,t)=>[e[0]>=t.x?e[0]:t.x,e[1]>=t.y?e[1]:t.y]),[0,0])}function $(e,t,n){try{return e[t][n]===O.SQUARE?[t,n]:void 0}catch(r){return}}function z(e){return e.map((e=>e.slice()))}function q(e){return null!=e}function F(e,t,n){return[$(e,t+1,n),$(e,t,n+1),$(e,t-1,n),$(e,t,n-1)].filter(q)}function D(e){const t=z(e);for(let n=0;n<t.length;n++){const e=t[n];for(let r=0;r<e.length;r++)if(t[n][r]===C.POINT&&(t[n][r]=void 0),void 0===t[n][r]){F(t,n,r).length>=2&&(t[n][r]=C.POINT)}}return t}function X(e,t){const[n,r]=U(e);console.log(n,r);const o=[];for(let c=0;c<=n;c++){const e=new Array(r+1).fill(void 0);o.push(e)}return t.forEach((e=>{o[e.x][e.y]=O.TARGET})),o}function J(e){const[t,n]=U(e),r=[];for(let o=0;o<=t;o++){const e=new Array(n+1).fill(void 0);r.push(e)}return e.forEach((e=>{r[e.x][e.y]=O.SQUARE})),D(r)}function K(e,t){for(let n=0;n<e.length;n++){const r=e[n];for(let o=0;o<r.length;o++)if(e[n][o]===O.SQUARE&&t[n][o]!==O.TARGET)return!1}return!0}function W(){const e=n(),t=(null==e?void 0:e.level)?parseInt(e.level):0,c=t>=0&&t<G.length?G[t]:G[0],[l,a]=r.exports.useState(J(c.blocks)),[i,s]=r.exports.useState(X(c.blocks,c.targets)),[d,u]=r.exports.useState(!1);function p(e,t){const n=function(e,t,n){const r=F(e,t,n),o=z(e);return o[t][n]=O.SQUARE,r.forEach((e=>{o[e[0]][e[1]]=void 0})),o}(l,e,t);a(D(n))}return r.exports.useEffect((()=>{u(K(l,i))}),[l,i]),r.exports.useEffect((()=>{u(K(l,i))}),[l,i]),r.exports.useEffect((()=>{a(J(c.blocks)),s(X(c.blocks,c.targets)),u(!1)}),[c]),console.log(l),o.createElement(P,null,o.createElement(N,null,o.createElement(_,{to:{pathname:"/levels/"+(0===t?0:t-1)}}," ","<"," "),o.createElement(j,{onClick:function(){a(J(c.blocks)),u(!1)}},"RESET LEVEL ",t),o.createElement(_,{to:{pathname:`/levels/${t===G.length-1?G.length-1:t+1}`}}," ",">"," ")),o.createElement(M,null,d&&o.createElement(_,{to:{pathname:`/levels/${t===G.length-1?G.length-1:t+1}`}}," ","NEXT"," "),!d&&o.createElement(H,null,l.map(((e,t)=>o.createElement(V,{key:t.toString()},e.map(((e,n)=>{const r=i[t][n]===O.TARGET;switch(e){case C.POINT:return o.createElement(Y,{isTarget:r,key:n.toString(),onClick:()=>p(t,n)},o.createElement(Z,null));case O.SQUARE:return o.createElement(Q,{isTarget:r,key:n.toString()});default:return o.createElement(Y,{isTarget:r,key:n.toString()})}}))))))))}const ee=e.div`
  margin: 0 auto;
  height: 100%;
`;function te(){return o.createElement(ee,null,o.createElement(c,null,o.createElement(l,null,o.createElement(a,{path:"/",exact:!0},o.createElement(i,{to:{pathname:"/levels/0"}})),o.createElement(a,{path:"/test-mechanic",exact:!0},o.createElement(i,{to:{pathname:"/test-mechanic/0"}})),o.createElement(a,{path:"/levels",exact:!0},o.createElement(i,{to:{pathname:"/levels/0"}})),o.createElement(a,{path:"/test-mechanic/:level"},o.createElement(I,null)),o.createElement(a,{path:"/levels/:level"},o.createElement(W,null)))))}s.render(o.createElement(o.StrictMode,null,o.createElement(te,null)),document.getElementById("root"));
