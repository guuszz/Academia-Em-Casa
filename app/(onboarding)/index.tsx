import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import { useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';

export default function OnboardingScreen() {
  const { hasCompletedOnboarding } = useAppContext();

  useEffect(() => {
    if (hasCompletedOnboarding) {
      router.replace('/(tabs)');
    }
  }, [hasCompletedOnboarding]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)', 'transparent']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.3 }}
      />
      <Image
        source={{ uri: 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg' }}
        style={styles.backgroundImage}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>FitHome</Text>
          <Text style={styles.subtitle}>Transforme seu corpo usando apenas seu peso</Text>
        </View>
        
        <View style={styles.features}>
          <FeatureItem 
            title="Treinos Personalizados" 
            description="Exercícios adaptados ao seu nível e objetivos"
          />
          <FeatureItem 
            title="Sem Equipamentos" 
            description="Apenas você e seu peso corporal"
          />
          <FeatureItem 
            title="Treinos Rápidos" 
            description="De 10 a 60 minutos, você escolhe"
          />
          <FeatureItem 
            title="Progresso Visível" 
            description="Acompanhe sua evolução com métricas claras"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/(onboarding)/assessment')}
        >
          <Text style={styles.buttonText}>Começar Agora</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <View style={styles.iconInner} />
      </View>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '60%',
    top: 0,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '60%',
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 80,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 40,
    zIndex: 2,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 42,
    color: '#fff',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#fff',
    lineHeight: 26,
  },
  features: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingTop: 32,
    marginTop: 60,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF5722',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#222',
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 24,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
});