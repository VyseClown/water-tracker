import React from "react";
import { StatusBar } from "expo-status-bar";
import Bottomnav from "./components/Bottomnav";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import firebase from "firebase/app";
import TopBar from "./components/TopBar";
import { firebaseConfig } from "./firebaseConfig";
/*import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";*/

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default function App() {
  const [loggedIn, setloggedIn] = React.useState(false);
  const [userInfo, setuserInfo] = React.useState([]);
  const { webClientId } = firebaseConfig;
    console.log('webClientId', webClientId)
  const theme = {
    ...DefaultTheme,
    dark: true,
    mode: "adaptive",
    roundness: 15,
    colors: {
      ...DefaultTheme.colors,
      primary: "#2176FF",
      accent: "#33A1FD",
      surface: "#131A26",
      background: "#131A26",
      text: "#FFFFFF",
    },
  };
  /*_signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      setloggedIn(true);

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      await auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert("Cancel");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signin in progress");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("PLAY_SERVICES_NOT_AVAILABLE");
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (user) setloggedIn(true);
  }
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["email"], // what API you want to access on behalf of the user, default is email and profile
      webClientId: webClientId, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert("Your are signed out!"));
      setloggedIn(false);
      // setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };*/

  return (
    <>
      {/*!user ? (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}
            >
              <Header />

              <View style={styles.body}>
                <View style={styles.sectionContainer}>
                  {!loggedIn && (
                    <GoogleSigninButton
                      style={{ width: 192, height: 48 }}
                      size={GoogleSigninButton.Size.Wide}
                      color={GoogleSigninButton.Color.Dark}
                      onPress={this._signIn}
                    />
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  {!user && <Text>You are currently logged out</Text>}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      ) : (*/
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            <View style={styles.content}>
              <TopBar />
              <Bottomnav />

              {/*<Button
                        onPress={this.signOut}
                        title="LogOut"
                        color="red"
              ></Button>*/}
            </View>
            <StatusBar style="auto" />
          </View>
        </PaperProvider>
      /*)*/}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  content: {
    flex: 10,
  },
  /*scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonContainer: {
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },*/
});
