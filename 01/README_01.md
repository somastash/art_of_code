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

### 演習:
1. `01` フォルダの `index.html` をブラウザと VSCode で開く。
2. `index.html` の **`<head>` タグの中に `<script>` タグを記述** し、
    `01` フォルダの **`test.js`** を読み込む。
3. ブラウザを更新して結果を確認する。
4. `test.js` を VSCode で開き、**コードを改変**してみる。
5. 再度ブラウザを更新し、結果の変化を確認する。

---

