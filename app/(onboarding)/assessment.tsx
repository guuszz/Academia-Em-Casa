import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export default function AssessmentScreen() {
  const [selectedLevel, setSelectedLevel] = useState<FitnessLevel | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const questions = [
    {
      title: 'Qual é sua experiência com exercícios?',
      options: [
        { value: 'beginner', title: 'Iniciante', description: 'Comecei recentemente ou nunca pratiquei exercícios regularmente' },
        { value: 'intermediate', title: 'Intermediário', description: 'Pratico exercícios ocasionalmente há alguns meses' },
        { value: 'advanced', title: 'Avançado', description: 'Pratico exercícios regularmente há mais de um ano' },
      ]
    },
    {
      title: 'Teste rápido: Quantos push-ups você consegue fazer?',
      options: [
        { value: 'beginner', title: '0-5', description: 'Ainda estou começando com push-ups' },
        { value: 'intermediate', title: '6-20', description: 'Consigo fazer um número moderado' },
        { value: 'advanced', title: '21+', description: 'Posso fazer muitas repetições' },
      ]
    }
  ];
  
  const handleNext = () => {
    if (!selectedLevel) return;
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedLevel(null); // Reset selection for next question
    } else {
      router.push('/(onboarding)/goals');
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.step}>Passo {currentQuestion + 1} de {questions.length}</Text>
          <Text style={styles.title}>{questions[currentQuestion].title}</Text>
          <Text style={styles.subtitle}>
            Sua resposta nos ajudará a personalizar seus treinos
          </Text>
        </View>
        
        <View style={styles.options}>
          {questions[currentQuestion].options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionCard,
                selectedLevel === option.value && styles.optionCardSelected
              ]}
              onPress={() => setSelectedLevel(option.value as FitnessLevel)}
              activeOpacity={0.7}
            >
              <View style={styles.optionHeader}>
                <Text style={[
                  styles.optionTitle,
                  selectedLevel === option.value && styles.optionTitleSelected
                ]}>
                  {option.title}
                </Text>
                <View
                  style={[
                    styles.radioButton,
                    selectedLevel === option.value && styles.radioButtonSelected
                  ]}
                >
                  {selectedLevel === option.value && <View style={styles.radioButtonInner} />}
                </View>
              </View>
              <Text style={[
                styles.optionDescription,
                selectedLevel === option.value && styles.optionDescriptionSelected
              ]}>
                {option.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity
          style={[styles.button, !selectedLevel && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!selectedLevel}
          activeOpacity={selectedLevel ? 0.8 : 1}
        >
          <Text style={[styles.buttonText, !selectedLevel && styles.buttonTextDisabled]}>
            {currentQuestion < questions.length - 1 ? 'Continuar' : 'Finalizar'}
          </Text>
          <ArrowRight size={20} color={selectedLevel ? '#fff' : '#999'} />
        </TouchableOpacity>
      </ScrollView>
      
      <Image
        source={{ uri: 'https://images.pexels.com/photos/4498226/pexels-photo-4498226.jpeg' }}
        style={styles.backgroundImage}
      />
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
    minHeight: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '80%',
    height: '40%',
    opacity: 0.2,
    borderTopLeftRadius: 100,
  },
  header: {
    marginBottom: 40,
  },
  step: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FF5722',
    marginBottom: 8,
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
  options: {
    marginBottom: 40,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eaeaea',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  optionCardSelected: {
    borderColor: '#FF5722',
    backgroundColor: 'rgba(255, 87, 34, 0.05)',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#222',
  },
  optionTitleSelected: {
    color: '#FF5722',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#FF5722',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF5722',
  },
  optionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  optionDescriptionSelected: {
    color: '#444',
  },
  button: {
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
  buttonTextDisabled: {
    color: '#999',
  },
});