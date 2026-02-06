# 🏔️ WithUs - 여행 동행 플랫폼

**MZ세대를 위한 신뢰 기반 여행 동행 플랫폼**

---

## 📋 목차
- [프로젝트 개요 및 최종 목표](#-프로젝트-개요-및-최종-목표)
- [최종 기술 스택 및 환경](#-최종-기술-스택-및-환경)
- [MVP 범위 확정](#-mvp-범위-확정)
- [페이지/영역별 핵심 기능 및 API 역할 분담](#-페이지영역별-핵심-기능-및-api-역할-분담)

---

## 🎯 프로젝트 개요 및 최종 목표

### 서비스 핵심 가치
**콘텐츠(추천) → 계획(플래너) → 연결(동행) → 관리(내 여행)**

WithUs는 여행을 계획하고, 동행자를 찾고, 함께 여행을 준비하는 전 과정을 하나의 플랫폼에서 제공하는 종합 여행 동행 서비스입니다.

### 핵심 목표

#### 1. 신뢰 기반 매칭 시스템 구축
- **본인 인증 마크**: 신원 확인을 통한 안전성 확보
- **매너 온도 시스템**: 여행 후 상호 평가를 통한 신뢰도 시각화
- **여행 완주 배지**: 실제 여행 이력 기반 신뢰성 검증
- **키워드 리뷰**: '시간 엄수', '친절함' 등 정성적 평가 시스템

#### 2. 콘텐츠 중심의 여행 계획
- **Recipe 시스템**: 검증된 여행 일정을 내 플래너로 가져오기
- **Deep Copy 방식**: 원본과 독립적인 나만의 여행 계획 생성
- **자동 날짜 조정**: 내 여행 시작일에 맞춰 전체 일정 자동 재배치
- **테마 큐레이션**: #인생샷코스, #가성비배낭여행 등 비주얼 중심 추천

#### 3. 실시간 협업 및 소통
- **공동 체크리스트**: 동행자와 함께 준비물 실시간 관리
- **통합 알림 시스템**: Web Push를 통한 즉각적인 알림 전달
- **커뮤니티 피드**: 인스타그램 스타일의 여행 정보 공유
- **플래너 연동**: 모집글에 여행 일정 자동 노출

#### 4. PWA 기반 오프라인 지원
- **오프라인 캐싱**: 현지에서 인터넷 없이도 일정 확인 가능
- **A2HS (Add to Home Screen)**: 네이티브 앱과 같은 사용자 경험
- **백그라운드 동기화**: 오프라인 수정 내용 자동 동기화
- **푸시 알림**: 브라우저 종료 상태에서도 알림 수신

### 최종 비전
WithUs는 단순한 동행 매칭을 넘어, **여행의 전 과정을 함께하는 통합 플랫폼**으로 성장하여 MZ세대의 새로운 여행 문화를 선도합니다.

---

## 🛠️ 최종 기술 스택 및 환경

### Frontend

#### Core Framework
- **Next.js 16.1.1** - React 기반 풀스택 프레임워크
- **React 19.2.3** - UI 라이브러리
- **TypeScript 5** - 타입 안정성 확보

#### Styling & UI
- **Tailwind CSS 4** - 유틸리티 기반 CSS 프레임워크
- **Radix UI** - 접근성 높은 헤드리스 컴포넌트 라이브러리
  - Dialog, Dropdown, Popover, Tabs, Tooltip 등 20+ 컴포넌트
- **Lucide React** - 아이콘 라이브러리
- **Motion (Framer Motion 12.23.26)** - 애니메이션 라이브러리
- **class-variance-authority** - 조건부 스타일링
- **tailwind-merge** - Tailwind 클래스 병합 유틸리티

#### State Management & Data Fetching
- **React Hook Form** - 폼 상태 관리
- **date-fns** - 날짜 처리 라이브러리

#### UI Components & Features
- **Recharts** - 차트 및 데이터 시각화
- **Embla Carousel** - 캐러셀 컴포넌트
- **React Day Picker** - 날짜 선택기
- **React Responsive Masonry** - 반응형 메이슨리 레이아웃
- **Sonner** - 토스트 알림
- **Vaul** - 드로어 컴포넌트
- **cmdk** - 커맨드 팔레트
- **next-themes** - 다크모드 지원

### Backend

#### Core Framework
- **Spring Boot 3.5.9** - Java 기반 백엔드 프레임워크
- **Java 17** - LTS 버전

#### Database & ORM
- **Spring Data JPA** - ORM 및 데이터 접근 계층
- **PostgreSQL** - 관계형 데이터베이스

#### Security & Authentication
- **Spring Security** - 인증 및 인가
- **JWT (jjwt 0.11.5)** - 토큰 기반 인증
  - jjwt-api, jjwt-impl, jjwt-jackson

#### Real-time Communication
- **Spring WebSocket** - 실시간 양방향 통신

#### Validation & Tools
- **Spring Validation** - 데이터 검증
- **Lombok** - 보일러플레이트 코드 감소
- **Spring DevTools** - 개발 생산성 향상

#### Build Tool
- **Gradle** - 빌드 자동화 도구

### Development Environment

#### Version Control
- **Git** - 버전 관리 시스템

#### IDE & Tools
- **VS Code** - 프론트엔드 개발 환경
- 추천 익스텐션: ESLint, Prettier, Tailwind CSS IntelliSense

### Deployment (예정)

#### Frontend
- **Vercel** 또는 **Netlify** - Next.js 최적화 배포
- **PWA 지원** - Service Worker, Web Manifest

#### Backend
- **AWS EC2** 또는 **Railway** - 서버 호스팅
- **AWS RDS** - PostgreSQL 관리형 데이터베이스
- **Docker** - 컨테이너화 (선택사항)

#### CI/CD
- **GitHub Actions** - 자동화된 빌드 및 배포

---

## 🎯 MVP 범위 확정

### Phase 1: 핵심 기능 구현 (현재 진행 중)

#### ✅ 완료된 기능
1. **랜딩 페이지**
   - 서비스 소개 및 가치 제안
   - 큐레이션 섹션
   - 리뷰 모멘트 섹션
   - 트렌딩 여행지 섹션
   - CTA (Call-to-Action) 섹션

2. **동행 찾기 페이지**
   - 실시간 모집 리스트
   - 필터링 시스템 (성별, 나이대, MBTI, 예산 등)
   - 동행 상세 정보 카드
   - 신청 템플릿

3. **여행지 페이지**
   - 실시간 인기 여행지
   - 떠오르는 여행지
   - 계절별 인기 여행지
   - 스타일별 여행지 추천

4. **커뮤니티 페이지**
   - 피드형 UI
   - 이미지 중심 타임라인

5. **이벤트 페이지**
   - 진행 중인 이벤트 리스트

6. **여행 준비 페이지**
   - 준비물 체크리스트

7. **마이페이지**
   - 사용자 프로필 관리
   - 내 여행 관리

#### 🚧 MVP에 포함될 기능

##### 1. 사용자 인증 시스템
- [x] 회원가입 페이지 UI
- [x] 로그인 페이지 UI
- [ ] JWT 기반 인증 API 연동
- [ ] 소셜 로그인 (카카오, 네이버)
- [ ] 본인 인증 시스템

##### 2. 동행 찾기 (Companion)
- [x] 모집글 리스트 UI
- [x] 필터링 UI
- [ ] 모집글 작성 API
- [ ] 동행 신청 API
- [ ] 신청 수락/거절 API
- [ ] 플래너 연동 (일정 자동 노출)

##### 3. Recipe (추천 여행지)
- [ ] Recipe 리스트 조회 API
- [ ] Recipe 상세 조회 API
- [ ] 내 플래너로 가져오기 (Deep Copy)
- [ ] 날짜 자동 조정 로직
- [ ] 테마별 필터링

##### 4. 플래너 (Planner)
- [ ] 플래너 CRUD API
- [ ] 드래그 앤 드롭 일정 편집
- [ ] 지도 API 연동 (카카오맵 또는 네이버맵)
- [ ] 동선 시각화

##### 5. 알림 시스템
- [ ] 인앱 알림 (Toast)
- [ ] Web Push 알림 설정
- [ ] 알림 목록 조회

##### 6. 신뢰 시스템
- [ ] 매너 온도 계산 로직
- [ ] 키워드 리뷰 작성
- [ ] 여행 완주 배지 부여
- [ ] 본인 인증 마크

### Phase 2: 고급 기능 (MVP 이후)

#### PWA 기능
- [ ] Service Worker 설정
- [ ] 오프라인 캐싱 (IndexedDB)
- [ ] A2HS (Add to Home Screen)
- [ ] 백그라운드 동기화

#### 협업 기능
- [ ] 공동 체크리스트
- [ ] 실시간 채팅 (WebSocket)
- [ ] 동행자 초대 시스템

#### 커뮤니티 고도화
- [ ] 게시글 작성/수정/삭제
- [ ] 댓글 시스템
- [ ] 좋아요/저장 기능
- [ ] 명예의 전당 (인기 게시물 → Recipe 승격)

#### 관리자 기능
- [ ] 사용자 관리
- [ ] 신고 처리
- [ ] 통계 대시보드

---

## 📱 페이지/영역별 핵심 기능 및 API 역할 분담

### 1. 인증 영역 (Authentication)

#### 페이지
- `/login` - 로그인
- `/signup` - 회원가입
- `/forgot-password` - 비밀번호 찾기

#### 핵심 기능
- 이메일/비밀번호 로그인
- 소셜 로그인 (카카오, 네이버)
- 회원가입 및 이메일 인증
- 비밀번호 재설정

#### API 엔드포인트
```
POST   /api/auth/signup          # 회원가입
POST   /api/auth/login           # 로그인
POST   /api/auth/logout          # 로그아웃
POST   /api/auth/refresh         # 토큰 갱신
POST   /api/auth/verify-email    # 이메일 인증
POST   /api/auth/reset-password  # 비밀번호 재설정
POST   /api/auth/social/kakao    # 카카오 로그인
POST   /api/auth/social/naver    # 네이버 로그인
```

#### 역할 분담
- **Frontend**: 폼 유효성 검증, 토큰 저장 (localStorage/cookie), 리다이렉션 처리
- **Backend**: JWT 발급/검증, 비밀번호 암호화 (BCrypt), 이메일 발송, 소셜 로그인 OAuth 처리

---

### 2. 랜딩 페이지 (Landing)

#### 페이지
- `/` - 메인 랜딩 페이지

#### 핵심 기능
- 서비스 소개 및 가치 제안
- 트렌딩 여행지 미리보기
- 사용자 리뷰 및 후기
- 매칭 테스트 CTA

#### API 엔드포인트
```
GET    /api/landing/trending     # 트렌딩 여행지 (Top 5)
GET    /api/landing/reviews      # 최근 리뷰 (Top 10)
GET    /api/landing/stats        # 서비스 통계 (회원수, 매칭수 등)
```

#### 역할 분담
- **Frontend**: 애니메이션 효과, 반응형 레이아웃, 스크롤 인터랙션
- **Backend**: 캐싱된 통계 데이터 제공, 인기 여행지 집계

---

### 3. 동행 찾기 (Companion)

#### 페이지
- `/find-companion` - 동행 모집 리스트
- `/find-companion/[id]` - 동행 모집 상세
- `/find-companion/create` - 동행 모집 작성
- `/find-companion/my-applications` - 내 신청 내역

#### 핵심 기능
- 실시간 모집글 리스트
- 다중 필터링 (성별, 나이, MBTI, 예산, 흡연 여부 등)
- 동행 신청 및 수락/거절
- 플래너 일정 미리보기
- 신뢰도 표시 (매너 온도, 인증 마크, 배지)

#### API 엔드포인트
```
GET    /api/companions                    # 모집글 리스트 (필터링, 페이지네이션)
GET    /api/companions/{id}               # 모집글 상세
POST   /api/companions                    # 모집글 작성
PUT    /api/companions/{id}               # 모집글 수정
DELETE /api/companions/{id}               # 모집글 삭제
POST   /api/companions/{id}/apply         # 동행 신청
GET    /api/companions/{id}/applications  # 신청자 리스트
PUT    /api/companions/{id}/applications/{applicationId}/accept  # 신청 수락
PUT    /api/companions/{id}/applications/{applicationId}/reject  # 신청 거절
GET    /api/companions/my-applications    # 내 신청 내역
```

#### 역할 분담
- **Frontend**: 
  - 필터 UI 및 상태 관리
  - 무한 스크롤 또는 페이지네이션
  - 신청 폼 모달
  - 실시간 업데이트 (WebSocket 연동)
  
- **Backend**: 
  - 복합 필터링 쿼리 최적화
  - 신청 상태 관리 (대기/수락/거절)
  - 알림 발송 (신청 시, 수락 시)
  - 플래너 데이터 조인 및 반환

---

### 4. Recipe (추천 여행지)

#### 페이지
- `/destinations` - 여행지 메인
- `/destinations/all` - 전체 여행지
- `/destinations/recipes` - Recipe 리스트
- `/destinations/recipes/[id]` - Recipe 상세

#### 핵심 기능
- 테마별 Recipe 큐레이션
- Recipe 상세 일정 조회
- 내 플래너로 가져오기 (Deep Copy)
- 날짜 자동 조정
- 저장 및 좋아요 기능

#### API 엔드포인트
```
GET    /api/recipes                  # Recipe 리스트 (테마, 지역, 기간 필터)
GET    /api/recipes/{id}             # Recipe 상세
POST   /api/recipes                  # Recipe 작성 (관리자 또는 승인된 사용자)
POST   /api/recipes/{id}/copy        # 내 플래너로 복사
POST   /api/recipes/{id}/like        # 좋아요
DELETE /api/recipes/{id}/like        # 좋아요 취소
POST   /api/recipes/{id}/save        # 저장
DELETE /api/recipes/{id}/save        # 저장 취소
GET    /api/recipes/saved            # 내가 저장한 Recipe
```

#### 역할 분담
- **Frontend**: 
  - 카드 레이아웃 및 필터링 UI
  - Deep Copy 날짜 조정 로직 (클라이언트 사이드)
  - 저장/좋아요 상태 관리
  
- **Backend**: 
  - Recipe 데이터 스냅샷 생성 (Deep Copy)
  - 원본 삭제 시에도 복사본 유지
  - 인기도 집계 (저장 수, 좋아요 수)

---

### 5. 플래너 (Planner)

#### 페이지
- `/mypage/planner` - 내 플래너 리스트
- `/mypage/planner/[id]` - 플래너 상세 편집

#### 핵심 기능
- 일정 CRUD
- 드래그 앤 드롭 일정 편집
- 지도 동선 시각화
- 장소 검색 및 추가
- 메모 및 예산 관리

#### API 엔드포인트
```
GET    /api/planners                    # 내 플래너 리스트
GET    /api/planners/{id}               # 플래너 상세
POST   /api/planners                    # 플래너 생성
PUT    /api/planners/{id}               # 플래너 수정
DELETE /api/planners/{id}               # 플래너 삭제
POST   /api/planners/{id}/places        # 장소 추가
PUT    /api/planners/{id}/places/{placeId}  # 장소 수정
DELETE /api/planners/{id}/places/{placeId}  # 장소 삭제
PUT    /api/planners/{id}/places/reorder    # 장소 순서 변경
```

#### 역할 분담
- **Frontend**: 
  - 드래그 앤 드롭 라이브러리 (dnd-kit 또는 react-beautiful-dnd)
  - 지도 API 연동 (카카오맵/네이버맵)
  - 실시간 동선 계산 및 표시
  
- **Backend**: 
  - 플래너 데이터 구조 설계 (일차별, 장소별)
  - 순서 변경 로직
  - 예산 집계

---

### 6. 커뮤니티 (Community)

#### 페이지
- `/community` - 커뮤니티 피드
- `/community/[id]` - 게시글 상세

#### 핵심 기능
- 피드형 타임라인
- 이미지/동영상 업로드
- 댓글 및 대댓글
- 좋아요 및 저장
- 해시태그 검색

#### API 엔드포인트
```
GET    /api/community/posts              # 피드 리스트 (무한 스크롤)
GET    /api/community/posts/{id}         # 게시글 상세
POST   /api/community/posts              # 게시글 작성
PUT    /api/community/posts/{id}         # 게시글 수정
DELETE /api/community/posts/{id}         # 게시글 삭제
POST   /api/community/posts/{id}/like    # 좋아요
POST   /api/community/posts/{id}/comments  # 댓글 작성
GET    /api/community/posts/{id}/comments  # 댓글 리스트
POST   /api/community/upload             # 이미지 업로드
```

#### 역할 분담
- **Frontend**: 
  - 무한 스크롤 구현
  - 이미지 최적화 및 업로드
  - 댓글 트리 구조 렌더링
  
- **Backend**: 
  - 이미지 스토리지 연동 (AWS S3 또는 Cloudinary)
  - 피드 알고리즘 (최신순, 인기순)
  - 해시태그 인덱싱

---

### 7. 마이페이지 (MyPage)

#### 페이지
- `/mypage` - 마이페이지 메인
- `/mypage/profile` - 프로필 편집
- `/mypage/planner` - 내 플래너
- `/mypage/companions` - 내 동행 관리
- `/mypage/reviews` - 받은 리뷰
- `/mypage/settings` - 설정

#### 핵심 기능
- 프로필 정보 수정
- 여행 스타일 설정
- 내 동행 내역
- 받은 리뷰 조회
- 매너 온도 확인
- 알림 설정

#### API 엔드포인트
```
GET    /api/users/me                    # 내 정보 조회
PUT    /api/users/me                    # 내 정보 수정
GET    /api/users/me/companions         # 내 동행 내역
GET    /api/users/me/reviews            # 받은 리뷰
POST   /api/users/me/reviews            # 리뷰 작성
GET    /api/users/me/badges             # 내 배지
GET    /api/users/me/temperature        # 매너 온도
PUT    /api/users/me/settings           # 설정 변경
POST   /api/users/me/verify             # 본인 인증
```

#### 역할 분담
- **Frontend**: 
  - 프로필 이미지 업로드
  - 폼 유효성 검증
  - 매너 온도 시각화 (차트)
  
- **Backend**: 
  - 프로필 데이터 관리
  - 매너 온도 계산 로직
  - 배지 부여 조건 검증
  - 본인 인증 API 연동

---

### 8. 알림 시스템 (Notifications)

#### 페이지
- `/mypage/notifications` - 알림 목록

#### 핵심 기능
- 실시간 알림 수신
- 알림 목록 조회
- 읽음 처리
- 알림 설정 (푸시, 이메일)

#### API 엔드포인트
```
GET    /api/notifications               # 알림 리스트
PUT    /api/notifications/{id}/read     # 알림 읽음 처리
PUT    /api/notifications/read-all      # 전체 읽음 처리
DELETE /api/notifications/{id}          # 알림 삭제
POST   /api/notifications/subscribe     # 푸시 알림 구독
DELETE /api/notifications/unsubscribe   # 푸시 알림 구독 해제
```

#### WebSocket 이벤트
```
SUBSCRIBE /topic/notifications/{userId}  # 실시간 알림 구독
```

#### 역할 분담
- **Frontend**: 
  - WebSocket 연결 관리
  - 토스트 알림 표시
  - 푸시 알림 권한 요청
  
- **Backend**: 
  - WebSocket 서버 구현
  - 알림 발송 로직 (신청, 수락, 댓글 등)
  - Web Push 서비스 연동

---

### 9. 관리자 (Admin)

#### 페이지
- `/admin` - 관리자 대시보드
- `/admin/users` - 사용자 관리
- `/admin/reports` - 신고 관리
- `/admin/recipes` - Recipe 승인

#### 핵심 기능
- 사용자 통계 대시보드
- 신고 처리
- Recipe 승인/거절
- 공지사항 관리

#### API 엔드포인트
```
GET    /api/admin/stats                 # 통계 데이터
GET    /api/admin/users                 # 사용자 리스트
PUT    /api/admin/users/{id}/ban        # 사용자 정지
GET    /api/admin/reports               # 신고 리스트
PUT    /api/admin/reports/{id}/resolve  # 신고 처리
GET    /api/admin/recipes/pending       # 승인 대기 Recipe
PUT    /api/admin/recipes/{id}/approve  # Recipe 승인
```

#### 역할 분담
- **Frontend**: 
  - 통계 차트 (Recharts)
  - 테이블 및 필터링
  
- **Backend**: 
  - 관리자 권한 검증
  - 통계 집계 쿼리
  - 신고 처리 로직

---

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: Orange to Pink Gradient (`#f97316` ↔ `#ec4899`)
- **Secondary**: Coral (`#FF7E5F`)
- **Point**: Teal (`#14B8A6`)
- **Neutral**: Slate (900, 600, 400, 100)

### 타이포그래피
- **Hero Title**: `text-4xl md:text-6xl font-extrabold`
- **Section Title**: `text-2xl font-black`
- **Card Title**: `text-[15px]~text-[18px] font-bold`
- **Body**: `text-[13px]~text-[15px] font-medium`

### 컴포넌트 규격
- **Cards**: `rounded-[32px]`, `border-slate-100`, `shadow-sm`
- **Buttons**: `rounded-full` 또는 `rounded-3xl`, 그라데이션 적용
- **Hover**: `y-[-4px]` 이동, `shadow-orange-500/10`

자세한 디자인 가이드는 [`DOCS/SERVICE_SPECIFICATION.md`](./DOCS/SERVICE_SPECIFICATION.md)를 참조하세요.

---

## 📂 프로젝트 구조

```
withus/
├── withus-frontend/          # Next.js 프론트엔드
│   ├── app/                  # App Router 페이지
│   │   ├── landing/          # 랜딩 페이지
│   │   ├── find-companion/   # 동행 찾기
│   │   ├── destinations/     # 여행지 및 Recipe
│   │   ├── community/        # 커뮤니티
│   │   ├── mypage/           # 마이페이지
│   │   ├── admin/            # 관리자
│   │   └── components/       # 공통 컴포넌트
│   ├── public/               # 정적 파일
│   └── package.json
│
├── withus-backend/           # Spring Boot 백엔드
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/         # Java 소스 코드
│   │   │   └── resources/    # 설정 파일
│   │   └── test/             # 테스트 코드
│   ├── build.gradle          # Gradle 빌드 설정
│   └── settings.gradle
│
├── DOCS/                     # 문서
│   └── SERVICE_SPECIFICATION.md  # 서비스 기획서
│
└── README.md                 # 프로젝트 소개 (본 문서)
```

---

## 🚀 시작하기

### Prerequisites
- **Node.js** 20.x 이상
- **Java** 17 이상
- **PostgreSQL** 14 이상
- **Git**

### Frontend 실행

```bash
cd withus-frontend
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

### Backend 실행

```bash
cd withus-backend
./gradlew bootRun
```

API 서버: http://localhost:8080

---




