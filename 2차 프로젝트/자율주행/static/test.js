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
    $('img').attr('src', "");
    $('.A_SRC.feedback').css(invalidCSS);
    $('.A_SRC.feedback').text('설계도면 이미지 파일을 선택해 주십시오.');
    check = false;
  }else{
    $('.A_SRC.feedback').css('height', "0");
    $('.A_SRC.feedback').text("");
    $('img').attr('src', "");
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
      $('input[name=fname]').val(result["fname"]);

    }else{
      $('.A_SRC.feedback').css(invalidCSS);
      $('.A_SRC.feedback').text(result["message"]);
    }
  });
  }
};

function previewIMG(rotation){
  let file = $('input[name=file]')[0].files[0];
  let angle = Number($('input[name=angle]').val());
  if (rotation == 90){
    angle = (angle + rotation) % 360;
    $('input[name=angle]').val(angle);
  }
  $('img').attr('src', resizeIMG(file, angle));
}

function resizeIMG(file, angle){
  $.canvasResize(file, {
    width: 300,
    height: 0,
    crop: false,
    quality: 100,
    rotate: angle,
    callback: function(data, width, height) {
        return data
    }
});
}

// kakao.maps.event.addListener(map, 'zoom_changed', function() {        
//   // 지도의 현재 레벨을 얻어옵니다
//   let level = Number(map.getLevel());
//   let fname = $('input[name=fname]').val();
//   loadMap(fname, level);
// });

// function loadMap(fname, level){
//   let domain = './static/upload/';
//   let path = $('input[name=fname]').val();
  
//   let plan = function( x, y, z ) {
//       y = -y - 1;
//       let limit = Math.ceil( 3 / Math.pow( 2, z ) );

//       if ( 0 <= y && y < limit && 0 <= x && x < limit ) {
//           return resizeIMG(domain + path, level);
//       } else {
//           return 'https://i1.daumcdn.net/dmaps/apis/white.png';
//       }
//   };

//     kakao.maps.Tileset.add( 'PLAN',
//             new kakao.maps.Tileset(
//                 512, 512, plan, '', false, 0, 5 ) );

//     let node = document.getElementById( 'map' );
//     let map = new kakao.maps.Map( node, {
//         projectionId: null,
//         mapTypeId: kakao.maps.MapTypeId.PLAN,
//         $scale: false,
//         center: new kakao.maps.Coords( 650, -550 ),
//         level: 2
//     } );
//     let center = map.getCenter();
//     let marker = new kakao.maps.Marker({
//         position: center
//     });
//   }