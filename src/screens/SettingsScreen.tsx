import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useStore } from '../store/useStore';

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
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Semester Dates</Text>

        <View style={styles.dateContainer}>
          <Text>Start Date:</Text>
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
          <Text>End Date:</Text>
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
          <Text>Dark Theme</Text>
          <Switch
            value={settings.theme === 'dark'}
            onValueChange={toggleTheme}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;