# 💰 Business — QARAH 서비스의 공식 저장소 연결을 바탕으로 프로젝트 로드맵과 핵심 목표를 업데이트하고, 이 구조가 향후 비즈니스 기능 확장(Scope Creep 방지)에 미치는 영향을 분석하여 전체 팀에 공유할 준비를 하라.

💰 Business: 작업 시작합니다.

## 🚀 QARAH 프로젝트 거버넌스 및 로드맵 업데이트 보고서

CEO 지시에 따라 현재의 기술적 구조를 비즈니스 목표와 연결하여, 향후 기능 확장이 무분별한 Scope Creep으로 이어지는 것을 막고 수익화에 최적화된 로드맵을 수립했습니다. 본 문서는 팀 전체 공유용 최종안입니다.

---

### 1. [핵심 업데이트] QARAH 비즈니스 목표 기반 로드맵 (Roadmap by Value)

기존의 기능 중심 로드맵(Feature-based)에서 **가설 검증 및 수익화 단계 중심** 로드맵(Hypothesis-driven)으로 전환합니다. 각 단계는 반드시 선행 KPI 달성을 전제로 합니다.

| Phase | 기간 (예상) | 핵심 목표 (Goal) | 범위 (Scope Focus) | 필수 성공 지표 (KPI) |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 1: MVP 검증** | TBD (Next Sprint) | 시장의 핵심 페인 포인트(Pain Point) 해결 및 초기 사용자 확보. | Core 기능 셋업, Onboarding Flow 최적화, 최소한의 결제 시스템 연동 준비. | DAU (Daily Active Users), Activation Rate (>X%), Bounce Rate 감소. |
| **Phase 2: 수익 모델 검증** | TBD (+1~2개월) | 가설로 설정된 수익화 모델(예: 프리미엄 기능, B2B 라이선스)의 유효성 검증 및 매출 발생. | *Pricing Model* 적용, 결제 게이트웨이 고도화, 핵심 트래픽 유지/확보 기능 구현. | **Conversion Rate (CVR)**, ARPU (Average Revenue Per User), Retention Rate (>Y%). |
| **Phase 3: 확장 및 규모화** | TBD (+3개월~) | 검증된 수익 모델을 기반으로 시장 점유율 확대 및 신규 비즈니스 영역 진출. | 파트너사 연동 API 완성, 대규모 트래픽 대응 아키텍처 개선, 새로운 서비스 라인 추가. | LTV (Lifetime Value), CAC (Customer Acquisition Cost) 절감률, MRR 성장률. |

**📌 행동 지침:** 모든 개발 리소스는 Phase 1의 KPI 달성에 집중하며, 다음 단계로의 진입은 반드시 정량적 데이터(KPI)를 통해 승인받아야 합니다.

### 2. [위험 관리] Scope Creep 방지 및 변경 요청 프로세스 (Change Request Governance)

기술팀이 자유롭게 기능을 추가하는 것은 좋지만, 비즈니스 우선순위를 벗어난 기능은 자원 낭비(Scope Creep)를 초래합니다. 모든 신규 요구사항은 아래의 '변경 승인 게이트'를 통과해야 합니다.

#### A. Feature Tier 분류 기준
| 레벨 | 정의 (Definition) | 비즈니스 우선순위 | 개발 강제성 | 예시 |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | **Must Have:** MVP 및 핵심 KPI 달성에 절대적으로 필요한 기능. | 🔴 최고 (High ROI / Critical) | 필수 반영 | 사용자 가입, 핵심 검색 기능, 결제 프로세스. |
| **P1** | **Should Have:** 매출 증대 또는 UX 개선에 크게 기여하나, 당장 없어도 서비스가 유지되는 기능. | 🟡 높음 (Medium-High ROI) | 검토 후 반영 | 고급 분석 리포트 제공, 특정 플랫폼 연동 (예: Slack
