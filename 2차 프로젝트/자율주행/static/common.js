let loc = location.href.split('/').slice(3,5);
// let info = $('input[name=info]').val()
// console.log(info);

// top버튼
let top_btn = () => {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 250) {
        $('#top_btn').fadeIn();
      } else {
        $('#top_btn').fadeOut();
      }
    });
  
    $("#top_btn").click(function() {
      $('html, body').animate({
        scrollTop : 0
      }, 400);
      return false;
    });
  }
 
// 알림창
let alertInfo = () => {  
    if ( loc == ['login', '?i=001666'].toString()){
        swal(
            "로그인 실패",
            "아이디 혹은 비밀번호가 잘못되었습니다.\n 정상적으로 로그인 하였음에도 이 오류가 반복된다면\n관리자에게 문의해 주세요.",
            "warning"
            ).then(() => {
                window.close();
                window.open('/login');
                $('input[name="mid"]').focus(); 
            })
        }
    if( loc == ["login", "?i=705001"].toString()){
        swal(
            "현재, 로그인 중",
            "다른 계정으로 로그인을 원하시면\n 로그아웃 후, 다시 로그인 해주세요.",
            "warning"
            ).then(() =>{
              try{
                history.back();
              }catch(e){
                window.close();
                window.open('/');
              }
            
          })
        }
    if ( loc == ["login","?i=001777"].toString()){
      swal(
        "로그인 성공",
        "어서오세요.\nDIAMOND를 방문해 주셔서 감사합니다.",
        "success"
      ).then(()=>{
        window.close();
        window.open('/');
        
      })
        
    }
    if ( loc.slice(-1).slice(-3) == "000"){
        swal(
            "잘못된 경로",
            "잘못된 경로로 접근하셨습니다.",
            "error"
          ).then(() => {
            try{
                history.back();
            }catch(e){
                window.close();
                window.open('/');
            }
            
          })

    }
    if (loc == ["mypange","cage","705000"].toString()){
      swal(
        "현재, 로그인이 되어 있지 않습니다.",
        "로그인이 필요한 서비스입니다.\n먼저 로그인을 해 주세요.",
        "warning"
        ).then(()=>{
          window.close();
          window.open('/');
        })
    }
    if ( loc == ["?i=000777"].toString()){
        swal(
        "로그아웃 성공",
        "DIAMOND를 이용해 주셔서 감사합니다.\n안녕히 가세요.",
        "success"
        ).then(()=>{
          window.close();
          window.open('/');
        })
    }
    if ( loc == ["?i=000666"].toString()){
        swal(
        "로그아웃 실패",
        "로그아웃이 되지 않았습니다 \n 이 오류가 반복된다면 관리자에게 문의하세요.",
        "warning"
        )
    }
    if (loc == ["community","free","?i=001666"].toString()){
      swal(
        "수정 불가",
        "게시판의 글은 작성자만 수정 가능합니다.\n현재 로그인된 계정은 본 글의 작성자가 아니므로\n글 수정이 불가합니다.",
        "warning"
        ).then(()=>{
          window.close();
          window.open('/community/free');
        })
    }
    if (loc == ["community","free","?i=705000"].toString()){
      swal(
        "현재, 로그인이 되어 있지 않습니다.",
        "로그인이 필요한 서비스입니다.\n먼저 로그인을 해 주세요.",
        "warning"
        ).then(()=>{
          window.close();
          window.open('/community/free');
        })
    }
}

let navSet = () => {  // nav 버튼 setting
    if(Number("{{session|length}}") == 0){ // 로그인 전,
      if($('.mypage').title != "로그인을 먼저 해주세요."){
        $('.mypage').attr('title', '로그인을 먼저 해주세요.');
      }
      if($('.my').css('display') == "block"){
        console.log('my클래스 숨기기');
        $('.my').hide();
      }
    }else{ // 로그인 후,
      if($('.mypage').title == "로그인을 먼저 해주세요."){
        $('.mypage').removeAttr('title');
      }
      if($('.my').css('display') != "block"){
        $('.my').show();
      }
    }}
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
          window.open('/login');
        }
    });
  }
})
};


////////////로그아웃////////////////
function logout(){
  swal(
    "로그아웃 확인",
    "정말로 로그아웃 하시겠습니까?",
    "warning",
    {
      buttons: true,
      dangerMode: true,
    }).then((value)=>{
      if(value){
        location.replace('/logout');
      }
    })
}
// 로그아웃 함수
// let logout = () => {
//     // 로그인 되어 있지 않을 때
//     if(Number("{{session|length}}") == 0){
//         swal({
//         title: "로그아웃 오류",
//         text: "로그인이 되어있지 않습니다.",
//         icon: "error"
//         })
//     }
//     // 로그인 계정 : diamond
//     if ("{{session['login_by'] }}" == 'diamond'){
//         swal({
//         title: "로그아웃 확인",
//         text: "정말로 로그아웃 하시겠습니까?",
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//         })
//         .then((willLogout) => {
//         if (willLogout) {
//             location.href = "/logout"
            
//         }
//         });
//     }
//     // 로그인 계정 naver
//     if ("{{session['login_by'] }}" == 'naver'){
//         let token = "{{access_token}}";
//         $.ajax({
//         url : `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=58VENhxe4RuqFKX9sZ5e&client_secret=2bRVAPmnNf&access_token=${token}&service_provider=NAVER`,
//         type : "get",
//         success : function(res){
//             let result = res.result;
//             if (result == 'success'){
//                 alert('로그아웃 되셨습니다.');
//             }
//         },
//         // 실패했다면 다음 함수를 실행
//         error : function(){
//             alert('로그아웃 실패');
//         }
//     })
//     }
// }

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
        })
        
      }else if (result == false && result != ""){
        console.log("사용 불가능 아이디");
    
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
    console.log(result);
    if (result["result"]){
      swal("회원가입 완료", "DCT의 회원이 되신 것을 축하드립니다!", "success").then(result=>{
        if (result){
          window.close();
          window.open('/login');
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

// 게시판

let search = () => {
  let keyword = $("input[name='search_keyword']").val();
  let selector = $("select").val();
  location.href = `/community/free/latest/n1/${selector}_${keyword}`;
}

///////////게시글 수정 ////////
let content_length_ck = () => {
  let c_val = $('input[name="manager_content"]').val();
  if(c_val.length > 9600){
    swal(
        "내용 초과 입력",
        "내용은 9600자까지만 입력 가능합니다.\n 수정해 주세요."
        )
    $('input[name="manager_content"]').val(c_val.substring(0, 9600));
    $('input[name="manager_content"]').focus();
}
}
let content_ck = () => {
  $('form[name="content_update"]').bind('submit',function(){
    if($('input[name="manager_title"]').val() == ''){
        swal(
            "제목 미입력",
            "제목을 입력해 주세요."
            )
        $('input[name="manager_title"]').focus();
        return false;
    }
    if($('input[name="manager_content"]').val() == ''){
        swal(
            "내용 미입력",
            "내용을 주세요."
            )
        $('input[name="manager_content"]').focus();
        return false;
    }
    if($('input[name="manager_content"]').val().length > 9600){
      swal(
          "내용 초과 입력",
          "내용은 9600자까지만 입력 가능합니다.\n 수정해 주세요."
          )
      $('input[name="manager_content"]').val($('input[name="manager_content"]').val().substring(0, 9600));
      $('input[name="manager_content"]').focus();
      return false;
  }
});
}