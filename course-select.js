// ==UserScript==
// @name         一鍵選課
// @namespace    https://imych.one
// @version      0.1
// @description  一鍵完成選課
// @author       yc97463
// @match        https://sys.ndhu.edu.tw/AA/CLASS/subjselect/*.aspx
// @grant        GM_addStyle
// ==/UserScript==

let buttonStyle = `
.copy-link-button {
  position: fixed;
  top: 3px;
  right: 3px;
  padding: 0.5rem;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0px 3px 3px rgb(0 0 0 / 15%);
  border-radius: 4px;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}
.copy-link-button svg{
  width: 1rem;
  height: 1rem;
}
.copy-link-button:hover {
  background: #eee;
  border-color: #aaa;
}
.copy-link-button:active {
  background: #ddd;
  border-color: #999;
  transform: translateY(1.5px);
  box-shadow: 0px 1.5px 3px rgb(0 0 0 / 15%);
}
`;
GM_addStyle(buttonStyle);

let button = document.createElement("button");
let copySvg = `
<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 306.637 306.637" style="enable-background:new 0 0 306.637 306.637;" xml:space="preserve">
<g>
	<g>
		<path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896
			l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"/>
		<path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095
			L265.13,75.602L231.035,41.507z"/>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`;
let checkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>`;
let subj = [111244240, 111203577,111237648,111207629,111291338];
button.innerHTML = `${copySvg} 一鍵加選`;
button.classList.add("copy-link-button");
button.onclick = function () {
  try {
    subj.forEach((subjid)=>ss("",subjid,"",false));
		window.alert = function() {};
  } catch (e) {
    alert("err", e);
  }
};
document.body.appendChild(button);


// addJS_Node (null, null, overrideSelectNativeJS_Functions);

// function overrideSelectNativeJS_Functions () {
//     window.alert = function alert (message) {
//         console.log (message);
//     }
// }

// function addJS_Node (text, s_URL, funcToRun) {
//     var D                                   = document;
//     var scriptNode                          = D.createElement ('script');
//     scriptNode.type                         = "text/javascript";
//     if (text)       scriptNode.textContent  = text;
//     if (s_URL)      scriptNode.src          = s_URL;
//     if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

//     var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
//     targ.appendChild (scriptNode);
// }
