# まとめのリファレンス（p5.js 編）

[TOC]

---

## p5.js とは？

ビジュアルプログラミングに特化した JavaScript 用のライブラリの一つ。



## ライブラリとは？

便利な関数やクラスなどをまとめたもの。



## スケッチとは？

p5.js で書かれた作品のこと。



## スケッチの基本構成

```js
function setup() {
  // キャンバスを作成
  createCanvas(800, 640); // 幅, 高さ
}

function draw() {
  background(255); // 背景を塗る
}
```



### `setup` 関数

**スケッチ起動時に一回だけ実行される。**
キャンバスの作成や、変数の初期化といったような事はここで行うこと。



### `draw` 関数

**1 秒間に約 60 回**、繰り返し実行される。
**メインの処理**はここで行うこと。



### `preload` 関数

**`setup` 関数よりも先に一回だけ実行される。**
画像や音声, フォントなどの素材を使用したい場合、
`preload` 関数内で**ファイルの読み込み**処理を行うこと。

> 例: 画像の読み込み
>
> ```js
> let img;
> 
> function preload() {
>   img = loadImage('my-photo.jpg');
> }
> ```



---



[TOC]

---

*Jan 13, 2022*

Satoshi Soma / 相馬 聡
[github.com/amekusa](https://github.com/amekusa/)

