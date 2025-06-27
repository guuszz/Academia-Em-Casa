import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Calendar, TrendingUp, Award, Zap } from 'lucide-react-native';
import { useState } from 'react';

type ChartPeriod = 'week' | 'month' | 'year';

export default function ProgressScreen() {
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('week');
  
  // Sample data for chart
  const weekData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [{
      data: [20, 45, 28, 80, 99, 43, 50],
    }]
  };
  
  const monthData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [{
      data: [40, 60, 75, 90],
    }]
  };
  
  const yearData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
      data: [20, 45, 40, 80, 70, 95],
    }]
  };
  
  const getChartData = () => {
    switch (chartPeriod) {
      case 'week':
        return weekData;
      case 'month':
        return monthData;
      case 'year':
        return yearData;
      default:
        return weekData;
    }
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Seu Progresso</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <StatCard 
            title="Treinos" 
            value="12" 
            subtitle="Completados" 
            icon={<Calendar size={24} color="#2196F3" />}
            color="#2196F3"
          />
          <StatCard 
            title="Calorias" 
            value="1,540" 
            subtitle="Queimadas" 
            icon={<Zap size={24} color="#FF5722" />}
            color="#FF5722"
          />
        </View>
        
        <View style={styles.statsRow}>
          <StatCard 
            title="Sequência" 
            value="7" 
            subtitle="Dias" 
            icon={<TrendingUp size={24} color="#4CAF50" />}
            color="#4CAF50"
          />
          <StatCard 
            title="Conquistas" 
            value="5" 
            subtitle="Desbloqueadas" 
            icon={<Award size={24} color="#9C27B0" />}
            color="#9C27B0"
          />
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Atividade</Text>
          
          <View style={styles.chartPeriodOptions}>
            <TouchableOpacity 
              style={[styles.periodOption, chartPeriod === 'week' && styles.periodOptionActive]}
              onPress={() => setChartPeriod('week')}
            >
              <Text 
                style={[styles.periodOptionText, chartPeriod === 'week' && styles.periodOptionTextActive]}
              >
                Semana
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.periodOption, chartPeriod === 'month' && styles.periodOptionActive]}
              onPress={() => setChartPeriod('month')}
            >
              <Text 
                style={[styles.periodOptionText, chartPeriod === 'month' && styles.periodOptionTextActive]}
              >
                Mês
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.periodOption, chartPeriod === 'year' && styles.periodOptionActive]}
              onPress={() => setChartPeriod('year')}
            >
              <Text 
                style={[styles.periodOptionText, chartPeriod === 'year' && styles.periodOptionTextActive]}
              >
                Ano
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <LineChart
          data={getChartData()}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#FF5722',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
      
      <View style={styles.achievementsContainer}>
        <Text style={styles.achievementsTitle}>Conquistas Recentes</Text>
        
        <View style={styles.achievementsList}>
          <AchievementCard
            title="Primeira Semana"
            description="Complete 7 dias consecutivos de treino"
            progress={100}
            isComplete={true}
          />
          
          <AchievementCard
            title="Queimador de Calorias"
            description="Queime 1000 calorias em treinos"
            progress={100}
            isComplete={true}
          />
          
          <AchievementCard
            title="Mestre do Push-up"
            description="Complete 100 push-ups em treinos"
            progress={65}
            isComplete={false}
          />
        </View>
      </View>
    </ScrollView>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statTitle}>{title}</Text>
        {icon}
      </View>
      
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );
}

interface AchievementCardProps {
  title: string;
  description: string;
  progress: number;
  isComplete: boolean;
}

function AchievementCard({ title, description, progress, isComplete }: AchievementCardProps) {
  return (
    <View style={styles.achievementCard}>
      <View style={styles.achievementIcon}>
        {isComplete ? (
          <Award size={24} color="#4CAF50" />
        ) : (
          <Award size={24} color="#999" />
        )}
      </View>
      
      <View style={styles.achievementContent}>
        <Text style={styles.achievementTitle}>{title}</Text>
        <Text style={styles.achievementDescription}>{description}</Text>
        
        <View style={styles.achievementProgress}>
          <View 
            style={[
              styles.achievementProgressBar, 
              { width: `${progress}%` },
              isComplete ? styles.achievementProgressComplete : {}
            ]} 
          />
        </View>
      </View>
    </View>
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
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#222',
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  statSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#222',
  },
  chartPeriodOptions: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  periodOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  periodOptionActive: {
    backgroundColor: '#FF5722',
  },
  periodOptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
  periodOptionTextActive: {
    color: '#fff',
  },
  chart: {
    borderRadius: 16,
  },
  achievementsContainer: {
    marginBottom: 24,
  },
  achievementsTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#222',
    marginBottom: 16,
  },
  achievementsList: {
    
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
  },
  achievementDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  achievementProgress: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
  },
  achievementProgressBar: {
    height: 6,
    backgroundColor: '#FF9800',
    borderRadius: 3,
  },
  achievementProgressComplete: {
    backgroundColor: '#4CAF50',
  },
});