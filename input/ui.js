import { resize } from '../editor/editor.js';

const consoleResize = document.getElementById('consoleResize');
const inspector = document.getElementById('inspector');
const inspectorResize = document.getElementById('inspectorResize');

const fs = document.getElementById('fs');
const fsSideBar = document.getElementById('fsSideBar')
const fsResize = document.getElementById('fsResize');

const fsButton = document.getElementsByClassName('fsButton');
const cButton = document.getElementsByClassName('cButton');

let cMenu = true;
function showFS() {
  if (cMenu) {
    _console.style.visibility = "hidden";
    fs.style.visibility = "visible";
  }
}

function showC() {
  if (cMenu) {
    fs.style.visibility = "hidden";
    _console.style.visibility = "visible";
  }
}

fsButton[0].addEventListener("click", showFS)
fsButton[1].addEventListener("click", showFS)

cButton[0].addEventListener("click", showC)
cButton[1].addEventListener("click", showC)

let uiDrag = null;
consoleResize.addEventListener("mousedown", () => {
  uiDrag = 'console';
});

inspectorResize.addEventListener("mousedown", () => {
  uiDrag = 'inspector';
});

fsResize.addEventListener("mousedown", () => {
  uiDrag = 'fs';
});

window.addEventListener('pointerup', () => {
    uiDrag = null;
    resize();
});

document.addEventListener('mousemove', (e) => {
    if (uiDrag == 'console') {
        resizeConsole(e);
    } else if (uiDrag == 'fs') {
        resizeFs(e);
    } else if (uiDrag == 'inspector') {
        resizeInspector(e);
    }
});

const consoleMaxHeight = 0.75;
const consoleMinHeight = 35;
function resizeConsole(e) {
  const newHeight = Math.min(Math.max(Math.round(window.innerHeight - e.clientY), consoleMinHeight), window.innerHeight * consoleMaxHeight);
  _console.style.height = newHeight + 'px';
  fs.style.height = newHeight + 'px';
  consoleResize.style.bottom = (newHeight - 5) + 'px';
}

const fsMaxWidth = 0.75;
const fsMinWidth = 80;
function resizeFs(e) {
  const newWidth = Math.min(Math.max(Math.round(e.clientX), fsMinWidth), fs.clientWidth * fsMaxWidth);

  fsSideBar.style.width = newWidth + 'px';
  fsResize.style.left = (newWidth - 5) + 'px';
}

const inspectorMaxWidth = 0.75;
const inspectorMinWidth = 250;
function resizeInspector(e) {
  const newWidth = Math.min(Math.max(Math.round(window.innerWidth - e.clientX), inspectorMinWidth), window.innerWidth * inspectorMaxWidth);
  inspector.style.width = newWidth + 'px';
  inspectorResize.style.right = (newWidth - 5) + 'px';

  _console.style.width = window.innerWidth - newWidth + 'px';
  fs.style.width = window.innerWidth - newWidth + 'px';
  consoleResize.style.width = window.innerWidth - newWidth + 'px';
}


window.addEventListener('load', () => {
    const newWidth = window.innerWidth - inspector.offsetWidth;
    _console.style.width = newWidth + 'px';
    consoleResize.style.width = newWidth + 'px';
    resize();
})