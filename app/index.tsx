import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import back_1 from "../assets/images/back_1.png";
import back_2 from "../assets/images/icon.png";
import play from "../assets/images/play.png";
import battle from "../assets/images/battle.png";
import back_3 from "../assets/images/back_3.png";
import { useNavigation } from "expo-router";

export default function Index() {
  const nav = useNavigation();
  const goToPlayScreen = () => {
    nav.navigate("play" as never);
  };
  const goToPlay2Screen = () => {
    nav.navigate("play2" as never);
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={back_1 as any} style={styles.backgroundImage}>
        <Image source={back_2 as any} style={styles.image} />
        <View style={styles.container}>
          <TouchableOpacity onPress={goToPlayScreen} style={styles.container}>
            <Image source={play as any} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToPlay2Screen} style={styles.container}>
            <Image source={battle as any} style={styles.image} />
          </TouchableOpacity>
        </View>
        <Image source={back_3 as any} style={styles.image2} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
    justifyContent: "center",
    paddingTop: 180,
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "black",
  },
  image: {
    width: 250,
    resizeMode: "contain",
    margin: "auto",
    flex: 1,
  },
  image2: {
    width: "100%",
    resizeMode: "contain",
    margin: "auto",
    flex: 1,
  },
});
