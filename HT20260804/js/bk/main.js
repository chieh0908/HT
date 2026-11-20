// common
$(function () {
  //Vue
  const App = {
    data() {
      return { text };
    },
  };
  Vue.createApp(App).mount("#app");

  // nav
  //$('nav').load('https://ids.iwplay.com.tw/common/ht/nav.html', function() {

  // nav link
  $(".home").attr("href", text.home);

  // sub_menu click
  $("#game_data").click(function () {
    $(".sub_list").toggleClass("open");
  });

  // features
  $(".sub_list li:nth-child(3) a").click(function () {
    $("html,body").animate(
      {
        scrollTop: $("#features").offset().top - 60,
      },
      500
    );
  });

  // gameinfo
  $(".gameinfo").load(
    "https://ids.iwplay.com.tw/common/ht/gameinfo.html",
    function () {
      // app_store
      $(".google_play").attr("href", text.google_play);
      $(".app_store").attr("href", text.app_store);
      $(".windows").attr("href", text.windows);
      $(".apk").attr("href", text.apk);
      $(".appgallery").attr("href", text.appgallery);
      $(".playstation").attr("href", text.playstation);
    }
  );

  // footer
  $("footer").load("https://ids.iwplay.com.tw/includ/footer/12b_hotta.html");

  // snslink
  $(".facebook").attr("href", text.facebook);
  $(".youtube").attr("href", text.youtube);
  $(".gamer").attr("href", text.gamer);
  $(".discord").attr("href", text.discord);

  // open_menu
  $(".open_menu").click(function () {
    $(this).toggleClass("close");
    $(".menu").toggleClass("open");
  });
  $(".menu ul li a").click(function () {
    $(".open_menu").removeClass("close");
    $(".menu").removeClass("open");
  });

  // facebook
  $(document).ready(function ($) {
    function resizeFBPlugin() {
      var container_width = (
        Number($(".fb_frame").width()) -
        Number($(".fb_frame").css("padding-left").replace("px", ""))
      ).toFixed(0);
      if (container_width > 450) container_width = 450;
      document.getElementById("fb_main").src =
        "https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/iwplay.ht&tabs=timeline&width=" +
        container_width +
        "&height=540&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId";
      document.getElementById("fb_main").width = container_width;
    }
    $(window).on("resize", function () {
      setTimeout(function () {
        resizeFBPlugin();
      }, 500);
    });
    $(window).on("load", function () {
      setTimeout(function () {
        resizeFBPlugin();
      }, 1500);
    });
    resizeFBPlugin();
  });

  // music
  const musicBg = document.getElementById("bg_music");
  const btnMusic = $(".music");
  let isPlayMusic = false;
  let isMusicPaused = false;
  let isLityOpen = false;
  let isMusicInLity = false;
  let isPausedDueToVisibilityChange;

  const startMusic = () => {
    musicBg.play();
    btnMusic.addClass("active");
    isPlayMusic = true;
    isMusicPaused = false;
    isMusicInLity = false;
  };
  const pauseMusic = () => {
    musicBg.pause();
    btnMusic.removeClass("active");
    isPlayMusic = false;
    isMusicPaused = true;
    isMusicInLity = false;
  };
  const toggleMusic = () => {
    isPlayMusic ? pauseMusic() : startMusic();
  };

  const onVisibilityChange = () => {
    const isHidden = document.hidden;
    if (isHidden) {
      isPausedDueToVisibilityChange = musicBg.paused;
      pauseMusic();
    } else {
      if (!isPausedDueToVisibilityChange) {
        startMusic();
      }
    }
  };

  const onLityOpen = () => {
    isLityOpen = true;
    if (isPlayMusic) {
      pauseMusic();
      isMusicInLity = true;
    }
  };
  const onLityClose = () => {
    isLityOpen = false;
    if (isMusicInLity) {
      startMusic();
      isMusicInLity = false;
    } else if (isPausedDueToVisibilityChange) {
      pauseMusic();
      isPausedDueToVisibilityChange = false;
    }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  $(document).on("lity:open", onLityOpen);
  $(document).on("lity:close", onLityClose);
  btnMusic.on("click", toggleMusic);

  $("body").one("click", (e) => {
    if (!isPlayMusic) {
      startMusic();
    }
  });
  $(".btn_video, .cv").click(function () {
    musicBg.pause();
    $(".music").removeClass("active");
    isPlayMusic = false;
  });
  if (navigator.userAgent.match(/Android|iPhone|iPad/i)) {
    $("body").on("click", function () {
      pauseMusic();
    });
  }
  document.querySelectorAll(".voice").forEach(function (el) {
    el.addEventListener(
      "ended",
      function () {
        musicBg.play();
        $(".music").addClass("active");
        isPlayMusic = true;
      },
      true
    );
  });
  //});

  // ads_banner
  const now = new Date();
  // pc
  $("#ubanner_A .banner").load(
    "https://www.hotta.com.tw/CmsBanner/ubanner_A.html",
    function () {
      let innerList = document.querySelectorAll(
        `#ubanner_A > div > .carousel-inner > div`
      );
      let indicatorsList = document.querySelectorAll(
        `#ubanner_A > div > .carousel-indicators > li`
      );
      for (let i = 0; i < innerList.length; i++) {
        let onTime = new Date(innerList[i].getAttribute("on"));
        let offTime = new Date(innerList[i].getAttribute("off"));
        if (now < onTime || now > offTime) {
          if (innerList[i].classList.contains("active")) {
            innerList[i + 1].classList.add("active");
            indicatorsList[i + 1].classList.add("active");
          }
          innerList[i].remove();
          indicatorsList[i].remove();
        }
      }
    }
  );

  // mobile
  $("#ubannerM_A .banner").load(
    "https://www.hotta.com.tw/CmsBanner/ubannerM_A.html",
    function () {
      let mobileInnerList = document.querySelectorAll(
        `#ubannerM_A > div > .carousel-inner > div`
      );
      let mobileIndicatorsList = document.querySelectorAll(
        `#ubannerM_A > div > .carousel-indicators > li`
      );
      for (let i = 0; i < mobileInnerList.length; i++) {
        let onTime = new Date(mobileInnerList[i].getAttribute("on"));
        let offTime = new Date(mobileInnerList[i].getAttribute("off"));
        if (now < onTime || now > offTime) {
          if (mobileInnerList[i].classList.contains("active")) {
            mobileInnerList[i + 1].classList.add("active");
            mobileIndicatorsList[i + 1].classList.add("active");
          }
          mobileInnerList[i].remove();
          mobileIndicatorsList[i].remove();
        }
      }
    }
  );

  // news
  $(".news_list li").click(function () {
    var list = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".news_list_item")
      .eq(list)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
  $("#latest").load("https://www.hotta.com.tw/news/indexS.html");
  $("#news_info").load("https://www.hotta.com.tw/news/indexS_1.html");
  $("#event").load("https://www.hotta.com.tw/news/indexS_3.html");
  $("#system").load("https://www.hotta.com.tw/news/indexS_2.html");

  // portrait
  $(".role_list li").click(function () {
    var list = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".role").eq(list).addClass("active").siblings().removeClass("active");
    $(".voice")
      .not(this)
      .each(function () {
        $(this)[0].pause();
        $(this)[0].currentTime = 0.0;
      });
  });

  // voice
  $(".cv").click(function () {
    $(".voice")
      .not(this)
      .each(function () {
        $(this)[0].pause();
        $(this)[0].currentTime = 0.0;
      });
    $(this).find(".voice")[0].play();
  });

  // features
  var wid = $(window).width();
  var feature = new Swiper(".feature", {
    effect: "coverflow",
    loopedSlides: 5,
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    allowTouchMove: false,
    coverflowEffect: {
      rotate: 0,
      stretch: Math.floor(wid * 0.28),
      depth: 150,
      modifier: 1,
      slideShadows: false,
    },
    /*autoplay: {
      disableOnInteraction: false,
    },*/
    breakpoints: {
      992: {
        allowTouchMove: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 1,
          slideShadows: false,
        },
      },
    },

    // navigation arrows
    navigation: {
      nextEl: ".feature_next",
      prevEl: ".feature_prev",
    },

    // pagination
    pagination: {
      el: ".feature_pagination",
      clickable: "true",
    },
  });

  // parallax.js
  var scene = document.getElementById("scene");
  var scene_header = document.getElementById("scene_header");
  var parallax = new Parallax(scene, {
    scalarY: 0,
  });
  var parallax = new Parallax(scene_header, {
    scalarY: 0,
  });

  /* // 彈窗
  $(document).ready(function () {
    lity("#pop-up-ads").open();
  });
  $(document).on("lity:close", function () {
    $("#pop-up-ads").remove();
  }); */
});
