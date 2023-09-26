import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import goldBadge from './Legend.webp';

const LeagueInfo = () => {
  return (
    <View style={styles.container}>
     
      <View style={styles.contentContainer}>
        <View style={styles.fgContainer}>
          <View style={styles.goldBadge}>
            <Image source={goldBadge} style={styles.badgeImage} />
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>i</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.hjContainer}>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>245</Text>
            <Text style={styles.labelText}>Points</Text>
          </View>
          <View style={styles.starsContainer}>
            <Text style={styles.starsText}>7</Text>
            <Text style={styles.labelText}>Stars</Text>
          </View>
          <View style={styles.rankingContainer}>
            <Text style={styles.rankingText}>#12</Text>
            <Text style={styles.labelText}>Global Ranking</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
  },
  header: {
    justifyContent: 'center',
    marginRight: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  fgContainer: {
    width: 80,
  },
  goldBadge: {
    width: 80,
    height: 130,
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'relative',
  },
  badgeImage: {
    width: 60,
    height: 60,
  },
  infoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#333',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  hjContainer: {
    flex: 1,
    marginLeft: 10,
  },
  pointsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
    marginBottom: 5,
  },
  starsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
    marginBottom: 5,
  },
  rankingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  starsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rankingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 12,
    color: 'gray',
  },
});

export default LeagueInfo;
