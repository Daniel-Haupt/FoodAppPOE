import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const bgImage = require('./assets/background.jpg');

export default function GuestMenu({ navigation, starters, mains, desserts }: any) {
  const [filter, setFilter] = useState<'all' | 'starter' | 'main' | 'dessert'>('all');

  const sections = useMemo(() => {
    if (filter === 'starter') return [{ title: 'Starters', data: starters }];
    if (filter === 'main') return [{ title: 'Mains', data: mains }];
    if (filter === 'dessert') return [{ title: 'Desserts', data: desserts }];
    return [
      { title: 'Starters', data: starters },
      { title: 'Mains', data: mains },
      { title: 'Desserts', data: desserts },
    ];
  }, [filter, starters, mains, desserts]);

  return (
    <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>GUEST MENU</Text>

        <View style={styles.pickerWrapper}>
          <Picker selectedValue={filter} onValueChange={(v) => setFilter(v)} style={styles.picker}>
            <Picker.Item label="All" value="all" />
            <Picker.Item label="Starters" value="starter" />
            <Picker.Item label="Mains" value="main" />
            <Picker.Item label="Desserts" value="dessert" />
          </Picker>
        </View>

        {sections.map((sec) => (
          <View key={sec.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{sec.title}</Text>
            {sec.data.length === 0 ? (
              <Text style={styles.emptyText}>No items.</Text>
            ) : (
              sec.data.map((dish: any, i: number) => (
                <View key={`${sec.title}-${i}`} style={styles.dishItem}>
                  <Text style={styles.dishText}>{dish.name}</Text>
                  <Text style={styles.dishText}>{dish.description}</Text>
                  <Text style={styles.dishText}>R{dish.price}</Text>
                </View>
              ))
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
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
    textAlign: 'center',
  },
  pickerWrapper: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
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
  emptyText: {
    fontSize: 18,
    opacity: 0.6,
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

