// ==UserScript==
// @name         選課列表拖曳排序
// @namespace    https://imych.one
// @version      1.4
// @description  讓選課系統中的課程列表可以拖曳重新排序，並一鍵依排序選入課程，支援 AJAX 載入
// @author       yc97463
// @match        https://sys.ndhu.edu.tw/AA/CLASS/subjselect/course_pre_sele.aspx
// @match        https://sys.ndhu.edu.tw/aa/class/subjselect/course_pre_sele.aspx
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    // 樣式定義
    GM_addStyle(`
        .drag-handle {
            cursor: grab;
            font-size: 1.2em;
            margin-right: 5px;
        }
        .sortable-item {
            border: 1px dashed #bbb;
            margin: 5px 0;
        }
        .sortable-item.dragging {
            opacity: 0.5;
            background: #f0f0f0;
        }
        .action-button {
            position: fixed;
            top: 10px;
            right: 10px;
            background-color: #007bff;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 10px;
        }
        .reset-button {
            background-color: #dc3545;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
    `);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.top = '10px';
    buttonContainer.style.right = '10px';

    const enableDragButton = document.createElement('button');
    enableDragButton.textContent = '啟用拖曳排序';
    enableDragButton.className = 'action-button';

    const executeButton = document.createElement('button');
    executeButton.textContent = '一鍵排入';
    executeButton.className = 'action-button';
    executeButton.style.display = 'none';
    executeButton.style.marginRight = '10px';

    const resetButton = document.createElement('button');
    resetButton.className = 'action-button reset-button';
    resetButton.title = '重置';
    resetButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 4v6h-6"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
    `;
    resetButton.style.display = 'none';

    buttonContainer.appendChild(enableDragButton);
    buttonContainer.appendChild(executeButton);
    buttonContainer.appendChild(resetButton);
    document.body.appendChild(buttonContainer);

    let draggingRow = null;
    const courseTableSelector = 'table#ContentPlaceHolder1_grd_subjs tbody';

    // 啟用拖曳功能函數
    function enableDragging() {
        const courseTable = document.querySelector(courseTableSelector);
        if (!courseTable) return alert('找不到課程列表，請確認頁面是否載入完成。');

        const rows = Array.from(courseTable.querySelectorAll('tr')).slice(1);
        rows.forEach(row => {
            if (!row.classList.contains('sortable-item')) {
                const dragHandle = document.createElement('span');
                dragHandle.className = 'drag-handle';
                dragHandle.innerHTML = '☰';
                row.insertAdjacentElement('afterbegin', dragHandle);
                row.classList.add('sortable-item');
                row.draggable = true;

                row.addEventListener('dragstart', () => {
                    draggingRow = row;
                    row.classList.add('dragging');
                });

                row.addEventListener('dragend', () => {
                    draggingRow = null;
                    row.classList.remove('dragging');
                });

                row.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    const draggingOverRow = e.target.closest('tr');
                    if (draggingOverRow && draggingOverRow !== draggingRow) {
                        const bounding = draggingOverRow.getBoundingClientRect();
                        const offset = e.clientY - bounding.top;
                        if (offset > draggingOverRow.clientHeight / 2) {
                            draggingOverRow.after(draggingRow);
                        } else {
                            draggingOverRow.before(draggingRow);
                        }
                    }
                });
            }
        });

        enableDragButton.style.display = 'none';
        executeButton.style.display = 'inline-block';
        resetButton.style.display = 'inline-flex';
        // alert('拖曳排序功能已啟用，請調整課程順序，完成後點擊「一鍵排入」。');
    }

    // 一鍵排入功能
    executeButton.addEventListener('click', () => {
        const courseTable = document.querySelector(courseTableSelector);
        const sortedRows = Array.from(courseTable.querySelectorAll('.sortable-item'));
        sortedRows.forEach(row => {
            const onclickAttr = row.querySelector('input[type="button"]').getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/pss\(this,(\d+),/);
                if (match) {
                    const courseId = match[1];
                    console.log(`選入課程 ID: ${courseId}`);
                    eval(`pss(this, ${courseId}, '')`); // 執行選課動作
                }
            }
        });
        alert('課程已依排序選入！');
    });

    // 重置功能
    resetButton.addEventListener('click', () => {
        const courseTable = document.querySelector(courseTableSelector);
        if (courseTable) {
            courseTable.querySelectorAll('.sortable-item').forEach(row => {
                row.classList.remove('sortable-item', 'dragging');
                row.removeAttribute('draggable');
                const handle = row.querySelector('.drag-handle');
                if (handle) handle.remove();
            });
        }
        enableDragButton.style.display = 'inline-block';
        executeButton.style.display = 'none';
        resetButton.style.display = 'none';
        // alert('已重置拖曳排序功能！');
    });

    // 按鈕事件綁定
    enableDragButton.addEventListener('click', enableDragging);
})();
