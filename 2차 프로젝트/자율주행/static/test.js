function uploadIMG(){
  let formData = new FormData();
  formData.append('A_NAME', $('input[name=A_NAME]').val());
  formData.append('file', $('input[name=file]')[0].files[0]);
  let validCSS = {
    'height' : '30px',
    'color' : 'green',
    'font-size' : '15px'
  }
  let invalidCSS = {
    'height' : '30px',
    'color' : 'red',
    'font-size' : '15px'
  }
  let check = true;
  if ($('input[name=A_NAME]').val() == ""){
    console.log('name == ""');
    $('.A_NAME.feedback').css(invalidCSS);
    $('.A_NAME.feedback').text('공간 이름을 입력해 주십시오.');
    check = false;
  }else{
    $('.A_NAME.feedback').css('height', "0");
    $('.A_NAME.feedback').text("");
  } 
  if ($('input[name=file]').val() == ""){
    console.log('file == ""');
    $('.A_SRC.feedback').css(invalidCSS);
    $('.A_SRC.feedback').text('설계도면 이미지 파일을 선택해 주십시오.');
    check = false;
  }else{
    $('.A_SRC.feedback').css('height', "0");
    $('.A_SRC.feedback').text("");
  }
  if (check){
    $.ajax({
        url : "/set/map/upload_result", 
        type : 'POST', 
        data : formData, 
        contentType: false,
        processData: false
    }).done((result)=>{
      if (result["result"]){
        $('.A_SRC.feedback').css(validCSS);
        $('.A_SRC.feedback').text(result["message"]);
        floatMap(result["map_src"]);
      }else{
        $('.A_SRC.feedback').css(invalidCSS);
        $('.A_SRC.feedback').text(result["message"]);
      }
    });
  }
};

function floatMap(map_src){
  console.log('map_src');
  var path = './static/upload/';
  var plan = function( x, y, z ) {
      y = -y - 1;
      var limit = Math.ceil( 3 / Math.pow( 2, z ) );

      if ( 0 <= y && y < limit && 0 <= x && x < limit ) {
          return path + map_src;
      } else {
          return 'https://i1.daumcdn.net/dmaps/apis/white.png';
      }
  };

  kakao.maps.Tileset.add( 'PLAN',
          new kakao.maps.Tileset(
              512, 512, plan, '', false, 0, 8 ) );

  var node = document.getElementById( 'map' );
  var map = new kakao.maps.Map( node, {
      projectionId: null,
      mapTypeId: kakao.maps.MapTypeId.PLAN,
      $scale: false,
      center: new kakao.maps.Coords( 650, -550 ),
      level: 4
  } );
  var center = map.getCenter();
  var marker = new kakao.maps.Marker({
      position: center
  });
  marker.setMap(map);

  var infowindow = new kakao.maps.InfoWindow({
      content: '커스텀 타일셋을 올릴수 있습니다!'
  });
  infowindow.open(map, marker);

}
