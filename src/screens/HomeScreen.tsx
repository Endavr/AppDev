import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
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
    {/* Semester Progress */}
    <View style={styles.progressContainer}>
    <View style={styles.container}>
      <Text style={styles.progressLabel}>Semester Progress</Text>
      <CircularProgress progress={calculateSemesterProgress()} />
      <Text style={styles.progressText}>
        {Math.round(calculateSemesterProgress())}% of the semester completed
      </Text>
    </View>

    {/* Task Statistics */}
    <View style={styles.statsContainer}>
      <TouchableOpacity
        style={styles.statCard}
        onPress={() => navigation.navigate('Tasks', { filter: 'completed' })}
      >
        <LinearGradient
          colors={['#6A5ACD', '#1E90FF']}
          style={styles.gradientCard}
        >
          <Text style={styles.statNumber}>{completedTasks}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.statCard}
        onPress={() => navigation.navigate('Tasks', { filter: 'pending' })}
      >
        <LinearGradient
          colors={['#00CED1', '#1E90FF']}
          style={styles.gradientCard}
        >
          <Text style={styles.statNumber}>{pendingTasks}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.statCard}
        onPress={() => navigation.navigate('Tasks', { filter: 'missed' })}
      >
        <LinearGradient
          colors={['#FF6347', '#FF4500']}
          style={styles.gradientCard}
        >
          <Text style={styles.statNumber}>{missedTasks}</Text>
          <Text style={styles.statLabel}>Missed</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
    </View>

    {/* Task List */}
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDeadline}>
            Due: {new Date(item.deadline).toLocaleDateString()}
          </Text>
        </View>
      )}
      contentContainerStyle={styles.taskList}
    />
  </LinearGradient>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
},
progressContainer: {
  alignItems: 'center',
  marginTop: 32,
},
progressLabel: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'white',
},
progressText: {
  marginTop: 16,
  fontSize: 16,
  fontWeight: '500',
  color: 'white',
},
statsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 32,
  marginHorizontal: 16,
},
statCard: {
  flex: 1,
  marginHorizontal: 8,
  borderRadius: 12,
  overflow: 'hidden',
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
gradientCard: {
  paddingVertical: 24,
  paddingHorizontal: 16,
  alignItems: 'center',
},
statNumber: {
  fontSize: 28,
  fontWeight: 'bold',
  color: 'white',
},
statLabel: {
  fontSize: 16,
  color: '#E0E0E0',
  marginTop: 8,
},
taskList: {
  paddingBottom: 16,
},
taskItem: {
  backgroundColor: 'rgba(88, 208, 255, 0.67)',
  marginHorizontal: 16,
  padding: 12,
  marginBottom: 8,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
},
taskTitle: {
  fontSize: 18,
  fontWeight: '500',
  color: '#3f51b5',
},
taskDeadline: {
  fontSize: 14,
  color: 'white',
  marginTop: 4,
},
});

export default HomeScreen;