/**
 * MusicVideo
 * @author Satoshi Soma
 */

// キャンバスサイズ
let w = 1024;
let h = 400;

let keys = []; // 押されたキーを入れる配列

let song;   // サウンドオブジェクト
let lyrics; // 歌詞
let mode = {}; // モードスイッチ

let amp; // 振幅解析機
let fft; // 波形解析機


///////////////////////////
// ファイル読み込み
function preload() {
  song = loadSound('assets/Pretty by HOAX.mp3');
  lyrics = loadStrings('assets/Pretty by HOAX.txt');
}


////////////////////////////////
// 最初に一回実行される（初期化処理）
function setup() {
  createCanvas(w, h);

  // -------- 描画基本設定 --------
  // 角度の指定方法を 0 ~ 360度に
  angleMode(DEGREES);

  // 色指定方法を HSL にする。各値の最大値は 100 に
  colorMode(HSL, 100);
  // ============================

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
  echo('lyrics:', lyrics);
}


/////////////////////////////////
// 毎フレーム実行される（メインループ）
function draw() {
  if (song.isPlaying()) { // 曲が再生中なら
    play();
  }

  if (isPressed(32)) { // SPACE が押されたら
    if (song.isPlaying()) song.pause(); // 再生されていたらポーズ
    else song.play();                   // 再生されていなければ再生
  }

  if (isPressed(13)) { // ENTER が押されたら
    song.jump(); // 再生ポイントを最初に戻す
  }

  if (isPressed(LEFT_ARROW)) { // 左が押されたら
    song.jump(max(song.currentTime() - 1, 0)); // 再生ポイントを 1 秒戻す
  }

  if (isPressed(RIGHT_ARROW)) { // 右が押されたら
    song.jump(min(song.currentTime() + 10, song.duration() - 1)); // 再生ポイントを 10 秒進める
  }

  keys.length = 0; // 押されたキーをリセット
}


/////////////////////////////////////////
// 曲が再生中のみ、draw()関数から呼び出される
function play() {
  let now = song.currentTime(); // 現在の再生時間
  let end = song.duration();    // 曲の終了時間

  // 現在の RMS 値（音圧）を取得
  let rms = amp.getLevel();

  // 現在の波形を取得
  let wave = fft.waveform();

  // 周波数スペクトル取得
  // let spectrMax = 16;   // 波形の細かさ: 16 から 1024 までで 2 のべき乗の数値
  // let spectrMax = 64;
  // let spectrMax = 256;  // 中間くらい
  let spectrMax = 512;
  // let spectrMax = 1024; // 一番細かい
  let spectr = fft.analyze(spectrMax);

  // モードスイッチ
  // NOTE: 特定の再生位置で対応するモードスイッチを ON にする (0 = OFF, 1 = ON)
  mode.intro = 0;  // イントロ
  mode.bass  = 0;  // ベース
  mode.kicks = 0;  // キック
  mode.gsolo = 0;  // ギターソロ
  mode.bridge = 0; // ブリッジ
  if (now < 30) {
    mode.intro = 1;
  }
  if (now > 30) {
    mode.intro = 0;
    mode.bass = 1;
  }
  if (now > 53.6) {
    mode.kicks = 1;
  }
  if (now > 65.5) {
    mode.gsolo = 1;
  }
  if (now > 77) {
    mode.bridge = 1;
  }

  // 背景
  noStroke();        // 描線なし
  fill(0, 0, 0, 50); // 塗りの色（黒 50%)
  rect(0, 0, w, h);

  // -------- スペクトル波形描画 --------
  push(); // この時点での基準点を一時保存
  translate(w/2, h/2); // 基準点をキャンバス中央にずらす
  // noStroke();
  // fill('red');
  stroke(0, 100, 50);

  // 周波帯 最小値 から 最大値までループ
  let min = 100;
  let max = spectrMax - 50
  for (let i = min; i < max; i++) {
    let power = map(spectr[i], 0, 255, 0, h/2); // 波の高さ（エネルギー）
    let angle = map(i, min, max-1, 0, 360);       // 波の位置を角度に変換（0 ~ 360）
    let r = h/3; // 半径
    let x1 = cos(angle) * r;           // 始点の x 座標
    let y1 = sin(angle) * r;           // 始点の y 座標
    let x2 = cos(angle) * (r + power); // 終点の x 座標
    let y2 = sin(angle) * (r + power); // 終点の y 座標
    line(x1, y1, x2, y2);
  }

  pop(); // push()で保存した基準点に戻す
  // ======== スペクトル波形描画ここまで ========

  // 音の定位をマウスの位置に
  let panning = map(mouseX, 0, w, -0.5, 0.5, true);
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

  // -------- デバッグ情報表示 --------
  debug({
    end: ceil(end * 100) / 100 + ' s',
    now: ceil(now * 100) / 100 + ' s',
  }, 10, 100);

  debug({
    keyCode: keyCode,
  }, 10, 20);
  // ==============================

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