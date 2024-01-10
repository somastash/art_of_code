function warn(r, ...args) {
  console.warn(...args);
  return r;
}


function dbg(...args) {
  console.debug(...args);
}

let state = {
  KILL: 100,
  DEAD: 101,
  DONE: 102,
  PAUSE: 103,
  ACTIVE: 104,
  DELAYED: 105,
};
class Task {
  constructor(span, fn) {
    this.fn = fn;
    this._span = span;
    this._delay = 0;
    this.time = 0;
    this.state = {
      curr: state.ACTIVE,
      next: 0,
    };
    this.nextTask = null;
    this._name = '';
  }
  name(str) {
    this._name = str;
    return this;
  }
  update() {
    let done = false;

    switch (this.state.curr) {
     case state.DELAYED:
      this._delay--;
      if (this._delay <= 0) {
        this.state.next = state.ACTIVE;
      }
      break;
     case state.ACTIVE:
      this.fn(this);
      this.time++;
      if (this._span > 0 && this.time >= this._span) {
        this.state.next = state.DONE;
      }
      break;
    }

    if (this.state.next) {
      this.state.curr = this.state.next;
      this.state.next = 0;

      switch (this.state.curr) {
       case state.DONE:
        if (this.nextTask) { // chain
          this.fn = this.nextTask.fn;
          this.time = this.nextTask.time;
          this._span = this.nextTask._span;
          this._delay = this.nextTask._delay;
          this.state = this.nextTask.state;
          this.nextTask = this.nextTask.nextTask;
        } else {
          done = true;
        }
        break;
       case state.KILL:
        done = true;
        break;
      }
    }
    return done;
  }
  span(time) {
    this._span = time;
    return this;
  }
  delay(time) {
    this._delay = time;
    return this;
  }
  pause() {
    if (this.state.curr != state.ACTIVE) return warn(`task is not ACTIVE`);
    this.state.next = state.PAUSE;
  }
  resume() {
    if (this.state.curr != state.PAUSE) return warn(`task is not PAUSE`);
    this.state.next = state.ACTIVE;
  }
  done() {
    this.state.next = state.DONE;
  }
  kill() {
    this.state.next = state.KILL;
  }
  then(...args) {
    if (this.nextTask) return this.nextTask.then(...args);
    this.nextTask = new Task(...args);
    return this.nextTask;
  }
}

class TaskMan {
  constructor() {
    this.tasks = [];
    this.nTasks = 0;
    this.rooms = [];
    this.que = [];
  }
  kill() {
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i].kill();
    }
  }
  add(...args) {
    let t = new Task(...args);
    this.que.push(t);
    return t;
  }
  flush() {
    if (!this.que.length) return;
    if (this.rooms.length) {
      for (let i = 0; i < this.que.length; i++) this.tasks[this.rooms.pop()] = this.que[i];
    } else {
      for (let i = 0; i < this.que.length; i++) this.tasks.push(this.que[i]);
    }
    this.nTasks += this.que.length;
    this.que.length = 0;
  }
  update() {
    let t;
    for (let i = 0; i < this.tasks.length; i++) {
      t = this.tasks[i];
      if (t.update()) {
        this.rooms.push(i);
        this.nTasks--;
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
  title();
}


/////////////////////////////////////
// 毎フレーム実行される処理（メインループ）
function draw() {
  background(128);

  tasks.update();
  tasks.flush();

  // キー押下状態をリセット（配列を空にする）
  keys.length = 0;

  // デバッグ情報表示
  debug({
    keyCode: keyCode,
    tasks: tasks.tasks.length,
    nTasks: tasks.nTasks,
    rooms: tasks.rooms.length,
    que: tasks.que.length
  }, 10, 20);

  let _tasks = {};
  for (let i = 0; i < tasks.tasks.length; i++) {
    _tasks[i] = tasks.tasks[i]._name;
  }
  debug(_tasks, 100, 20);
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


function task(span, fn) {
  return tasks.add(span, fn);
}


//////////////////////////////
// シーン:タイトル画面 の更新関数。
// s は現在のシーンオブジェクト。
function title() {
  tasks.kill();

  // タイトル表示
  task(0, t=>{
    background(150, 200, 255);

    push();
    translate(w/2, h/2); // 画面中央を基準に
    textAlign(CENTER);   // 文字中央寄せ
    textSize(42);
    text('Hello World', 0, 0);
    textSize(16);
    text('Press SPACE to start', 0, 40);
    pop();

    if (isPressed(32)) { // SPACE
      task(30, t=>{
        push();
        translate(w/2, h/2);
        fill('blue');
        circle(0, 0, t.time * 10);
        pop();

      }).then(30, t=>{
        push();
        translate(w/2, h/2);
        fill(100, 100, 255);
        textAlign(CENTER);
        textSize(40);
        if (t.time % 2) text('START', 0, 0);
        pop();

      }).then(1, t=>{
        play();
      });
    }

  }).name('title');

}


//////////////////////////////////
// シーン:ゲームオーバー画面 の更新関数。
// s は現在のシーンオブジェクト。
function gameover() {
  tasks.kill();

  // ゲームオーバー表示
  task(0, t=>{
    background(150, 20, 40);

    push();
    translate(w/2, h/2); // 画面中央を基準に
    textAlign(CENTER);   // 文字中央寄せ
    textSize(40);
    text('Game Over', 0, 0);
    textSize(15);
    text('Press SPACE to try again', 0, 40);
    text('Press RETURN to quit', 0, 65);
    pop();

    if (isPressed(32)) { // SPACE
      play();
    }

    if (isPressed(13)) { // RETURN
      title();
    }

  }).name('gameover');

}


////////////////////////////
// シーン:プレイ中 の更新関数。
// s は現在のシーンオブジェクト。
function play() {
  tasks.kill();

  task(0, t=>{
    // background(150, 200, 255);

    if (isPressed(32)) {
      gameover();
    }
  }).name('play');

  tasks.kill();

}
