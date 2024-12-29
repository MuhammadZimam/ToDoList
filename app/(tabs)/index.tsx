import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableHighlight, View, ScrollView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const App = () => {
  const [tasks, setTasks] = useState<{ id: number; text: string; isEditing: boolean; isChecked: boolean }[]>([]);
  const [userInput, setUserInput] = useState('');

  const addTaskView = () => {
    if (userInput.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: prevTasks.length + 1, text: userInput, isEditing: false, isChecked: false },
      ]);
      setUserInput(''); // Clear input after adding
    }
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleEditTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const updateTask = (id: number, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };

  const toggleCheckTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        <Text>{'\n'}</Text>
        <View style={styles.header}>
          <Text style={styles.headerText}>To Do List</Text>
        </View>
        <View style={styles.searchView}>
          <TextInput
            style={styles.input}
            placeholder="Add New Task"
            value={userInput}
            onChangeText={(text) => setUserInput(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={addTaskView} underlayColor="#DDDDDD">
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableHighlight>
        </View>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskView}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              {task.isEditing ? (
                <>
                  <TextInput
                    style={{ fontSize: 15, fontWeight: 'bold' }}
                    value={task.text}
                    onChangeText={(text) => updateTask(task.id, text)}
                    autoFocus
                  />
                  <TouchableHighlight
                    style={{ marginLeft: 10 }}
                    onPress={() => toggleEditTask(task.id)}
                    underlayColor="#DDDDDD"
                  >
                    <Text style={{ color: 'blue' }}>Save</Text>
                  </TouchableHighlight>
                </>
              ) : (
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>
                  {task.isChecked ? `✔️ ${task.text}` : task.text}
                </Text>
              )}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableHighlight
                  style={{ height: 20, width: 20 }}
                  onPress={() => toggleCheckTask(task.id)}
                  underlayColor="#DDDDDD"
                >
                  <MaterialIcons
                    name={task.isChecked ? "check-box" : "check-box-outline-blank"}
                    size={20}
                    color="green"
                  />
                </TouchableHighlight>
                {!task.isEditing && (
                  <>
                    <TouchableHighlight
                      style={{ height: 20, width: 20, marginLeft: 10 }}
                      onPress={() => toggleEditTask(task.id)}
                      underlayColor="#DDDDDD"
                    >
                      <MaterialIcons name="edit" size={20} color="blue" />
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ height: 20, width: 20, marginLeft: 10, marginRight: 10 }}
                      onPress={() => deleteTask(task.id)}
                      underlayColor="#DDDDDD"
                    >
                      <MaterialIcons name="delete" size={20} color="red" />
                    </TouchableHighlight>
                  </>
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    backgroundColor: 'blue',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  headerText: {
    fontSize: 27,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  searchView: {
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    marginTop: 70,
    marginLeft: 25,
    marginRight: 25,
  },
  input: {
    fontSize: 18,
    color: '#D3D3D3',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskView: {
    height: 50,
    borderWidth: 1,
    margin: 15,
    marginTop: 25,
    justifyContent: 'center',
  },
});

export default App;
