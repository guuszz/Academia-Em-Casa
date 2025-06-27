import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, Check } from 'lucide-react-native';

type Goal = 'lose_weight' | 'build_muscle' | 'improve_fitness' | 'reduce_stress';

export default function GoalsScreen() {
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  
  const goals = [
    { id: 'lose_weight', title: 'Perder peso', icon: '🔥' },
    { id: 'build_muscle', title: 'Ganhar massa muscular', icon: '💪' },
    { id: 'improve_fitness', title: 'Melhorar condicionamento', icon: '🏃' },
    { id: 'reduce_stress', title: 'Reduzir estresse', icon: '🧘' },
  ];
  
  const toggleGoal = (goal: Goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };
  
  const handleNext = () => {
    router.push('/(onboarding)/welcome');
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Quais são seus objetivos?</Text>
          <Text style={styles.subtitle}>
            Selecione os objetivos que você deseja alcançar com seus treinos
          </Text>
        </View>
        
        <View style={styles.goalsGrid}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalCard,
                selectedGoals.includes(goal.id as Goal) && styles.goalCardSelected
              ]}
              onPress={() => toggleGoal(goal.id as Goal)}
            >
              <View style={styles.goalContent}>
                <Text style={styles.goalIcon}>{goal.icon}</Text>
                <Text style={styles.goalTitle}>{goal.title}</Text>
              </View>
              
              {selectedGoals.includes(goal.id as Goal) && (
                <View style={styles.checkmark}>
                  <Check size={16} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.timeContainer}>
          <Text style={styles.timeTitle}>Quanto tempo você tem para treinar?</Text>
          
          <View style={styles.timeOptions}>
            <TouchableOpacity style={[styles.timeOption, styles.timeOptionSelected]}>
              <Text style={styles.timeValue}>15</Text>
              <Text style={styles.timeUnit}>min</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeOption}>
              <Text style={styles.timeValue}>30</Text>
              <Text style={styles.timeUnit}>min</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeOption}>
              <Text style={styles.timeValue}>45</Text>
              <Text style={styles.timeUnit}>min</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeOption}>
              <Text style={styles.timeValue}>60</Text>
              <Text style={styles.timeUnit}>min</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.button, selectedGoals.length === 0 && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={selectedGoals.length === 0}
        >
          <Text style={styles.buttonText}>Finalizar</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#222',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  goalCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eaeaea',
    position: 'relative',
  },
  goalCardSelected: {
    borderColor: '#FF5722',
    backgroundColor: 'rgba(255, 87, 34, 0.05)',
  },
  goalContent: {
    alignItems: 'center',
  },
  goalIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  goalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF5722',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeContainer: {
    marginBottom: 32,
  },
  timeTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#222',
    marginBottom: 16,
  },
  timeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeOption: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  timeOptionSelected: {
    borderColor: '#FF5722',
    backgroundColor: 'rgba(255, 87, 34, 0.05)',
  },
  timeValue: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#333',
  },
  timeUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
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
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
});