//console.log("JSが動いています！"); // 自分のためのメモ
//alert("JSが読み込まれました！");   // 画面にポップアップを出す

'use strict';
/* ページロード時のフェードイン */
$(() => {
    // --- 1. ページロード時のフェードイン（安全な書き方） ---
    const $fadeInElement = $(".c-fade-in"); // jQueryで要素を取得
    
    // 要素が1つ以上存在するかチェック
    if ($fadeInElement.length > 0) {
        $(window).on('load', function() {
            $fadeInElement.addClass("c-fade-in-active");
        });
    }

    // --- 2. ホバーアニメーション ---
    $('.p-mv').on({
        'mouseenter': function() {
            $(this).find('.c-slide-left').addClass('is-active');
        },
        'mouseleave': function() {
            $(this).find('.c-slide-left').removeClass('is-active');
        }
    });
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
                console.log('スクロールのアニメーション実行')
            }
        });
    }

    const targets = $('#News, .p-menu__item');
    // スクロール時と初回ロード時にinviewチェックを実行
    $(window).on('scroll', () => {
        checkInView(targets);
        console.log('inviewチェック中')
    });
    checkInView(targets);