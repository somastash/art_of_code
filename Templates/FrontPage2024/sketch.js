/**
 * MusicVideo
 * @author Satoshi Soma
 */

let w = 400;
let h = 400;

let keys = [];

let font;
let entries = {};
let g;

function preload() {
  font = loadFont('NotoSansJP.ttf');
}

function loadEntries() {
  loadJSON('ENTRIES/list.json', list => {
    for (let i in list) {
      let id = list[i];
      if (id in entries) continue; // skip
      let file = 'ENTRIES/' + id + '.json';
      echo('loading ' + file + ' ...');
      loadJSON(file, data => {
        entries[id] = data;
      }, err => {
        // noop
      });
    }
    echo('entries:', entries);
  });
}

function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h, WEBGL);

  loadEntries();
  setInterval(loadEntries, 10000);

  g = createGraphics(400, 300, WEBGL);
}

function windowResized() {
  w = windowWidth;
  h = windowHeight;
  resizeCanvas(w, h);
}

function draw() {
  background(200);

  let i = 0;
  for (let id in entries) {
    let ent = entries[id];

    i++;
  }


  textFont(font);
  debug(entries, 10, 20);
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


// HOAX
// https://soundcloud.com/hoax_band