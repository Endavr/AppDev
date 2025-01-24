import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface CircularProgressProps {
  progress: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={progress}
        tintColor="00e0ff"
        backgroundColor="#ffffff"
        rotation={0}
      >
        {(fill) => (
          <Text style={styles.progressText}>
            {Number.isFinite(fill) ? `${Math.round(fill)}% Complete` : '0% Complete'}
          </Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});