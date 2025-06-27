import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Search, Filter, Clock, Flame, Play } from 'lucide-react-native';
import { useState } from 'react';
import { workouts } from '@/data/workouts';

type WorkoutFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

export default function WorkoutsScreen() {
  const [filter, setFilter] = useState<WorkoutFilter>('all');
  
  const filteredWorkouts = filter === 'all' 
    ? workouts 
    : workouts.filter(workout => workout.level === filter);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Treinos</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#999" />
            <Text style={styles.searchPlaceholder}>Buscar treinos</Text>
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#666" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tab, filter === 'all' && styles.tabActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.tabText, filter === 'all' && styles.tabTextActive]}>
              Todos
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, filter === 'beginner' && styles.tabActive]}
            onPress={() => setFilter('beginner')}
          >
            <Text style={[styles.tabText, filter === 'beginner' && styles.tabTextActive]}>
              Iniciante
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, filter === 'intermediate' && styles.tabActive]}
            onPress={() => setFilter('intermediate')}
          >
            <Text style={[styles.tabText, filter === 'intermediate' && styles.tabTextActive]}>
              Intermediário
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, filter === 'advanced' && styles.tabActive]}
            onPress={() => setFilter('advanced')}
          >
            <Text style={[styles.tabText, filter === 'advanced' && styles.tabTextActive]}>
              Avançado
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={filteredWorkouts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.workoutsList}
        renderItem={({ item }) => (
          <WorkoutCard
            title={item.title}
            duration={item.duration}
            calories={item.calories}
            level={item.level}
            imageUrl={item.imageUrl}
          />
        )}
      />
    </View>
  );
}

interface WorkoutCardProps {
  title: string;
  duration: number;
  calories: number;
  level: string;
  imageUrl: string;
}

function WorkoutCard({ title, duration, calories, level, imageUrl }: WorkoutCardProps) {
  return (
    <TouchableOpacity style={styles.workoutCard}>
      <Image source={{ uri: imageUrl }} style={styles.workoutImage} />
      
      <View style={styles.workoutOverlay} />
      
      <View style={styles.workoutContent}>
        <View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
          
          <Text style={styles.workoutTitle}>{title}</Text>
          
          <View style={styles.workoutMetrics}>
            <View style={styles.workoutMetric}>
              <Clock size={14} color="#fff" />
              <Text style={styles.workoutMetricText}>{duration} min</Text>
            </View>
            
            <View style={styles.workoutMetric}>
              <Flame size={14} color="#fff" />
              <Text style={styles.workoutMetricText}>{calories} kcal</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.playButton}>
          <Play size={24} color="#FF5722" fill="#FF5722" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#222',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#999',
    marginLeft: 12,
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    width: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
  },
  tabText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  tabTextActive: {
    fontFamily: 'Inter-SemiBold',
    color: '#FF5722',
  },
  workoutsList: {
    padding: 20,
  },
  workoutCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  workoutImage: {
    width: '100%',
    height: '100%',
  },
  workoutOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  workoutContent: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  levelBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  levelText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#fff',
  },
  workoutTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
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
});