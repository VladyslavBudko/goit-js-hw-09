!function(){var t=document.querySelector("body"),e=document.querySelector("[data-start]"),o=document.querySelector("[data-stop]"),n={timerID:null,isActive:!1,changeColor:function(){var e=this;this.isActive||(this.isActive=!0,this.timerID=setInterval((function(){console.log(e.timerID),t.setAttribute("background-color","#".concat(Math.floor(16777215*Math.random()).toString(16))),console.log(t)}),1e3))},changeColorStop:function(){clearInterval(this.timerID),this.isActive=!1,console.log(this.timerID)}};e.addEventListener("click",(function(){return n.changeColor()})),o.addEventListener("click",(function(){return n.changeColorStop()}))}();
//# sourceMappingURL=01-color-switcher.dc6237ae.js.map
