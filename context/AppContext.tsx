import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextProps {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  username: string;
  setUsername: (name: string) => void;
  streak: number;
  incrementStreak: () => void;
}

const AppContext = createContext<AppContextProps>({
  hasCompletedOnboarding: false,
  completeOnboarding: () => {},
  resetOnboarding: () => {},
  username: '',
  setUsername: () => {},
  streak: 0,
  incrementStreak: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [username, setUsername] = useState('');
  const [streak, setStreak] = useState(0);
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
        const savedUsername = await AsyncStorage.getItem('username');
        const savedStreak = await AsyncStorage.getItem('streak');
        
        setHasCompletedOnboarding(onboardingCompleted === 'true');
        setUsername(savedUsername || '');
        setStreak(savedStreak ? parseInt(savedStreak) : 0);
      } catch (error) {
        console.error('Error loading user data', error);
      }
    };
    
    loadUserData();
  }, []);
  
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error('Error saving onboarding status', error);
    }
  };
  
  const resetOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'false');
      setHasCompletedOnboarding(false);
    } catch (error) {
      console.error('Error resetting onboarding status', error);
    }
  };
  
  const updateUsername = async (name: string) => {
    try {
      await AsyncStorage.setItem('username', name);
      setUsername(name);
    } catch (error) {
      console.error('Error saving username', error);
    }
  };
  
  const incrementStreak = async () => {
    try {
      const newStreak = streak + 1;
      await AsyncStorage.setItem('streak', newStreak.toString());
      setStreak(newStreak);
    } catch (error) {
      console.error('Error updating streak', error);
    }
  };
  
  const contextValue = {
    hasCompletedOnboarding,
    completeOnboarding,
    resetOnboarding,
    username,
    setUsername: updateUsername,
    streak,
    incrementStreak,
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};