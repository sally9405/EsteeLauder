//nav resize 시 웹에서 리사이즈할때  sub의 메뉴가 늦게 나타남
//visual 자동재생 시간차
//color 폰 회전시 회전전 클릭했던 이벤트가 사라지지않음

$(function () {
    var h = $(window).height();
    //resize
    var w = $(window).width();
    console.log(w);
    $(window).resize(function () {
        w = $(window).width();
        console.log(w);

        if (w > 1023) {
            navOver();
        } else {
            navClick();
        }
        $(".newItem").css("margin", "0 auto");

        bClick = 0;
        $(".bestItem").css("margin-left", 0);
        //        w>767 ||
        //         if (w > 767) { 
        if (w > 1023) {
            $(".sub").css("display", "none");
            navOver();
            $(".color>li").css("display", "block");
            basicW = ($(".colorWrap").outerWidth()) / 25;
            color.css("width", basicW + "px");
            smallW = ($(".colorWrap").outerWidth() - popW) / 24;

        } else {
            $(".nav, #nav").css("left", "-100%");
            $(".sub").css("height", "100%");
            $(".hamBtn").addClass("active");
            $("#nav>li").off();
            navClick();
            $(".color>li").css("display", "none");
            $(".pick").css("display", "block");
            basicW = ($(".colorWrap").outerWidth()) / 9;
            color.css("width", basicW + "px");
            smallW = ($(".colorWrap").outerWidth() - popW) / 8;


        }
    })

    //nav---------------------------nav-------------------------------
    var nNum;

    function navOver() {
        $("#nav>li").on({
            "mouseenter": function () {
                nNum = $(this).index();
                //nav의 1,2번째 li over하면 접기
                if (nNum == 0 || nNum == 1) return;
                $(".navBg").stop().slideDown(500);
                $(this).siblings().find(".sub").stop().slideUp(500);
                $(this).find(".sub").stop().slideDown(500);
            },
            "mouseleave": function () {
                $(this).find(".sub").stop().slideUp(500);
                $(".navBg").stop().slideUp(500);
            }
        })
    }

    function navClick() {
        $("#nav>li").click(function () {
            nNum = $(this).index();
            //nav의 1,2번째 li over하면 접기
            if (nNum == 0 || nNum == 1) return;
            $(this).siblings().children(".sub").stop().slideUp(500);
            $(this).children(".sub").stop().slideToggle(500);
        })
    }

    if (w > 767) {
        navOver();
    } else {
        navClick();
    }
    //hamBtn
    $(".hamBtn").click(function () {
        $(".arrowBtn").css("z-index", 0);
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".nav, #nav").stop().animate({
                "left": 0
            }, 500)
        } else {
            $(this).addClass("active");
            $(".nav, #nav").stop().animate({
                "left": "-100%"
            }, 500)
        }
    })
    //----------------------------------------------------------------


    //visual--------------------------visual--------------------------
    sNum = 0;
    var obj = $(".banner>li").clone();
    $(".banner").append(obj);

    //btn
    $(".btn>li").click(function (e) {
        e.preventDefault();
        sNum = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        moveBanner();
    })
    $(".v1")[0].pause();
    $(".v2")[0].pause();
    $(".v1")[0].currentTime = 0;
    $(".v2")[0].currentTime = 0;
    //arrowR
    $(".arrowBtnR").click(function (e) {
        e.preventDefault();
        if (sNum == 3) {
            sNum = 0;
            $(".btn>li").eq(0).addClass("active").siblings().removeClass("active");
            $(".banner").css("margin-left", 0);
        }

        sNum++;

        if (sNum == 1) {
            $(".v1")[0].play();
        } else {
            $(".v1")[0].pause();
            $(".v1")[0].currentTime = 0;
        }

        if (sNum == 2) {
            $(".v2")[0].play();
        } else {
            $(".v2")[0].pause();
            $(".v2")[0].currentTime = 0;
        }
        moveBanner();
    })

    $(".arrowBtnL").click(function (e) {
        e.preventDefault();
        if (sNum == 0) {
            sNum = 3;
            $(".banner").css("margin-left", -sNum * 100 + "%");
        }
        sNum--;

        if (sNum == 1) {
            $(".v1")[0].play();
        } else {
            $(".v1")[0].pause();
            $(".v1")[0].currentTime = 0;
        }

        if (sNum == 2) {
            $(".v2")[0].play();
        } else {
            $(".v2")[0].pause();
            $(".v2")[0].currentTime = 0;
        }
        moveBanner();
    })

    function moveBanner() {
        $(".banner").stop().animate({
            "margin-left": -sNum * 100 + "%"
        }, 500)

        if (sNum == 3) {
            $(".btn>li").eq(0).addClass("active").siblings().removeClass("active");
        }
        $(".btn>li").eq(sNum).addClass("active").siblings().removeClass("active");
    }

    //new------------------------------------------new----------------
    var nClick = 0;
    $(".nBtn>li").click(function (e) {
        e.preventDefault();
        nClick = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".newItem").stop().animate({
            "margin-left": -nClick * 100 + "%"
        }, 500)

    })


    //best-----------------------------------best---------------------
    var bClick = 0;
    var bObj = $(".bestItem>li").clone();
    var bestW;
    $(".bestItem").append(bObj);


    $(".bBtnR").click(function (e) {
        e.preventDefault();
        if (bClick == 6) {
            bClick = 0;
            $(".bestItem").css("margin-left", 0);
        }
        bClick++;
        moveBest();
    })

    $(".bBtnL").click(function (e) {
        e.preventDefault();
        bestW = $(window).width();
        if (bClick == 0) {
            bClick = 6;
            if (bestW > 1023) {
                $(".bestItem").css("margin-left", -bClick * 25 + "%");
            } else if (bestW > 500) {
                $(".bestItem").css("margin-left", -bClick * 50 + "%");
            } else {
                $(".bestItem").css("margin-left", -bClick * 100 + "%");
            }
        }
        bClick--;
        moveBest();
    })

    function moveBest() {
        bestW = $(window).width();
        if (bestW > 1023) {
            $(".bestItem").stop().animate({
                "margin-left": -bClick * 25 + "%"
            }, 500)
        } else if (bestW > 500) {
            $(".bestItem").stop().animate({
                "margin-left": -bClick * 50 + "%"
            }, 500)
        } else {
            $(".bestItem").stop().animate({
                "margin-left": -bClick * 100 + "%"
            }, 500)
        }
    }



    //video--------------------------------- color--------------------

    //    $(".play").click(function(e){
    //        e.preventDefault();
    //        $(".pVideo video")[0].play();
    //        $(this).css("display","none");
    //        $(".stop").css("display","block").addClass("active");
    //    })
    //    $(".stop").click(function(e){
    //         e.preventDefault();
    //        if($(".stop").hasClass("active")){
    //            $(".stop").removeClass("active");
    //            $(".pVideo video")[0].pause();
    //        }else{
    //            $(".pVideo video")[0].play();
    //         $(".stop").css("display","block").addClass("active");
    //        }
    //    })
    //    $(".play").click(function(e){
    //        e.preventDefault();
    //        $(".pVideo video")[0].play();
    //        $(this).css("display","none").siblings().css("display","block");
    //       
    //    })
    //
    //    $(".pVideo video").mouseenter(function(){
    //         $(".stop").css("display","block"); 
    //    })
    //      $(".pVideo").mouseleave(function(){
    //         $(".stop").css("display","none");
    //         
    //    })
    //    $(".stop").click(function(e){
    //        e.preventDefault();
    //        $(".pVideo video")[0].pause();
    //        $(this).css("display","none").siblings().css("display","block");
    //        console.log($(".pVideo video").get(0).paused);
    //    })
    //    
    //    console.log($(".pVideo video").get(0).paused);
    //    


    $(".pVideo").mouseenter(function () {
        $(".play").css("display", "block");
    })

    $(".pVideo").mouseleave(function () {
        if ($(".play").hasClass("active")) {
             console.log($(".play").hasClass("active"));
            $(".play").css("display", "none");
        } else {
            $(".play").css("display", "block");
        }
    })

    $(".play").click(function (e) {
        e.preventDefault();
        if ($(".play").hasClass("active")) {
           
            $(".pVideo video")[0].pause();
            $(".play").removeClass("active");
           
        } else {
            $(".pVideo video")[0].play();
            $(".play").addClass("active");
        }
    })



    //팝 너비값
    var popW = $(".cLayout").outerWidth();
    //기본 너비값
    var basicW = ($(".colorWrap").outerWidth()) / 25;
    //over했을때 줄어드는 너비값
    var smallW = ($(".colorWrap").outerWidth() - popW) / 24;
    //color의 li
    var color = $(".color>li");
    var c;

    function colorSize() {
        color.on({
            "mouseenter": function (e) {
                e.preventDefault();
                //li에 마우스가 올라가면 해당 li의 너비값을 200주고
                //형제 li는 너비값을 줄여준다.
                $(this).find("span").css("display", "none");
                $(this).siblings().stop().animate({
                    "width": smallW + "px"
                }, 500)
                $(this).stop().animate({
                    "width": popW + "px"
                }, 500)
                //li에 마우스가 올라가면 해당 li의 자식 cLayout을 보여주고
                //형제의 cLayout은 사라지게한다.
                color.find(".cLayout").stop().fadeOut(200);
                $(this).find(".cLayout").stop().fadeIn(300);

            },
            "mouseleave": function () {
                //li에서 마우스가 벗어나면 cLayout은 사라지고 해당 span은 보이게
                $(this).find("span").css("display", "block");
                color.find(".cLayout").stop().fadeOut(500);
                color.stop().animate({
                    "width": basicW + "px"
                }, 500)
            }
        })
    }

    w = $(window).width();
    //    if (w > 767) {
    if (w > 1024) {
        //웹사이즈가 되면 color의 li를 다 보이게
        $(".color>li").css("display", "block");
        colorSize();
    } else {
        //모바일로 되면 over 했을때 줄어드는 li width값을 다시 잡아주기
        basicW = ($(".colorWrap").outerWidth()) / 9;
        smallW = ($(".colorWrap").outerWidth() - popW) / 8;
        //pick을 제외한 li없애주기
        $(".color>li").css("display", "none");
        $(".pick").css("display", "block");
        colorSize();
    }

    //event------------------------- event -------------------------


    //insta----------------------------insta------------------------
    //1.버튼누르면 옆으로 넘어가게
    //2. 자동으로 넘어가게

    //버튼을 몇번 클릭했는지 체크
    var sClick = 0;

    // item 복사해서 뒤에 붙여주기
    var object = $(".instaItem>li").clone();
    $(".instaItem").append(object);

    function moveInsta() {
        //		$(".instaItem").stop().animate({
        //			"margin-left": -20 * sClick + "%"
        //		}, 500)
        //        console.log("?");
        var instaW = $(window).width();
        if (instaW > 1023) {
            instaW = $(window).width();
            $(".instaItem").stop().animate({
                "margin-left": -sClick * 20 + "%"
            }, 500)
        } else {
            $(".instaItem").stop().animate({
                "margin-left": -sClick * 25 + "%"
            }, 1000)
        }
    }

    $(".iBtnR").on("click", function (e) {
        e.preventDefault();
        //오른쪽 버튼을 누르다가 sClick이 10이 되었을때(복사된 첫번째 이미지가 처음시작자리에 갔을때)
        //sClick은 0으로 만들어주고 ul인 instaItem은 원래 이미지로 가도록 margin-left=0을 준다
        if (sClick == 10) {
            sClick = 0;
            $(".instaItem").css("margin-left", 0 + "%");
        }
        sClick++;
        moveInsta();
    })

    $(".iBtnL").on("click", function (e) {
        e.preventDefault();
        //sClick이 0인 상태에서 왼쪽 버튼을 누르면 sClick을 10으로 만들고 .instarItem은 -200%를줘서
        //이미지의 맨마지막으로 끝 가도록  -200%(복사된 첫번째이미지가 처음으로 보이는자리)를 준다
        //-->그다음 sClick이 실행되고 moveItem이 실행되므로 margin-left: 200% 만큼 이동한다
        if (sClick == 0) {
            sClick = 10;
            $(".instaItem").css("margin-left", -200 + "%");
        }
        sClick--;
        moveInsta();
    })
    //    자동으로 움직이게 
    var timer = setInterval(function () {
        $(".iBtnR").trigger("click");
    }, 1500)
    $(".instaItem>li").mouseover(function () {
        clearInterval(timer);
    })
    $(".instaItem>li").mouseout(function () {
        timer = setInterval(function () {
            $(".iBtnR").trigger("click");
        }, 1500)
    })

    //quick
    var qtop = $("#container").offset().top;
    $(window).scroll(function () {
        var sTop = $(this).scrollTop();
        if (sTop > 600) {
            $(".top").css("display", "block");
        } else {
            $(".top").css("display", "none");
        }
    })
})
