import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const BirthdatePage = ({ navigation, route }) => {
  const { firstName, middleName, lastName, password } = route.params;

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleNext = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      navigation.navigate('username', {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        password: password,
        selectedDay: selectedDay,
        selectedMonth: selectedMonth,
        selectedYear: selectedYear,
      });
      console.log('Selected Birthdate:', selectedDay, selectedMonth, selectedYear);
    } else {
      alert('Please select your complete birthdate');
    }
  };

  const renderDayItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedDay === item ? styles.selectedItem : null]}
      onPress={() => setSelectedDay(item)}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderMonthItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedMonth === item ? styles.selectedItem : null]}
      onPress={() => setSelectedMonth(item)}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderYearItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedYear === item ? styles.selectedItem : null]}
      onPress={() => setSelectedYear(item)}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  const generateNumberArray = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => (start + index).toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Birthdate</Text>
      <View style={styles.scrollContainer}>
        <FlatList
          data={generateNumberArray(1, 31)}
          renderItem={renderDayItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={[
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ]}
          renderItem={renderMonthItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={generateNumberArray(1900, new Date().getFullYear())}
          renderItem={renderYearItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('signin')}}>
      <Text style={styles.bottomText}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36444b',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    height: 100,
    
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
  },
  itemText: {
    fontSize: 18,
  },
  selectedItem: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  bottomText: {
    marginTop: 20,
  },
});

export default BirthdatePage;