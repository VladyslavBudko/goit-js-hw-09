!function(){var e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");e.addEventListener("click",(function(s){e.classList.add("is-active"),t.classList.remove("is-active"),c=setInterval((function(){console.log(s.target),console.log(c)}),1e3)})),t.addEventListener("click",(function(s){t.classList.add("is-active"),e.classList.remove("is-active"),clearInterval(c),console.log(s.target),console.log(c)}));var c=null}();
//# sourceMappingURL=01-color-switcher.4fd9d18f.js.map
