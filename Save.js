  //   const [userDetails, setUserDetails] = React.useState();

  //   React.useEffect(() => {
  //     getUserDetails();
  //   }, []);

  //   const getUserDetails = async () => {
  //     const userData = await AsyncStorage.getItem("user");
  //     if (userData) {
  //       setUserDetails(JSON.parse(userData));
  //     }
  //     };

  //     const logout = () => {
  //         AsyncStorage.setItem(
  //           'userData',
  //           JSON.stringify({...userDetails, loggedIn: false}),
  //         );
  //         navigation.navigate('Login');
  //     };