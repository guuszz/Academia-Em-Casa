import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';

export default function ProfileScreen() {
  const { username, streak, resetOnboarding } = useAppContext();
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
      </View>
      
      <View style={styles.profileCard}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg' }}
          style={styles.profileImage}
        />
        
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{username || 'Fitness Lover'}</Text>
          <Text style={styles.profileBio}>Membro desde Jun 2025</Text>
        </View>
      </View>
      
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>Sequência</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Treinos</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Conquistas</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferências</Text>
        
        <View style={styles.settingsCard}>
          <SettingsItem 
            icon={<Bell size={20} color="#FF5722" />}
            title="Notificações"
            hasSwitch={true}
          />
          
          <View style={styles.settingsDivider} />
          
          <SettingsItem 
            icon={<User size={20} color="#2196F3" />}
            title="Editar perfil"
            hasNavigation={true}
          />
          
          <View style={styles.settingsDivider} />
          
          <SettingsItem 
            icon={<Settings size={20} color="#9C27B0" />}
            title="Preferências de treino"
            hasNavigation={true}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suporte</Text>
        
        <View style={styles.settingsCard}>
          <SettingsItem 
            icon={<HelpCircle size={20} color="#4CAF50" />}
            title="Ajuda e suporte"
            hasNavigation={true}
          />
          
          <View style={styles.settingsDivider} />
          
          <SettingsItem 
            icon={<Shield size={20} color="#FFC107" />}
            title="Privacidade e termos"
            hasNavigation={true}
          />
        </View>
      </View>
      
      <TouchableOpacity style={styles.logoutButton} onPress={resetOnboarding}>
        <LogOut size={20} color="#FF5722" />
        <Text style={styles.logoutText}>Reiniciar Onboarding</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  hasSwitch?: boolean;
  hasNavigation?: boolean;
}

function SettingsItem({ icon, title, hasSwitch, hasNavigation }: SettingsItemProps) {
  return (
    <View style={styles.settingsItem}>
      <View style={styles.settingsItemLeft}>
        {icon}
        <Text style={styles.settingsItemTitle}>{title}</Text>
      </View>
      
      {hasSwitch && (
        <Switch
          trackColor={{ false: '#eee', true: 'rgba(255, 87, 34, 0.4)' }}
          thumbColor={true ? '#FF5722' : '#f4f3f4'}
          value={true}
        />
      )}
      
      {hasNavigation && (
        <ChevronRight size={20} color="#ccc" />
      )}
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#222',
    marginBottom: 4,
  },
  profileBio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#FF5722',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: 15,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#222',
    marginBottom: 16,
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#222',
    marginLeft: 16,
  },
  settingsDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 40,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FF5722',
    marginLeft: 12,
  },
});