# 🎨 Designer — 확정된 브랜드 시스템을 기반으로, 동적 명함 및 프로필 이미지 Mockup 디자인 컴포넌트를 개발하여 프론트엔드에 적용합니다. 이 컴포넌트는 사용자가 자신의 이름 데이터를 입력했을 때 실시간으로 고급스럽고 설득력 있는 '개인 자산'처럼 보이도록 시각화하는 데 초점을 맞춰야 하며, 특히 CTA 근처의 배치와 인터랙션을 설계해주세요.

🎨 Designer: 작업 시작합니다.

## 🖼️ Mockup 컴포넌트 디자인 및 인터랙션 설계 보고서
(Component Design & Interaction Flow Report)

이번 단계의 목표는 개발팀이 구축한 동적 API (`/api/v1/asset/generate`)를 활용하여, 사용자가 자신의 이름 결과를 단순히 '본 것'에서 '소유하고 싶은 개인 자산'으로 인식하게 만드는 **최고 수준의 시각화 경험**을 제공하는 것입니다.

핵심 원칙은 **"불완전함 속의 완벽함을 제시하라 (Show the Potential)"** 입니다. 기본 결과물만으로는 만족감을 극대화할 수 없으며, Mockup 미리보기 자체가 유료 전환의 근거가 되어야 합니다.

---

### 💡 I. 디자인 시스템 및 컴포넌트 정의

#### 1. 브랜드 톤앤매너 적용 (Premium Utility)
*   **컬러 팔레트:**
    *   `Primary`: `#0A1931` (Deep Navy - 신뢰, 깊이)
    *   `Accent-Gold`: `#C2B280` (Soft Gold/Brass - 고급스러움, 가치)
    *   `Background`: `#F7FAFC` (Clean White/Gray - 명료함)
    *   `Action`: `Transparent` -> `Solid #E63946` (구매 CTA 강조)
*   **타이포그래피:**
    *   헤딩: Pretendard Bold / Noto Sans KR ExtraBold (강력한 임팩트)
    *   본문: Pretendard Regular (가독성, 모던함)

#### 2. Mockup 컴포넌트 구조 (`<MockupCard>`)
이 컴포넌트는 이름 추천 결과 페이지의 핵심 영역(CTA 바로 위)에 위치하며, 사용자의 시선 흐름을 따라 자연스럽게 노출되어야 합니다.

| 영역 | 역할 및 기능 | 디자인 가이드라인 |
| :--- | :--- | :--- |
| **`MockupViewWrapper`** (전체 컨테이너) | Mockup의 전반적인 '프레임' 역할을 수행하며, 사용자가 이 영역에서 돈을 쓸 수 있다는 인지적 경계를 만듭니다. | 배경은 은은한 텍스처(Paper texture/Subtle gradient)를 적용하여 디지털화된 종이 같은 느낌 부여. |
| **`PreviewImageContainer`** (시각 결과물) | 실시간으로 API가 생성한 이미지(명함, 프로필 카드)가 배치되는 영역입니다. 모바일/웹 탭 전환 기능 포함. | 이미지를 마치 '전시품'처럼 중앙에 크게 배치하고, 주변 여백을 충분히 확보하여 고가 제품 같은 느낌 부여. |
| **`AssetInfoDisplay`** (데이터 증명) | 사용자가 무료로 얻은 이름의 데이터를 시각적으로 정리해 보여줍니다. Mockup에서 강조된 요소와 연결됩니다. | 3~4개의 핵심 데이터 포인트를 아이콘과 함께 배치하고, 각 포인트에 `[Premium Feature]`가 적용될 여지를 남깁니다. (예: "깊이"는 무료로 보지만, "활용 스토리텔링"은 유료). |
| **`ConversionCTA`** (구매 유도) | 가장 중요한 영역입니다. 사용자의 만족감(High Emotion)을 구매 동기(Utility Loss Aversion)로 연결합니다. | 'Upgrade' 버튼이 아니라, **'나의 자산을 완성하기'**와 같은 서사적 문구를 사용해야 합니다. |

---

### ✨ II. 핵심 인터랙션 플로우 (The Persuasive Journey)

가장 중요한 것은 단순히 Mockup을 보여주는 것이 아니라, *사용자가 스스로 결제를 필요로 느끼게 만드는* 동적인 경험입니다.

**[시나리오: 사용자 A의 이름 추천 결과 확인]**

1.  **Step 0: 기본 정보 노출 (Passive View)**
    *   사용자는 `AssetInfoDisplay`를 통해 자신이 찾던 핵심 키워드(예: '슬기로움', '맑음')를 만족스럽게 확인합니다.
    *   `MockupCard`가 배경의 은은한 텍스처 위로 부드럽게 나타납니다.

2.  **Step 1: Mockup 미리보기 (The Hook - Initial Display)**
    *   `PreviewImageContainer`에 API 기반의 **'기본 버전' Mockup 이미지**가 로드됩니다. 이 이미지는 깔끔하지만, 어딘지 모르게 '미완성'한 느낌을 의도적으로 줍니다.
    *   `AssetInfoDisplay`에서 가장 강력하고 감성적인 메시지(예: "이름의 깊은 서사") 옆에 **작은 `[Pro]` 배지**를 표시합니다. (무료와 유료 요소의 경계 설정)

3.  **Step 2: 인터랙션 발생 (The Discovery - 핵심 전환점)**
    *   사용자가 Mockup을 자세히 보기 위해 마우스를 올리거나(Hover), '더 보기' 버튼을 클릭할 때, 컴포넌트가 **'확대/변형(Zoom/Transform)'** 됩니다.
    *   `MockupCard` 전체의 배경이 미묘하게 바뀌면서 (예: 은은한 금박 엠보싱 효과 추가), 숨겨져 있던 **'프리미엄 버전 레이아웃'** 이 나타납니다.
    *   동시에 `AssetInfoDisplay`에서 `[Pro]` 배지가 붙었던 요소들이 풀 스펙의 상세 정보로 확장되며, 마치 '숨겨진 보석'을 발견한 듯한 느낌을 줍니다.

4.  **Step 3: 구매 유도 (The Resolution - CTA)**
    *   변형된 프리미엄 레이아웃 하단에 `ConversionCTA`가 명확하게 나타납니다.
    *   텍스트 예시: "이 특별한 자산을 **완벽한 형태로 소유하세요.**"
    *   버튼 1 (Primary): **[Premium Mockup 다운로드]** (클릭 시 결제 플로우 시작)
    *   버튼 2 (Secondary): [다른 이름 조합 탐색] (사용자가 떠나지 않게 하는 안전장치)

---

### 💻 III. 프론트엔드 컴포넌트 스케마티즘 (React/Vue 구조 예시)

```jsx
// Component: MockupCard.jsx
import React, { useState } from 'react';
import { useAssetData, useApiGenerateMockup } from '../hooks'; 

const MockupCard = ({ nameData }) => {
  const [isPremiumView, setIsPremiumView] = useState(false); // 핵심 상태 관리
  const { basicResultData, premiumFeatures } = useAssetData();
  // 개발팀 API 호출 Hook (Mockup 데이터 로딩)
  const { mockupImageUrl, isLoading } = useApiGenerateMockup(nameData.user_name); 

  if (isLoading) return <div className="mockup-loading">✨ 당신의 이름 자산을 생성 중입니다...</div>;

  return (
    <section className={`mockup-card ${isPremiumView ? 'premium' : ''}`}>
      {/* 1. Mockup 미리보기 영역 */}
      <div className="preview-container">
        <img src={mockupImageUrl} alt="Mockup Preview" className={`mockup-image ${isPremiumView ? 'premium-effect' : 'basic-effect'}`} />
        <button onClick={() => setIsPremiumView(true)} className="toggle-btn">
            {/* 💡 Hover/Click 시 Premium View로 전환 */}
          {isPremiumView ? "⭐ 프리미엄 보기" : "✨ 디자인 확장하기"}
        </button>
      </div>

      {/* 2. 정보 증명 및 CTA 영역 */}
      <div className="asset-details">
        <h3>당신의 이름이 담고 있는 가치</h3>
        
        {/* AssetInfoDisplay: 기본 데이터 + Pro Feature 강조 */}
        <div className="data-grid">
          {basicResultData.map(item => (
            <div key={item.key} className={`data-point ${item.isPro ? 'pro-highlight' : ''}`}>
              <h4>{item.title}</h4>
              <p>{item.value}</p>
              {item.isPro && <span className="badge">[Premium]</span>} {/* Pro 배지 */}
            </div>
          ))}
        </div>

        {/* ConversionCTA: 사용자가 결제를 해야 하는 이유를 제시 */}
        <div className={`conversion-cta ${isPremiumView ? 'active' : ''}`}>
          <p>이 모든 아름다움을 완성하고, 당신만의 **고유한 자산**으로 소유하세요.</p>
          <button onClick={() => console.log("Initiate Checkout")} className="btn-primary">
            💎 Mockup 전체 구매 및 다운로드 ({/* 가격 표시 */})
          </button>
        </div>
      </div>
    </section>
  );
};

export default MockupCard;
```

---
📊 평가: 완료 — 디자인 컴포넌트의 구조, 인터랙션 플로우, 그리고 전환 유도 장치까지 구체적으로 설계하여 목표를 달성했습니다.
📝 다음 단계: Secretary 에이전트가 제시할 '스토리텔링 가이드라인'을 이 MockupCard에 통합하고, 결제 페이지(Checkout Flow)의 문구를 다듬는 작업이 필요합니다.
