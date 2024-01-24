//////////////////////////////////////
// デバッグ用の便利関数。
// 引数で渡されたオブジェクトの全プロパティを
// 画面に表示する。
function debug(data, x, y) {
  push();
  translate(x, y);
  for (let key in data) {
    text(key + ': ' + data[key], 0, 0);
    translate(0, 20);
  }
  pop();
}

function echo(...args) {
  console.log(...args);
}