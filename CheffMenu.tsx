import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const bgImage = require('./assets/background.jpg');

export default function Menu({ navigation, starters, mains, desserts, setStarters, setMains, setDesserts }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    courseType: '',
    price: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const newDish = { name: formData.name, description: formData.description, price: formData.price };
    if (formData.courseType === 'starter') setStarters([...starters, newDish]);
    else if (formData.courseType === 'main') setMains([...mains, newDish]);
    else if (formData.courseType === 'dessert') setDesserts([...desserts, newDish]);
    setFormData({ name: '', description: '', courseType: '', price: '' });
    setModalVisible(false);
  };

  const removeDish = (index: number, type: string) => {
    if (type === 'starter') setStarters(starters.filter((_: any, i: number) => i !== index));
    else if (type === 'main') setMains(mains.filter((_: any, i: number) => i !== index));
    else if (type === 'dessert') setDesserts(desserts.filter((_: any, i: number) => i !== index));
  };

  const avg = (items: any[]) => {
    if (!items.length) return '0.00';
    const sum = items.reduce((t, d) => t + (parseFloat(String(d.price).replace(',', '.')) || 0), 0);
    return (sum / items.length).toFixed(2);
  };

  const averages = useMemo(
    () => ({ starters: avg(starters), mains: avg(mains), desserts: avg(desserts) }),
    [starters, mains, desserts]
  );

  return (
    <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>THE FOOD APP</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total Dishes Available</Text>
          <Text style={styles.dishText}>{starters.length + mains.length + desserts.length}</Text>
          <Text style={styles.avgText}>
            Avg Starters: R{averages.starters} | Mains: R{averages.mains} | Desserts: R{averages.desserts}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Starters</Text>
          {starters.map((dish: any, i: number) => (
            <View key={i} style={styles.dishItem}>
              <Text style={styles.dishText}>{dish.name}</Text>
              <Text style={styles.dishText}>{dish.description}</Text>
              <Text style={styles.dishText}>R{dish.price}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeDish(i, 'starter')}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          {starters.length === 0 && <Text style={styles.emptyText}>No starters yet.</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mains</Text>
          {mains.map((dish: any, i: number) => (
            <View key={i} style={styles.dishItem}>
              <Text style={styles.dishText}>{dish.name}</Text>
              <Text style={styles.dishText}>{dish.description}</Text>
              <Text style={styles.dishText}>R{dish.price}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeDish(i, 'main')}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          {mains.length === 0 && <Text style={styles.emptyText}>No mains yet.</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Desserts</Text>
          {desserts.map((dish: any, i: number) => (
            <View key={i} style={styles.dishItem}>
              <Text style={styles.dishText}>{dish.name}</Text>
              <Text style={styles.dishText}>{dish.description}</Text>
              <Text style={styles.dishText}>R{dish.price}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeDish(i, 'dessert')}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          {desserts.length === 0 && <Text style={styles.emptyText}>No desserts yet.</Text>}
        </View>

     
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.backButtonText}>Home</Text>
        </TouchableOpacity>
      </ScrollView>

      {!modalVisible && (
        <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Add Food Item</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Food Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Dish Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={formData.description}
              onChangeText={(text) => handleInputChange('description', text)}
            />
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.courseType}
                onValueChange={(value) => handleInputChange('courseType', value)}
                style={styles.picker}
              >
                <Picker.Item label="Select Course Type..." value="" />
                <Picker.Item label="Starter" value="starter" />
                <Picker.Item label="Main" value="main" />
                <Picker.Item label="Dessert" value="dessert" />
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={formData.price}
              onChangeText={(text) => {
                const cleanText = text.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                handleInputChange('price', cleanText);
              }}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingTop: 60,
    paddingBottom: 120,
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'orange',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    fontSize: 30,
  },
  section: {
    width: '90%',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffffffaa',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dishItem: {
    marginBottom: 15,
  },
  dishText: {
    fontSize: 30,
    fontFamily: 'Open Sans',
  },
  avgText: {
    marginTop: 6,
    fontSize: 22,
  },
  emptyText: {
    fontSize: 18,
    opacity: 0.6,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 30,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    marginBottom: 10,
    overflow: 'hidden',
    fontSize: 30,
  },
  picker: {
    height: 50,
    width: '100%',
    fontSize: 30,
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  backButton: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    marginTop: 30,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },
});

