let fname = "";

function uploadIMG(){
  let formData = new FormData();
  formData.append('A_NAME', $('input[name=A_NAME]').val());
  formData.append('file', $('input[name=file]')[0].files[0]);
  formData.append('angle', $('input[name=angle]').val());

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

// input 입력 값 체크
  let check = true;
  if ($('input[name=A_NAME]').val() == ""){
    $('.A_NAME.feedback').css(invalidCSS);
    $('.A_NAME.feedback').text('공간 이름을 입력해 주십시오.');
    check = false;
  }else{
    $('.A_NAME.feedback').css('height', "0");
    $('.A_NAME.feedback').text("");
  } 
  if ($('input[name=file]').val() == ""){
    $('#previewDiv').empty();
    $('.A_SRC.feedback').css(invalidCSS);
    $('.A_SRC.feedback').text('설계도면 이미지 파일을 선택해 주십시오.');
    check = false;
  }else{
    $('#previewDiv').empty();
    $('.A_SRC.feedback').css('height', "0");
    $('.A_SRC.feedback').text("");
  }
// ajax 통신
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
      $('#previewDiv').empty();
    }else{
      $('.A_SRC.feedback').css(invalidCSS);
      $('.A_SRC.feedback').text(result["message"]);
    }
  });
  }
};

// 이미지 미리보기 기능
function previewIMG(rotation){
  let file = $('input[name=file]')[0].files[0];
  if (fname != file){
    fname = file;
    $('input[name=angle]').val("0");
  }
  let angle = Number($('input[name=angle]').val());
  
  if (rotation == 90){
    angle = (angle + rotation) % 360;
    $('input[name=angle]').val(angle);
  }
  $('#previewDiv').empty();
  resizeIMG(file, angle);
}

// 이미지 크기 조정
function resizeIMG(file, angle){
    $.canvasResize(file, {
      width: 300,
      height: 0,
      crop: false,
      quality: 100,
      rotate: angle,
      callback: function(data, width, height) {
        let img = `<img src="${data}">`
        $(img).appendTo('#previewDiv')
      }
  })
  } 