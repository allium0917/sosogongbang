const grid = document.getElementById('grid');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');
const eraserBtn = document.getElementById('eraserBtn');
const rowsInput = document.getElementById('rowsInput');
const colsInput = document.getElementById('colsInput');
const resizeBtn = document.getElementById('resizeBtn');

let ROWS = 32;
let COLS = 32;
let currentColor = colorPicker.value;
let mouseDown = false;
let isErasing = false;

let cellColors = [];

colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
  if (isErasing) {
    isErasing = false;
    eraserBtn.classList.remove('active');
  }
});

eraserBtn.addEventListener('click', () => {
  isErasing = !isErasing;
  eraserBtn.classList.toggle('active', isErasing);
});

clearBtn.addEventListener('click', () => {
  cellColors = [];
  createGrid(ROWS, COLS);
});

document.body.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);

function setCellColor(row, col, color) {
  if (!cellColors[row]) cellColors[row] = [];
  cellColors[row][col] = color;
}

function createGrid(rows, cols) {
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 20px)`;

  // 새 배열 크기 맞춤, 기존 색 복사, 새 칸은 흰색
  let newCellColors = [];
  for(let r=0; r<rows; r++) {
    newCellColors[r] = [];
    for(let c=0; c<cols; c++) {
      newCellColors[r][c] = (cellColors[r] && cellColors[r][c]) ? cellColors[r][c] : 'white';
    }
  }
  cellColors = newCellColors;

  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    const row = Math.floor(i / cols);
    const col = i % cols;

    // 이전 색상 적용
    cell.style.backgroundColor = cellColors[row][col];

    cell.addEventListener('click', () => {
      const color = isErasing ? 'white' : currentColor;
      cell.style.backgroundColor = color;
      setCellColor(row, col, color);
    });
    cell.addEventListener('mouseover', () => {
      if (mouseDown) {
        const color = isErasing ? 'white' : currentColor;
        cell.style.backgroundColor = color;
        setCellColor(row, col, color);
      }
    });

    grid.appendChild(cell);
  }
}

function changeGridSize() {
  const newRows = parseInt(rowsInput.value);
  const newCols = parseInt(colsInput.value);

  if (
    newRows >= 5 && newRows <= 64 &&
    newCols >= 5 && newCols <= 64
  ) {
    ROWS = newRows;
    COLS = newCols;
    createGrid(ROWS, COLS);
  } else {
    alert('행과 열 모두 5 이상 64 이하 숫자를 입력하세요.');
  }
}

resizeBtn.addEventListener('click', changeGridSize);
rowsInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') changeGridSize();
});
colsInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') changeGridSize();
});

// 초기 그리드 생성
createGrid(ROWS, COLS);
