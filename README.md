# Project
백엔드 신입 개발자 <b>강민주</b>님의 프로젝트 저장소입니다.

<br><br>
<h1>Stack</h1>
<img alt="Python" src ="https://img.shields.io/badge/Python-3776AB.svg?&style=for-the-badge&logo=Python&logoColor=white"/>
<img alt=" HTML" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/>
<img alt=" JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=white"/>
<img alt=" CSS3" src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/>
<img alt="Flask" src ="https://img.shields.io/badge/Flask-000000.svg?&style=for-the-badge&logo=Flask&logoColor=white"/>
<img alt="Jinja" src ="https://img.shields.io/badge/Jinja-B41717.svg?&style=for-the-badge&logo=Jinja&logoColor=white"/>

<h3>
<ul>
    <li>Programming Language : Python 3.9.12</li>
    <li>Web : HTML, JavaScript, CSS, Flask 1.1.2, Jinja</li>
    <li>IDE : 
        <ul>
            <li>Jupyter Notebook(anaconda3) 6.4.8</li>
            <li>Visual Studio Code 1.70.1</li>
        </ul>
    </li>
</ul>
</h3>  
<br>



<br><br>
<h1>[ How to use Gitbash ]</h1><br>
[clone 주소]<br>
git remote add origin https://gwangju-ai-gitlab.elice.io/ai_iot/diamond/smart-farm-kit.git

[로컬 저장소]<br>
cd C:/Users/AI/GJAIschool/Project/Smart_house_kit

<br><br>
<h1>GitLab CML 작성 가이드</h1>
붙여넣기 : 마우스 우클릭 or Shift + Insert<br>
<br>
1. 처음 한번만 입력할 아이디와 메일 주소<br>
`$ git config --global user.name gitLab아이디`<br>
`AI@DESKTOP-B76SA23 MINGW64 ~`<br> 
`$ git config --global user.email gitLab이메일주소`<br>
<br>
`AI@DESKTOP-B76SA23 MINGW64 ~`<br>
`$ git config --global --list`<br>
`user.name=아이디 확인 가능`<br>
`user.email=메일 확인 가능`<br>
<br><br>
2. 내 컴퓨터 확인 명령어 : 내 폴더 및 파일 목록 확인 가능<br>
`$ ls`
<br><br>
3. 경로 이동 : cd 이동할 경로/<br>
- 폴더에 들어가기 cd 폴더명/<br>
`$ cd Desktop/`<br>
- 폴더 밖으로 나오기<br>
`$ cd ..`<br>
<br><br>
4. 폴더 생성<br>
- 폴더 생성 : mkdir 생성할 폴더명<br>
`$ mkdir Diamond`<br>
<br><br>
5. 로컬 저장소 초기화<br>
- 반드시 내가 로컬 저장소로 만들 폴더 안에 들어간 후에 명령어를 입력해야 함.<br>
`AI@DESKTOP-B76SA23 MINGW64 ~/Desktop/Diamond (master)`<br>
`$ git init`<br>
<br><br>
6. 원격 저장소 연결 : git remote add origin 원격 저장소 주소(gitlab에서 clone >> HTTPS 복.붙)<br>
`$ git remote add origin https://gwangju-ai-gitlab.elice.io/ai_iot/diamond/smart-farm-kit.git`<br>
<br><br>
7. 브렌치<br>
- 브렌치 생성 : git branch 브렌치명<br>
`$ git branch minju`<br>
<br>
- 브렌치 다운로드 : git pull origin 브렌치명<br>
- 브렌치를 먼저 다운 받아야 push나 git branches가 실행 됨<br>
`$ git pull origin main`<br>

- 브렌치 확인 : git branch<br>
`$ git branch`<br>

- 브렌치 이동 : git switch 브렌치명<br>
`$ git switch minju`<br>

- 브렌치 삭제 : git branch -D 브렌치명<br>
`$ git branch -D minju`<br>

- 브렌치명 수정 : git branch -m 기존브렌치명 변경브렌치명<br>
`$ git branch -m master minju`<br>

- git 브랜치가 목록에서 보이지 않을 때<br>
`$ git remote update`<br>

(로컬 branch의 정보 & 마지막 커밋 내역 확인<br>
 : `$ git branch -v`<br>
원격 저장소의 branch 정보 확인 <br>
 : `$ git brach -r`<br>
로컬/원격 저장소의 모든 branch 정보 확인<br>
 : `$ git branch -a` <br>
이미 merge된 브랜치 확인<br>
(--merged에 branch 목록 이미 merge되었기 때문에 *가 표시되지 않은 branch는 삭제 가능)<br>
 : `$ git branch --merged`<br>
아직 merge가 되지 않은 브랜치 확인<br>
 : `$ git branch --no-merged`)<br>

 <br><br>
8. 업로드 <br>
- `$ git add --all`<br>
- status에 나온 변경사항 모두 업로드 : `$ git add .`<br>
<br>
- 하나 이전의 스테이지와 비교해서 변경된 부분만 add(새롭게 만들어진 파일은 추가X)<br>
 : `$ git add -u`<br>
<br>
- 새로만든 것, 수정, 삭제 등 모든 변경된 파일 업로드 : `$ git add -A`<br>
<br>
- 폴더 추가 : `$ git add .폴더명`<br>
<br>
- 파일 추가 : git add 파일명.확장자명<br>
`$ git add hello.html`<br>
<br>
- commit 메세지 설정 : git commit -m "메세지"<br>
`$ git commit -m "first commit"`<br>

<br><br>
- 업로드 : git push origin 브렌치명<br>
- 브렌치명 == 추가한 위치와 같은 브렌치명 : (master)에서 추가하면 push도 master에 해야함<br>
`$ git push origin master`<br>
<br><br>
파일 업로드 중요도 : commit > pull > push<br>
- 웹 사이트에서 수정 시, commit을 하지 않으면 다른 사람이 업로드 불가!!<br>
- push 하기 전에 commit 했는지 확인하기<br>
- push 하기 전에 pull 했는지 확인하기(다른 사람이 먼저 업로드 한 것을 다운 받아야 함)<br>
- 똑같은 라인을 다르게 수정했으면 충돌함<br>
- 두사람이 이야기해서 둘 중 뭘 고를지 정해야 함.<br>
<br>
- 업로드 상태 확인<br>
`$ git status`<br>
<br>
- untracked 파일 삭제<br>
- 제거할 예정인 파일 보기<br>
`$ git clean -n `<br>
- 최상위에 있는 untracked files 삭제(폴더 내 파일 X)<br>
`$ git clean -f`<br>
- 최상위 + 폴더 내에 있는 untracked files 삭제<br>
`$ git clean -fd`<br>
- 최상위 + 폴더 내 + .gitignore에 있는 untracked files 삭제(더 넓은 범위의 file 삭제인 듯?)<br>
`$ git clean -xfd`<br>
<br><br>
9. 저장소 파일 or 폴더 삭제<br>
- 원격 저장소와 로컬 저장소에 있는 파일을 삭제<br>
 : git rm 파일명.확장자(또는 경로 : 폴더명/파일명.확장자)<br>
`$ git rm --cached .idea/modules.xml`<br>
- 원격 저장소 파일만 삭제한다(로컬 저장소 파일은 삭제X)<br>
`$ git rm --cached [File Name]`<br>
- .idea 폴더 하위의 모든 파일 삭제 <br>
`$ git rm --cached -r .idea/`<br>
<br><br>
10. 업로드시, 무시할 파일 설정<br>
.gitignore 폴더를 생성하여 안에 무시할 파일 목록을 써 준다.<br>
목록 예시 : .ipynb_checkpoints<br>
<br><br>
11. 원격 저장소 옮기기<br>
11-1) 원본 저장소의 모든 이력(history) 복사 <br>
`$ git clone --mirror [원본 저장소 경로]`<br>
11-2) clone한 디렉터리 안으로 이동 <br>
`$ cd [원본 저장소 이름].git`<br>
11-3) 이동할 원격 저장소 경로 지정<br>
`$ git remote set-url --push origin [이동할 원격 저장소 경로]`<br>
11-4) 원격 저장소로 push<br>
`$ git push --mirror `<br>
<br><br>
(깃허브 사용시,)<br>
Gitlab과 달리 Github은 기본적으로 100MB 이상의 파일을 올릴 수 없음<br>
용량 초과 파일 업로드시, push 하는 과정에서 Error가 발생<br>
<b>100MB 이상의 파일이 올라간 Commit 이력을 삭제하는 방법</b><br>
1) https://rtyley.github.io/bfg-repo-cleaner 링크에서 jar 파일을 다운로드 받습니다.<br>
2) 원본저장소를 clone한 디렉터리의 경로에서 아래 명령어를 사용하여 실행합니다.<br>
`$ java -jar bfg_x.x.x.jar --strip-blobs-bigger-than 100M`<br>
※  bfg의 버전과 jar 파일의 경로에 주의해주세요. ※<br>
`$ git push --mirror # 다시 원격 저장소로 push`<br>

<br><br>
- 현재 연결된 원격 저장소와 연결 해제<br>
`$ git remote remove origin 주소`
