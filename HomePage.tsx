import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const bgImage = require('./assets/background.jpg');

export default function HomePage({ navigation, starters, mains, desserts }: any) {
  const avg = (items: any[]) => {
    if (!items.length) return '0.00';
    const sum = items.reduce((t, d) => t + (parseFloat(String(d.price).replace(',', '.')) || 0), 0);
    return (sum / items.length).toFixed(2);
  };

  const averages = useMemo(
    () => ({
      starters: avg(starters),
      mains: avg(mains),
      desserts: avg(desserts),
    }),
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
            </View>
          ))}
          {desserts.length === 0 && <Text style={styles.emptyText}>No desserts yet.</Text>}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.buttonText}>Chef Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { marginTop: 20, backgroundColor: '#ff9900' }]}
          onPress={() => navigation.navigate('GuestMenu')}
        >
          <Text style={styles.buttonText}>Guest Menu</Text>
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
  button: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },
});
