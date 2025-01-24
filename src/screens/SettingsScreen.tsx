import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useStore } from '../store/useStore';
import { LinearGradient } from 'expo-linear-gradient';
const SettingsScreen = () => {
  const { settings, updateSettings } = useStore();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' });
  };

  const handleStartDateChange = (event: any, date: Date | undefined) => {
    setShowStartDatePicker(false); // Close the start date picker
    if (date) {
      updateSettings({
        semesterDates: {
          ...settings.semesterDates,
          startDate: date,
        },
      });
    }
  };

  const handleEndDateChange = (event: any, date: Date | undefined) => {
    setShowEndDatePicker(false); // Close the end date picker
    if (date) {
      updateSettings({
        semesterDates: {
          ...settings.semesterDates,
          endDate: date,
        },
      });
    }
  };

  return (
    <LinearGradient
      colors={['#1E90FF', '#6A5ACD', '#00CED1']} // Turquoise, Blue, Purple gradient
      style={styles.container}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Semester Dates</Text>

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Start Date:</Text>
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
            <Text style={styles.dateText}>
              {new Date(settings.semesterDates.startDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>

        {showStartDatePicker && (
          <DateTimePicker
            value={new Date(settings.semesterDates.startDate)}
            mode="date"
            onChange={handleStartDateChange}
          />
        )}

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>End Date:</Text>
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
            <Text style={styles.dateText}>
              {new Date(settings.semesterDates.endDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>

        {showEndDatePicker && (
          <DateTimePicker
            value={new Date(settings.semesterDates.endDate)}
            mode="date"
            onChange={handleEndDateChange}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Theme</Text>
          <Switch
            value={settings.theme === 'dark'}
            onValueChange={toggleTheme}
            thumbColor="#fff"
            trackColor={{ false: '#767577', true: '#4caf50' }} // Toggle switch colors
          />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff', // White background for section
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50', // Turquoise color for section title
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 16,
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    color: '#007AFF', // Blue color for clickable dates
    textDecorationLine: 'underline',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff3b30', // Red color for logout button
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
