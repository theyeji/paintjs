const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const startPainting = () => {
  painting = true;
};

const stopPainting = () => {
  painting = false;
};

const onMouseMove = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath(); // 경로 생성
    ctx.moveTo(x, y); // 선 시작 좌표
  } else {
    ctx.lineTo(x, y); // 선 끝 좌표
    ctx.stroke(); // 선 그리기
  }
};

const handleColorClick = (event) => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
};

const handleRangeChange = (event) => {
  const size = event.target.value;
  ctx.lineWidth = size;
};

const handleModeClick = (event) => {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);

  Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleColorClick)
  );

  if (range) {
    range.addEventListener("input", handleRangeChange);
  }

  if (mode) {
    mode.addEventListener("click", handleModeClick);
  }
}
