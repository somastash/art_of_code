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
</style>

# ART_OF_CODE #5
p5.js で学ぶ JavaScript

---

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

## オブジェクト
プロパティで表現される、バーチャルな “モノ”

---



---

https://editor.p5js.org/amekusa/sketches/_AV0PDuJr