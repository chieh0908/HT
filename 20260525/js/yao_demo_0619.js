$(function () {



/*登入切換*/
    // $('.events_2 .log_befor .button_2_1').click(function () {
    //     $(".events_2 .log_befor").addClass("display_none");
    //     $(".events_2 .log_after").removeClass("display_none");
    // });

    /*登出切換*/
    // $('.events_2 .log_after .button_2_2').click(function () {
    //     $(".events_2 .log_after").addClass("display_none");
    //     $(".events_2 .log_befor").removeClass("display_none");
    // });

$('#popup_01_btn').click(function () {
        $(".ht_acct .log_befor").addClass("display_none");
        $(".ht_acct .log_after").removeClass("display_none");
        $(".dc_acct .log_befor .button_2_0").addClass("display_none");
        $(".dc_acct .log_befor .button_2_1").removeClass("display_none");
});

$('.button_2_1').click(function () {
        $(".dc_acct .log_befor").addClass("display_none");
        $(".dc_acct .log_after").removeClass("display_none");
});


});