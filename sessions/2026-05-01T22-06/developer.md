# 💻 Developer — 명함 디자인 에셋이 동적으로 생성될 수 있도록 기술 설계를 진행합니다. 이름 데이터(사용자 입력값)를 받아와서, 지정된 템플릿에 맞춰 실시간으로 이미지를 렌더링하는 API 엔드포인트 구조와 프론트엔드의 컴포넌트 스켈레톤을 설계하고 필요한 로직 흐름도를 작성해 주세요.

💻 Developer: 작업 시작합니다.

CEO 지시에 따라, 이름 명함 디자인 에셋을 동적으로 생성하기 위한 기술 설계(Technical Design)를 완료했습니다. 이 설계는 **클라이언트-서버 간의 데이터 흐름**과 **핵심 컴포넌트 구조**, 그리고 **API 인터페이스 정의**를 포함하며, 즉시 개발 환경에 적용할 수 있는 수준으로 작성되었습니다.

---

## 📜 1. 아키텍처 및 로직 흐름도 (Flow Diagram)

이 기능은 사용자가 이름 데이터를 입력하고 '미리보기' 버튼을 누르는 순간부터 최종 이미지를 받는 과정까지를 다룹니다. **Puppeteer** 또는 유사한 Headless Browser 라이브러리를 서버사이드 렌더링(Server-Side Rendering, SSR)에 활용하는 것을 전제로 설계했습니다.

```mermaid
sequenceDiagram
    participant User
    participant Client (React/Vue)
    participant API Gateway
    participant Render Service (Backend)
    participant Data Source (DB/API)

    User->>Client: 1. 이름 데이터 입력 및 '미리보기' 요청
    Client->>API Gateway: 2. POST /api/v1/asset/generate { name, styleId, format }
    Note over API Gateway: Rate Limiting & Auth Check
    API Gateway->>Render Service: 3. Job Queueing (Async Task)
    Render Service->>Data Source: 4. 이름 의미 및 부가 정보 조회 (DB Call)
    Data Source-->>Render Service: 5. Name Meaning Data 반환
    Note over Render Service: HTML Template + API 데이터 결합
    Render Service->>Render Service: 6. Headless Browser를 이용한 이미지 렌더링 (HTML -> PNG/JPEG)
    Render Service->>API Gateway: 7. Base64 인코딩된 Image Asset 반환
    API Gateway-->>Client: 8. 응답 완료 (Image Data)
    Client->>User: 9. 실시간 명함 이미지 미리보기 표시 및 저장 CTA 활성화
```

---

## ⚙️ 2. 백엔드 API 엔드포인트 설계 (Backend Specification)

**목적:** 입력된 이름과 스타일 파라미터를 기반으로 고품질의 명함 이미지를 비동기적으로 생성하여 반환합니다.

### A. 엔드포인트 정의
*   **Method:** `POST`
*   **URL:** `/api/v1/asset/generate`
*   **설명:** 이름 데이터를 받아 동적 이미지 생성을 요청하는 API.

### B. Request Schema (요청 바디)
```json
{
  "name": "사용자가 입력한 이름",       // 필수: Name data (String)
  "meaning_focus": "선택된 의미의 키워드", // 선택: 예시 - '신뢰', '열정'
  "style_id": "selected_template_v2",    // 필수: 디자인 템플릿 식별자 (String)
  "format": ["business_card", "profile"], // 필수: 생성할 에셋 포맷 배열 (Array of Strings)
  "user_id": 12345                      // 보안/로그 추적용 사용자 ID
}
```

### C. Response Schema (응답 바디)
성능 최적화를 위해, 이미지는 Base64로 인코딩하여 한 번의 응답으로 전송합니다.

**Success Case (200 OK):**
```json
{
  "status": "success",
  "message": "Asset rendering completed successfully.",
  "data": [
    {
      "format": "business_card",
      "asset_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA...", // Base64 Image Data
      "alt_text": "이름 명함 디자인 에셋"
    },
    {
      "format": "profile",
      "asset_url": "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAA...", // Base64 Image Data
      "alt_text": "이름 프로필 에셋"
    }
  ],
  "metadata": {
    "render_time_ms": 1500, // 성능 측정용
    "timestamp": "2026-05-XXT12:00:00Z"
  }
}
```

---

## 💻 3. 프론트엔드 컴포넌트 스켈레톤 (React/TypeScript)

실제 '소유감'을 느끼는 핵심 UI 영역입니다. `NameCardGenerator` 컴포넌트는 상태 관리와 API 호출 로직을 담당합니다.

```tsx
// src/components/ui/NameCardGenerator.tsx
import React, { useState, useCallback } from 'react';
import axios from 'axios';

interface NameDataState {
  name: string;
  meaningFocus: string;
  styleId: string;
}

const NameCardGenerator: React.FC = () => {
  // 1. State Management for Input Data
  const [input, setInput] = useState<NameDataState>({
    name: '',
    meaningFocus: '신뢰', // Default value from Writer/Secretary analysis
    styleId: 'selected_template_v2'
  });

  // 2. State Management for Results and Loading Status
  const [previewAsset, setPreviewAsset] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 3. Core API Interaction Function
  const generateCard = useCallback(async () => {
    if (!input.name || !input.styleId) {
      setError("이름과 스타일을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setPreviewAsset(null);
    setError(null);

    try {
      // API 호출: 서버가 비동기적으로 이미지를 렌더링하도록 요청
      const response = await axios.post<any>('/api/v1/asset/generate', input);

      if (response.data.status === 'success' && response.data.data.length > 0) {
        // 첫 번째 포맷(명함)을 우선하여 미리보기로 사용
        const base64Image = response.data.data[0].asset_url;
        setPreviewAsset(base64Image);
      } else {
        throw new Error("이미지 생성에 실패했습니다. 서버 로그를 확인해주세요.");
      }

    } catch (err) {
      console.error("Generation Error:", err);
      setError((err as Error).message || "네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [input]); // input이 변경될 때마다 generateCard 함수를 재정의

  // 4. Render Logic (UI)
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      {/* Input Form Area */}
      <h3 className="text-2xl font-display mb-6">✨ 나만의 자산 만들기</h3>
      {/* ... (Input fields for Name, Meaning Focus, Style ID) ... */}

      <button 
        onClick={generateCard} 
        disabled={isLoading}
        className={`px-8 py-3 text-lg rounded-full transition ${isLoading ? 'bg-gray-400' : 'bg-[#B8964E] hover:bg-[#A3884D]'}`}
      >
        {isLoading ? '🎨 렌더링 중...' : '명함 디자인 미리보기'}
      </button>

      {/* Preview Area */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h4 className="text-xl font-display mb-4">🖼️ 생성된 결과물 (Asset Preview)</h4>
        
        {error && <p className="text-red-500">{error}</p>}
        {!previewAsset && !isLoading && <p className="text-gray-500 italic">여기에 당신의 이름이 담긴 명함 디자인이 나타납니다.</p>}
        
        {previewAsset && (
          <div className="relative border-4 border-[#0A1931] bg-cream-white p-8 max-w-md mx-auto">
            <img 
              src={previewAsset} 
              alt="Generated Business Card Asset" 
              className="w-full h-auto object-cover rounded-lg shadow-xl" 
            />
            {/* 다운로드 및 구매 CTA */}
            <div className="mt-4 text-center">
                <button className="bg-[#0A1931] text-white py-2 px-6 rounded mr-2 hover:opacity-90">
                    다운로드 (PNG)
                </button>
                 <button className="border border-[#B8964E] text-[#B8964E] py-2 px-6 rounded hover:bg-yellow-50">
                    프리미엄 패키지 구매
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NameCardGenerator;
```

---
📊 평가: 진행중 — API 엔드포인트 및 컴포넌트 스켈레톤을 성공적으로 설계했으나, 실제 이미지 렌더링 엔진(Headless Browser 설정)의 구축과 테스트는 다음 단계에서 별도의 구현 작업이 필요합니다.
📝 다음 단계: 백엔드 개발팀에게 위 `/api/v1/asset/generate` 엔드포인트의 **이미지 렌더링 로직 (Puppeteer 등)**을 구현하도록 요청하고, 초기 단위 테스트 케이스를 정의해야 합니다.
