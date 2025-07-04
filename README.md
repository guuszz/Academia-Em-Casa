# 🏠 Academia-Em-Casa (FitHome)

Um aplicativo React Native completo para treinos em casa utilizando apenas peso corporal, desenvolvido com Expo e TypeScript.

## 🚀 Funcionalidades

- **🏃‍♂️ Treinos em Casa**: Exercícios que utilizam apenas o peso corporal
- **📱 Interface Intuitiva**: Design moderno com navegação por tabs
- **🎯 Sistema de Streak**: Acompanhamento de dias consecutivos de treino
- **📊 Progresso Visual**: Gráficos e métricas de desempenho
- **⏱️ Timer Inteligente**: Cronômetro com progresso visual durante os treinos
- **🎨 Onboarding**: Experiência de primeiro acesso personalizada
- **📈 Acompanhamento**: Histórico de treinos e conquistas

## 🛠️ Tecnologias Utilizadas

### 📱 Mobile Development
- **React Native** (0.79.1) - Framework mobile
- **Expo** (53.0.0) - Plataforma de desenvolvimento
- **TypeScript** (5.8.3) - Superset JavaScript com tipagem
- **Expo Router** (5.0.2) - Sistema de navegação

### 🎨 UI/UX
- **expo-linear-gradient** (14.1.3) - Gradientes
- **expo-blur** (14.1.3) - Efeitos de blur
- **lucide-react-native** (0.475.0) - Ícones
- **@expo-google-fonts** - Tipografia (Inter + Montserrat)

### 📊 Dados e Estado
- **@react-native-async-storage/async-storage** (1.22.3) - Armazenamento local
- **react-native-chart-kit** (6.12.0) - Gráficos
- **Context API** - Gerenciamento de estado global

### 🔧 Desenvolvimento
- **expo-haptics** (14.1.3) - Feedback tátil
- **expo-camera** (16.1.5) - Funcionalidades de câmera
- **react-native-reanimated** (3.17.4) - Animações

## 📋 Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Expo Go** (app para testar no dispositivo)

## 🚀 Como Executar

### 1. Clone o repositório
```bash
git clone https://github.com/guuszz/Academia-Em-Casa.git
cd Academia-Em-Casa
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o projeto
```bash
# Para desenvolvimento
npm run dev

# Para build web
npm run build:web

# Para linting
npm run lint
```

### 4. Teste a aplicação
- **Expo Go**: Escaneie o QR code com o app Expo Go
- **Web**: Acesse a URL fornecida no terminal
- **Emulador**: Pressione `a` para Android ou `i` para iOS

## 📱 Telas Principais

### 🚀 Onboarding
- **Experiência de primeiro acesso**
- **Lista de benefícios do app**
- **Design moderno com gradientes**

### 🏠 Tela Inicial
- **Saudação personalizada por horário**
- **Streak de dias consecutivos**
- **Card do treino do dia**
- **Progresso semanal visual**
- **Exercícios populares em carrossel**

### 💪 Lista de Treinos
- **Busca e filtros por nível**
- **Cards com duração e calorias**
- **Níveis: Iniciante/Intermediário/Avançado**

### 🏃‍♂️ Treino Ativo
- **Timer com progresso visual**
- **Instruções detalhadas**
- **Controles de pausa/pular**
- **Imagem de fundo do exercício**

## 📊 Estrutura do Projeto

```
Academia-Em-Casa/
├── app/                    # Navegação principal (Expo Router)
│   ├── (onboarding)/       # Fluxo de primeiro acesso
│   ├── (tabs)/            # Tabs principais do app
│   └── (workout)/         # Telas de treino ativo
├── context/               # Gerenciamento de estado global
│   └── AppContext.tsx     # Context API principal
├── data/                  # Dados dos treinos
│   └── workouts.ts        # Configuração dos treinos
├── hooks/                 # Hooks customizados
├── assets/                # Recursos visuais
│   └── images/           # Imagens do projeto
├── package.json
└── README.md
```

## 🎨 Design System

### 🎯 Paleta de Cores
- **Primária**: `#FF5722` (Laranja vibrante)
- **Secundária**: `#FF8A65` (Laranja claro)
- **Texto**: `#222` (Escuro) / `#666` (Médio) / `#999` (Claro)
- **Fundo**: `#f8f9fa` (Cinza claro)

### 🔤 Tipografia
- **Títulos**: Montserrat (Bold, SemiBold)
- **Corpo**: Inter (Regular, SemiBold, Bold)

## 💪 Treinos Disponíveis

### 🏋️‍♂️ 6 Treinos Completos
1. **Full Body Express** (15min, 120kcal)
2. **HIIT Cardio** (20min, 200kcal)
3. **Core Challenge** (15min, 100kcal)
4. **Upper Body Power** (25min, 180kcal)
5. **Lower Body Burn** (20min, 160kcal)
6. **Full Body Challenge** (30min, 250kcal)

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build:web` - Build para web
- `npm run lint` - Executa o linter

## 📱 Funcionalidades Técnicas

### 🔄 Context API
```typescript
interface AppContextProps {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  username: string;
  setUsername: (name: string) => void;
  streak: number;
  incrementStreak: () => void;
}
```

### 📊 Dados dos Treinos
```typescript
interface Workout {
  id: string;
  title: string;
  duration: number;
  calories: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
  exercises: Exercise[];
}
```

## 🎯 Pontos Fortes

### ✅ **Estrutura Bem Organizada**
- Separação clara de responsabilidades
- Uso do Expo Router para navegação
- Context API para estado global
- Hooks customizados

### ✅ **Design Moderno**
- Gradientes e blur effects
- Tipografia consistente
- Paleta de cores coesa
- Animações e transições

### ✅ **UX/UI Intuitiva**
- Onboarding claro
- Navegação por tabs
- Feedback visual de progresso
- Controles intuitivos

### ✅ **Funcionalidades Completas**
- Sistema de streak
- Filtros de treinos
- Timer com progresso
- Instruções detalhadas

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Gustavo** - [GitHub](https://github.com/guuszz)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
