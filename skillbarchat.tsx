import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SkillsBarGraph = ({ skillsLevel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skills Level</Text>
      <View style={styles.graphContainer}>
        {Object.keys(skillsLevel).map(skill => (
          <View key={skill} style={styles.skillRow}>
            <Text style={styles.skillLabel}>{skill}</Text>
            <View style={[styles.bar, { width: skillsLevel[skill] * 250 }]} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  graphContainer: {},
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  skillLabel: {
    width: 100,
    marginRight: 10,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  bar: {
    height: 20,
    backgroundColor: '#4287f5',
    borderRadius: 10,
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    marginVertical: 15,
  },
});

export default SkillsBarGraph;
