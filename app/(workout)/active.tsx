import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Pause, SkipForward, ArrowLeft, Volume2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ActiveWorkoutScreen() {
  const [seconds, setSeconds] = useState(45);
  const [isActive, setIsActive] = useState(true);
  const [currentExercise, setCurrentExercise] = useState(0);
  
  const exercises = [
    {
      name: 'Push-ups',
      reps: '12 reps',
      duration: 45,
      imageUrl: 'https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg',
      instructions: 'Mantenha as costas retas e abaixe o corpo até quase tocar o chão.'
    },
    {
      name: 'Air Squats',
      reps: '15 reps',
      duration: 60,
      imageUrl: 'https://images.pexels.com/photos/4162579/pexels-photo-4162579.jpeg',
      instructions: 'Mantenha o peito para cima e desça até que as coxas fiquem paralelas ao chão.'
    },
    {
      name: 'Plank',
      reps: '30 segundos',
      duration: 30,
      imageUrl: 'https://images.pexels.com/photos/6456301/pexels-photo-6456301.jpeg',
      instructions: 'Mantenha o core contraído e o corpo em linha reta da cabeça aos calcanhares.'
    }
  ];
  
  useEffect(() => {
    let interval = null;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      handleNext();
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const togglePause = () => {
    setIsActive(!isActive);
  };
  
  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      router.replace('/(workout)/rest');
    } else {
      router.replace('/(workout)/complete');
    }
  };
  
  const handleExit = () => {
    router.back();
  };
  
  const exercise = exercises[currentExercise];
  const progress = 1 - (seconds / exercise.duration);
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)', 'transparent']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.3 }}
      />
      
      <Image source={{ uri: exercise.imageUrl }} style={styles.backgroundImage} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleExit}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          {exercises.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.progressDot,
                index === currentExercise && styles.progressDotActive,
                index < currentExercise && styles.progressDotCompleted
              ]} 
            />
          ))}
        </View>
        
        <TouchableOpacity style={styles.soundButton}>
          <Volume2 size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.timerContainer}>
          <View style={styles.timerInner}>
            <Text style={styles.timer}>{formatTime(seconds)}</Text>
          </View>
          <View style={styles.timerProgress} />
        </View>
        
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.exerciseReps}>{exercise.reps}</Text>
        </View>
        
        <ScrollView style={styles.instructions}>
          <Text style={styles.instructionsTitle}>Instruções</Text>
          <Text style={styles.instructionsText}>{exercise.instructions}</Text>
        </ScrollView>
        
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={togglePause}>
            {isActive ? (
              <Pause size={24} color="#fff" />
            ) : (
              <Text style={styles.resumeText}>Continuar</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
            <SkipForward size={24} color="#fff" />
          </TouchableOpacity>
        </View>
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
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    zIndex: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#FF5722',
    width: 20,
  },
  progressDotCompleted: {
    backgroundColor: '#fff',
  },
  soundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  timerContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  timerInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 87, 34, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 48,
    color: '#fff',
  },
  timerProgress: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#FF5722',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '135deg' }],
  },
  exerciseInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  exerciseName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  exerciseReps: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FF5722',
  },
  instructions: {
    maxHeight: 120,
    width: '100%',
    marginBottom: 40,
  },
  instructionsTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  instructionsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    lineHeight: 24,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 87, 34, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#fff',
  },
});