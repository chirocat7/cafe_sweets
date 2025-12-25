//アニメーションの装飾については_c-animation.scssに設定
'use strict';

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

    // --- 3.スクロール時の画面内表示（inview）チェック関数 ---
    const checkInView = (elements) => {
        const scroll = $(window).scrollTop();
        const windowHeight = $(window).height();

        elements.each(function() {
            const currentElement = $(this);
            if (currentElement.hasClass('Inview')) {
                return true;
            }
            //現在の要素のHTMLドキュメント上端からの絶対位置を取得
            const elementTop = currentElement.offset().top;
            const elementHeight = currentElement.outerHeight();
            // アニメーション開始の基準点 (ウィンドウ下端から150px上)
            const activationPoint = scroll + windowHeight - 150;

            if (activationPoint > elementTop && scroll < elementTop + elementHeight) {
                currentElement.addClass('Inview');
                console.log('スクロールのアニメーション実行')
            }
        });
    }


    const targets = $('.p-news__item, .p-menu__item');
    // スクロール時と初回ロード時にinviewチェックを実行
    $(window).on('scroll', () => {
        checkInView(targets);
        console.log('inviewチェック中')
    });
    checkInView(targets);