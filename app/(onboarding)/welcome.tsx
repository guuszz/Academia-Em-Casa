import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';

export default function WelcomeScreen() {
  const { completeOnboarding } = useAppContext();
  
  const handleGetStarted = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };
  
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/4498603/pexels-photo-4498603.jpeg' }}
        style={styles.backgroundImage}
      />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Tudo Pronto!</Text>
        </View>
        
        <Text style={styles.title}>Seu Plano de Treino está Personalizado</Text>
        
        <Text style={styles.description}>
          Baseado em suas respostas, criamos um plano de treino personalizado para você atingir seus objetivos usando apenas seu peso corporal.
        </Text>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Treinos por semana</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>15-30</Text>
            <Text style={styles.statLabel}>Minutos por sessão</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>Personalizado</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Começar Agora</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 40,
  },
  badge: {
    backgroundColor: '#FF5722',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    marginBottom: 16,
  },
  badgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: '#fff',
    marginBottom: 16,
    lineHeight: 42,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ddd',
    marginBottom: 32,
    lineHeight: 24,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#bbb',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 12,
  },
  button: {
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
});