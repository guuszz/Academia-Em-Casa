import { Stack } from 'expo-router/stack';

export default function WorkoutLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="active" />
      <Stack.Screen name="rest" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}