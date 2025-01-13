---
marp: true
paginate: true
theme: custom
------

<!-- _class: cover -->

<h1 class="logo">ART_OF_<b>CODE</b> #7</h1>
<p class="title">p5.js で学ぶ JavaScript #7</p>
<p class="author">&copy; 2024 Satoshi Soma</p>

---

## 前回のおさらい

### 画像の読み込み
画像ファイルへのパスを *`loadImage()`* 関数の引数として渡すことで、
その画像を**画像オブジェクト**として読み込むことができる。

```js
let img; // 画像オブジェクトを入れる変数（最初は空）

function preload() {
  img = loadImage('画像ファイルへのパス');
}
```

`loadImage()` 関数の呼び出しは *`preload()`* 関数の中で行うこと。
`preload()` 関数は **`setup()` 関数より先に呼び出される**。

---

画像オブジェクトを表示するには `image()` 関数を使う。

```js
function draw() {
  // img を X:100, Y:200 の位置に表示
  image(img, 100, 200);
}
```

---

`img.loadPixels()` 関数を呼び出してから、
`img.get()` 関数を呼び出すと、**画像上の特定の位置の色を取得する**ことができる。

```js
function setup() {
  img.loadPixels(); // 最初に一回だけ実行
}

function draw() {
  let c = img.get(100, 200); // X:100, Y:200 の色を取得
}
```

基本的に `img.loadPixels()` は最初に一回だけ呼び出すだけで良い。
`img.get()` 関数で取得できる色のデータは **RGB 値の入った配列**になっている。
すなわち、
`c[0]` が R (0 から 255)
`c[1]` が G (0 から 255)
`c[2]` が B (0 から 255) となる。

---

`img.get()` で取得した色データは *`fill()`* や *`stroke()`* などの関数に渡すことで
*描画色*として利用することができる。

```js
function draw() {
  let c = img.get(100, 200); // 画像上 X:100, Y:200 の色を c に保存
  fill(c);   // 塗りの色を c に指定
  stroke(c); // 線の色を c に指定
  circle(0, 0, 30); // 指定した色で円を描画
}
```

サンプルコード:
`06/ColorPicker/sketch.js`
https://editor.p5js.org/amekusa/sketches/-iyVpSKwJ

---

*`for` 文*を活用したサンプルコードも用意した。

`06/Pic-Cells/sketch.js`
https://editor.p5js.org/amekusa/sketches/0XDQSWwub

---

## 前回のおさらい

### 音声ファイルの読み込み
音声ファイルへのパスを *`loadSound()`* 関数に渡すことで、
*サウンドオブジェクト*として読み込むことができる。

```js
let snd; // サウンドオブジェクトを入れる変数（最初は空）

function preload() {
  snd = loadSound('サウンドファイルへのパス');
}
```

画像と同様に、`loadSound()` も `preload()` 関数内で呼ぶこと。

---

サウンドオブジェクトを再生するには *`snd.play()`* 関数を呼べば良い。

```js
function mouseClicked() {
  snd.play(); // マウスをクリックした時に再生
}
```

その他の関数:

```js
snd.stop();  // 停止
snd.pause(); // 一時停止
```

---

### 波形解析

#### 音の大きさを取得する
`06/MusicPlayer/sketch.js`
https://editor.p5js.org/amekusa/sketches/-5YQoKdUJ

#### 定位の移動, 波形の表示
`06/MusicPlayer2/sketch.js`
https://editor.p5js.org/amekusa/sketches/uCmyFkJ8F

---

## 前回のおさらい

### フォントファイルの読み込み
フォントファイルへのパスを *`loadFont()`* 関数に渡すことで、
*フォントオブジェクト*として読み込むことができる。

```js
let font; // フォントオブジェクトを入れる変数（最初は空）

function preload() {
  font = loadFont('フォントファイルへのパス');
}
```

対応しているファイル形式は *`.ttf`* か *`.otf`* のみだ。
ライセンスフリーのフォントをダウンロードして利用すると良い。
https://www.fontsquirrel.com/

---

読み込んだフォントオブジェクトは *`textFont()`* 関数に渡すことで描画フォントとして使用でき、
以降、*`text()`* 関数で表示される文字列は全てそのフォントで描画される。

```js
function draw() {
  textFont(font); // 描画フォントを指定
  text('Hello p5.js!'); // 文字列を描画
}
```

---

`font.textToPoints()` 関数で文字列の*アウトライン化*も可能。

```js
let font;   // フォントオブジェクト変数（最初は空）
let points; // アウトラインデータを入れる変数（最初は空）

function preload() {
  font = loadFont('font.ttf'); // フォント読み込み
}

function setup() {
  // 'Hello' をアウトライン化
  points = font.textToPoints('Hello', 100, 200, 36);
      // 位置 X:100, Y:200
      // フォントサイズ 36
}
```

---

アウトラインデータは*頂点オブジェクト*を格納した*配列*だ。

つまり、
`points[0].x` は `0` 番目の頂点の X 座標
`points[0].y` は `0` 番目の頂点の Y 座標となる。

この配列を `for` 文でループ（スキャン）すれば、
*各頂点の位置に図形を描いて輪郭線を描いたり*、
*頂点の位置をずらして輪郭を歪ませる*、といった加工が可能だ。

サンプル:
https://editor.p5js.org/amekusa/sketches/aCsyCp2w5
https://editor.p5js.org/amekusa/sketches/XcKPoUYOH

---

#### サンプル集 by 講師:相馬
https://editor.p5js.org/amekusa/collections/9jwIe3hqu

#### 参考書籍のコード
http://www.bnn.co.jp/support/generativedesign_p5js/

---

## 最終日の講評に向けて
- 最終日までに **p5.js を使った何らかのアート** を制作してもらいます。
- 成果物は各自の Wix で制作したサイト上に掲載されます。
- 形態は問わず。インタラクティブアート, ゲーム, プリントTシャツ, etc.
- コードのクオリティを重視しますが、内容の面白さも評価します。
- 質問, アドバイス, いつでも受け付けてます。
- サンプル集は随時、追加・更新します。時々チェックしてみてください。
