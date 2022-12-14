let drops = []; // 滴オブジェクトを保存する配列

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // マウスボタンが押されている時
  if (mouseIsPressed) {
    
    // 新しい滴オブジェクトを生成
    let newDrop = {
      x: mouseX, // x 座標
      y: mouseY  // y 座標
    };
    
    // 滴オブジェクトを配列に追加
    drops.push(newDrop);
  }
  
  // drops 配列の要素の数だけループ
  for (let i = 0; i < drops.length; i++) {
    
    // 滴オブジェクトを描画
    circle(drops[i].x, drops[i].y, 30);
  }
}