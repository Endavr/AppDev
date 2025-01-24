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
import { LinearGradient } from 'expo-linear-gradient';
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
  const [description, setDescription] = useState('');
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
    <LinearGradient
      colors={['#1E90FF', '#6A5ACD', '#00CED1']}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter task description"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Deadline</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.buttonText}>Select Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.buttonText}>Select Time</Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={deadline}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={deadline}
            mode="time"
            display="spinner"
            onChange={handleTimeChange}
          />
        )}
        <Text style={styles.deadlineText}>
          Deadline: {deadline ? deadline.toLocaleString() : 'Not set'}
        </Text>

        <TouchableOpacity
          style={[styles.addButton, !title.trim() && styles.disabledButton]}
          onPress={handleAddTask}
          disabled={!title.trim()}
        >
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 32,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: '#333',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateButton: {
    backgroundColor: '#1fa2ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  timeButton: {
    backgroundColor: '#c471ed',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deadlineText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#5f2eea',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;
