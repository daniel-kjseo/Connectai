# 💻 Developer — Researcher가 식별한 성능 병목 지점을 최우선적으로 해결하는 데 집중하고, 특히 이름 추천 결과 페이지의 로딩 속도를 최소 30% 이상 개선하는 코드와 자동화 테스트 코드를 작성하여 QA 팀과 공유할 준비를 하시오. (KPI: Page Load Time 감소)

💻 Developer: 작업 시작합니다.

CEO 지시에 따라 가장 시급한 성능 병목 지점인 **'이름 추천 결과 페이지 로딩 속도'** 개선 및 자동화 테스트 코드를 작성했습니다. 이 스크립트는 현재의 로딩 시간을 측정하고, 잠재적인 최적화 포인트(예: 비동기 처리 가상화)를 검증할 수 있도록 설계되었습니다.

QA 팀은 이 코드를 활용하여 **Baseline 성능 측정 → 가설 기반 개선 적용 (Mocking/Debounce Test) → 재측정**의 사이클을 돌려 KPI 30% 감소 목표 달성 여부를 확인해야 합니다.

### 🛠️ 1. Python Selenium 자동화 테스트 코드 (Performance Testing Script)

이 스크립트는 페이지 로딩 시간을 측정하는 `measure_load_time` 함수를 중심으로 구성되었습니다.

```python
# performance_test_qa.py
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 환경변수 설정 (실제 운영 주소 사용)
BASE_URL = "https://havenames.com" 
# 이미지 폴더 경로는 이미 준비되었다고 가정합니다.
IMAGE_DIR = "./images/"

def setup_driver():
    """WebDriver 초기화 및 최적 설정을 적용합니다."""
    options = webdriver.ChromeOptions()
    # headless 모드를 사용하여 CI/CD 환경에서 테스트 가능하게 합니다.
    options.add_argument("--headless") 
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=options)
    return driver

def measure_load_time(driver: webdriver.Chrome, selector: str, wait_timeout: int = 15) -> float:
    """특정 요소가 나타나기까지의 시간을 측정합니다."""
    print(f"[{selector}] 로딩 시작...")
    start_time = time.time()
    try:
        # WebDriverWait를 사용하여 지정된 Selector가 나타날 때까지 기다림 (명시적 대기)
        WebDriverWait(driver, wait_timeout).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, selector))
        )
        end_time = time.time()
        return end_time - start_time
    except Exception as e:
        print(f"🚨 로딩 실패: {e}")
        return 0.0

def run_performance_test(driver: webdriver.Chrome):
    """전체 성능 테스트 루프를 실행합니다."""
    # 1. 메인 페이지 접속 및 준비 (Start Button 클릭)
    print("--- [Phase 1] 서비스 시작 전 로딩 측정 ---")
    driver.get(BASE_URL)
    # '지금 시작하기' 버튼의 Selector를 사용한다고 가정합니다.
    start_button_selector = "div[data-qa='start-button'] button" 
    time.sleep(1) # 초기 페이지 로딩 시간 측정 (필요시 주석 해제)
    
    # 실제 클릭 동작 시뮬레이션: 버튼을 찾고 클릭합니다.
    try:
        WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, start_button_selector))).click()
    except Exception as e:
        print(f"⚠️ 시작 버튼 클릭 실패. Selector 확인 필요: {e}")

    # 2. 이름 추천 결과 페이지 로딩 시간 측정 (핵심 병목 구간)
    print("\n--- [Phase 2] 핵심 병목 지점 (결과 페이지) 로딩 시간 측정 ---")
    # 예시 Selector: 모든 이름 컬렉션이 성공적으로 표시되는 영역을 지정합니다.
    result_collection_selector = "#name-recommendation-area .name-card" 
    load_time = measure_load_time(driver, result_collection_selector)

    print("\n=========================================")
    if load_time > 0:
        print(f"✅ 측정 완료. 결과 페이지 로딩 시간 (Baseline): {load_time:.2f} 초")
        # KPI 목표 설정 및 보고
        target_improvement = 0.3 # 30% 개선 목표
        required_max_time = load_time * (1 - target_improvement)
        print(f"🎯 KPI 목표: 로딩 시간 {required_max_time:.2f} 초 이하 달성 필요.")
    else:
        print("❌ 테스트에 실패했거나 데이터를 측정할 수 없습니다. 원인 분석이 필요합니다.")
    print("=========================================")

if __name__ == "__main__":
    driver = setup_driver()
    try:
        run_performance_test(driver)
    finally:
        driver.quit()
```

### 📝 2. QA 팀 실행 가이드 및 개선 전략 (Action Plan for QA Team)

| 단계 | 목표 및 목적 | 개발팀 액션 (QA 수행) | 기대 효과 (KPI 달성 기여) |
| :---: | :--- | :--- | :--- |
| **Step 1** | **Baseline 측정** | 위 스크립트를 실행하여 `result_collection_selector`가 나타나기까지의 시간을 정확히 기록합니다. (현재 로딩 시간 확보) | 현재 시스템 성능 지표(Latency) 수치화. |
| **Step 2** | **최적화 가설 검증 I: 캐싱/비동기 테스트** | 백엔드 API 호출 시, 데이터가 한 번에 오는 것이 아니라 *청크(Chunk)* 단위로 분할되어 오도록 모의 환경을 설정하고 스크립트를 재실행합니다. (Front-end에서 비동기로 데이터를 처리하는지 확인) | 클라이언트 측 부하를 줄이고 체감 속도를 개선. |
| **Step 3** | **최적화 가설 검증 II: Debounce/Throttle 테스트** | 만약 이름 검색 필터링 기능이 있다면, 사용자가 키를 누르는 간격에 따라 API 호출을 제한하는 `Debounce` 로직을 적용하고 성능을 측정합니다. (불필요한 과부하 방지) | 불필요한 네트워크 요청 횟수를 줄여 서버 부하 및 지연 시간을 감소. |
| **Step 4** | **최종 검증** | Step 2와 Step 3에서 개선된 로직이 적용된 환경에서 스크립트를 재실행하고, 측정 시간이 목표치(Baseline * 0.7) 이하인지 확인합니다. | KPI 달성 여부 확정 및 코드 병합 준비. |

---
📊 평가: 진행중 — 코드를 작성했으나, 실제 백엔드 API의 구조와 성능 데이터를 알 수 없어 '최적화'가 아닌 '측정 프레임워크'를 제공하는 것으로 목표를 설정했습니다.
📝 다음 단계: QA 팀에 위 스크립트와 가이드를 전달하고, 1차 Baseline 측정 결과를 받아 오거나, 백엔드 개발팀으로부터 성능 저하의 원인이 되는 **특정 API 엔드포인트**와 그 데이터 구조(Payload)를 확보해야 합니다.
