let canvas, ctx;

function init() {
  canvas = document.getElementById("astar");
  ctx = canvas.getContext('2d')

  ctx.beginPath();
  ctx.strokeRect(50, 35, 50 ,50 )
}

document.addEventListener('DOMContetnLoaded', init)