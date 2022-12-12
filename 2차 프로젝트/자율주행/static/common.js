////////////로그인///////////////////
function checkLoginForm() {  //로그인 form 확인
  if($('input[name="M_ID"]').val() == ''){
    $('#M_ID > .feedback').attr('class', "feedback invalid-feedback");
    $('#M_ID > .feedback').text("아이디를 입력해 주세요.");
    $('input[name="M_ID"]').focus();
    return false;
  }else{
    $('#M_ID > .feedback').attr('class', "feedback valid-feedback");
    $('#M_ID > .feedback').text("");
  }
  if($('input[name="M_PW"]').val() == ''){
    $('#M_PW > .feedback').attr('class', "feedback invalid-feedback");
    $('#M_PW > .feedback').text("비밀번호를 입력해 주세요.");
    $('input[name="M_PW"]').focus();
    return false;
  }else{
    $('#M_PW > .feedback').attr('class', "feedback valid-feedback");
    $('#M_PW > .feedback').text("");
  }
  let formData = $('form[name="login"]').serialize();

  $.ajax({
      url : "/login/result", 
      type : 'POST', 
      data : formData, 
  }).then((result)=>{
    console.log(result);
    if (result["result"]){
      window.close();
      window.open('/home');
    }else{
      swal("로그인 실패", "로그인 정보를 다시 입력해 주십시오.", "error").then(result =>{
        if (result){
          window.close();
          window.open('/');
        }
    });
  }
})
};


////////////로그아웃////////////////
function logout(){
  swal({
    title: "로그아웃 확인",
    text: "정말로 로그아웃 하시겠습니까?",
    buttons: {
      cancel:"취소",
      ok: "확인"
      }
    }).then((value)=>{
      switch(value){
        case "cancel" :
          window.location.reload();
        case "ok" :
          window.close();
          window.open('/logout');
        default :
          window.location.reload();
      }
    })
}

////////////회원가입///////////////////

// 아이디 중복 검사
function confirm_id (){
  let ID = $('input[name="M_ID"]').val();
  ck_id1(ID);
}

// 아이디 정규식 검사
function ck_id1(ID){
  let regid = /^[A-Za-z0-9_\-]{6,15}$/;
  if (!regid.test(ID)){
    swal({
      title: '아이디 유효성 검사',
      text: '아이디를 다시 입력해주세요.\n(아이디는 영문 대·소문자 6~15자 이내로 사용 가능합니다.)',
      content: "input",
      buttons : {
        cancel: "취소",
        ok: "확인"
      },
    }).then((result) =>{
      switch(result){
        case "ok" :
          ID = $('.swal-content__input').val();
          ck_id1(ID);
        case "cancel" :
          $('input[name="M_ID"]').val("");
        default:
          $('input[name=M_ID]').val("");
      }
    })
  }else{
    ck_id2(ID);
  }     
}

//DB에서 ID 조회 >> 아이디 중복성 검사
function ck_id2(ID){
  let M_ID = {"M_ID" : ID};
  let set = ""

  $.ajax({
    type: "POST",
    url: "/signup/idck",
    contentType: 'application/json',
    dataType: 'JSON',
    data: JSON.stringify(M_ID),
  }).then((result)=>{
    if (result){
      swal({
        title: '아이디 중복 검사',
        text: `사용 가능한 아이디\n[ ${ID} ]\n 이 아이디를 사용하시겠습니까?`,
        buttons :{
          cancel: "취소",
          ok: "확인"
        }
        }).then((result)=>{
          switch(result){
            case "ok" :
              set = M_ID["M_ID"];
            case "cancel" :
              $('input[name="M_ID"]').val("");
            default:
              $('input[name="M_ID"]').val("");
          }
          $('input[name="M_ID"]').val(set);
          $('input[name="id_confirm"]').val(set);
          if ($('input[name="M_ID"]').val() != ""){
            $('#M_ID > .feedback').attr('class', "feedback valid-feedback");
            $('#M_ID > .feedback').text("사용 가능한 아이디입니다.");
            $('#M_PW > .feedback').focus();
          }
        })
        
      }else if (result == false && result != ""){
        swal({
          title: '아이디 중복 검사',
          text: '이미 사용 중인 아이디 입니다.',
          buttons: {
            cancel: "취소",
            ok: "확인"
          },
          }).then((result)=>{
            switch(result){
              case "ok" :
                ck_id1("");
              case "cancel" :
                $('input[name="M_ID"]').val('');
              default:
                $('input[name="M_ID"]').val('');
            }
          })
      };
  })
}




function checkSignupForm (){  //회원가입 form 확인
  let k_name = /^[가-힣]{2,6}$/;
  let e_name = /^[a-zA-Z]{2,30}$/;
  let regpw =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,15}$/;
  let regtel1 = /^01[179]{3}-[0-9]{3}-[0-9]{4}$/;
  let regtel2 = /^010-[0-9]{4}-[0-9]{4}$/;
  
  if(k_name.test($('input[name="M_NAME"]').val()) || e_name.test($('input[name="M_NAME"]').val())){
    $('#M_NAME > .feedback').attr('class', "feedback valid-feedback");
    $('#M_NAME > .feedback').text("사용 가능한 이름입니다.");
  }else{
    $('#M_NAME > .feedback').attr('class', "feedback invalid-feedback");
    $('#M_NAME > .feedback').text("이름은 한글 2~6자로 입력해 주세요.");
    $('input[name="M_NAME"]').focus();
    return false;
  }
  if($('input[name=M_ID]').val() == $('input[name=id_confirm]').val() && $('input[name=M_ID]').val() != ""){
    $('#M_ID > .feedback').attr('class', "feedback valid-feedback");
    $('#M_ID > .feedback').text("사용 가능한 아이디입니다.");
  }else if($('input[name=M_ID]').val() != $('input[name=id_confirm]').val() && $('input[name=M_ID]').val() != ""){
    $('#M_ID > .feedback').attr('class', "feedback invalid-feedback");
    $('#M_ID > .feedback').text("아이디 중복 검사를 해 주세요.");
    $('input[name="M_ID"]').focus();
    return false;
  }else if($('input[name=M_ID]').val() == ""){
    $('#M_ID > .feedback').attr('class', "feedback invalid-feedback");
    $('#M_ID > .feedback').text("아이디를 입력해 주세요.");
    $('input[name="M_ID"]').focus();
    return false;
  }
  if(regpw.test($('input[name="M_PW"]').val())){
    $('#M_PW > .feedback').attr('class', "feedback valid-feedback");
    $('#M_PW > .feedback').text("사용 가능한 비밀번호입니다.");
  }else{
    $('#M_PW > .feedback').attr('class', "feedback invalid-feedback");
    $('#M_PW > .feedback').text("비밀번호는 영문 대문자, 영문 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자 이내로 입력해 주세요.");
    $('input[name="M_PW"]').focus();
    return false;
  }
  if($('input[name="mpw_confirm"]').val() == $('input[name="M_PW"]').val() && $('input[name="mpw_confirm"]').val() != ""){
    $('#mpw_confirm > .feedback').attr('class', "feedback valid-feedback");
    $('#mpw_confirm > .feedback').text("비밀번호가 일치합니다.");
  }else{
    $('#mpw_confirm > .feedback').attr('class', "feedback invalid-feedback");
    $('#mpw_confirm > .feedback').text("비밀번호가 일치하지 않습니다.");
    $('input[name="mpw_confirm"]').focus();
    return false;
  }
  if(regtel1.test($('input[name="M_TEL"]').val()) || regtel2.test($('input[name="M_TEL"]').val())){
    $('#M_TEL > .feedback').attr('class', "feedback valid-feedback");
    $('#M_TEL > .feedback').text("휴대폰번호가 입력되었습니다.");
  }else{
    $('#M_TEL > .feedback').attr('class', "feedback invalid-feedback");
    $('#M_TEL > .feedback').text("휴대폰번호 양식에 맞지 않습니다.(000-0000-0000)");
    $('input[name="M_TEL"]').focus();
    return false;
  }
  let formData = $('form[name="signup"]').serialize();

  $.ajax({
      url : "/signup/result", 
      type : 'POST', 
      data : formData, 
  }).then((result)=>{
    if (result["result"]){
      swal("회원가입 완료", "DCT의 회원이 되신 것을 축하드립니다!", "success").then(result=>{
        switch (result){
          case true :
            window.close();
            window.open('/');
          case false :
          default:
            window.close();
            window.open('/');
        }
      });
    }else{
      swal("회원가입 실패", "회원 가입 정보를 다시 입력해 주십시오. \n만약 이 문제가 계속 발생한다면, DCT 고객센터로 문의해 주십시오.", "error").then(result =>{
        if (result){
          window.close();
          window.open('/signup');
        }
    });
  }
})}

/* 관리 및 설정 */
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