import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
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
    <LinearGradient  
      colors={['#1E90FF', '#6A5ACD', '#00CED1']} // Turquoise, blue, purple  
      style={styles.gradientBackground}  
    >  
      <View style={styles.container}>  
        <FlatList  
          data={filteredTasks}  
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
          <LinearGradient  
            colors={['#00CED1', '#1E90FF']}  
            style={styles.addButtonGradient}  
          >  
            <Icon name="add" size={30} color="white" />  
          </LinearGradient>  
        </TouchableOpacity>  
      </View>  
    </LinearGradient>
  );
};

const styles = StyleSheet.create({  
  gradientBackground: {  
    flex: 1,  
  },  
  container: {  
    flex: 1,  
    padding: 16,  
  },  
  addButton: {  
    position: 'absolute',  
    right: 16,  
    bottom: 16,  
    borderRadius: 50,  
  },  
  addButtonGradient: {  
    width: 60,  
    height: 60,  
    borderRadius: 30,  
    alignItems: 'center',  
    justifyContent: 'center',  
    elevation: 5, // Android shadow  
    shadowColor: '#000', // iOS shadow  
    shadowOffset: { width: 0, height: 4 },  
    shadowOpacity: 0.2,  
    shadowRadius: 4,  
  },  
});

export default TasksScreen;
