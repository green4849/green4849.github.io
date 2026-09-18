# Park So Yeong · Research Portfolio

박소영의 연구 포트폴리오 사이트입니다. GitHub에 변경사항을 저장하면 CV PDF를 생성하고 GitHub Pages에 자동 배포합니다.

- 포트폴리오: https://green4849.github.io/
- 웹 CV: https://green4849.github.io/cv/
- PDF: https://green4849.github.io/assets/Park_So_Yeong_CV.pdf

## 로컬에서 확인하기

`index.html` 또는 `cv/index.html`을 브라우저에서 직접 열면 됩니다.
VS Code의 Live Server 확장 프로그램으로 확인해도 됩니다.

## 내용 수정

대부분의 연구·논문·수상·활동·장학 정보는 `data.js`에서 수정할 수 있습니다.

- 연구: `research`
- 논문 및 발표: `publications`
- 수상 실적: `awards`
- 리더십·교육·활동: `activities`
- 장학금: `scholarships`

`draft: true`인 미확정 논문은 기본적으로 공개 화면에 나타나지 않습니다. 검토 중인 항목까지 확인하려면 `showDrafts`를 `true`로 변경하세요.

소개, 학력, 이메일처럼 화면에 고정된 문장은 `index.html`에서 수정합니다.

## CV 수정 및 PDF 생성

CV는 [mnjul/html-resume](https://github.com/mnjul/html-resume) 템플릿의 HTML/CSS 구조를 기반으로 제작했습니다. 한글 글꼴, 장식을 줄인 흑백 A4 2페이지, 모바일 레이아웃을 적용했습니다. 템플릿 원본과 라이선스는 `cv/vendor/html-resume/`, 폰트 라이선스는 `cv/fonts/OFL.txt`에 보관합니다.

- 내용: `cv/index.html`
- 글자 크기·여백·인쇄 디자인: `cv/cv.css`
- 1페이지: 소개·학력·연구 경험·활동·장학금
- 2페이지: 논문 및 발표·수상 실적

CV 내용은 `cv/index.html`, 포트폴리오의 카드 내용은 `data.js`에서 각각 관리하므로 공통 정보가 바뀌면 두 파일에 반영합니다. 메인 페이지 학력·소개는 `index.html`에 있습니다.

`main`에 변경사항을 저장하면 GitHub Actions가 Chromium의 인쇄 기능으로 PDF를 다시 만들고 웹 CV와 함께 배포합니다. Python은 사용하지 않습니다. 배포된 PDF가 최신 파일이며, 저장소의 PDF는 초기 검수본입니다.

로컬에서도 Node.js 24 이상으로 생성할 수 있습니다.

```bash
npm ci --ignore-scripts
npx playwright install chromium
npm run build:cv
```

결과는 `assets/Park_So_Yeong_CV.pdf`입니다. 글꼴 로딩, 페이지 하단 여백, 가로 넘침, 모바일 넘침을 검사하며, 내용이 페이지를 넘으면 배포 전에 실패합니다. 많은 내용을 추가할 때는 페이지 구성을 다시 검토하고 PDF를 열어 확인하세요.

브라우저의 ‘인쇄’ 버튼으로도 PDF를 저장할 수 있습니다. A4, 배율 100%, 여백 없음, 머리글·바닥글 끔, 배경 그래픽 켬으로 설정합니다.

## GitHub Pages 배포

저장소의 **Settings → Pages → Source**는 **GitHub Actions**입니다.
`.github/workflows/pages.yml`이 `main` 변경 시 PDF를 생성하고 공개 파일만 `_site/`에 모아 배포합니다. GitHub의 Actions 탭에서 완료 여부를 확인할 수 있습니다. 빌드가 실패하면 기존 배포가 유지됩니다.

## 공개 전 확인할 내용

- 한국음향학회지 논문의 최종 DOI와 페이지 번호가 배정되었는지
- 전공 평점을 별도로 공개하려면 포함 교과목 범위와 산식이 확정되었는지
- `AIUX Lab Leader`가 공식 활동명과 일치하는지
- DCASE 2026 Task 6의 공개 가능한 최종 결과가 확정되었는지

확인 완료: ICTCA 2025 논문 제목·학회·저자 순서, 한국데이터사이언스학회 장려논문상 일자·논문명, 누적 평점 4.38/4.50.

개인정보 보호를 위해 주소와 휴대전화 번호는 포함하지 않았습니다.
