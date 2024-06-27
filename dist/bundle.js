(()=>{"use strict";var t={828:(t,s,e)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.Boat=void 0;const i=e(5);class h extends i.MovingObject{handleKeyInput(t){switch(t){case"ArrowLeft":this.direction=180;break;case"ArrowRight":this.direction=0}}handleMouseInput(t){const s=this.xPos-t;s<0&&(this.direction=0),s>0&&(this.direction=180)}}s.Boat=h},468:(t,s,e)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.Game=void 0;const i=e(864);s.Game=class{constructor(t,s,e,i){this.score=t,this.lives=s,this.canvas=e,this.ctx=i,this.parachutes=[]}drawObject(t,s){this.ctx.save(),this.ctx.translate(t.xPos,t.yPos),this.ctx.drawImage(s,-s.width/2,-s.height/2),this.ctx.restore()}gameLoop(t,s,e,h,a){if(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.drawImage(h,0,0,this.canvas.width,this.canvas.height),this.ctx.drawImage(a,0,this.canvas.height-75,this.canvas.width,75),this.lives>0){this.ctx.fillStyle="black",this.ctx.font="26px Arial",this.ctx.fillText("Score: "+this.score,20,25),this.ctx.fillText("Lives: "+this.lives,this.canvas.width-125,25),t.move(this.canvas.width,this.canvas.height),this.drawObject(t,t.image),s.move(this.canvas.width,this.canvas.height),this.drawObject(s,s.image);for(let t=0;t<this.parachutes.length;t++)this.parachutes[t].move(this.canvas.width,this.canvas.height),this.parachutes[t].isCaught(s)?(console.log("Caught"),this.score+=10,this.parachutes.splice(t,1)):(this.parachutes[t].yPos>=this.canvas.height-50&&(console.log("Missed"),this.lives--,this.parachutes.splice(t,1)),this.drawObject(this.parachutes[t],this.parachutes[t].image));if(Math.random()<.01&&this.parachutes.length<10){const s=new i.Parachutist(t.xPos,t.yPos,113,77,.5,90,e);this.parachutes.push(s)}requestAnimationFrame((()=>this.gameLoop(t,s,e,h,a)))}else this.ctx.fillStyle="black",this.ctx.font="50px Arial",this.ctx.fillText("Final Score: "+this.score,this.canvas.width/2,this.canvas.height/2),requestAnimationFrame((()=>this.gameLoop(t,s,e,h,a)))}}},5:(t,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.MovingObject=void 0,s.MovingObject=class{constructor(t,s,e,i,h,a,o){this.xPos=t,this.yPos=s,this.height=e,this.length=i,this.speed=h,this.direction=a,this.image=o}move(t,s){const e=this.direction*Math.PI/180,i=this.speed*Math.cos(e),h=this.speed*Math.sin(e),a=this.xPos+i,o=this.yPos+h;(a<t||a>0)&&(this.xPos+=i),this.xPos+i<0&&(this.xPos=0),this.xPos+i>t&&(this.xPos=t),(o<t||o>0)&&(this.yPos+=h),o>s&&(this.yPos=s),o<0&&(this.yPos=0)}}},864:(t,s,e)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.Parachutist=void 0;const i=e(5);class h extends i.MovingObject{isCaught(t){const s=this.xPos+this.length/2,e=this.xPos-this.length/2,i=this.yPos+this.height/2,h=t.xPos+t.length/2,a=t.xPos-t.length/2,o=t.yPos-t.height/2;return console.log("Parachute",s),console.log("Boat",a),i>=o&&(s>=a&&s<=h||e<=h&&e>=a)&&!(i<t.yPos)}}s.Parachutist=h},422:(t,s,e)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.Plane=void 0;const i=e(5);class h extends i.MovingObject{move(t,s){this.xPos==t&&(this.direction=180),0==this.xPos&&(this.direction=0),super.move(t,s)}}s.Plane=h}},s={};function e(i){var h=s[i];if(void 0!==h)return h.exports;var a=s[i]={exports:{}};return t[i](a,a.exports,e),a.exports}(()=>{const t=e(468),s=e(422),i=e(828);function h(){a.width=window.innerWidth,a.height=window.innerHeight,null!=v&&(v.yPos=window.innerHeight-85)}window.addEventListener("resize",h);const a=document.getElementById("myCanvas"),o=a.getContext("2d"),n=new t.Game(0,3,a,o),c=new Image,r=new Image,d=new Image,l=new Image,g=new Image;c.src="./resources/plane.png",r.src="./resources/boat.png",d.src="./resources/parachutist.png",l.src="./resources/background.png",g.src="./resources/sea.png";const u=new s.Plane(0,100,113,145,4,0,c),v=new i.Boat(0,window.innerHeight-75,153,244,4,0,r);document.addEventListener("keydown",(t=>{v.handleKeyInput(t.key)})),a.addEventListener("dblclick",(t=>{const s=a.getBoundingClientRect();v.handleMouseInput(t.clientX-s.left)})),h(),n.gameLoop(u,v,d,l,g)})()})();