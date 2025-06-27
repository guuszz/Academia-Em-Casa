import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Award, Chrome as Home, Share2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '@/context/AppContext';

export default function WorkoutCompleteScreen() {
  const { incrementStreak } = useAppContext();
  
  const handleFinish = () => {
    incrementStreak();
    router.replace('/(tabs)');
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#8BC34A']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.content}>
        <View style={styles.trophy}>
          <Award size={100} color="#FFD700" />
        </View>
        
        <Text style={styles.congratsText}>TREINO CONCLUÍDO!</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>15:00</Text>
            <Text style={styles.statLabel}>Tempo</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>120</Text>
            <Text style={styles.statLabel}>Calorias</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Exercícios</Text>
          </View>
        </View>
        
        <View style={styles.newBadge}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3757004/pexels-photo-3757004.jpeg' }}
            style={styles.badgeImage}
          />
          <View style={styles.badgeInfo}>
            <Text style={styles.badgeLabel}>Nova Conquista</Text>
            <Text style={styles.badgeName}>Primeiro Treino</Text>
            <Text style={styles.badgeDescription}>
              Complete seu primeiro treino no FitHome!
            </Text>
          </View>
        </View>
        
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.shareButton}>
            <Share2 size={20} color="#fff" />
            <Text style={styles.shareText}>Compartilhar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.homeButton} onPress={handleFinish}>
            <Home size={20} color="#fff" />
            <Text style={styles.homeText}>Página Inicial</Text>
          </TouchableOpacity>
        </View>
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
  trophy: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  congratsText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 15,
  },
  newBadge: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    width: '100%',
  },
  badgeImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  badgeName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  badgeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginRight: 10,
  },
  shareText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginLeft: 10,
  },
  homeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
});