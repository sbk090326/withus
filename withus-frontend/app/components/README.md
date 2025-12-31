# Withus Design System

프로젝트 전반에서 일관된 디자인을 유지하기 위한 디자인 시스템입니다.

## 📁 구조

```
app/components/
├── design-system/
│   └── constants.ts          # 디자인 토큰 (색상, 타이포그래피, 간격 등)
├── ui/
│   ├── GradientButton.tsx    # 재사용 가능한 버튼 컴포넌트
│   ├── Card.tsx              # 재사용 가능한 카드 컴포넌트
│   ├── Typography.tsx        # 타이포그래피 컴포넌트
│   ├── Layout.tsx            # 레이아웃 컴포넌트
│   └── index.ts              # 통합 export
└── layout/
    ├── Header.tsx            # 공통 헤더
    ├── Footer.tsx            # 공통 푸터
    └── index.ts              # 통합 export
```

## 🎨 디자인 토큰

### 색상 (Colors)

```typescript
import { colors } from '@/app/components/ui';

// Primary Colors
colors.primary.navy      // #1A3C5A - 메인 네이비
colors.primary.tan       // #A3836B - 메인 탄
colors.primary.tanDark   // #8e7260 - 다크 탄

// Accent Colors
colors.accent.coral      // #FF8A73 - 코랄

// Neutral Colors
colors.neutral.cream     // #F7F3F0 - 크림
colors.neutral.white     // #FFFFFF - 화이트
colors.neutral.creamDark // #E8E0D8 - 다크 크림
```

### 타이포그래피 (Typography)

```typescript
import { typography } from '@/app/components/ui';

// Font Sizes
typography.fontSize.xs    // 14px
typography.fontSize.sm    // 16px
typography.fontSize.base  // 18px
typography.fontSize.lg    // 20px
typography.fontSize.xl    // 24px
typography.fontSize['2xl'] // 28px
typography.fontSize['3xl'] // 48px
typography.fontSize['4xl'] // 64px

// Line Heights
typography.lineHeight.tight   // 1.2
typography.lineHeight.normal  // 1.6
typography.lineHeight.relaxed // 1.7
typography.lineHeight.loose   // 1.8
```

## 🧩 컴포넌트 사용법

### GradientButton

```tsx
import { GradientButton } from '@/app/components/ui';

<GradientButton variant="primary" size="md">
  Click Me
</GradientButton>

<GradientButton variant="gradient" size="lg">
  Gradient Button
</GradientButton>
```

**Props:**
- `variant`: 'primary' | 'gradient'
- `size`: 'sm' | 'md' | 'lg'

### Card

```tsx
import { Card } from '@/app/components/ui';

<Card variant="white" hover={true}>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

**Props:**
- `variant`: 'white' | 'cream'
- `hover`: boolean (기본값: true)

### Section & Container

```tsx
import { Section, Container } from '@/app/components/ui';

<Section variant="cream">
  <Container size="normal">
    <h2>Section Content</h2>
  </Container>
</Section>
```

**Section Props:**
- `variant`: 'white' | 'cream'

**Container Props:**
- `size`: 'narrow' | 'normal' | 'wide'

### SectionTitle & SectionDescription

```tsx
import { SectionTitle, SectionDescription } from '@/app/components/ui';

<SectionTitle>
  Your Section Title
</SectionTitle>

<SectionDescription>
  Your section description text
</SectionDescription>
```

**Props:**
- `animate`: boolean (기본값: true) - 스크롤 애니메이션 활성화

## 📝 사용 예제

```tsx
'use client';

import { 
  Section, 
  Container, 
  SectionTitle, 
  SectionDescription,
  Card,
  GradientButton,
  colors 
} from '@/app/components/ui';

export function MyComponent() {
  return (
    <Section variant="cream">
      <Container size="normal">
        <SectionTitle>Welcome to Withus</SectionTitle>
        <SectionDescription>
          Find your perfect travel companion
        </SectionDescription>

        <div className="grid grid-cols-3 gap-8">
          <Card variant="white">
            <h3 style={{ color: colors.primary.navy }}>Feature 1</h3>
            <p>Description</p>
          </Card>
          {/* More cards... */}
        </div>

        <GradientButton variant="gradient" size="lg">
          Get Started
        </GradientButton>
      </Container>
    </Section>
  );
}
```

## 🎯 베스트 프랙티스

1. **일관성 유지**: 항상 디자인 시스템의 컴포넌트와 토큰을 사용하세요.
2. **재사용성**: 새로운 컴포넌트를 만들기 전에 기존 컴포넌트를 확장할 수 있는지 확인하세요.
3. **타입 안정성**: TypeScript를 활용하여 타입 안정성을 유지하세요.
4. **애니메이션**: `animations` 토큰을 사용하여 일관된 애니메이션을 적용하세요.

## 🔄 확장하기

새로운 디자인 토큰이나 컴포넌트를 추가할 때:

1. `design-system/constants.ts`에 새로운 토큰 추가
2. `ui/` 폴더에 새로운 컴포넌트 생성
3. `ui/index.ts`에서 export
4. 이 README 업데이트
