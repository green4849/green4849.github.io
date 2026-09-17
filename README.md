# Park So Yeong · Research Portfolio

박소영의 연구 포트폴리오 사이트입니다. 별도 설치나 빌드 없이 GitHub Pages에서 바로 실행할 수 있습니다.

## 로컬에서 확인하기

VS Code에서 폴더를 연 뒤 `index.html`을 직접 열거나 Live Server 확장 프로그램으로 실행하세요.

Python이 설치되어 있다면 다음 명령도 사용할 수 있습니다.

```bash
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173`으로 접속합니다.

## 내용 수정

대부분의 연구·논문·수상·활동·기술 정보는 `data.js`에서 수정할 수 있습니다.

- 연구: `research`
- 논문 및 발표: `publications`
- 수상 및 장학: `awards`
- 리더십·교육·활동: `activities`
- 연구 도구: `skills`

`draft: true`인 미확정 논문은 기본적으로 공개 화면에 나타나지 않습니다. 검토 중인 항목까지 확인하려면 `showDrafts`를 `true`로 변경하세요.

소개, 학력, 이메일처럼 화면에 고정된 문장은 `index.html`에서 수정합니다.

## CV PDF 연결

1. 프로젝트 안에 `assets/Park_So_Yeong_CV.pdf`를 추가합니다.
2. `data.js`의 값을 다음처럼 변경합니다.

```js
cvUrl: "./assets/Park_So_Yeong_CV.pdf",
```

## GitHub Pages 배포

1. 이 폴더의 파일을 `green4849.github.io` 저장소에 올립니다.
2. GitHub 저장소의 **Settings → Pages**로 이동합니다.
3. 배포 소스를 `Deploy from a branch`로 선택합니다.
4. `main` 브랜치와 `/ (root)` 폴더를 선택해 저장합니다.

배포가 완료되면 `https://green4849.github.io/`에서 확인할 수 있습니다.

## 공개 전 확인할 내용

`data.js`에서 `확인 필요`를 검색해 다음 서지정보를 확정하세요.

- 사족보행 로봇 발걸음 소음 제거 논문의 정확한 제목, 연도, 학회명
- 한국데이터사이언스학회 장려논문상의 정확한 연월과 논문 제목
- 전공 평점 만점 기준이 4.50인지 여부
- 기술 목록에 실제로 사용한 도구만 남았는지 여부

개인정보 보호를 위해 주소와 휴대전화 번호는 포함하지 않았습니다.
