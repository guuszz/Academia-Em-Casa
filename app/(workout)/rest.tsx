import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SkipForward } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RestScreen() {
  const [seconds, setSeconds] = useState(30);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => {
        if (seconds > 0) {
          return seconds - 1;
        } else {
          clearInterval(interval);
          handleNext();
          return 0;
        }
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleNext = () => {
    router.replace('/(workout)/active');
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2196F3', '#03A9F4']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.content}>
        <Text style={styles.restText}>DESCANSO</Text>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{seconds}</Text>
          <Text style={styles.secondsText}>segundos</Text>
        </View>
        
        <Text style={styles.message}>
          Respire fundo e prepare-se para o próximo exercício
        </Text>
        
        <Text style={styles.nextExercise}>
          Próximo: Squats
        </Text>
        
        <TouchableOpacity style={styles.skipButton} onPress={handleNext}>
          <Text style={styles.skipText}>Pular</Text>
          <SkipForward size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  restText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
    letterSpacing: 2,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  timer: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 80,
    color: '#fff',
  },
  secondsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 280,
    lineHeight: 24,
  },
  nextExercise: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 60,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  skipText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
});