function setup() {
    createCanvas(400, 400);

    // NATO フォネティックコード
    let codes = [
        'Alfa',
        'Bravo',
        'Charlie',

        'Delta',
        'Echo',
        'Foxtrot'
    ];

    // 要素を追加
    codes.push('Golf');

    // 配列の長さは length プロパティで取得できる
    alert('配列の長さは ' + codes.length + ' です。');


    // 配列の全要素に順番にアクセスする
    for (let i = 0; i < codes.length; i++) {
      alert( codes[i] );
    }


    alert('終了。');
  }

  function draw() {
    background(220);
  }


  // By Satoshi Soma @ Dec. 16, 2021
  // https://editor.p5js.org/amekusa/sketches/_Y5ai80fH