(function(window){var svgSprite='<svg><symbol id="icon-dingwei" viewBox="0 0 1024 1024"><path d="M510.923474 1022.107049a43.299457 43.299457 0 0 1-32.382474-14.536711c-36.825852-41.38483-359.761913-410.16355-359.761913-613.424624C118.779087 177.90853 294.700741 1.986876 510.930699 1.986876c216.237183 0 392.158837 175.921654 392.158837 392.158838 0 203.261074-322.950512 572.039794-359.776363 613.424624a43.350032 43.350032 0 0 1-32.389699 14.536711z m0-933.420109c-168.429323 0-305.451549 137.02945-305.451549 305.458774 0 130.006745 197.416045 390.504311 305.444324 518.358004 108.035504-127.882594 305.465999-388.459635 305.465999-518.358004 0-168.429323-137.02945-305.458774-305.458774-305.458774z" fill="#231815" ></path><path d="M510.923474 564.887039c-86.757864 0-157.346165-70.588302-157.346165-157.353391 0-86.757864 70.588302-157.33894 157.346165-157.33894 86.765089 0 157.35339 70.581077 157.35339 157.33894 0 86.765089-70.581077 157.35339-157.35339 157.353391z m0-227.992267c-38.957229 0-70.646102 31.688873-70.646102 70.638876 0 38.957229 31.688873 70.653327 70.646102 70.653327s70.653327-31.696098 70.653327-70.653327c0-38.950004-31.696098-70.638877-70.653327-70.638876z" fill="#231815" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)