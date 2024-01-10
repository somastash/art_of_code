
let state = {
  DEAD: -1,
  PAUSE: 0,
  ACTIVE: 1,
  DELAYED: 2,
};
class Task {
  constructor(fn, ttl = -1, delay = 0) {
    this.fn = fn;
    this.ttl = ttl;
    this.delay = delay;
    this.time = 0;
    this.state = delay ? state.DELAYED : state.ACTIVE;
  }
  update() {
    switch (this.state) {
     case state.DELAYED:
      this.delay--;
      if (this.delay <= 0) this.state = state.ACTIVE;
      break;
     case state.ACTIVE:
      this.fn();
      this.time++;
      if (this.ttl >= 0 && this.time >= this.ttl) this.state = state.DEAD;
      break;
    }
  }
  pause() {
    this.state = state.PAUSE;
  }
  resume() {
    this.state = state.ACTIVE;
  }
}

class TaskMan {
  constructor() {
    this.tasks = [];
    this.rooms = [];
    this.nRooms = 0;
  }
  clear() {
    this.tasks.length = 0;
    this.rooms.length = 0;
    this.nRooms = 0;
  }
  add(...args) {
    let t = new Task(...args);
    if (this.nRooms) {
      this.nRooms--;
      this.tasks[this.rooms[this.nRooms]] = t;
    } else this.tasks.push(t);
  }
  update() {
    let t;
    for (let i = 0; i < this.tasks.length; i++) {
      t = this.tasks[i];
      t.update();
      if (t.state == state.DEAD) {
        if (this.rooms.length > this.nRooms) this.rooms[this.nRooms] = i;
        else this.rooms.push(i);
        this.nRooms++;
      }
    }
  }
  draw() {
    for (let i = 0; i < this.tasks.length; i++) {
      t = this.tasks[i];
      t.update();
      if (t.state == state.DEAD) {
        if (this.rooms.length > this.nRooms) this.rooms[this.nRooms] = i;
        else this.rooms.push(i);
        this.nRooms++;
      }
    }
  }
  gc() {
    let t;
    for (let i = 0; i < this.tasks.length; i++) {
      t = this.tasks[i];
    }
  }
}


//////////////////////////////////////////////////////////

let w = 400;
let h = 400;
let keys = [];

let scene;  // 現在のシーン
let update; // シーンを更新する関数

let tasks = new TaskMan();

// プレイヤーキャラクター
let player;

// 全キャラクターを入れる配列
let actors = [];


///////////////////////////////
// 起動時に実行される処理（初期化）
function setup() {
  createCanvas(w, h);
  goto(title);
  player = newPlayer();
}


/////////////////////////////////////
// 毎フレーム実行される処理（メインループ）
function draw() {

  tasks.update();

  // 更新関数を呼んで現在のシーンを更新
  update(scene);

  // キー押下状態をリセット（配列を空にする）
  keys.length = 0;

  // デバッグ情報表示
  debug({
    update:  update.name,
    'scene.time': scene.time,
    keyCode: keyCode,
  }, 10, 20);
}


//////////////////////////////////////
// デバッグ用の便利関数。
// 引数で渡されたオブジェクトの全プロパティを
// 画面に表示する。
function debug(data, x, y) {
  push();
  translate(x, y);
  for (let key in data) {
    text(key + ': ' + data[key], 0, 0);
    translate(0, 20);
  }
  pop();
}


/////////////////////////////////
// キーが押された瞬間に実行される関数。
function keyPressed() {
  keys.push(keyCode); // 押されたキー番号を配列に入れる
}


/////////////////////////////////////
// 押されたキーを判定する関数。
// 引数で渡されたキー番号が押されたら true,
// 押されていなければ false を返す。
function isPressed(key) {
  return keys.includes(key); // 配列内にキー番号が含まれているかどうかを判定
}


///////////////////////////////////
// シーンを変更する関数。
// シーンを更新する関数を引数として渡す。
function goto(fn) {
  update = fn; // 更新関数を変更
  scene = {    // 新しいシーンオブジェクトを生成
    actors: [],
    time: 0,
    tasks: new TaskMan()
  };
}


function newActor() {
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


function task(fn, span = -1, delay = 0) {
  tasks.add(fn, span, delay);
}


//////////////////////////////
// シーン:タイトル画面 の更新関数。
// s は現在のシーンオブジェクト。
function title(s) {
  // background(150, 200, 255);

  if (s.time == 0) {
    task(()=>{
      background(150, 200, 255);
    });
    task(()=>{
      push();
      translate(w/2, h/2); // 画面中央を基準に
      textAlign(CENTER);   // 文字中央寄せ
      textSize(42);
      text('Hello World', 0, 0);
      textSize(16);
      text('Press SPACE to start', 0, 40);
      pop();
    }, 100);
  }


  // ---- タイトル表示 ----
  // =====================


  if (isPressed(32)) { // SPACE
    task(()=>{

    }, 20);
    goto(play);
  }

  s.time++;
}


//////////////////////////////////
// シーン:ゲームオーバー画面 の更新関数。
// s は現在のシーンオブジェクト。
function gameover(s) {
  background(150, 20, 40);


  // ---- ゲームオーバー表示 ----
  push();
  translate(w/2, h/2); // 画面中央を基準に
  textAlign(CENTER);   // 文字中央寄せ
  textSize(40);
  text('Game Over', 0, 0);
  textSize(15);
  text('Press SPACE to try again', 0, 40);
  text('Press RETURN to quit', 0, 65);
  pop();
  // ========================


  if (isPressed(32)) { // SPACE
    goto(play);
  }

  if (isPressed(13)) { // RETURN
    goto(title);
  }

  s.time++;
}


////////////////////////////
// シーン:プレイ中 の更新関数。
// s は現在のシーンオブジェクト。
function play(s) {
  background(150, 200, 255);

  player.draw();

  if (isPressed(32)) {
    goto(gameover);
  }

  s.time++;
}


class Scene {
  constructor(fn) {
    this._update = fn;
    this.time = 0;

  }
  update() {
    this._update();
  }
}


