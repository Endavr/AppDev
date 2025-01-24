import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TaskCard from '../components/TaskCard';
import { useStore } from '../store/useStore';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type TasksScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'TasksList'>;
  route: RouteProp<RootStackParamList, 'TasksList'>;
};

const TasksScreen = ({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) => {
  const { tasks = [], completeTask, deleteTask } = useStore();
  const [completedCollapsed, setCompletedCollapsed] = useState(false);
  const [pendingCollapsed, setPendingCollapsed] = useState(false);
  const [missedCollapsed, setMissedCollapsed] = useState(false);

  const completedTasks = tasks.filter(task => task.completed).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  const pendingTasks = tasks.filter(task => !task.completed && !task.missed).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  const missedTasks = tasks.filter(task => task.missed).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  return (
    <LinearGradient
          colors={['#1E90FF', '#6A5ACD', '#00CED1']} // Turquoise, blue, and purple
          style={styles.container}
        >
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCompletedCollapsed(!completedCollapsed)} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Completed Tasks</Text>
        <Icon name={completedCollapsed ? 'expand-more' : 'expand-less'} size={24} />
      </TouchableOpacity>
      {!completedCollapsed && (
        <FlatList
          data={completedTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onComplete={() => completeTask(item.id)}
              onEdit={() => navigation.navigate('EditTask', { task: item })}
              onDelete={() => deleteTask(item.id)}
            />
          )}
        />
      )}

      <TouchableOpacity onPress={() => setPendingCollapsed(!pendingCollapsed)} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Pending Tasks</Text>
        <Icon name={pendingCollapsed ? 'expand-more' : 'expand-less'} size={24} />
      </TouchableOpacity>
      {!pendingCollapsed && (
        <FlatList
          data={pendingTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onComplete={() => completeTask(item.id)}
              onEdit={() => navigation.navigate('EditTask', { task: item })}
              onDelete={() => deleteTask(item.id)}
            />
          )}
        />
      )}

      <TouchableOpacity onPress={() => setMissedCollapsed(!missedCollapsed)} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Missed Tasks</Text>
        <Icon name={missedCollapsed ? 'expand-more' : 'expand-less'} size={24} />
      </TouchableOpacity>
      {!missedCollapsed && (
        <FlatList
          data={missedTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onComplete={() => completeTask(item.id)}
              onEdit={() => navigation.navigate('EditTask', { task: item })}
              onDelete={() => deleteTask(item.id)}
            />
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Icon name="add" size={30} color="white" />
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TasksScreen;