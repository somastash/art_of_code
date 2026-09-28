// 配列を作成
let keylist = [
  'a',
  'b',
  'c',
];

function setup() {
  createCanvas(400, 400);
  textSize(20); // 文字サイズ
  textFont('Courier New'); // フォント
}

function draw() {
  background(220);

  // 現在の配列内の要素数を表示
  text('要素数: ' + keylist.length, 20, 40);

  // 配列をスキャンする（要素の数だけループを回す）
  for (let i = 0; i < keylist.length; i++) {
    let x = 20 + i * 20;
    let y = 200;
    text(keylist[i], x, y); // 要素を表示
  }

}

// キーが押される度に実行
function keyPressed() {
  keylist.push(key); // 押されたキーを配列に追加
}


// https://editor.p5js.org/amekusa/sketches/LmP6WozgJ

