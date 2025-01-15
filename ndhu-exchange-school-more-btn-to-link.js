// ==UserScript==
// @name         Replace MORE Buttons with Links / NDHU Exchange School Application System
// @namespace    https://imych.one
// @version      1.0
// @description  Replace "MORE" buttons in a dynamically loaded table with anchor links that open in a new tab.
// @author       yc97463
// @match        https://ias.ndhu.edu.tw/outboundstudent/overview/index/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 添加浮动按钮
    const replaceButton = document.createElement('button');

    function initReplaceButton() {
        replaceButton.textContent = '替換 MORE 連結';
        replaceButton.style.position = 'fixed';
        replaceButton.style.backgroundColor = '#007BFF';
    };

    initReplaceButton();
    replaceButton.style.top = '20px';
    replaceButton.style.right = '20px';
    replaceButton.style.padding = '10px 20px';
    replaceButton.style.zIndex = '10000';

    replaceButton.style.color = '#FFFFFF';
    replaceButton.style.border = 'none';
    replaceButton.style.borderRadius = '5px';
    replaceButton.style.cursor = 'pointer';

    document.body.appendChild(replaceButton);

    // 按钮点击事件
    replaceButton.addEventListener('click', () => {
        const table = document.querySelector('#tableList');
        if (!table) {
            alert('沒有抓到表格 #tableList，請再執行一次');
            return;
        }

        // 查找所有包含 MORE 按钮的单元格
        const buttons = table.querySelectorAll('button.index_btn_upload_s');

        buttons.forEach((button) => {
            const href = button.getAttribute('onclick')?.match(/location\.href='([^']+)'/);
            if (href && href[1]) {
                // 创建新的 <a> 元素
                const link = document.createElement('a');
                link.href = href[1];
                link.textContent = 'MORE';
                link.target = '_blank';
                link.style.color = '#007BFF';
                link.style.textDecoration = 'none';

                // 替换原有按钮
                button.parentNode.replaceChild(link, button);
            }
        });

        replaceButton.textContent = "OK！";
        replaceButton.style.backgroundColor = '#28a745';
        setTimeout(() => {
            initReplaceButton();
        }, 2000);
    });
})();
