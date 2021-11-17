---
marp: true
theme: default
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

# art_of_code #1
p5.js で学ぶ JavaScript

---

### JavaScript とは、
- プログラミング言語のひとつ

HTML や CSS と同じ「人工言語」。
HTML と CSS がそれぞれ **独自の文法規則** を持つように、
JavaScript にも独自の文法規則が存在する。

頭文字をとって **JS** とも呼ばれる。

---

ウェブサイトにおいて

HTML は **文書構造**、
CSS は **ページの装飾** を担うのに対し

JS は ウェブページがユーザーの入力に対して、
**より動的で柔軟な双方向性（インタラクション）**:thinking:
を実現するために用いられる。

---

HTML と CSS だけでは実現できない複雑な機能は
大抵 JavaScript によってつくられている。

**JS を使っていないウェブサイトの方が珍しい**
というほど今日のウェブにおいて一般的な技術であり、

HTML, CSS, JS はウェブ（フロントエンド）を支える**三本の柱** といえる。

JS 実例: wikipedia.org, inverse.com, [apple.com](https://www.apple.com/iphone-13-pro/)

---

# JS を動かしてみよう

---

JavaScript は **`.js`** という拡張子のファイルに記述する。
`.js` ファイルは **`<script>` という HTML タグ** で読み込む。


### 書き方:
```html
<script src="読み込むJSファイル"></script>
```

---

### 演習 #1:
1. `01` フォルダの `index.html` をブラウザと VSCode で開く。
2. `index.html` の **`<head>` タグの中に `<script>` タグを記述** し、
    `01` フォルダの **`hello.js`** を読み込む。
3. `hello.js` を VSCode で開き、以下を記述する。（コピペは無しで）
```js
alert('Hello World!');
```

4. ブラウザを更新して結果を確認する。

---

### 演習 #2:
1. `01` フォルダの `math.html` をブラウザと VSCode で開く。
2. `math.html` の **`<body>` タグ内の最後の行に `<script>` タグを記述** し、
    `01` フォルダの **`math.js`** を読み込む。
3. ブラウザを更新して動作を確認する。
4. `math.js` を VSCode で開き、**正しい動作になるようコードを書き換える**。

---

# 進化するウェブと JS の活用事例
技術は需要があるからこそ進化する。

- 昔はイケてなかった JS
- Google や Facebook, Twitter の台頭
- Google による YouTube 買収
- Google 開発による、すごく速い JS 実行エンジン、**V8**
- WebGL により 3D コンテンツがブラウザで動くように

---

### インタラクティブアート:
- [Elastic Man (WebGL)](https://www.adultswim.com/etcetera/elastic-man/)

### ゲーム
- [Cross Code (ImpactJS)](http://www.cross-code.com/en/home)
- [Tanuki Sunset (Unity)](https://v6p9d9t4.ssl.hwcdn.net/html/1756009/WebGL/index.html?v=1574334742)

---

# プログラミングでアートする
技術（Tech）と 芸術（Art）

---

### 技術によって創出されるアートたち

- [ライゾマティクスのインスタレーション](https://rhizomatiks.com/work/)
- [フラクタルアート](https://www.youtube.com/results?search_query=fractal+art)
- [p5.js による作例](https://showcase.p5js.org/#/2021-All)

---

## p5.js
プログラミングによってアートやインタラクティブコンテンツ, ゲームなどを制作するための **JavaScript 用ライブラリ。**

