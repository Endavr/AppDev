import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useStore } from '../store/useStore';
import { Task } from '../types';

const EditTaskScreen = ({ navigation, route }) => {
  const { updateTask } = useStore();
  const task: Task = route.params.task;

  const [title, setTitle] = useState(task.title);
  const [tags, setTags] = useState(task.tags.join(', '));
  const [deadline, setDeadline] = useState(new Date(task.deadline));

  const handleSubmit = () => {
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    updateTask({
      ...task,
      title,
      tags: tagArray,
      deadline,
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Tags (comma-separated)</Text>
          <TextInput
            style={styles.input}
            value={tags}
            onChangeText={setTags}
            placeholder="e.g., homework, math, urgent"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Deadline</Text>
          <DateTimePicker
            value={deadline}
            mode="datetime"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setDeadline(selectedDate);
              }
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={!title.trim()}
        >
          <Text style={styles.submitButtonText}>Update Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  form: {
    padding: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditTaskScreen;