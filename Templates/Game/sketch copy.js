let w = 400;
let h = 400;
let keys = [];

let scene     = 1; // 現在のシーン番号
let nextScene = 1; // 次のシーン番号

// プレイヤーキャラクター
let player;

// 全キャラクターを入れる配列
let actors = [];


///////////////////////////////
// 起動時に実行される処理（初期化）
function setup() {
  createCanvas(w, h);
}


/////////////////////////////////////
// 毎フレーム実行される処理（メインループ）
function draw() {
  if (scene != nextScene) {
    scene = nextScene;

  }


  // ---- シーン分岐:開始 ----

  if (scene == 0) { // シーン:ゲームプレイ中
    background(150, 200, 255);

    player.draw();

    if (isPressed(32)) {
      changeScene(2);
    }


  } else if (scene == 1) { // シーン:タイトル画面
    background(150, 200, 255);

    push();
    translate(w/2, h/2);
    textAlign(CENTER);
    textSize(42);
    text('Hello World', 0, 0);
    textSize(16);
    text('Press SPACE to start', 0, 40);
    pop();

    if (isPressed(32)) { // SPACE
      changeScene(0);
    }


  } else if (scene == 2) { // シーン:ゲームオーバー画面
    background(150, 20, 40);

    push();
    translate(w/2, h/2);
    textAlign(CENTER);
    textSize(40);
    text('Game Over', 0, 0);
    textSize(15);
    text('Press SPACE to try again', 0, 40);
    text('Press Q to quit', 0, 65);
    pop();

    if (isPressed(32)) { // SPACE
      changeScene(0);
    }

    if (isPressed(81)) { // Q
      changeScene(1);
    }

  } // ==== シーン分岐:終了 ====


  // キー押下状態をリセット（配列を空にする）
  keys.length = 0;

  // デバッグ情報表示
  push();
  translate(10, 20);
  text('scene: ' + scene, 0, 0);
  text('keyCode: ' + keyCode, 0, 20);
  pop();

} // メインループここまで


/////////////////////////////////
// キーが押された瞬間に実行される関数
function keyPressed() {
  keys.push(keyCode); // 配列に押されたキー番号を入れる
}


///////////////////////////////////
// 押されたキーを判定する関数。
// 引数で渡されたキー番号が押されたら true,
// 押されていなければ false を返す。
function isPressed(key) {
  return keys.includes(key); // 配列内にキー番号が含まれているかどうかを判定
}


function changeScene(s) {
  if (scene != s) {
    nextScene = s;
    sceneChanged = true;
  }
}


function newScene(id) {
  let s = {
    id:     id,
    actors: [],
  };
  return s;
}

function newPlayer(posX, posY) {
  let p = {
    x: posX,
    y: posY,
    vx: 0,
    vy: 0,

    draw() {
      circle(p.x, p.y, 50);
    }
  };
  return p;
}


function title() {
  background(150, 200, 255);

  push();
  translate(w/2, h/2);
  textAlign(CENTER);
  textSize(42);
  text('Hello World', 0, 0);
  textSize(16);
  text('Press SPACE to start', 0, 40);
  pop();

  if (isPressed(32)) { // SPACE
    changeScene(game);
  }
}

function gemeover() {
  background(150, 20, 40);

  push();
  translate(w/2, h/2);
  textAlign(CENTER);
  textSize(40);
  text('Game Over', 0, 0);
  textSize(15);
  text('Press SPACE to try again', 0, 40);
  text('Press Q to quit', 0, 65);
  pop();

  if (isPressed(32)) { // SPACE
    changeScene(game);
  }

  if (isPressed(81)) { // Q
    changeScene(title);
  }
}

function game() {

}
