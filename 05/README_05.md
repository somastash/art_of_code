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
    section.right {
        text-align: right;
    }
</style>

# ART_OF_CODE #5
p5.js で学ぶ JavaScript

---

<!-- class: right -->

By Satoshi Soma / 相馬 聡
github.com/amekusa
Dec. 16, 2021

---

<!-- class: left -->

## 前回のおさらい 1/2

### `else`
**`else`** 句は **`if` 文の直後**に書くことで、
**条件を満たさなかった場合**の実行内容を記述することができる。

```js
if (条件A) { // もし A が 真 なら
    alert('A');

} else {    // そうでないなら
    alert('Not A');
}
```

---

### `else if`
**`else` の直後に `if` 文**を書くと、
**別の条件分岐**を付加することができる。

```js
if (条件A) {
    alert('Aは真'); // 条件A == true

} else if (条件B) {
    alert('Aは偽'); // 条件A == false
    alert('Bは真'); // 条件B == true
}
```

---

**複数の `else if` 文を連鎖**させることも可能。
条件は上から順番にチェックされるので、
**下の条件ほど優先度が低くなる**といえる。

```js
if (条件A) {
    alert('Aは真'); // 条件A == true

} else if (条件B) {
    alert('Aは偽'); // 条件A == false
    alert('Bは真'); // 条件B == true

} else if (条件C) {
    alert('Aは偽'); // 条件A == false
    alert('Bも偽'); // 条件B == false
    alert('Cは真'); // 条件C == true
}
```

---

サンプルスケッチで、
**`if`, `else`, `if else`** の書き方と動作をもう一度確認してみよう。
https://editor.p5js.org/amekusa/sketches/3YAjHkOI-

---

## 前回のおさらい 2/2

### `while` 文
**ループ処理**を実現するための構文のひとつ。

**`for` 文**が、決められた回数分だけループさせたい場合に適しているのに対して、
**`while` 文**は、**ループの回数が不定**の場合に適している。

---

書き方は `if` 文によく似ている。
```js
while (条件) {
    // 実行内容
}
```

**`条件` が 真 (true) の時のみ `{ }` 内が実行される**のも `if` 文と同じ。
`if` 文と違う点は、
**`条件` が 真 (true) である限り、`{ }` 内が繰り返し実行され続ける**ということ。

---

```js
let i = 0;
while (i < 3) { // i が 3 未満の時
    alert(i);
    i++; // i を 1 増やす
}
```

例えばこのコードは `{ }` 内が **3 回連続で実行**される。

`for` 文で以下のように書いた場合と結果は同じだ。

```js
for (let i = 0; i < 3; i++) {
    alert(i);
}
```

---

### `break` 文
`while` か `for` 文内で **`break;`** と書かれた行にプログラムが到達すると、
**実行中のループが強制的に終了する**。

```js
let i = 3;
while (true) {
    alert(i);
    if (i == 0) { // i が 0 なら
        break;    // ループを抜ける
    }
    i--; // i を 1 減らす
}
```

この例文は、ループが回る度に変数 `i` が `1` ずつ減っていき、
**`0` になると `break;` によってループが終了する**。

---

`while` と `break` を使った場合の**プログラムの流れ**を
サンプルコードで確認しよう。
https://editor.p5js.org/amekusa/sketches/fThVmGvza

---

## オブジェクト (object)
プロパティで表現される、バーチャルな “モノ”

---

“モノ” は**単一の数値**では表現できない。
どんなに単純な物体でも
色, 形, 大きさ, 重さ
といった、**複数の様々な情報から成り立っている**。

![bg left:35% 75%](apple.png)

---

そのような “モノ” を JavaScript で表現するには
**オブジェクト (object)** というデータ型を用いる。

（データ型とは、数値や文字列といった値のタイプ（種類）のこと。）

---

オブジェクトは **1つ以上の属性（プロパティ）** から構成されており、
このような書式で定義することができる。

```js
{
    プロパティA: 値,
    プロパティB: 値,
    プロパティC: 値
}
```

もちろんプロパティ名は自由に決めてよい。

---

例として :apple: をオブジェクトとして定義してみよう。

```js
let apple = {
    color:  'red', // 色
    size:   11,    // cm
    weight: 474.9  // グラム
};
```

`color`, `size`, `weight` という**三つのプロパティで構成されるオブジェクト**を定義し、
それを変数 `apple` に代入している。

---

ゲームのキャラならこういう感じ（？）。

```js
let player = {
    name: 'John',  // 名前
    sex:  'male',  // 性別

    lv:      1,    // レベル
    exp:     0,    // 経験値

    hp:    128,    // 体力
    str:     9,    // ちから
    agl:     3,    // 素早さ
    fth:    12,    // 信仰心

    wpn:  'gun'    // 武器
};
```

![bg right:40%](knight.png)

---

オブジェクトのプロパティにアクセスするには、

```js
alert('ようこそ！ ' + player.name + 'さん'); // 'ようこそ！ Johnさん'
```

このように、`変数.プロパティ名` と書けばよい。

---

また、プロパティは変数と同様に **いつでも値を変更**することが可能だ。

```js
player.lv++; // レベルアップ
```

```js
let dmg = 256;
player.hp = player.hp - dmg; // プレイヤーに 256 のダメージ
```

---

条件分岐に利用する等、変数とほぼ同じように使うことができる。

```js
if (player.hp <= 0) {  // 体力 0 以下
    alert('YOU DIED'); // ゲームオーバー
}
```

---

また、プロパティは**後から追加**しても問題ない。

```js
let obj = {};  // 空のオブジェクトを作成
obj.abc = 123; // プロパティ abc を追加
obj.def = 456; // プロパティ def を追加
```

---

サンプルスケッチを確認してみよう。
`05/balls.js` https://editor.p5js.org/amekusa/sketches/UulZcFAl-


改造版:
`05/bouncy-balls.js` https://editor.p5js.org/amekusa/sketches/_AV0PDuJr

---

### 演習:
サンプルスケッチをコピーし、
改造して面白い動きをつけてみよう。

---

## 配列 (array)

---

第二回目の講義で、
変数は **「値を一つだけ保存できる容れ物」** のようなものだと説明した。

先ほどのサンプルスケッチ内の**変数 `ballA`, `ballB`** のように、
**2 個のオブジェクトが必要なら 2 つの変数**を用意する必要がある。

---

もし同じ方法で **3 個目のボール**が欲しくなったら、
我々はさらに **変数 `ballC`** を用意しなくてはならない。

だが ***“Do Not Repeat Yourself”*** の原則に立ち返るならば、
これは美しい解決方法とは言えない。

そこで **配列 (array)** の出番となる。

---

JavaScript における配列とは **特殊なオブジェクトの一種**で、
**複数の値を、それぞれに番号を振って格納, 管理**することのできる構造体である。

---

配列を定義するには、

```js
[値A, 値B, 値C]
```

このように `[ ]` の中に **`,（カンマ）` 区切り**で値を列挙する。

```js
let list = ['Alice', 'Bob', 'Charles'];
```

この例では、**変数 `list`** に
**三つの文字列 `Alice`, `Bob`, `Charles` が入った配列** を代入している。

---

配列に格納されている一つ一つの値を **要素 (element)** と呼び、
**番号を指定** してそれぞれの要素にアクセスすることができる。

```js
alert( list[0] ); // "Alice"
alert( list[1] ); // "Bob"
alert( list[2] ); // "Charles"
```

`[ ]` の数字が番号で、**`0` から始まる連番**となっている。
この番号は **添字（インデックス）** と呼ぶ。

---

ちなみに、値の列挙時に改行を挟んでも問題ない。
長い配列を定義する際は**読みやすさ**を心がけよう。

```js
// NATO フォネティックコード
let codes = [
    'Alfa',
    'Bravo',
    'Charlie',

    'Delta',
    'Echo',
    'Foxtrot'
];
```

---

また、配列に**後から要素を追加**することも可能だ。
**`push()` 関数**を使うと、**配列の最後尾**に新しい要素を追加できる。

```js
codes.push('Golf'); // Foxtrot の次
```

---

### 配列をループで回そう
ここまで内容では配列の利点がこれといって思いつかないかもしれないが、
**添字で個々の要素にアクセスできる**という性質が
**`for` ループ**と組み合わせた時に**真価**を発揮する。

---

サンプルコードを確認しよう。
`05/array.js` https://editor.p5js.org/amekusa/sketches/_Y5ai80fH

---

早速、配列と `for` ループを駆使し、
2 個だったボールを **24 個** に増やしてみた。
コードと動作を確認してみてほしい。
`05/bouncy-balls-2.js` https://editor.p5js.org/amekusa/sketches/FIM3H8feO

---

## 演習:
サンプルコードを参考にしながら、
- オブジェクト (object)
- 配列 (array)
- `for` ループ

を駆使し、**動くアート**を作ってみよう。