import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [tasks, setTasks] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: "Learn React Native",
      completed: true,
    },
    {
      id: 2,
      task: "Learn React Native Animation",
      completed: false,
    },
  ]);

  const addTodo = () => {
    if (!tasks) {
      Alert.alert("Error", "Please enter a task");
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      task: tasks,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTasks("");
  };

  const markTodoAsCompleted = (taskID) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === taskID) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
    };
    
    const deleteTodo = (taskID) => {
        setTodos(todos.filter((todo) => todo.id !== taskID));
    };

    const clearTodo = () => {
        Alert.alert("Confirm", "Are you sure you want to delete tasks?", [{
            text: "Cancel",
            style: "cancel"
        }, {
            text: "OK",
            onPress: () => setTodos([])
        }] )
    }

    const getData = async todos => {
        try {
            const value = await AsyncStorage.getItem("todos");
            if (value !== null) {
                // We have data!!
                return setTodos(JSON.parse(value));
                // return value;
            }
        } catch (e) {
            Alert.alert("Error Getting Todos");
        }
    }

    useEffect(() => {
        getData();
    }, []);
    
    useEffect(() => {
        AsyncStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


  const state = {
    tasks,
    setTasks,
    todos,
    setTodos,
    markTodoAsCompleted,
      addTodo,
      deleteTodo,
        clearTodo,
  };

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};

const Consumer = GlobalContext.Consumer;

export { GlobalContext, GlobalProvider, Consumer };
