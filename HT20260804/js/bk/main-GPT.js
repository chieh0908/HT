//透過GPT優化程式
// 20240916說明：
// 事件處理器整合：我將 $(document).ready() 和 $(window).on("load") 的事件處理器進行了整合，避免過多重複的事件綁定。
// 條件過濾的簡化：加載 banner 時候的條件過濾邏輯簡化，減少冗長的條件判斷。
// DOM 加載順序：保證一些依賴外部資源加載的功能（如 Facebook 插件、footer）等在正確的 DOM ready 時機下執行。

// common
$(function () {
  // Vue 初始化
  const App = {
    data() {
      return { text };
    },
  };
  Vue.createApp(App).mount("#app");

  // Nav Link 設置
  $(".home").attr("href", text.home);

  // Sub Menu 點擊事件
  $("#game_data").on("click", function () {
    $(".sub_list").toggleClass("open");
  });

  // 平滑滾動到 features 區域
  $(".sub_list li:nth-child(3) a").on("click", function () {
    $("html, body").animate(
      { scrollTop: $("#features").offset().top - 60 },
      500
    );
  });

  // 加載 gameinfo 並設置 app store 連結
  $(".gameinfo").load(
    "https://ids.iwplay.com.tw/common/ht/gameinfo.html",
    function () {
      $(".google_play").attr("href", text.google_play);
      $(".app_store").attr("href", text.app_store);
      $(".windows").attr("href", text.windows);
      $(".apk").attr("href", text.apk);
      $(".appgallery").attr("href", text.appgallery);
      $(".playstation").attr("href", text.playstation);
    }
  );

  // 加載 footer
  $("footer").load("https://ids.iwplay.com.tw/includ/footer/12b_hotta.html");

  // SNS Links 設置
  $(".facebook").attr("href", text.facebook);
  $(".youtube").attr("href", text.youtube);
  $(".gamer").attr("href", text.gamer);
  $(".discord").attr("href", text.discord);

  // Menu 開關
  $(".open_menu").on("click", function () {
    $(this).toggleClass("close");
    $(".menu").toggleClass("open");
  });

  $(".menu ul li a").on("click", function () {
    $(".open_menu").removeClass("close");
    $(".menu").removeClass("open");
  });

  // Facebook 插件自適應
  function resizeFBPlugin() {
    let container_width =
      $(".fb_frame").width() - parseInt($(".fb_frame").css("padding-left"));
    container_width = Math.min(container_width, 450);
    $("#fb_main")
      .attr(
        "src",
        `https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/iwplay.ht&tabs=timeline&width=${container_width}&height=540&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`
      )
      .attr("width", container_width);
  }

  $(window).on("resize load", function () {
    setTimeout(resizeFBPlugin, 500);
  });

  // 音樂播放控制
  const musicBg = document.getElementById("bg_music");
  const btnMusic = $(".music");
  let isPlayMusic = false;
  let isMusicPaused = false;
  let isLityOpen = false;
  let isMusicInLity = false;
  let isPausedDueToVisibilityChange = false;

  function startMusic() {
    musicBg.play();
    btnMusic.addClass("active");
    isPlayMusic = true;
    isMusicPaused = false;
  }

  function pauseMusic() {
    musicBg.pause();
    btnMusic.removeClass("active");
    isPlayMusic = false;
    isMusicPaused = true;
  }

  function toggleMusic() {
    isPlayMusic ? pauseMusic() : startMusic();
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      isPausedDueToVisibilityChange = musicBg.paused;
      pauseMusic();
    } else if (!isPausedDueToVisibilityChange) {
      startMusic();
    }
  });

  $(document).on("lity:open", function () {
    if (isPlayMusic) pauseMusic();
  });

  $(document).on("lity:close", function () {
    if (isMusicInLity) startMusic();
  });

  btnMusic.on("click", toggleMusic);

  $("body").one("click", function () {
    if (!isPlayMusic) startMusic();
  });

  // 廣告橫幅
  const now = new Date();
  function filterBanner(selector) {
    $(selector).load(
      `https://www.hotta.com.tw/CmsBanner/${selector.replace("#", "")}.html`,
      function () {
        $(selector + " .carousel-inner div").each(function (i) {
          const onTime = new Date($(this).attr("on"));
          const offTime = new Date($(this).attr("off"));
          if (now < onTime || now > offTime) {
            if ($(this).hasClass("active")) {
              $(this).next().addClass("active");
            }
            $(this).remove();
          }
        });
      }
    );
  }

  filterBanner("#ubanner_A .banner");
  filterBanner("#ubannerM_A .banner");

  // News 設置
  $(".news_list li").on("click", function () {
    const listIndex = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".news_list_item")
      .eq(listIndex)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });

  // 加載 News 頁面
  $("#latest").load("https://www.hotta.com.tw/news/indexS.html");
  $("#news_info").load("https://www.hotta.com.tw/news/indexS_1.html");
  $("#event").load("https://www.hotta.com.tw/news/indexS_3.html");
  $("#system").load("https://www.hotta.com.tw/news/indexS_2.html");

  // Portrait 和聲音控制
  $(".role_list li").on("click", function () {
    const listIndex = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".role")
      .eq(listIndex)
      .addClass("active")
      .siblings()
      .removeClass("active");
    $(".voice").each(function () {
      $(this)[0].pause();
      $(this)[0].currentTime = 0.0;
    });
  });

  $(".cv").on("click", function () {
    $(this).find(".voice")[0].play();
  });

  // Swiper for Features
  const swiperOptions = {
    effect: "coverflow",
    loopedSlides: 5,
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: Math.floor($(window).width() * 0.28),
      depth: 150,
      modifier: 1,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".feature_next",
      prevEl: ".feature_prev",
    },
    pagination: {
      el: ".feature_pagination",
      clickable: true,
    },
    breakpoints: {
      992: {
        allowTouchMove: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
        },
      },
    },
  };

  const feature = new Swiper(".feature", swiperOptions);

  // Parallax Effects
  const parallaxOptions = { scalarY: 0 };
  new Parallax(document.getElementById("scene"), parallaxOptions);
  new Parallax(document.getElementById("scene_header"), parallaxOptions);
});
