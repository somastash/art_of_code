---
marp: true
theme: default
paginate: true
------

<style>
    :root {
        font-size: 1.75em;
        font-family: Helvetica, "Hiragino Kaku Gothic Pro", sans-serif;
        line-height: 1.75;
    }
    h1,h2,h3 {
        font-family:
            "Avenir Next",
            Futura,
            sans-serif;

        line-height: 1.25;
    }
    p {
        text-shadow: 2px 2px 0 white
    }
    section.right {
        text-align: right;
    }
</style>

# ART_OF_CODE #6
p5.js で学ぶ JavaScript

---

<!-- class: right -->

Satoshi Soma / 相馬 聡
github.com/amekusa
Dec. 22, 2021

---

<!-- class: left -->

## 前回のおさらい 1/2

### オブジェクト (Object)
データで表現されるバーチャルな “モノ”

---

オブジェクトとは**データ型**の一つで、
**複数の属性（プロパティ）**
によって構成された、情報の一単位である。

```js
let apple = {
    color:   'red'  // 色
    size:    11,    // 大きさ
    weight:  474.9, // 重さ
};
```

オブジェクトも、数値や文字列と同様に
**変数に代入することができる**。

![bg left:35% 75%](assets/apple.png)

---

**複数の関連する情報（データ）** を
**一つのまとまった情報体** として**抽象化**するための仕組みであり、
思いつく限り**どんな物でもオブジェクト**として
表現することができる。

```js
let film = {
    title:    'The Shining',     // タイトル
    director: 'Stanley Kubrick', // 監督
    release:  '1980-05-23',      // 公開日
    language: 'English',         // 言語
};
```

**形をもたない概念**のような対象も
オブジェクトとして抽象化されることは普通によくある。

---

オブジェクトのプロパティは、**変数とほぼ同じ**ように使うことができる。
プロパティを参照するには **`オブジェクト.プロパティ名`** と書く。

```js
alert( 'この林檎の、' );
alert( '大きさは' + apple.size + 'cmです。' );
alert( '重さは' + apple.weight + 'グラムです。' );
```

---

プロパティの**値を変更**したり、
新しく**プロパティを追加**することも可能。

```js
let obj = {         // オブジェクトを定義
    aaa: 111,
    bbb: 222,
};
obj.ccc = 300;      // プロパティ ccc を追加
obj.ccc = 300 + 33; // ccc の値を変更
```

---

## 前回のおさらい 2/2

### 配列 (Array)
一度にたくさんの変数を扱うために

---

配列とは **特殊なオブジェクト** の一つ。
通常の変数が一つしか値を格納できないのに対して、
**配列は複数の値を保持**することができる。

配列を定義するには、
**`[ ]`** の中に **`,（カンマ）` 区切り**で値を列挙する。

```js
let students = ['Alice', 'Bob', 'Charles']; // 3人の生徒
```

---

配列に入れた**個々の値**のことを **要素 (Element)** と呼ぶ。
特定の要素にアクセスするには、その要素が**先頭から何番目**にあるかを指定する。

```js
alert( students[0] ); // Alice
alert( students[1] ); // Bob
alert( students[2] ); // Charles
```

この番号は **添字 (Index)** と呼ばれ、**`0` から始まる連番** となっている。

---

**`for`** 文によるループを活用すれば、
配列の**各要素**に対して **同じ処理を適用** させることができる。

```js
for (let i = 0; i < 3; i++) {
    alert( i + '番 ' + students[i] ); // 添字に i を指定
    // '0番 Alice'
    // '1番 Bob'
    // '2番 Charles'
}
```

工場のベルトコンベアから次々と**流れてくる部品（要素）** に対して
**淡々と同じ加工を施していく**ようなものだろう。

---

配列に **後から要素を追加** するには **`push()`** 関数を使う。

```js
students.push( 'David' ); // David を生徒に追加
```

`push()` 関数は **最後尾に要素を追加** するので、
`students` 配列の内容は以下のようになる。

```js
['Alice', 'Bob', 'Charles', 'David']
```

---

配列に **全部でいくつの要素が入っているか** は
**`length`** プロパティで知ることができる。

```js
alert( '生徒は全部で' + students.length + '人います。' ); // '生徒は全部で4人います。'
```

```js
for (let i = 0; i < students.length; i++) {
    alert( i + '番 ' + students[i] ); // 添字に i を指定
    // '0番 Alice'
    // '1番 Bob'
    // '2番 Charles'
    // '3番 David'
}
```

---

### 配列の応用例
`06/rainbow-array.js`
https://editor.p5js.org/amekusa/sketches/UMign2Qg4

### 配列とオブジェクトの応用例
`06/rainbow-array-2.js`
https://editor.p5js.org/amekusa/sketches/OrVlqvNT7

---

## とにかく p5.js で色々やってみよう
ここがスタート地点。ジェネラティブアートの可能性を探っていこう

---

### 画像を読み込む
p5.js において、画像は **オブジェクト** として取り扱う。
**`loadImage()`** 関数に読み込みたい画像のパスを渡すと、
**画像オブジェクト** が返り値として戻ってくる。

```js
let img; // 画像オブジェクトを入れる変数

function preload() {
  img = loadImage('画像ファイルへのパス');
}
```

注意点として、このようなファイルの読み込み処理は
必ず **`preload()`** 関数内で行う必要がある。

`preload()` 関数は `setup()` 関数よりも先に実行される。

---

読み込んだ画像オブジェクトを単純に表示するだけなら
**`image()`** 関数を使えば良い。

```js
image(img, 0, 0);
```

第 1 引数に表示したい画像オブジェクト,
第 2, 第 3 引数は表示したい位置 (X, Y) を渡す。

---

しかし、そのまま表示するだけではあまり面白くはない。
読み込んだ**画像データを元に、複雑な処理**を施してみよう。

---

そもそも、画像データとはどのようなデータだろうか。

デジタルデータとしての画像とは、
**整列した画素（ピクセル）の集合** にほかならない。
そして、ピクセルとは **RGB 値で表現される色** のデータである。

つまり、デジタル画像とは **色の配列** なのだ。

![bg opacity:0.15](assets/pixels.png)

---

**`loadImage()`** 関数から返ってくる画像オブジェクトも、
内部の **プロパティ** に **配列として色のデータ** を保持している。

この配列にアクセスするには、まず **`loadPixels()`** 関数を呼んでから
**`get()`** 関数を呼べばよい。

---

```js
img.loadPixels();
let c = img.get(0, 0); // 位置(0, 0) の色を取得
```

**`get()`** 関数は **画像上の指定された位置の色** を取得し、
オブジェクトとして返してくれる。(左上が 0, 0）

---

取得した **色オブジェクト** は
**`fill()`** や **`stroke()`** などの関数に渡すことで
**描画色** として利用することが可能だ。

```js
img.loadPixels();
let c = img.get(0, 0);
fill(c);
circle(mouseX, mouseY, 10);
```

---

サンプルコードを見てみよう。

`06/ColorPicker/sketch.js`
https://editor.p5js.org/amekusa/sketches/-iyVpSKwJ

---

**`for` 文を活用**したサンプルコードも用意した。

`06/Pic-Cells/sketch.js`
https://editor.p5js.org/amekusa/sketches/0XDQSWwub

---

### サンプル集 by 俺
https://editor.p5js.org/amekusa/collections/9jwIe3hqu

