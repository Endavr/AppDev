import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircularProgress } from '../components/CircularProgress';
import { useStore } from '../store/useStore';
import { differenceInDays } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';

 const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { tasks, settings } = useStore();
  
  const calculateSemesterProgress = () => {
    const today = new Date();
    const { startDate, endDate } = settings.semesterDates;
    const totalDays = differenceInDays(new Date(endDate), new Date(startDate));
    const daysPassed = differenceInDays(today, new Date(startDate));
    return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed && !task.missed).length;
  const missedTasks = tasks.filter(task => task.missed).length;

  return (
    <LinearGradient
      colors={['#1E90FF', '#6A5ACD', '#00CED1']} // Turquoise, blue, and purple
      style={styles.container}
    >
      <CircularProgress progress={calculateSemesterProgress()} />

      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={[styles.statCard, styles.gradientCard]}
          onPress={() => navigation.navigate('Tasks', { filter: 'completed' })}
        >
          <Text style={styles.statNumber}>{completedTasks}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statCard, styles.gradientCard]}
          onPress={() => navigation.navigate('Tasks', { filter: 'pending' })}
        >
          <Text style={styles.statNumber}>{pendingTasks}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statCard, styles.gradientCard]}
          onPress={() => navigation.navigate('Tasks', { filter: 'missed' })}
        >
          <Text style={styles.statNumber}>{missedTasks}</Text>
          <Text style={styles.statLabel}>Missing</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32,
  },
  statCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
    elevation: 5, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gradientCard: {
    backgroundColor: 'transparent', // To let the gradient background show
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 4,
  },
});

export default HomeScreen;