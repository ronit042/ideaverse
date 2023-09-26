import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';

const SettingsPrivacyPage = () => {
  // State for switches and dropdown
  const [accountStatus, setAccountStatus] = useState('public');
  const [darkMode, setDarkMode] = useState(false);
  const [liveStatus, setLiveStatus] = useState(false);
  const [messageSetting, setMessageSetting] = useState(true);
  const [archivedPost, setArchivedPost] = useState(true);
  const [accountStatusModalVisible, setAccountStatusModalVisible] = useState(false);
  const [highModalVisible, shighModalVisible] = useState(false);


  const toggleAccountStatusModal = () => {
    setAccountStatusModalVisible(!accountStatusModalVisible);
  };

  const highlighttoggle=()=>{
    shighModalVisible(!highModalVisible);
  }
  const chooseAccountStatus = (status) => {
    if (status === 'public' || status === 'private') {
      setAccountStatus(status);
    }
    toggleAccountStatusModal();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Account Status</Text>
        <TouchableOpacity onPress={toggleAccountStatusModal}>
          <Text style={styles.accountStatusText}>{accountStatus === 'public' ? 'Public' : 'Private'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
      <TouchableOpacity onPress={highlighttoggle}>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Highlights</Text>
      </View>
      </TouchableOpacity>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Notification</Text>
        <Switch value={messageSetting} onValueChange={setMessageSetting} />
      </View>
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.listItemText}>Help</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.listItemText}>About</Text>
      </TouchableOpacity>

      {/* Modal for Account Status */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={accountStatusModalVisible}
        onRequestClose={toggleAccountStatusModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => chooseAccountStatus('public')} style={styles.modalOption}>
              <Text>Public</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => chooseAccountStatus('private')} style={styles.modalOption}>
              <Text>Private</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleAccountStatusModal} style={styles.modalOption}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={highModalVisible}
        onRequestClose={highlighttoggle}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity  style={styles.modalOption}>
              <Text>Visibility</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text>Past Highlights</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={highlighttoggle} style={styles.modalOption}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 16,
  },
  accountStatusText: {
    fontSize: 16,
    color: '#007BFF',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  listItemText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default SettingsPrivacyPage;
