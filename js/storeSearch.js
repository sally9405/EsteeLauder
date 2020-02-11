$(function () {

	//city>li 몇번째 클릭인가?
	var cIndex = 0;
	//town>li 몇번번째 클릭인가?
	var tIndex = 0;
	townClick(cIndex);

	// 시/도를 클릭하면 서울시, 경기가 보이게
	//	$(".citySearch>.sTitle").on("click", function () {
	//		$(this).next().css("display", "block");
	//	})
	// 서울,경기를 클릭하면 그 칸에 클릭한 요소가 나타나게
	$(".citySearch").click(function () {
		$(".city").css("display", "block");
	})

	$(".city>li").on("click", function () {
		cIndex = $(this).index();
		$(".townSearch>ul").css("display", "none");
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(".city>li").css("display", "block");
			$(".sTitle").css("display", "block");
//			$(".citySearch>.sTitle").css("display", "block");
		} else {
			$(this).addClass("active");
			$(this).css("display", "block").siblings().css("display", "none");
			$(".citySearch>.sTitle").css("display", "none");
		}
		townClick(cIndex);
	})


//	function townClick(cIndex) {
//		$(".townSearch").on("click", function () {
//			$(".townSearch>ul").eq(cIndex).css("display", "block").siblings("ul").css("display", "none");
//		});
//		$(".town>li").on("click", function () {
////
//			tIndex = $(this).index();
//			if ($(this).hasClass("active")) {
//				$(".townSearch>.sTitle").css("display", "block");
//				$(".town>li").css("display", "block");
//				$(this).removeClass("active");
//			} else {
//				$(this).addClass("active");
//				$(this).css("display", "block").siblings().css("display", "none");
//				$(".townSearch>.sTitle").css("display", "none");
//			}
//
//			$(".place").eq(tIndex).css("display", "block");
//			mapP();
//
//		})
//
//	}
    	function townClick(cIndex) {
		$(".townSearch").on("click", function () {
			$(".townSearch>ul").eq(cIndex).css("display", "block").siblings("ul").css("display", "none");
		});
		$(".town>li").on("click", function () {

			tIndex = $(this).index();
			if ($(this).hasClass("active")) {
				$(".town>li").css("display", "block");
				$(this).removeClass("active");
			} else {
				$(this).addClass("active");
                $(".townSearch>.sTitle").css("display", "none");
				$(this).css("display", "block").siblings().css("display", "none");
            }
			$(".place").eq(cIndex).css("display", "block").siblings("ul").css("display","none");
			mapP();

		})

	}
//	var mapX = Array(37.517235, 37.517139, 37.516420);
//	var mapY = Array(126.903220, 126.905639, 126.907557);
    var mapX = [[37.517235, 37.517139, 37.516420],[37.504549,37.502747]];
	var mapY = [[126.903220, 126.905639, 126.907557],[126.761998,126.775390]];
	var i = 0;
	mapP();

	function mapP() {
		console.log(tIndex);
		var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
			mapOption = {
				center: new kakao.maps.LatLng(mapX[cIndex][tIndex], mapY[cIndex][tIndex]), // 지도의 중심좌표
				level: 3 // 지도의 확대 레벨
			};

		var map = new kakao.maps.Map(mapContainer, mapOption);

		// 마커가 표시될 위치입니다 
		var markerPosition = new kakao.maps.LatLng(mapX[cIndex][tIndex], mapY[cIndex][tIndex]);

		// 마커를 생성합니다
		var marker = new kakao.maps.Marker({
			position: markerPosition
		});

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);

		var content = [[,,],[,]];
		content[0][0] = "<div style='padding:5px; text-align: center;'>시코르 타임스퀘어점<br>서울특별시 영등포구 영중로15,<br>타임스퀘어 3층영등포구, 서울 07305 <br>02-2638-2362<br>";
		content[0][1] = "<div style='padding:5px; text-align: center;'>신세계백화점 영등포점<br> 서울특별시 영등포구 영중로 9 <br>(영등포동4가) 영등포구, 서울 07305<br> 02-2639-4125/4124,4169";
		content[0][2] = "<div style='padding:5px; text-align: center;'>롯데백화점 영등포점<br> 서울특별시 영등포구 경인로 <br>846 (영등포동, 영등포민자역사) 영등포구, 서울 07306 <br>2164-5032/3";
		content[1][0] = "<div style='padding:5px; text-align: center;'>현대백화점 중동점<br> 경기도 부천시 원미구 길주로 180 (중동) <br>부천시, 경기 14546,<br>032-623-2139, 623-3503";
		content[1][1] = "<div style='padding:5px; text-align: center;'>롯데스퀘어 중동점<br> 경기도 부천시 원미구 길주로 300 (중동)<br>부천시, 경기 14548<br>032-320-7180/1";

		var iwContent = content[cIndex][tIndex], // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
			iwPosition = new kakao.maps.LatLng(mapX[cIndex][tIndex], mapY[cIndex][tIndex]); //인포윈도우 표시 위치입니다

		// 인포윈도우를 생성합니다
		var infowindow = new kakao.maps.InfoWindow({
			position: iwPosition,
			content: iwContent
		});

		// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
		infowindow.open(map, marker);
	}
	// 아래 코드는 인포윈도우를 지도에서 제거합니다
	// infowindow.close(); 


	$(".place>li").click(function () {
		tIndex = $(this).index();
		mapP();
		$(".place>li").find(".pickImg").removeClass("active");
		$(this).find(".pickImg").addClass("active");
	})

})
