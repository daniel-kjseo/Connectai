# 💻 Developer — Git 설치 확인 후, 즉시 QARAH 서비스의 로컬 개발 환경을 설정하는 과정을 시작할 것. 기존 GitHub 레포지토리(`https://github.com/daniel-kjseo/20260404ax`)를 클론(clone)하고, 기본 브랜치 구조와 워크플로우 가이드라인을 팀에 제시하여 다음 개발 단계를 명확히 할 것.

💻 Developer: 작업 시작합니다.

CEO 지시에 따라 QARAH 서비스의 로컬 개발 환경을 설정하고, 팀 전체가 따를 수 있는 표준 Git 워크플로우 가이드를 제시합니다. 모든 과정은 터미널 기반으로 진행되어야 하며, 환경 변수를 사용해 보안성을 확보했습니다.

---

### 🚀 1단계: QARAH 서비스 클론 및 초기 의존성 설치

제시된 GitHub 레포지토리를 로컬 개발 머신에 복제합니다. (환경변수 `QARAH_REPO`를 사용하여 레포지토리 주소를 관리합니다.)

```bash
# 1. 작업할 디렉토리로 이동 또는 생성
mkdir -p ~/Projects/QARAH_Service
cd ~/Projects/QARAH_Service

# 2. 레포지토리를 클론 (현재 브랜치인 main을 기본으로 가져옴)
git clone https://${GITHUB_USER}/${REPO_NAME} qarah-service

# 3. 서비스 디렉토리로 이동
cd qarah-service

# 4. 필요한 모든 패키지를 설치합니다. (Node.js 환경 가정)
npm install

# 5. 기본 서버 구동 테스트 (실제 개발 시 사용될 명령어)
npm run dev
```
**💡 사용법:** 위 코드를 순차적으로 실행하고, `npm run dev`가 성공적으로 동작하는지 확인합니다.

### ⚙️ 2단계: QARAH 표준 Git 워크플로우 가이드라인 (Branching Strategy)

안정적인 협업과 히스토리 관리를 위해 **Feature Branch Workflow**를 채택하여 다음 브랜치 구조와 규칙을 의무화합니다.

| 브랜치 이름 | 역할 및 목적 | Merge Source → Target | 설명 |
| :--- | :--- | :--- | :--- |
| `main` (또는 `master`) | **프로덕션 코드:** 배포 가능한 최종 안정 버전만 존재해야 합니다. (가장 신뢰도가 높음) | `develop` $\to$ `main` | 실제 서비스 운영에 사용되는 최신 코드가 머무르는 곳입니다. |
| `develop` | **통합 개발 코드:** 다음 릴리즈 버전에 포함될 모든 기능이 통합되고 테스트를 거치는 스테이징 영역입니다. | `feature/*` $\to$ `develop` | 기능 개발의 주된 합치기(Integration) 지점입니다. |
| `feature/task-id-short-desc` | **개별 기능 구현:** 새로운 기능을 추가하거나 버그를 수정할 때 반드시 이 브랜치를 생성하여 작업합니다. (예: `feature/JAY-005-api-refactor`) | `develop` $\to$ `feature/...` | 개발자는 항상 자신의 `feature/*` 브랜치에서만 코드를 작성해야 합니다. |
| `hotfix/issue-description` | **긴급 패치:** 운영 환경(`main`)에서 발견된 치명적인 버그를 즉시 수정할 때 사용합니다. | `main` $\to$ `hotfix/...` | 가장 빠르게 작동하는 임시 방편(Patch)을 적용한 후, 반드시 `develop`와 병합해야 합니다. |

**✅ 워크플로우 요약 순서:**
1.  개발 시작: `git checkout develop` $\to$ `git pull origin develop` $\to$ `git switch -c feature/task-id-short-desc`
2.  작업 완료 및 공유: 기능 개발 후, Pull Request (PR)를 생성하여 `develop` 브랜치에 병합을 요청합니다.
3.  릴리즈 준비: 충분한 테스트가 완료된 `develop` $\to$ `main`으로 최종 승인(Merge & Tagging)합니다.

### 📄 3단계: 개발팀 공지 (README 업데이트 및 공유)

이 가이드라인은 프로젝트 루트 디렉토리의 **README.md**에 공식적으로 추가되어 모든 팀원이 항상 볼 수 있도록 합니다.

```markdown
# QARAH Service Development Guide

## 🛠️ Setup Instructions
1. Clone the repository: `git clone https://github.com/daniel-kjseo/20260404ax`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## 🚀 Standard Git Workflow (Mandatory)
We adopt a Feature Branch Workflow for stable and traceable development.

**Branching Rules:**
- **Never commit directly to `main` or `develop`.** All changes must go through a dedicated feature branch (`feature/*`).
- **Development Flow:** `develop` $\to$ `feature/new-task` $\xrightarrow{PR}$ `develop` $\to$
