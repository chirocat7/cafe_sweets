'use strict';
/* ページロード時のフェードイン */
const element = document.getElementById("Fade-in");

window.addEventListener("load", function() {
  // ページロード完了後、CSSクラスを追加してフェードインを有効化
  element.classList.add("Fade-in-active");
});
// jQueryでDOMツリーの構築完了を待って処理を実行するための記述
$(() => {
    /* メインビジュアルのスライドイン（ホバーアニメーション） */
    const slideTarget = $('.Slidein.Slide_left');
    // ホバー時にクラスを追加
    slideTarget.on('mouseenter', function() {
        $(this).addClass('Slide_active');
    });
    // ホバー解除時にクラスを削除
    slideTarget.on('mouseleave', function() {
        $(this).removeClass('Slide_active');
    });

    /* スクロール時の画面内表示（inview）チェック関数 */
    const checkInView = (elements) => {
        const scroll = $(window).scrollTop();
        const windowHeight = $(window).height();

        elements.each(function() {
            const currentElement = $(this);
            // 既にアニメーションが適用済みの場合はスキップ
            if (currentElement.hasClass('Inview')) {
                return true;
            }
            //現在の要素のHTMLドキュメント上端からの絶対位置を取得
            const elementTop = currentElement.offset().top;
            const elementHeight = currentElement.outerHeight();
            // アニメーション開始の基準点 (ウィンドウ下端から150px上)
            const activationPoint = scroll + windowHeight - 150;

            // 要素が画面内（基準点）に入り、かつ要素全体が画面上端を通過していない場合、一度だけアニメーションが実行される
            //activationPoint > elementTop: アニメーションを開始する
            // scroll < elementTop + elementHeight: アニメーションを停止・再トリガーしない（要素が画面を通り過ぎて上に消えてしまうのを防ぐ）
            if (activationPoint > elementTop && scroll < elementTop + elementHeight) {
                currentElement.addClass('Inview');
            }
        });
    }

    const targets = $('#News, .Menu-item');
    // スクロール時と初回ロード時にinviewチェックを実行
    $(window).on('scroll', () => {
        checkInView(targets);
    });
    checkInView(targets);
});