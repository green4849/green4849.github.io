# 사이트 수정·자료 확인 안내

현재 공개 사이트: <https://green4849.github.io/>. 자료 연결 기록: [portfolio_links.json](../_data/portfolio_links.json).

## 지금 직접 수정할 수 있는 위치

| 바꾸고 싶은 것 | 파일 |
| --- | --- |
| 프로필·연구 관심·연구·수상·장학금·활동 | `_data/profile.json` |
| 첫 페이지 소개 문장 | `_pages/about.md` |
| 논문 제목·저자·날짜·원문/포스터 링크·설명 | `_publications/`의 해당 논문 파일 |
| 기사·증빙 주소와 확인 상태 | `_data/portfolio_links.json` |
| 수상과 관련 논문 연결 | `_data/award_publications.yml` |
| 사이트 메뉴 | `_data/navigation.yml` |
| 프로필 사진 원본 위치 | `_data/media.json`의 `portrait_source` |
| 공개 원문·포스터·상장·CV 파일 | `assets/publications/`, `assets/documents/`, `assets/` |

공개 저장소의 해당 파일을 열고 연필 버튼으로 편집할 수 있다. 처음에는 **새 브랜치에 저장하고 변경 요청(Pull request)**을 만드는 흐름을 권한다. 검사 결과와 바뀐 내용을 확인한 다음 main에 반영하면 사이트가 자동으로 갱신된다. main에 직접 저장하면 검사를 거쳐 공개 배포가 시작된다.

## 수정할 때 유지할 값

- `id`: 항목의 고유 번호. 제목·설명을 바꿔도 유지한다. 새 항목에는 기존에 없는 영문 ID를 준다.
- `item_id`: 기사·증빙을 연결할 프로필 항목의 `id`와 같다.
- `permalink`: 논문의 공개 주소. 기존 URL을 계속 사용하려면 유지한다.
- `status`와 `checked_at`: 출처 확인 상태와 확인한 날짜. 접속 검사만으로 수상 내용까지 검증했다고 바꾸지 않는다.

행사 기사만 있는 수상 항목은 `placement: context`로 유지하고, 본인 수상 증빙처럼 제목에 붙이지 않는다. 과거 출처는 `previous_sources`에 남겨 재사용할 수 있다.

## 공개 자료를 교체할 때

자료를 실제로 열어 확인한 뒤 공개 폴더에 넣고 해당 항목의 `resources`나 출처 기록 주소를 수정한다. 원본에 개인정보가 있으면 공개용 사본을 사용한다. 로컬 원본·개인 메모·검사 보고서는 `.local/`에 두고 업로드하지 않는다. 원본을 옮기는 것만으로 공개해도 된다는 판단을 대신하지 않는다.

HTML 정보를 바꿔도 CV PDF가 자동으로 바뀌지는 않는다. PDF 교체는 별도 작업으로 관리한다.

## 로컬 미리보기와 검사

Ruby/Bundler, Python 3, Node.js 22 이상을 사용한다. 처음에는 `bundle install`과 `npm ci`로 잠금 파일의 의존성을 설치한다.

```sh
bash scripts/site.sh serve
```

브라우저에서 <http://127.0.0.1:4187>을 연다. 미리보기를 끝낼 때 터미널에서 Ctrl+C를 누른다. 사진 등 공개 자료를 바꾸거나 자산 버전을 갱신하려면 미리보기를 다시 시작한다.

```sh
bash scripts/site.sh build
```

배포와 같은 준비·검증·빌드를 실행한다. ID 중복, 없는 항목/파일 연결, 페이지 링크 오류가 있으면 메시지에 해당 위치가 나온다. `.local/`과 운영 문서는 사이트 출력에서 제외된다.

## 외부 기사·원문 링크 확인

GitHub 저장소 **Actions → Check external resource links → Run workflow**를 누른다. 실행이 끝나면 `public-link-report` 파일을 내려받아 확인할 수 있다. 또는 로컬에서 다음을 실행한다.

```sh
bash scripts/site.sh links
```

- `reachable`: 접속 가능. 기사 내용의 사실 확인은 별도다.
- `restricted`: 로그인/봇 차단/요청 제한. 링크 삭제로 단정하지 않는다.
- `unconfirmed`: 일시 장애, 응답 대기, 네트워크 문제 등으로 확인하지 못했다.
- `broken`: HTTP 404 또는 410. 주소 변경이나 원문 상태를 확인한다.

로컬 결과는 `.local/link-report.json`에 저장한다. 점검은 필요할 때 수동으로 실행하며 반복 예약은 설정하지 않았다.

## 공개 상태와 이전 버전

**Actions → Build and deploy Academic Pages**에서 최근 실행 결과를 확인한다. 초록색 성공 표시가 나면 실제 사이트를 열어 수정한 페이지·자료를 확인한다. 오류가 나면 해당 실행의 메시지를 먼저 확인한다.

변경을 되돌릴 때는 GitHub에서 해당 변경 요청의 Revert 또는 되돌림 커밋을 사용한다. 과거 기록을 강제로 지우지 않는다. 폼으로 편집하고 미리보기·공개 이력까지 한 화면에서 다루는 후속 설계는 [직접 관리 운영 설계](CONTENT_MANAGEMENT_DESIGN.md)에 정리했다.
