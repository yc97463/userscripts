// ==UserScript==
// @name         教學意見回饋一鍵填入
// @namespace    https://imych.one
// @version      0.2
// @description  一鍵填入東華大學期末教學意見回饋表
// @author       yc97463
// @match        https://sys.ndhu.edu.tw/aa/class/SubjEvaluate/fill-evalu.aspx?rsubj_serno=*&qtype=*
// @match        https://sys.ndhu.edu.tw/AA/CLASS/SubjEvaluate/fill-evalu.aspx?rsubj_serno=*&qtype=*
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
`
GM_addStyle(buttonStyle)

let button = document.createElement("button");
let copySvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_4_7" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_4_7)">
<path d="M4.175 21C3.825 21.0833 3.52083 20.9958 3.2625 20.7375C3.00417 20.4792 2.91667 20.175 3 19.825L4 15.05L8.95 20L4.175 21ZM8.95 20L4 15.05L15.45 3.6C15.8333 3.21667 16.3083 3.025 16.875 3.025C17.4417 3.025 17.9167 3.21667 18.3 3.6L20.4 5.7C20.7833 6.08333 20.975 6.55833 20.975 7.125C20.975 7.69167 20.7833 8.16667 20.4 8.55L8.95 20ZM16.875 5L6.525 15.35L8.65 17.475L19 7.125L16.875 5Z" fill="#1C1B1F"/>
</g>
</svg>


`
let checkSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_4_13" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_4_13)">
<path d="M9.55001 18L3.85001 12.3L5.27501 10.875L9.55001 15.15L18.725 5.975L20.15 7.4L9.55001 18Z" fill="#1C1B1F"/>
</g>
</svg>
`
button.innerHTML = `${copySvg} 一鍵填入`;
button.classList.add("copy-link-button");
button.onclick = async function () {
  try {
    for(let i = 1; i <=22; i++) {
      let c = i==12?2:4;
      $("input[name*='ctl00$ContentPlaceHolder1$Q_"+i+"'][value='"+c+"']").prop("checked", true);}

    button.innerHTML = `${checkSvg} 已填入！`;
    setTimeout(function () {
      button.innerHTML = `${copySvg} 一鍵填入`;
    }, 500);
  } catch (e) {
    alert("err",e)
  }
};
document.body.appendChild(button);