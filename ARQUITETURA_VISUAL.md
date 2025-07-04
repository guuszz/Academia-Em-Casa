# 🏗️ Arquitetura Visual do FitHome

## 📊 Diagrama de Fluxo do App

```
┌─────────────────────────────────────────────────────────────────┐
│                        FITHOME APP                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   ONBOARDING    │    │   MAIN TABS     │    │   WORKOUT    │ │
│  │                 │    │                 │    │              │ │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌──────────┐ │ │
│  │ │   Welcome   │ │    │ │    Home     │ │    │ │  Active  │ │ │
│  │ └─────────────┘ │    │ └─────────────┘ │    │ └──────────┘ │ │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌──────────┐ │ │
│  │ │ Assessment  │ │    │ │  Workouts   │ │    │ │   Rest   │ │ │
│  │ └─────────────┘ │    │ └─────────────┘ │    │ └──────────┘ │ │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌──────────┐ │ │
│  │ │    Goals    │ │    │ │   Progress  │ │    │ │ Complete │ │ │
│  │ └─────────────┘ │    │ └─────────────┘ │    │ └──────────┘ │ │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │              │ │
│  │ │   Welcome   │ │    │ │   Profile   │ │    │              │ │
│  │ └─────────────┘ │    │ └─────────────┘ │    │              │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Fluxo de Navegação

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   App Start │────▶│ Onboarding  │────▶│ Main Tabs   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                     │
                           ▼                     ▼
                    ┌─────────────┐     ┌─────────────┐
                    │ Assessment  │     │   Home      │
                    └─────────────┘     └─────────────┘
                           │                     │
                           ▼                     ▼
                    ┌─────────────┐     ┌─────────────┐
                    │    Goals    │     │  Workouts   │
                    └─────────────┘     └─────────────┘
                           │                     │
                           ▼                     ▼
                    ┌─────────────┐     ┌─────────────┐
                    │   Welcome   │     │   Active    │
                    └─────────────┘     └─────────────┘
                                                │
                                                ▼
                                         ┌─────────────┐
                                         │    Rest     │
                                         └─────────────┘
                                                │
                                                ▼
                                         ┌─────────────┐
                                         │  Complete   │
                                         └─────────────┘
```

## 🏛️ Arquitetura de Componentes

```
┌─────────────────────────────────────────────────────────────────┐
│                        APP LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    CONTEXT LAYER                            │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │ │
│  │  │  AppContext     │  │  User State     │  │  Workout     │ │ │
│  │  │                 │  │                 │  │  State       │ │ │
│  │  │ • Onboarding    │  │ • Username      │  │ • Current    │ │ │
│  │  │ • Username      │  │ • Streak        │  │ • Progress   │ │ │
│  │  │ • Streak        │  │ • Preferences   │  │ • History    │ │ │
│  │  └─────────────────┘  └─────────────────┘  └──────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                   COMPONENT LAYER                           │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │ │
│  │  │   Screens       │  │    Components   │  │    Hooks     │ │ │
│  │  │                 │  │                 │  │              │ │ │
│  │  │ • Onboarding    │  │ • WorkoutCard   │  │ • useApp     │ │ │
│  │  │ • Home          │  │ • ExerciseCard  │  │ • useTimer   │ │ │
│  │  │ • Workouts      │  │ • ProgressBar   │  │ • useStreak  │ │ │
│  │  │ • Active        │  │ • Timer         │  │              │ │ │
│  │  └─────────────────┘  └─────────────────┘  └──────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    DATA LAYER                               │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │ │
│  │  │   Workouts      │  │   AsyncStorage  │  │   Images     │ │ │
│  │  │                 │  │                 │  │              │ │ │
│  │  │ • Exercise Data │  │ • User Data     │  │ • Icons      │ │ │
│  │  │ • Instructions  │  │ • Progress      │  │ • Backgrounds│ │ │
│  │  │ • Levels        │  │ • Settings      │  │ • Placeholders│ │ │
│  │  └─────────────────┘  └─────────────────┘  └──────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 Sistema de Design

```
┌─────────────────────────────────────────────────────────────────┐
│                      DESIGN SYSTEM                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🎨 COLORS                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Primary       │  │   Secondary     │  │   Neutral       │ │
│  │                 │  │                 │  │                 │ │
│  │ #FF5722         │  │ #FF8A65         │  │ #222, #666, #999│ │
│  │ (Orange)        │  │ (Light Orange)  │  │ (Text Colors)   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  🔤 TYPOGRAPHY                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Montserrat    │  │     Inter       │  │   Sizes         │ │
│  │                 │  │                 │  │                 │ │
│  │ • Bold (42px)   │  │ • Regular (16px)│  │ • Large (28px)  │ │
│  │ • SemiBold (17px)│  │ • SemiBold (16px)│  │ • Medium (18px)│ │
│  │ • Medium (15px) │  │ • Bold (16px)   │  │ • Small (14px)  │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  📐 SPACING & LAYOUT                                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Padding       │  │   Margins       │  │   Border Radius │ │
│  │                 │  │                 │  │                 │ │
│  │ • 24px (Large)  │  │ • 20px (Large)  │  │ • 30px (Cards)  │ │
│  │ • 16px (Medium) │  │ • 12px (Medium) │  │ • 12px (Buttons)│ │
│  │ • 8px (Small)   │  │ • 8px (Small)   │  │ • 8px (Inputs)  │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 Stack Tecnológico

```
┌─────────────────────────────────────────────────────────────────┐
│                      TECH STACK                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📱 FRONTEND FRAMEWORK                                         │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ React Native 0.79.1 + Expo 53.0.0                          │ │
│  │ • Cross-platform development                               │ │
│  │ • Hot reloading                                            │ │
│  │ • Native performance                                       │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  🧭 NAVIGATION                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Expo Router 5.0.2                                          │ │
│  │ • File-based routing                                       │ │
│  │ • Type-safe navigation                                     │ │
│  │ • Deep linking support                                     │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  🎨 UI LIBRARIES                                               │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ • expo-linear-gradient (14.1.3)                            │ │
│  │ • expo-blur (14.1.3)                                       │ │
│  │ • lucide-react-native (0.475.0)                            │ │
│  │ • @expo-google-fonts (Inter + Montserrat)                  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  💾 DATA MANAGEMENT                                            │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ • @react-native-async-storage/async-storage (1.22.3)       │ │
│  │ • React Context API                                        │ │
│  │ • Local data persistence                                   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  🔧 DEVELOPMENT TOOLS                                          │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ • TypeScript 5.8.3                                         │ │
│  │ • Expo CLI                                                  │ │
│  │ • React Native Debugger                                     │ │
│  │ • ESLint + Prettier                                         │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Estrutura de Dados

```
┌─────────────────────────────────────────────────────────────────┐
│                      DATA STRUCTURE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  💪 WORKOUT DATA                                               │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ interface Workout {                                         │ │
│  │   id: string;                                               │ │
│  │   title: string;                                            │ │
│  │   duration: number;                                         │ │
│  │   calories: number;                                         │ │
│  │   level: 'beginner' | 'intermediate' | 'advanced';          │ │
│  │   imageUrl: string;                                         │ │
│  │   exercises: Exercise[];                                    │ │
│  │ }                                                           │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  🏃‍♂️ EXERCISE DATA                                             │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ interface Exercise {                                        │ │
│  │   name: string;                                             │ │
│  │   reps: string;                                             │ │
│  │   duration: number;                                         │ │
│  │   instructions: string;                                     │ │
│  │ }                                                           │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  👤 USER DATA                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ interface UserData {                                        │ │
│  │   username: string;                                         │ │
│  │   streak: number;                                           │ │
│  │   hasCompletedOnboarding: boolean;                          │ │
│  │   preferences: UserPreferences;                             │ │
│  │ }                                                           │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Fluxo de Desenvolvimento

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 📝 PLANNING                                                │
│     ┌─────────────────────────────────────────────────────────┐ │
│     │ • Define features                                       │ │
│     │ • Create wireframes                                     │ │
│     │ • Plan data structure                                   │ │
│     └─────────────────────────────────────────────────────────┘ │
│                                                                 │
│  2. 🏗️ SETUP                                                   │
│     ┌─────────────────────────────────────────────────────────┐ │
│     │ • Initialize Expo project                               │ │
│     │ • Configure TypeScript                                  │ │
│     │ • Set up navigation structure                           │ │
│     └─────────────────────────────────────────────────────────┘ │
│                                                                 │
│  3. 🎨 DESIGN                                                  │
│     ┌─────────────────────────────────────────────────────────┐ │
│     │ • Create design system                                  │ │
│     │ • Implement UI components                               │ │
│     │ • Add animations and transitions                        │ │
│     └─────────────────────────────────────────────────────────┘ │
│                                                                 │
│  4. ⚙️ DEVELOPMENT                                             │
│     ┌─────────────────────────────────────────────────────────┐ │
│     │ • Build screens                                         │ │
│     │ • Implement logic                                       │ │
│     │ • Add state management                                  │ │
│     └─────────────────────────────────────────────────────────┘ │
│                                                                 │
│  5. 🧪 TESTING                                                 │
│     ┌─────────────────────────────────────────────────────────┐ │
│     │ • Unit tests                                            │ │
│     │ • Integration tests                                     │ │
│     │ • User testing                                          │ │
│     └─────────────────────────────────────────────────────────┘ │
│                                                                 │
│  6. 🚀 DEPLOYMENT                                              │
│     ┌─────────────────────────────────────────────────────────┐ │
│     │ • Build for production                                  │ │
│     │ • Submit to app stores                                  │ │
│     │ • Monitor performance                                   │ │
│     └─────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Resumo da Arquitetura

O **FitHome** utiliza uma arquitetura moderna e escalável:

- **📱 React Native + Expo** para desenvolvimento cross-platform
- **🧭 Expo Router** para navegação baseada em arquivos
- **📊 Context API** para gerenciamento de estado global
- **💾 AsyncStorage** para persistência local
- **🎨 Design System** consistente e reutilizável
- **🔧 TypeScript** para type safety
- **📐 Component-based** architecture

Esta arquitetura permite fácil manutenção, escalabilidade e adição de novas funcionalidades! 🚀 