import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, userFormData } from '../state/formSlice';
import { Card, Text } from 'react-native-paper';

export default App = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchUsers())
    }, []);
    
    const userData = useSelector(userFormData);

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.row}>
                    <Text style={styles.label}>First Name: </Text>
                    <Text style={styles.value}>{item.FirstName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Last Name: </Text>
                    <Text style={styles.value}>{item.LastName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Business: </Text>
                    <Text style={styles.value}>{item.Business}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Address: </Text>
                    <Text style={styles.value}>{item.Address}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Phone: </Text>
                    <Text style={styles.value}>{item.PhoneNumber}</Text>
                </View>
            </Card.Content>
        </Card>
    );
  
    return (
      <View style={styles.container}>
        <Navigation />
        <FlatList
            data={userData}
            keyExtractor={item => item.UserID.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    flex: 1, // Ensures label and value stay on the same line with space between
  },
  value: {
    flex: 2, // Allows value text to take more space, making it responsive
    textAlign: 'left',
  },
});
