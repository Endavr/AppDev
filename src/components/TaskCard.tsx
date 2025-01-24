import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Task } from '../types';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  onEdit,
  onDelete,
}) => {
  if (!task) {
    return null; // Ensure task is not undefined
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onComplete}>
            <Icon name={task.completed ? "check-circle" : "radio-button-unchecked"} size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onEdit}>
            <Icon name="edit" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Icon name="delete" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tags}>
        {task.tags && task.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.deadline}>
        Due: {task.deadline ? format(new Date(task.deadline), 'PPp') : 'No deadline'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
  },
  deadline: {
    marginTop: 8,
    color: '#666',
  },
});

export default TaskCard;