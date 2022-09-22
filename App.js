import React, { useState, useEffect} from "react";
import Registration from "./Src/Views/Screens/Registration";
import Login from "./Src/Views/Screens/Login";
import Home from "./Src/Views/Screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Loader from "./Src/Views/Components/Loader";
import { GlobalProvider } from "./Context";
import OnBoardingScreen from "./Src/Views/Screens/OnBoardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState("");
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(true);  

  useEffect(() => {
    setTimeout(authUser, 2000);
  }, []);


  useEffect(() => {
    async function check(){
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }
    }
    
    check();
    AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);
  
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName("OnBoardingScreen");
        } else {
          setInitialRouteName("OnBoardingScreen");
        }
      } else {
        setInitialRouteName("OnBoardingScreen");
      }
    } catch (error) {
      setInitialRouteName("OnBoardingScreen");
    }
  };

  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    isAppFirstLaunched != null && (
    <GlobalProvider>
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={screenOptions}
          >
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            {isAppFirstLaunched && (
            <Stack.Screen
              name="OnBoardingScreen"
              component={OnBoardingScreen}
            />
          )}
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
      </GlobalProvider>
    )
  );
}
