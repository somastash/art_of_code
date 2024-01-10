let w = 1400;
let h = 400;

let keys = [];

let song;   // サウンドオブジェクト
let lyrics; // 歌詞

let amp; // 振幅解析機
let fft; // 波形解析機

// ファイル読み込み
function preload() {
  song = loadSound('assets/Pretty by HOAX.mp3');
  lyrics = loadStrings('assets/Pretty by HOAX.txt');
}

function setup() {
  createCanvas(w, h);

  song.setVolume(0.5); // 音の大きさ (0.0 ~ 1.0)

  // 振幅解析ライブラリを準備
  amp = new p5.Amplitude();
  amp.setInput(song); // 解析対象を指定
  amp.smooth(0.5);    // スムージング

  // 波形解析（フーリエ変換）ライブラリを準備
  fft = new p5.FFT();
  fft.setInput(song); // 解析対象を指定

  lyrics = lyrics.map(l => {
    let m = l.match(/^\s*(.*?)\s*\[([0-9.]+)\-([0-9.]+)\]$/);
    if (m) {
      return {
        line:  m[1],
        start: parseFloat(m[2]),
        end:   parseFloat(m[3]),
      };
    }
  }).filter(l => l);
  echo(lyrics);
}

function draw() {
  if (song.isPlaying()) {
    play();
  }

  if (isPressed(32)) { // SPACE
    if (song.isPlaying()) song.pause(); // 再生されていたらポーズ
    else song.play();                   // 再生されていなければ再生
  }

  if (isPressed(13)) { // ENTER
    song.jump(); // 再生ポイントを最初に戻す
  }

  if (isPressed(LEFT_ARROW)) {
    song.jump(max(song.currentTime() - 1, 0));
  }

  if (isPressed(RIGHT_ARROW)) {
    song.jump(min(song.currentTime() + 10, song.duration() - 1));
  }

  keys.length = 0;
}

function play() {
  let now = song.currentTime();
  let end = song.duration();

  // 現在の RMS 値を取得
  let rms = amp.getLevel();

  // 現在の波形を取得
  let wave = fft.waveform();

  // 周波数スペクトル取得
  // let spectrMax = 16;   // 波形の細かさ: 16 から 1024 までで 2 のべき乗の数値
  // let spectrMax = 64;
  let spectrMax = 256;  // 中間くらい
  // let spectrMax = 512;
  // let spectrMax = 1024; // 一番細かい
  let spectr = fft.analyze(spectrMax);

  // 背景
  noStroke();
  fill(color(0, 0, 0, 50));
  rect(0, 0, w, h);

  // スペクトル波形描画
  push();
  translate(w/2, h/2);
  noFill();
  stroke('red');
  beginShape();
  for (let i = 0; i < spectrMax; i++) {
    let x = map(i, 0, spectrMax - 1, -w/2, w/2);
    let y = map(spectr[i], 0, 255, 0, -h/2);
    vertex(x, y);
  }
  endShape();
  pop();

  // 音の定位をマウスの位置に
  let panning = map(mouseX, 0, w, -1.0, 1.0, true);
  song.pan(panning);

  // 円を描画
  fill('white');
  noStroke();
  circle(mouseX, h/2, rms * 400);

  // 歌詞
  push();
  translate(w/2, h-40);
  textAlign(CENTER);
  textSize(20);
  noStroke();
  fill('white');
  for (let i = 0; i < lyrics.length; i++) {
    let l = lyrics[i];
    if (!l) continue;
    if (l.start <= now && now <= l.end) {
      text(l.line, 0, 0);
    }
  }
  pop();

  debug({
    end: ceil(end * 100) / 100 + ' s',
    now: ceil(now * 100) / 100 + ' s',
  }, 10, 100);

  debug({
    keyCode: keyCode,
  }, 10, 20);

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
