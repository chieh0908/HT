// common
$(function () {

  // nav
  $('nav').load('https://ids.iwplay.com.tw/common/ht/nav_251125.html', function() {

    // nav link
    $('.home').attr('href', text.home);

    // sub_menu click
    $('#game_data').click(function() {
      $('.sub_list').toggleClass('open');
    });

    // snslink
    $('.facebook').attr('href', text.facebook);
    $('.youtube').attr('href', text.youtube);
    $('.gamer').attr('href', text.gamer);
    $('.discord').attr('href', text.discord);

    // open_menu
    $('.open_menu').click(function () {
      $(this).toggleClass('close');
      $('.menu').toggleClass('open');
    });
    $('.menu ul li a').click(function () {
      $('.open_menu').removeClass('close');
      $('.menu').removeClass('open');
    });

    // music
    const musicBg = document.getElementById('bg_music');
    const btnMusic = $('.music');
    let isPlayMusic = false;
    let isMusicPaused = false;
    let isLityOpen = false;
    let isMusicInLity = false;
    let isPausedDueToVisibilityChange;
    let shouldPauseMusicOnCVClick = false;

    const startMusic = () => {
      musicBg.play();
      btnMusic.addClass('active');
      isPlayMusic = true;
      isMusicPaused = false;
      isMusicInLity = false;
    };
    const pauseMusic = () => {
      musicBg.pause();
      btnMusic.removeClass('active');
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

    document.addEventListener('visibilitychange', onVisibilityChange);
    $(document).on('lity:open', onLityOpen);
    $(document).on('lity:close', onLityClose);
    btnMusic.on('click', toggleMusic);

    $(".cv").click(function () {
      shouldPauseMusicOnCVClick = true;
      pauseMusic();
    });
    
    document.querySelectorAll('.voice').forEach(function(el) {
      el.addEventListener("ended", function() { 
        startMusic();
      }, true);
    })

    $('body').one('click', () => {
      if (!isPlayMusic && !shouldPauseMusicOnCVClick) {
        startMusic();
      }
    });
    if (navigator.userAgent.match(/Android|iPhone|iPad/i)) {
      $('body').on('click',function () {
        pauseMusic();
      });
    }

  });

  // gameinfo
  $('.gameinfo').load('https://ids.iwplay.com.tw/common/ht/gameinfo.html', function() {

    // app_store
    $('.google_play').attr('href', text.google_play);
    $('.app_store').attr('href', text.app_store);
    $('.windows').attr('href', text.windows);
    $('.apk').attr('href', text.apk);
    $('.appgallery').attr('href', text.appgallery);
    $('.playstation').attr('href', text.playstation);

  });

  // footer
  $('footer').load('https://ids.iwplay.com.tw/includ/footer/12b_hotta.html');
  
  //抓出路由
  const urlArray = document.location.href.split("/");

  //抓出位置
  const route = urlArray[urlArray.length - 1];

  const routeSplit = route.split("_");

  //如果陣列長度不等於2 代表切換到其他標籤
  if (routeSplit.length !== 2) {
    const latestnewsList = document.querySelectorAll(".latestnews_list > li");
    latestnewsList[0].classList.remove("active");

    for (const [index, li] of Object.entries(latestnewsList)) {
      if (index === "0") continue;
      let url = li.querySelector("a").getAttribute("href").split("/");
      let urlRoute = url[url.length - 1].split("_")[1];

      if (urlRoute === routeSplit[1]) {
        li.classList.add("active");
        break;
      }
    }
  }
});
