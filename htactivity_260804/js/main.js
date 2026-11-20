$(function () {

    $(window).on('load', function () {
        $('#enter_code_modal').modal('show'); //bs彈窗出現
    });

    $(".join_btn").click(function () {
        $('#enter_code_modal').modal('hide');
    });




    // 定义一个变量来保存当前背景图的索引，默认为0，表示第一张背景图
    var backgroundIndex = 0;

    $(".select_box .nav_tab").click(function () {
        var list = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".view_box .tab_content").eq(list).addClass("active").siblings().removeClass("active");



        // 根据当前选择的 .nav_tab 切换对应的 game_rule
        if (list === 0) {
            $(".game_rule").show();
            $(".mono_rule").hide();
            $(".bg01").show();
            $(".bg02").hide();
            $(".title").css("opacity", "1");
        } else if (list === 1) {
            $(".game_rule").hide();
            $(".mono_rule").show();
            $(".bg01").hide();
            $(".bg02").show();
            $(".title").css("opacity", "0");
        }
    });


    // 在页面加载完成时检查初始状态并切换 game_rule
    $(document).ready(function () {
        if ($(".select_box .nav_tab.active").index() === 0) {
            $(".game_rule").show();
            $(".mono_rule").hide();
            $(".bg01").show();
            $(".bg02").hide();
            $(".title").css("opacity", "1");
        } else {
            $(".game_rule").hide();
            $(".mono_rule").show();
            $(".bg01").hide();
            $(".bg02").show();
            $(".title").css("opacity", "0");
        }
    });










    //輸入邀請碼
    var verificationCode = [];

    // 當驗證碼輸入框中的文本框被鍵入時觸發
    $(".verification-code input[type=text]").keyup(function (e) {

        // 獲取隱藏字段的輸入值
        $(".verification-code input[type=text]").each(function (i) {
            verificationCode[i] = $(".verification-code input[type=text]")[i].value;
            $('#verificationCode').val(Number(verificationCode.join('')));
        });

        if ($(this).val() > 0) {
            // 如果輸入的是數字鍵，則將焦點轉移到下一個輸入框
            if (event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4 || event.key == 5 || event.key == 6 || event.key == 7 || event.key == 8 || event.key == 9 || event.key == 0) {
                $(this).next().focus();
            }
        } else {
            // 如果按下了Backspace鍵，則將焦點轉移到上一個輸入框
            if (event.key == 'Backspace') {
                $(this).prev().focus();
            }
        }

    }); // keyup


    /*
        // 當有粘貼操作發生時
        $('.verification-code input').on("paste", function (event, pastedValue) {
            // 將粘貼的內容放入指定的文本框中
            $('#txt').val($content);
        });

        // 當進行粘貼或按鍵操作時
        $editor.on('paste, keydown', function () {
            var $self = $(this);
            // 延遲執行，以確保獲取到粘貼的內容
            setTimeout(function () {
                var $content = $self.html();
                $clipboard.val($content);
            }, 100);
        });
        */



//數字貼上
    var verificationCode = [];

    // 監聽每個輸入框的輸入事件，限制只能輸入數字
    $(".verification-code input[type=text]").on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, ''); // 只允許數字

        // 更新驗證碼輸入值
        $(".verification-code input[type=text]").each(function (i) {
            verificationCode[i] = this.value;
        });

        // 更新隱藏字段
        var code = verificationCode.join('');
        $('#verificationCode').val(code);
    });

    // 監聽每個輸入框的 keyup 事件，處理刪除功能
    $(".verification-code input[type=text]").keyup(function (e) {
        if (e.key === 'Backspace' && $(this).val() === '') {
            $(this).prev('input[type=text]').focus();
        }
    });

    // 監聽 paste 事件，實現自動填充
    $(".verification-code").on('paste', function (e) {
        e.preventDefault(); // 防止默認的粘貼行為
        var pasteData = (e.originalEvent || e).clipboardData.getData('text'); // 獲取剪貼板數據
        pasteData = pasteData.replace(/[^0-9]/g, ''); // 去除非數字字符

        // 遍歷每個輸入框並依次填入數字
        $(".verification-code input[type=text]").each(function (i) {
            if (pasteData[i]) {
                $(this).val(pasteData[i]);
                verificationCode[i] = pasteData[i];
            } else {
                $(this).val('');
                verificationCode[i] = '';
            }
        });

        // 更新隱藏字段
        $('#verificationCode').val(verificationCode.join(''));
    });




});