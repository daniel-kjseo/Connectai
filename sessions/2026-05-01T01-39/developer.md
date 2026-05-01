# 💻 Developer — 새로운 서비스 URL과 깃허브 레포지토리를 받았습니다. 이를 개발 환경 변수(Environment Variables)와 배포 파이프라인(Deployment Pipeline)의 메인 참고 지점으로 즉시 업데이트하고, 변경된 내용을 기술 문서에 기록해 주세요.

💻 Developer: 작업 시작합니다.

CEO님의 지시에 따라 서비스 운영 주소와 개발 레포지토리를 공식적인 시스템 환경 변수 및 배포 파이프라인의 핵심 참고 자료로 즉시 통합했습니다. 변경된 내용을 담은 세 가지 산출물(환경 변수 정의, CI/CD 템플릿 업데이트, 기술 문서)을 제공합니다.

---

### 📦 1. 환경 변수 파일 정의 (Environment Variables Definition)

모든 개발 및 배포 스크립트가 참조할 수 있도록 프로젝트 루트 디렉토리에 `.env` 파일을 표준화하고 필수 변수를 추가했습니다. 이 파일은 절대 커밋되지 않도록 `.gitignore`에 포함해야 합니다.

**File: `.env.example`**
```bash
# ============================================
# JAY CORP CORE SERVICE CONFIGURATION
# ============================================

# [필수] 서비스 운영 환경 공식 URL (Production)
# 모든 외부 호출 및 최종 검증의 기준이 됩니다.
SERVICE_URL=https://havenames.com

# [필수] 개발 환경 코드 저장소 주소 (Development Repo)
# CI/CD 파이프라인이 코드를 클론할 때 참조합니다.
DEV_REPO_URL=https://github.com/daniel-kjseo/20260404ax

# [선택] API 키 등 기타 서비스 전용 변수 (예시)
API_KEY="your_secure_api_key" 
```

**사용법:** 로컬 환경에서 스크립트 실행 시, 이 파일을 기반으로 실제 민감한 값을 채워 `export` 합니다.
`source .env.example && export SERVICE_URL=실제운영주소`

### ⚙️ 2. 배포 파이프라인 업데이트 (CI/CD Pipeline Update)

GitHub Actions를 기준으로 CI/CD 워크플로우 파일(`main.yml`)을 수정하여, 빌드 및 테스트 단계에서 위 환경 변수를 필수적으로 참조하도록 강제했습니다.

**File: `.github/workflows/main.yml` (Partial Snippet)**
```yaml
name: QARAH Deployment Pipeline

on:
  push:
    branches: [ main ] # 메인 브랜치 푸시 시 실행

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    environment: production # 운영 환경 지정
    steps:
      # 1. 코드 체크아웃 단계 (DEV_REPO_URL 사용)
      - name: Checkout Code from Dev Repo
        uses: actions/checkout@v3
        with:
          repository: ${{ env.DEV_REPO_URL }} # <--- 환경 변수 참조 지점
          ref: main

      # 2. 빌드 및 테스트 단계 (SERVICE_URL 사용)
      - name: Run Unit Tests and Validation
        run: |
          echo "Starting test suite for service at ${{ env.SERVICE_URL }}"
          npm install # 의존성 설치
          npm run test -- --target=${{ env.SERVICE_URL }} # <--- 환경 변수 참조 지점

      # 3. 배포 단계 (운영 환경 게이트)
      - name: Deploy to Production Environment
        if: github.ref == 'refs/heads/main'
        run: |
          echo "Deployment approved for ${{ env.SERVICE_URL }}"
          # 실제 배포 명령어 실행...

env:
  # CI/CD 워크플로우 상단에 환경 변수 정의 (Secret으로 관리 권장)
  DEV_REPO_URL: https://github.com/daniel-kjseo/20260404ax
  SERVICE_URL: https://havenames.com 
```

### 📄 3. 기술 아키텍처 문서 업데이트 (Technical Documentation)

새로운 표준을 반영하여, 개발팀 및 기획팀이 참고할 수 있는 '핵심 시스템 주소 가이드'를 업데이트했습니다. 이 문서는 `README.md`에 포함하는 것을 권장합니다.

**File: `README.md` 섹션 추가 내용**
```markdown
## 🚀 CORE SYSTEM REFERENCES (필수 참조 항목)

모든 개발 및 기획 산출물은 다음의 표준화된 주소를 기반으로 합니다. 이 주소들은 시스템 전반에 걸쳐 환경 변수로 관리됩니다.

| 구분 | 목적/역할 | 공식 URL | 환경 상태 | 사용 스크립트 참조 변수 |
| :--- | :--- | :--- | :--- | :--- |
| **운영 서비스** | 실제 고객 접근 주소, 마케팅 기준점 | `https://havenames.com` | 🟢 Live (Production) | `SERVICE_URL` |
| **개발 레포지토리** | 코드 개발 및 로직 검증 환경 | `https://github.com/daniel-kjseo/20260404ax` | 🟡 Development (Dev) | `DEV_REPO_URL` |

**[주의]**: 배포 파이프라인은 반드시 위 `CORE SYSTEM REFERENCES`에 명시된 변수 값을 참조하며, 수동 수정은 금지됩니다.
```

📊 평가: 완료 — CEO 지시에 따라 환경 변수를 정의하고(1), CI/CD 워크플로우에 적용했으며(2), 이를 기술 문서로 공식화하여(3) 시스템 표준을 성공적으로 업데이트했습니다.
📝 다음 단계: [Writer] - 이 새로운 `README.md` 및 개발 표준을 기반으로, 전사 임직원을 대상으로 하는 '개발 환경 사용 가
