!DRAFT 2024/12/17 README_05.md から一旦退避

## 前回のおさらい 1/3

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

## 前回のおさらい 2/3

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
  weight:  400,   // 重さ
};
```

オブジェクトも、数値や文字列と同様に
**変数に代入することができる**。

![bg left:35% 75%](assets/apple.png)

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
let obj = {};     // 空のオブジェクトを作成
obj.x = 300;      // プロパティ x を追加
obj.x = 300 + 33; // x の値を変更
```

---

## 前回のおさらい 3/3

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

<figure>
<div class="array">
  students
  <div class="item a">[0] Alice</div>
  <div class="item b">[1] Bob</div>
  <div class="item c">[2] Charles</div>
</div>
<style scoped>
.array {
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: center;
  padding: 1em;
  /* background: hsl(40, 80%, 90%); */
  border: 1px dashed #0008;
  font-family: Menlo, Monaco, monospace;
}
.item {
  padding: .5em 1em;
}
.item.a {
  background: hsl(0, 90%, 80%);
}
.item.b {
  background: hsl(90, 90%, 80%);
}
.item.c {
  background: hsl(180, 90%, 80%);
}
</style>
<figure>

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
`05/rainbow-array.js`
https://editor.p5js.org/amekusa/sketches/UMign2Qg4

### 配列とオブジェクトの応用例
`05/rainbow-array-2.js`
https://editor.p5js.org/amekusa/sketches/OrVlqvNT7
