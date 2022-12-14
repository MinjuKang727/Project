let loc = location.href.split('/').slice(3,5);
let info = $('input[name=info]').val()
console.log(info);
//뒤로 가기 막기
// var prePage = document.referrer;
// console.log(prePage);
// if(prePage.indexOf('/login') != -1){
//   window.location.href = '/';
// }

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

let checkLoginForm = () => {  //로그인 form 확인
    $('form[name="login"]').bind('submit',function(){
        if($('input[name="mid"]').val() == ''){
            swal(
                "아이디 미입력",
                "아이디를 입력해 주세요."
                )
            $('input[name="mid"]').focus();
            return false;
        }
        if($('input[name="mpw"]').val() == ''){
            swal(
                "비밀번호 미입력",
                "비밀번호를 입력해 주세요."
                )
            $('input[name="mpw"]').focus();
            return false;
        }
    });
}


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

function changeInfo (val) {
  if(val == "mobile"){
      $('#signup_info').text("휴대폰 번호 본인 인증으로 회원 가입합니다.");
      $('#memail>label').text("휴대폰 번호");
      $("input[name='memail']").attr('type','tel');
      $("input[name='memail']").attr('placeholder','휴대폰 번호');
      $("input[name='memail']").attr('name','mphone');
      $("#memail").attr('id','mphone');
  }else if (val == "email"){
      $('#signup_info').text("이메일 본인 인증 인증으로 회원 가입합니다.");
      $('#mphone>label').text("이메일");
      $("input[name='mphone']").attr('type','email');
      $("input[name='mphone']").attr('placeholder','이메일');
      $("input[name='mphone']").attr('name','memail');
      $("#mphone").attr('id','memail');
      swal(
        '카톡 알람 서비스 안내',
        '이메일 본인 인증으로 회원 가입 시, \n휴대폰 번호 미기재로 카카오톡 알람 서비스\n(사육장 상태 알람)가 제공되지 않습니다.\n\n카톡 알람 서비스를 원하실 경우, \n회원 가입 후, 내 정보에서 휴대폰 번호 인증이 추가적으로\n필요합니다.',
        'warning',
      ) 
  }
}
// function ckInput(val){
//   if (val == 'name'){
//     let regname = r'^[가-힣]{1,10}$';
//     if(regname.test($('input[name="mname"]').val())){
//       $('#mname.feedback').attr('class', "feedback valid-feedback");
//       $('#mname.feedback').attr('class', "feedback valid-feedback");

//     }else{
//       $('#mname.feedback').attr('class', "feedback invalid-feedback");
//       $('#mname.feedback').text("이름은 한글 1~10자 이내로 입력해주세요.");
//       $('input[name="mname"]').focus();
//       return false;
//     }
//   }
// }
function ck_id(input_id){
  var regid = '^^[a-zA-Z]\w{6,12}$/';
  console.log(regid.test(input_id));
  if(regid.test(input_id)){
    return fetch(`/signup/confirm/result/?mb_id=${input_id}`)
  }else{
    return false;
  }
}
let confirm_id = () => {
  let ID = $('input[name="mb_id"]').val();
  let rs = true;
  while(rs){
    if (!ID){
      swal({
        title: '아이디 중복 검사',
        text: '아이디를 입력해주세요.\n(아이디는 영문 대·소문자 6~12자 이내로 사용 가능합니다.)',
        content: "input",
        buttons : true
    }).then((mb_id)=>{
      ID = mb_id;
    })
    }
    ck_id(ID).then((results) => {
    if (results){
      swal(
        '아이디 중복 검사 결과',
        `사용 가능한 아이디 : ${ID}\n 이 아이디를 사용하시겠습니까?`,
        {buttons : true}
      ).then((value) => {
        if(value) {
          $('input[name="mid"]').val(ID);
          end = value;
        }
      })
    }else{
      swal(
        '아이디 중복 검사 결과',
        '이미 사용 중인 아이디 입니다.\n다시 입력 하시겠습니까?',
        {buttons : true}
      ).then((again)=>{
        if (!again){
          rs = false;
        }
      })
    }
  })
  }
}
// let terms = $('form[name="term"]:checked');
// console.log(terms);


function checkSignupForm (){  //회원가입 form 확인
  $('form[name="signup"]').bind('submit',function(){
    let regname = '^[가-힣]{1,10}$';
    let regid = '^^[a-zA-Z]\w{6,12}$/u';
    if(regname.test($('input[name="mname"]').val())){
      $('#mname.feedback').attr('class', "feedback valid-feedback");
      $('#mname.feedback').text("사용 가능한 이름입니다..");
    }else{
      $('#mname.feedback').attr('class', "feedback invalid-feedback");
      $('#mname.feedback').text("이름은 한글 1~10자 이내로 입력해주세요.");
      $('input[name="mname"]').focus();
      return false;
    }
    if(regid.test($('input[name="mid"]').val())){
          
      }
      if($('input[name="mpw"]').val() == ''){
          swal(
              "비밀번호 미입력",
              "비밀번호를 입력해 주세요."
              )
          $('input[name="mpw"]').focus();
          return false;
      }
  });
}

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