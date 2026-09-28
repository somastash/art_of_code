---
marp: true
paginate: true
theme: custom
------

<!-- _class: cover -->

<h1 class="logo">ART_OF_<b>CODE</b> #4.1</h1>
<p class="title">p5.js で学ぶ JavaScript #4.1</p>
<p class="author">&copy; 2025 Satoshi Soma</p>

---

# お気に入りの一枚絵を作ろう

---

## `save()` 関数
**`save()`** 関数を呼び出すと、*その瞬間のキャンバスの状態*を一枚の画像として保存することができる。
引数には*保存先のファイル名*を文字列として渡すことができる。

注意したいこととして、単純に `draw()` 関数内に `save()` 関数の呼び出しを記述してしまうと、
画像の保存命令が*毎フレーム実行*されてしまい、ブラウザが応答不能に陥ってしまう。

```js
// 良くない例
function draw() {
  ...
  save('my_sketch.png'); // キャンバスを保存
}
```

---

そこで、**特定のキーが入力された時にのみ一回だけ `save()` 関数が実行される**ようにプログラムすると良いだろう。

<div class="challenge">
演習:
<kbd>s</kbd> キーが押された時にのみ保存を実行するようプログラムする。

ヒント:
- 何らかのキーが押されると `function keyPressed() {}` の `{}` 内が実行される。
- `key` 変数に最後に押されたキーの名前が保存されている。
- `if` 文で押されたキーを判定する。

<details>
<summary>解答:</summary>

```js
function keyPressed() { // 何らかのキーが入力されたら
  if (key == 's') { // 最後に押されたキーが S なら
    save('my_sketch.png'); // キャンバスを保存
  }
}
```

</details>
</div>

---

## 背景を透過する
背景を特定の色で塗るには `background()` 関数を用いるが、
背景を**透明色**で塗るには *`clear()`* 関数を用いる。

<div class="cols gap">


```js
function draw() {
  background(255); // 白背景
}
```

```js
function draw() {
  clear(); // 透明背景
}
```

</div>

背景を透明にした上で `save()` 関数を使えば、**透過 PNG 画像**として保存することができる。

---

## SVG データを出力する
p5.js は外部の *JS ライブラリ*を読み込むことで**機能を拡張**することが可能だ。

<p class="note">
ライブラリとは汎用性や再利用性の高い関数などをまとめ、他のプログラムが利用しやすいようにパッケージングした形で提供されているもの。p5.js 自体もライブラリとしての側面を持つ。
</p>

[p5.js-svg](https://github.com/zenozeng/p5.js-svg) を利用すれば、キャンバスを PNG 画像ではなく、**SVG データ**として出力することができる。
SVG 画像はベクターデータのため、拡大・縮小・回転などといった加工を無劣化で行うことができる。

---

### JS ライブラリを読み込む
外部の JS ファイルを読み込ませるには *`<script>`* タグを `index.html` の `<head>` タグ内に書き加えればいい。*`src`* 属性に URL を書き込めば、*リモートのファイル*を直接読み込ませることもできる。 

p5.js-svg のダウンロード URL は `https://unpkg.com/p5.js-svg@1.6.0` <small>（2025 年現在）</small>となっているため、以下のように `<script>` タグを書き加えよう。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <script src="https://unpkg.com/p5.js-svg@1.6.0"></script>
  </head>
  ...
```

---

### キャンバスを SVG モードにする
p5.js-svg ライブラリを読み込んだ上で、*`createCanvas()`* 関数の **第 3 引数** に *`SVG`* と書き加えると、*SVG モードのキャンバス*を作成できる。

<div class="cols gap">

```js
function setup() {
  createCanvas(400, 400); // 通常キャンバス
}
```

```js
function setup() {
  createCanvas(400, 400, SVG); // SVG キャンバス
}
```

</div>

---

### SVG キャンバスを保存する
SVG キャンバスを作成した上で、`save()` 関数の保存先ファイル名の**拡張子**に *`.svg`* を指定することで、キャンバスを SVG データとして保存することができる。

```js
function setup() {
  createCanvas(400, 400, SVG); // SVG キャンバス
}
function keyPressed() { // 何らかのキーが入力されたら
  if (key == 's') { // 最後に押されたキーが S なら
    save('my_sketch.svg'); // キャンバスを SVG 形式で保存
  }
}
```

