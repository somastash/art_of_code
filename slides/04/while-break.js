// noprotect

function setup() {
    createCanvas(400, 400);

    while (true) {
      let dice = round(random(1, 6)); // サイコロを振る
      alert("出目は" + dice);

      // 出目が 4 以上ならループを抜ける
      if (dice >= 4) {
        alert("ループ終了");
        break;
      }
    }

    // NOTE
    // random() はランダムな数（乱数）を出力する関数
    // random(最大値, 最小値);

    // NOTE:
    // round() は渡された値を四捨五入し、結果を出力する関数
    // round(値);
  }

  function draw() {
    background(220);
  }

  // By Satoshi Soma @ Dec 9, 2021
  // https://editor.p5js.org/amekusa/sketches/fThVmGvza
