import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Play, Calendar, Clock, Flame, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '@/context/AppContext';

export default function HomeScreen() {
  const { username, streak } = useAppContext();
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) {
      setGreeting('Bom dia');
    } else if (hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
    
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCurrentTime(timeString);
  }, []);
  
  const handleStartWorkout = () => {
    router.push('/(workout)/active');
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.username}>{username || 'Fitness Lover'}</Text>
        </View>
        
        <View style={styles.streakContainer}>
          <View style={styles.streakBadge}>
            <Flame size={16} color="#FF5722" />
            <Text style={styles.streakText}>{streak} dias</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.todayWorkout}>
        <LinearGradient
          colors={['#FF5722', '#FF8A65']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.workoutCard}
        >
          <View style={styles.workoutCardContent}>
            <View>
              <Text style={styles.workoutTitle}>Treino de Hoje</Text>
              <Text style={styles.workoutName}>Full Body Express</Text>
              
              <View style={styles.workoutMetrics}>
                <View style={styles.workoutMetric}>
                  <Clock size={14} color="#fff" />
                  <Text style={styles.workoutMetricText}>15 min</Text>
                </View>
                
                <View style={styles.workoutMetric}>
                  <Flame size={14} color="#fff" />
                  <Text style={styles.workoutMetricText}>120 kcal</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity style={styles.playButton} onPress={handleStartWorkout}>
              <Play size={24} color="#FF5722" fill="#FF5722" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sua Semana</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.weekProgress}>
          <DayProgress day="Seg" isComplete={true} />
          <DayProgress day="Ter" isComplete={true} />
          <DayProgress day="Qua" isComplete={false} isToday={true} />
          <DayProgress day="Qui" isComplete={false} />
          <DayProgress day="Sex" isComplete={false} />
          <DayProgress day="Sáb" isComplete={false} />
          <DayProgress day="Dom" isComplete={false} />
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exercícios Populares</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exercisesScroll}>
          <ExerciseCard
            name="Push-ups"
            imageUrl="https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg"
            muscle="Peito"
          />
          <ExerciseCard
            name="Squats"
            imageUrl="https://images.pexels.com/photos/4162579/pexels-photo-4162579.jpeg"
            muscle="Pernas"
          />
          <ExerciseCard
            name="Plank"
            imageUrl="https://images.pexels.com/photos/6456301/pexels-photo-6456301.jpeg"
            muscle="Core"
          />
        </ScrollView>
      </View>
      
      <View style={styles.section}>
        <View style={styles.achievementCard}>
          <View style={styles.achievementContent}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3757004/pexels-photo-3757004.jpeg' }}
              style={styles.achievementImage}
            />
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>Próximo Objetivo</Text>
              <Text style={styles.achievementName}>7 dias de treino consecutivos</Text>
              <View style={styles.achievementProgress}>
                <View 
                  style={[styles.achievementProgressBar, { width: `${(streak / 7) * 100}%` }]} 
                />
              </View>
              <Text style={styles.achievementProgressText}>
                {streak}/7 dias completos
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function DayProgress({ day, isComplete, isToday = false }) {
  return (
    <View style={styles.dayContainer}>
      <View 
        style={[
          styles.dayCircle, 
          isComplete && styles.dayComplete,
          isToday && styles.dayToday
        ]}
      >
        {isComplete && <View style={styles.dayCompleteDot} />}
      </View>
      <Text 
        style={[
          styles.dayText, 
          isToday && styles.dayTextToday
        ]}
      >
        {day}
      </Text>
    </View>
  );
}

function ExerciseCard({ name, imageUrl, muscle }) {
  return (
    <TouchableOpacity style={styles.exerciseCard}>
      <Image source={{ uri: imageUrl }} style={styles.exerciseImage} />
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{name}</Text>
        <Text style={styles.exerciseMuscle}>{muscle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
  },
  username: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#222',
  },
  streakContainer: {
    alignItems: 'center',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  streakText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FF5722',
    marginLeft: 4,
  },
  todayWorkout: {
    marginBottom: 24,
  },
  workoutCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  workoutCardContent: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  workoutName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 8,
  },
  workoutMetrics: {
    flexDirection: 'row',
  },
  workoutMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  workoutMetricText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#fff',
    marginLeft: 6,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#222',
  },
  sectionAction: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FF5722',
  },
  weekProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayComplete: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  dayToday: {
    borderColor: '#FF5722',
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
  },
  dayCompleteDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  dayText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
  dayTextToday: {
    fontFamily: 'Inter-SemiBold',
    color: '#FF5722',
  },
  exercisesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  exerciseCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  exerciseImage: {
    width: '100%',
    height: 100,
  },
  exerciseInfo: {
    padding: 12,
  },
  exerciseName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#222',
    marginBottom: 4,
  },
  exerciseMuscle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
  achievementCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  achievementName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#222',
    marginBottom: 8,
  },
  achievementProgress: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    marginBottom: 8,
  },
  achievementProgressBar: {
    height: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  achievementProgressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
});