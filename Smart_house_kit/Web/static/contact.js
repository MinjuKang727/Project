var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
 mapOption = { 
                center: new kakao.maps.LatLng(35.14660236044263, 126.92220581491345), // 지도의 중심좌표
                level: 4 // 지도의 확대 레벨
            };

var map = new kakao.maps.Map(mapContainer, mapOption);

var imageSrc = '/static/img/gjaischool.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(35.14660236044263, 126.92220581491345); // 마커가 표시될 위치입니다

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
position: markerPosition,
image: markerImage // 마커이미지 설정 
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);  
// 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
// var content = '<div class="customoverlay">' +
//     '  <a href="https://map.kakao.com/?q=%EA%B4%91%EC%A3%BC%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5%EC%82%AC%EA%B4%80%ED%95%99%EA%B5%90" target="_blank">' +
//     '    <span class="title">광주인공지능사관학교</span>' +
//     '  </a>' +
//     '</div>';

// // 커스텀 오버레이가 표시될 위치입니다 
// var position = new kakao.maps.LatLng(35.14660236044263, 126.92220581491345);  

// // 커스텀 오버레이를 생성합니다
// var customOverlay = new kakao.maps.CustomOverlay({
//     map: map,
//     position: position,
//     content: content,
//     yAnchor: 1 
// }); 