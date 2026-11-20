$(document).ready(function () {
  var isMarqueeRunning = false;

  // 跑馬燈抽獎初始抽數
  var currentCount = 10;

  // 網頁載入時，把 JS 控制的次數塞進 HTML
  $(".draw_count_info .count_num").text(currentCount);

  // 對應獎品名稱，用於彈窗顯示 (0~8)
  var allItems = [
    { name: "6000墨晶" },
    { name: "1000墨晶" },
    { name: "赤核-格爾菲茵x10" },
    { name: "特種憑證-格爾菲茵x10" },
    { name: "金核x5" },
    { name: "檢索憑證x5" },
    { name: "超荷裝備自選箱x1" },
    { name: "50墨晶" },
    { name: "10墨晶" },
  ];

  /**
   * 取得 reward_item 順時針繞圈的順序索引
   * 上排 (0~4): [0] [1] [2] [3] [4]
   * 下排 (5~8):   [5] [6] [7] [8]
   * 順時針繞行順序: 0 -> 1 -> 2 -> 3 -> 4 -> 8 -> 7 -> 6 -> 5 -> (回到0)
   */
  function getClockwiseOrder() {
    return [0, 1, 2, 3, 4, 8, 7, 6, 5];
  }

  function runMarqueeAnimation(targetIndex, onComplete) {
    if (isMarqueeRunning) return;
    isMarqueeRunning = true;

    var $items = $(".mary_rewards_list .reward_item");
    var order = getClockwiseOrder();
    var totalItems = order.length; // 9

    // 找出 targetIndex 在 order 陣列中的位置
    var targetPosInOrder = order.indexOf(targetIndex);

    // 跑燈設定：跑滿 2 圈再到目標位置
    var totalLoops = 2;
    var totalSteps = totalLoops * totalItems + targetPosInOrder;
    var step = 0;

    // 速度控制：先快後慢（easeOut 效果）
    function getDelay(currentStep, maxSteps) {
      var progress = currentStep / maxSteps;
      if (progress < 0.6) {
        return 60;
      } else {
        var slowProgress = (progress - 0.6) / 0.4;
        return 60 + slowProgress * slowProgress * 250;
      }
    }

    function lightUp() {
      // 清除所有高亮狀態
      $items.removeClass("active");

      if (step > totalSteps) {
        // 跑完後，將目標停留並執行完成回呼
        $items.eq(targetIndex).addClass("active");
        isMarqueeRunning = false;
        if (onComplete) onComplete();
        return;
      }

      // 當前高亮哪一格
      var currentIndex = order[step % totalItems];
      $items.eq(currentIndex).addClass("active");

      step++;
      var delay = getDelay(step, totalSteps);
      setTimeout(lightUp, delay);
    }

    lightUp();
  }

  // 抽取按鈕點擊事件
  $(document).on("click", ".btn_draw_mary", function (e) {
    e.preventDefault();
    if (isMarqueeRunning) return; // 防止重複點擊

    // 取得當前剩餘抽數
    var $countSpan = $(".draw_count_info .count_num");
    var currentCount = parseInt($countSpan.text(), 10);

    // 判斷次數是否大於 0
    if (isNaN(currentCount) || currentCount <= 0) {
      // 顯示次數已用光彈窗
      var $pop = $("#mono_pop_modal");
      $pop.find(".get").addClass("display_none");
      $pop.find(".headbg").addClass("display_none");
      $pop.find(".useup").removeClass("display_none");
      $pop.modal("show");
      return;
    }

    // 扣除次數
    $countSpan.text(currentCount - 1);

    // 模擬隨機抽到一個道具 (0~8)
    var winnerIndex = Math.floor(Math.random() * 9);

    runMarqueeAnimation(winnerIndex, function () {
      // 動態更新獲獎彈窗內容
      var randomItem = allItems[winnerIndex];
      var $pop = $("#mono_pop_modal");

      // 更新文字
      $pop.find(".get .bodycontent").text(randomItem.name);

      // 確保顯示獲得畫面 (隱藏次數用光畫面，並顯示頭部裝飾)
      $pop.find(".get").removeClass("display_none");
      $pop.find(".headbg").removeClass("display_none");
      $pop.find(".useup").addClass("display_none");

      // 顯示彈窗
      $pop.modal("show");
    });
  });
});
