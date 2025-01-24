import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TaskCard from '../components/TaskCard';
import { useStore } from '../store/useStore';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type TasksScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'TasksList'>;
  route: RouteProp<RootStackParamList, 'TasksList'>;
};

const TasksScreen: React.FC<TasksScreenProps> = ({ navigation, route }) => {
  const { tasks = [], completeTask, deleteTask } = useStore();
  const filter = route.params?.filter || 'all';

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed && !task.missed;
      case 'missed':
        return task.missed;
      default:
        return true;
    }
  });

  // Sort tasks by deadline (ascending order: closest first)
  const sortedTasks = filteredTasks.sort((a, b) => {
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedTasks} // Use sortedTasks here
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTaskScreen')}
      >
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
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
