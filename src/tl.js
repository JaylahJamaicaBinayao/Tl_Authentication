import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Modal, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useStore } from './store';
import { FIREBASE_AUTH } from '../firebaseConfig';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ToDoList = () => {
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState('');

  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);
  const editTodo = useStore((state) => state.editTodo);

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      addTodo({
        id: Math.random().toString(),
        text: text.trim(),
      });
      setText('');
    }
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const handleEditTodo = () => {
    if (editItemText.trim() !== '') {
      editTodo(editItemId, editItemText);
      setModalVisible(false);
      setEditItemText('');
    }  
  };

  const openEditModal = (id, currentText) => {
    setEditItemId(id);
    setEditItemText(currentText);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.text}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Delete"
          onPress={() => handleDeleteTodo(item.id)}
          color="#5755FE"
        />
        <View style={{ width: 10 }} />
        <Button
          title="Edit"
          onPress={() => openEditModal(item.id, item.text)}
          color="#5755FE"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.header}>My ToDoList</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <Image source={require('../assets/jaying.png')} style={styles.idPicture} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Name: Binayao, Jaylah Jamaica T.</Text>
            <Text style={styles.id}>School ID: 20201299</Text>
            <Text style={styles.section}>Section Code: IT35 B</Text>
            <Text style={styles.sd}>Course Description: Application Development</Text>
            <Text style={styles.cm}>Course Name: BSIT</Text>
            <Text style={styles.ay}>Academic Year: 2024-2025</Text>
            <TouchableOpacity style={styles.button} onPress={() => FIREBASE_AUTH.signOut()}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
      <Button title="Add" onPress={handleAddTodo} color="#5755FE"/>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={todos.length === 0 && styles.emptyListContainer}
        ListEmptyComponent={<Text style={styles.emptyListText}>No To-Do List Today</Text>}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setEditItemText('');
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              value={editItemText}
              onChangeText={setEditItemText}
            />
            <Button title="Save" onPress={handleEditTodo} color="#5755FE" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFDDD2",
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "white",
  },
  headerBox: {
    backgroundColor: '#E178C5',
    padding: 10,
    marginBottom: 15,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 20,
  },
  profileContainer: {
    marginBottom: 20,
  },
  idPicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginRight: 20,
    marginBottom: 50,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "600",
  },
  id: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "600",
  },
  section: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "600",
  },
  sd: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "600",
  },
  cm: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "600",
  },
  ay: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    marginTop: 15,
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  button: {
    backgroundColor: "#5755FE",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});


export default ToDoList;
