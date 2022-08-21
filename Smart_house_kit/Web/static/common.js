function alertInfo (){
    if ( "{{ info }}" == "로그인 실패" && location.href == "/login?info=<info>"){
        swal(
            "로그인 실패",
            "아이디 혹은 비밀번호가 잘못되었습니다.\n 정상적으로 로그인 하였음에도 이 오류가 반복된다면\n관리자에게 문의해 주세요.",
            "warning"
            ).then(() => {
                $('input[name="mid"]').focus(); 
            })
        }
    if( "{{ info }}" == "현재 상태 : 로그인" && location.href == "/login"){
        swal(
            "{{session['user_id']}}님, 로그인 중",
            "다른 계정으로 로그인을 원하시면\n 로그아웃 후, 다시 로그인 해주세요.",
            "warning"
            ).then(() =>{
            location.href='/';
        })
    }
    if ( "{{ info }}" == "로그인 성공" && location.href == "/?info=<info>"){
        swal(
          "로그인 성공",
          "반갑습니다. {{session['user_id']}}님!",
          "success"
        )
    }
    if ( "{{ info }}" == "잘못된 경로"){
        swal(
            "잘못된 경로",
            "잘못된 경로로 접근하셨습니다.",
            "error"
          )
    }
    if ( "{{ info }}" == "로그아웃 성공" && location.href == "/?info=<info>"){
        swal(
        "로그아웃 성공",
        "DIAMOND를 이용해 주셔서 감사합니다.\n안녕히 가세요.",
        "success"
        )
    }
    if ( "{{ info }}" == "로그아웃 실패" && location.href == "/?info=<info>"){
        swal(
        "로그아웃 실패",
        "로그아웃이 되지 않았습니다 \n 이 오류가 반복된다면 관리자에게 문의하세요.",
        "warning"
        )
    }
}

function navSet() {  // nav 버튼 setting
    if(Number("{{session|length}}") == 0){ // 로그인 전,
      if($('.mypage').getAttribute('title') == "none"){
        $('.mypage').attr('title', '로그인을 먼저 해주세요.');
      }
      if($('.my').css('display') != "none"){
        $('.my').show();
      }
    }else{ // 로그인 후,
      if($('.mypage').getAttribute('title') != "none"){
        $('.mypage').removeAttr('title');
      }
      if($('.my').css('display') != "none"){
        $('.my').show();
      }
    }}
////////////로그인///////////////////
function checkForm() {  //로그인 form 확인
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

// 로그아웃 함수
function logout() {
    // 로그인 되어 있지 않을 때
    if(Number("{{session|length}}") == 0){
        swal({
        title: "로그아웃 오류",
        text: "로그인이 되어있지 않습니다.",
        icon: "error"
        })
    }
    // 로그인 계정 : diamond
    if ("{{session['login_by'] }}" == 'diamond'){
        swal({
        title: "로그아웃 확인",
        text: "정말로 로그아웃 하시겠습니까?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willLogout) => {
        if (willLogout) {
            location.href = "/logout"
            
        }
        });
    }
    // 로그인 계정 naver
    if ("{{session['login_by'] }}" == 'naver'){
        let token = "{{access_token}}";
        $.ajax({
        url : `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=58VENhxe4RuqFKX9sZ5e&client_secret=2bRVAPmnNf&access_token=${token}&service_provider=NAVER`,
        type : "get",
        success : function(res){
            let result = res.result;
            if (result == 'success'){
                alert('로그아웃 되셨습니다.');
            }
        },
        // 실패했다면 다음 함수를 실행
        error : function(){
            alert('로그아웃 실패');
        }
    })
    }
    }