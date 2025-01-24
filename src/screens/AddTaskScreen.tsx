import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useStore } from '../store/useStore';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type AddTaskScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddTaskScreen'
>;

const AddTaskScreen = ({ navigation }: { navigation: AddTaskScreenNavigationProp }) => {
  const { addTask } = useStore();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddTask = () => {
    addTask({
      title, tags, deadline,
      description: ''
    });
    navigation.goBack();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  interface DateChangeEvent {
    type: string;
    nativeEvent: any;
  }

  const handleDateChange = (event: DateChangeEvent, selectedDate?: Date | undefined) => {
    if (selectedDate) {
      const currentDate = selectedDate || deadline;
      setShowDatePicker(Platform.OS === 'ios');
      setDeadline(currentDate);
    } else {
      setShowDatePicker(false);
    }
  };

  interface TimeChangeEvent {
    type: string;
    nativeEvent: any;
  }

  const handleTimeChange = (event: TimeChangeEvent, selectedTime?: Date | undefined) => {
    if (selectedTime) {
      const currentTime = selectedTime || deadline;
      setShowTimePicker(Platform.OS === 'ios');
      setDeadline(currentTime);
    } else {
      setShowTimePicker(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />

      <Text style={styles.label}>Tags</Text>
      <View style={styles.tagInputContainer}>
        <TextInput
          style={styles.tagInput}
          value={tagInput}
          onChangeText={setTagInput}
          placeholder="Enter a tag"
        />
        <Button title="Add Tag" onPress={handleAddTag} />
      </View>
      <View style={styles.tagList}>
        {tags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
            <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
              <Text style={styles.removeTag}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Text style={styles.label}>Deadline</Text>
      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          value={deadline}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <Text style={styles.deadlineText}>
        {deadline ? deadline.toLocaleString() : 'No deadline selected'}
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTask}
        disabled={!title.trim()}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: 'white',
    marginRight: 4,
  },
  removeTag: {
    color: 'white',
    fontWeight: 'bold',
  },
  deadlineText: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;
