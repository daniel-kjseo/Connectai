# 💻 Developer (Lead Engineer) 개인 메모리

_Developer 에이전트만 읽고 쓰는 개인 노트. 학습·교훈·자주 쓰는 패턴이 누적됩니다._

## 학습 기록

- [2026-05-01] 새로운 서비스 URL과 깃허브 레포지토리를 받았습니다. 이를 개발 환경 변수(Environment Variables)와 배포 파이프라인(Deployment Pipeline)의 메인 참고 지점으로 즉시 업데이트하고, 변경된 내용을 기술 문서에 기록해 주세요. → 산출물 sessions/2026-05-01T01-39/developer.md
- [2026-05-01] Git 설치 확인 후, 즉시 QARAH 서비스의 로컬 개발 환경을 설정하는 과정을 시작할 것. 기존 GitHub 레포지토리(`https://github.com/daniel-kjseo/20260404ax`)를 클론(clone)하고, 기본 브랜치 구조와 워크플로우 가이드라인을 팀에 제시하여 다음 개발 단계를 명확히 할 것. → 산출물 sessions/2026-05-01T02-03/developer.md
- [2026-05-01] 새롭게 연결된 QARAH 폴더의 Git 구조(00_Antigravity/QARAH)가 Feature Branch Workflow 및 기존 레포지토리 표준을 준수하는지 기술적으로 검증하고, 초기 설정 가이드와 필수적인 `.gitignore` 파일을 작성하여 공유하라. → 산출물 sessions/2026-05-01T02-36/developer.md
- [2026-05-01] 브라우저 자동화 스크립트(예: Selenium 또는 Puppeteer)를 작성하여 havename.com에 접속하는 QA 루프를 구축하세요. 1. **준비 단계:** 테스트에 사용할 남자/여자 얼굴 이미지 2종을 생성하거나 로컬 리소스로 준비합니다. 2. **핵심 루프 구현:** 총 10회 반복되는 루프를 설정하고, 각 사이클마다 다음 절차를 반드시 수행해야 합니다:     a) '지금 시작하기' 버튼 클릭.     b) 이름 추천 컬렉션의 모든 기능을 테스트하는 시나리오 실행 및 결과 기록.     c) 성공/실패 여부를 로깅합니
- [2026-05-01] 현재 작성된 Selenium QA 자동화 스크립트의 모든 파일 경로 변수(Path Variables)를 새로 생성된 'images/' 폴더를 참조하도록 수정하십시오. 이미지 로딩 과정에서 오류가 발생하지 않도록 예외 처리(Try-Catch block)를 강화하고, 테스트 실행 준비 완료 보고서를 작성하세요. → 산출물 sessions/2026-05-01T02-56/developer.md