document.getElementById('button').addEventListener('click', function () {

    // id="answer" のタグから値を取得し、
    // 変数 answer に格納
    var answer = document.getElementById('answer').value;

    // 変数 answer が空の場合
    if (!answer) {
        alert('枠の中に答えを入力してください。');
        return; // 終了
    }

    if (answer == '7') { // 変数 answer が 7 の場合

    } else {             // それ以外の場合

    }

    // 終了
});