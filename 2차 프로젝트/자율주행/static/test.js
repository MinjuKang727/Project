function uploadIMG(){
  let formData = new FormData();
  formData.append('A_NAME', $('input[name=A_NAME]').val());
  formData.append('file', $('input[name=file]')[0].files[0]);
  console.log(formData.get('file'));
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
    ResizeImage();
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
        // floatMap(result["map_src"]);
      }else{
        $('.A_SRC.feedback').css(invalidCSS);
        $('.A_SRC.feedback').text(result["message"]);
      }
    });
  }
};

// function floatMap(map_src){
//   console.log('map_src');
//   let path = './static/upload/';
//   let plan = function( x, y, z ) {
//       y = -y - 1;
//       let limit = Math.ceil( 3 / Math.pow( 2, z ) );

//       if ( 0 <= y && y < limit && 0 <= x && x < limit ) {
//           return path + map_src;
//       } else {
//           return 'https://i1.daumcdn.net/dmaps/apis/white.png';
//       }
//   };

//   kakao.maps.Tileset.add( 'PLAN',
//           new kakao.maps.Tileset(
//               512, 512, plan, '', false, 0, 8 ) );

//   let node = document.getElementById( 'map' );
//   let map = new kakao.maps.Map( node, {
//       projectionId: null,
//       mapTypeId: kakao.maps.MapTypeId.PLAN,
//       $scale: false,
//       center: new kakao.maps.Coords( 650, -550 ),
//       level: 4
//   } );
//   let center = map.getCenter();
//   let marker = new kakao.maps.Marker({
//       position: center
//   });
//   marker.setMap(map);

//   let infowindow = new kakao.maps.InfoWindow({
//       content: '커스텀 타일셋을 올릴수 있습니다!'
//   });
//   infowindow.open(map, marker);

// }

// function ResizeImage() {

// let filesToUpload = document.getElementById('imageFile').files;

// let file = filesToUpload[0];

 

// // 문서내에 img 객체를 생성합니다

// let img = document.createElement("img");

// // 파일을 읽을 수 있는 File Reader 를 생성합니다

// let reader = new FileReader();

 

//     // 파일이 읽혀지면 아래 함수가 실행됩니다

// reader.onload = function(e) {

//         img.src = e.target.result;

 

// // HTML5 canvas 객체를 생성합니다

//         let canvas = document.createElement("canvas");      

//         let ctx = canvas.getContext("2d");

 

//         // 캔버스에 업로드된 이미지를 그려줍니다

//         ctx.drawImage(img, 0, 0);

 

//         // 최대폭을 400 으로 정했다고 가정했을때

//         // 최대폭을 넘어가는 경우 canvas 크기를 변경해 줍니다.

//         let MAX_WIDTH = 400;

//         let MAX_HEIGHT = 400;

//         let width = img.width;

//         let height = img.height;

 

//         if (width > height) {

//             if (width > MAX_WIDTH) {

//                 height *= MAX_WIDTH / width;

//                 width = MAX_WIDTH;

//             }

//         } else {

//             if (height > MAX_HEIGHT) {

//                 width *= MAX_HEIGHT / height;

//                 height = MAX_HEIGHT;

//             }

//         }

//         canvas.width = width;

//         canvas.height = height;

 

//         // canvas에 변경된 크기의 이미지를 다시 그려줍니다.

//         let ctx = canvas.getContext("2d");

//         ctx.drawImage(img, 0, 0, width, height);

 

// // canvas 에 있는 이미지를 img 태그로 넣어줍니다

//         let dataurl = canvas.toDataURL("image/png");

//         document.getElementById('output').src = dataurl;

//     }

// reader.readAsDataURL(file);

// }


function ResizeImage() {
  let file = $('input[name=file]')[0].files[0];
  let img = $('img');
  // 파일을 읽을 수 있는 File Reader 를 생성합니다
  let reader = new FileReader();
  
      // 파일이 읽혀지면 아래 함수가 실행됩니다
  reader.onload = function(e) {
          img.src = e.target.result;
  // HTML5 canvas 객체를 생성합니다
          let canvas = document.createElement("canvas");      
          let ctx = canvas.getContext("2d");
  
          // 캔버스에 업로드된 이미지를 그려줍니다
          ctx.drawImage(img, 0, 0);
   
          // 최대폭을 400 으로 정했다고 가정했을때
          // 최대폭을 넘어가는 경우 canvas 크기를 변경해 줍니다.
  
          let MAX_WIDTH = 400;
          let MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;
   
          if (width > height) {
              if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
              }
          } else {
              if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
              }
          }
          canvas.width = width;
          canvas.height = height;
  
          // canvas에 변경된 크기의 이미지를 다시 그려줍니다.
          ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

  // canvas 에 있는 이미지를 img 태그로 넣어줍니다
          let dataurl = canvas.toDataURL("image/png");
          $('img').attr('src', dataurl);
      }
  reader.readAsDataURL(file);
  }