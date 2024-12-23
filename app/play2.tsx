import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import back from "../assets/images/back_1.png";
import disk from "../assets/images/disk.png";
import bau from "../assets/images/bau_cube_icon.png";
import horin from "../assets/images/nai_cube_icon.png";
import chingri from "../assets/images/tom_cube_icon.png";
import mas from "../assets/images/ca_cube_icon.png";
import kakra from "../assets/images/cua_cube_icon.png";
import murgi from "../assets/images/ga_cube_icon.png";
import horin_flat from "../assets/images/nai_icon.png";
import bau_flat from "../assets/images/bau_icon.png";
import murgi_flat from "../assets/images/ga_icon.png";
import mas_flat from "../assets/images/ca_icon.png";
import kakra_flat from "../assets/images/cua_icon.png";
import chingri_flat from "../assets/images/tom_icon.png";
import btnXoc from "../assets/images/btn_xoc.png";
import btnMo from "../assets/images/btn_open.png";
import btnBack from "../assets/images/back_btn.png";
import bgCash from "../assets/images/bg_cash.png";
import bowl from "../assets/images/bowl.png";
import border from "../assets/images/border.png";
import thorStand from "../assets/images/thor_05-stand.gif";
import thorSkill from "../assets/images/thor_05-skill.gif";

import { TextStroke } from "@/components/TextStroke";
import { useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";

import * as Animatable from "react-native-animatable";

import Song from "@/components/Song";
import { BouContext } from "@/provider/BouContext";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
const alphabet = ["K", "C"];

const bouImages = [bau, kakra, murgi, mas, horin, chingri];
const bouImagesFlat = [
  bau_flat,
  kakra_flat,
  murgi_flat,
  mas_flat,
  horin_flat,
  chingri_flat,
];

export default function Play2() {
  const [liftBowl, setLiftBowl] = useState({
    flex: 1,
    marginTop: -2092,
    marginLeft: -13,
  });
  const [liftedBowl, setLiftedBowl] = useState(true);
  const [versionGen, setVersionGen] = useState("23.354.56");
  const [thor, setThor] = useState(thorStand);
  const nav = useNavigation();

  const goToHomeScreen = () => {
    nav.navigate("index" as never);
  };

  const [bouWin, setBouWin] = useState([bau, murgi, kakra]);
  const [bouWinFlat, setBouWinFlat] = useState([
    bau_flat,
    kakra_flat,
    murgi_flat,
  ]);

  const { sound, setSound, shakeSound, winSound } = useContext(BouContext)!;
  const updateBouWin = () => {
    const rand1 = getRandomNumber();
    const rand2 = getRandomNumber();
    const rand3 = getRandomNumber();
    const winner = [
      bouImages[rand1],
      bouImages[rand2],
      bouImages[rand3],
    ] as never;
    setBouWin(winner);
    const winnerFlat = [
      bouImagesFlat[rand1],
      bouImagesFlat[rand2],
      bouImagesFlat[rand3],
    ] as never;
    setBouWinFlat(winnerFlat);
  };
  const getRandomNumber = () => {
    const ranndomNumer = Math.floor(Math.random() * 6); // Generates a random number between 0 and 5

    if (ranndomNumer < 6 && ranndomNumer >= 0) {
      return ranndomNumer;
    } else {
      return 0;
    }
  };

  const fadeIn = {
    from: {
      marginTop: -1900,
    },
    to: {
      marginTop: -470,
    },
  };
  const fadeout = {
    from: {
      marginTop: -470,
    },
    to: {
      marginTop: -1900,
    },
  };
  const handleBowlPress = async () => {
    if (liftedBowl) {
      await shakeSound?.stopAsync();
      await shakeSound?.playAsync();
    } else {
      updateBouWin();
      await winSound?.stopAsync();
      await winSound?.playAsync();
    }

    setLiftedBowl(!liftedBowl);
  };

  const random9 = (n: number) => {
    return Math.floor(Math.random() * n);
  };

  useEffect(() => {
    setVersionGen(
      `${random9(9)}.${random9(9)}.${random9(9)}${random9(9)}.${
        alphabet[random9(alphabet.length - 1)]
      }`
    );
  }, []);

  useEffect(() => {
    const timer = () => {
      const time = setTimeout(() => {
        clearTimeout(time);
        setThor(thorSkill);
        const time2 = setTimeout(() => {
          clearTimeout(time2);
          setThor(thorStand);
          timer();
        }, 3200);
      }, 10000);
    };

    timer();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={back as any} style={styles.backgroundImage}>
        <View style={styles.container4}>
          <View style={styles.imageHolder}>
            <Image source={bouWinFlat[0] as any} style={styles.image3}></Image>
          </View>

          <View style={styles.imageHolder}>
            <Image source={bouWinFlat[1] as any} style={styles.image3}></Image>
          </View>
          <View style={styles.imageHolder}>
            <Image source={bouWinFlat[2] as any} style={styles.image3}></Image>
          </View>
        </View>
        <View style={styles.disk}>
          <Image source={disk as any} style={styles.image2}></Image>

          <View style={styles.absolute}>
            <View style={styles.bou}>
              <Image source={bouWin[0] as any} style={styles.image}></Image>
              <Image source={bouWin[1] as any} style={styles.image}></Image>
              <View style={styles.container3}>
                <Image source={bouWin[2] as any} style={styles.image}></Image>
              </View>
            </View>
            {!liftedBowl && (
              <Animatable.View
                animation={fadeIn}
                duration={200}
                style={{ flex: 1, marginLeft: -20 }}
              >
                <Image source={bowl as any} style={styles.imageBowl}></Image>
              </Animatable.View>
            )}
            {liftedBowl && (
              <Animatable.View
                animation={fadeout}
                duration={200}
                style={{ flex: 1, marginLeft: -20 }}
              >
                <Image source={bowl as any} style={styles.imageBowl}></Image>
              </Animatable.View>
            )}
          </View>

          <TouchableOpacity
            onPress={goToHomeScreen}
            style={{ flex: 0, position: "absolute", top: 30 }}
          >
            <Image
              source={btnBack as any}
              style={{ maxHeight: 70, resizeMode: "contain" }}
            ></Image>
          </TouchableOpacity>
          <View style={{ flex: 0, position: "absolute", right: 0, top: 25 }}>
            <Song sound={sound} setSound={setSound}></Song>
          </View>
        </View>

        <View style={{ overflow: "hidden", position: "relative", flex: 1 }}>
          <TouchableOpacity
            onPress={handleBowlPress}
            style={{
              margin: "auto",
              position: "absolute",
              bottom: 35,
              left: width / 2 - 80,
              zIndex: 2,
            }}
            activeOpacity={1}
          >
            <Image
              style={{
                height: 70,
                width: 165,
                resizeMode: "contain",
              }}
              source={liftedBowl ? btnMo : (btnXoc as any)}
            ></Image>
          </TouchableOpacity>
          <Image
            style={{
              height: "1000%",
              width: "1000%",
              resizeMode: "contain",
              position: "absolute",
              bottom: -height / 3.1,
              left: -width * 4.67,
              zIndex: 0,
            }}
            source={thor as any}
          ></Image>
          <View
            style={{
              flex: 0,
              position: "absolute",
              bottom: 0,
              left: width / 2 - 50,
            }}
          >
            <Text style={styles.textVersion}>Vs: {versionGen}</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  layer: {
    position: "absolute",
    backgroundColor: "black",
    borderRadius: 10,
    opacity: 0.4,
    top: 0,
    width: "100%",
    height: "100%",
  },
  textVersion: {
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 5,
    paddingTop: 5,
    color: "white",
  },
  textBalance: {
    fontSize: 24,
    color: "white",
  },
  container4: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: height * 0.13,
  },
  container: {
    flex: 1,
  },
  disk: {
    position: "relative",
    flex: 5,
  },
  absolute: {
    position: "absolute",
    flex: 1,
    top: 130,
    left: "50%",
    transform: [{ translateX: -300 / 2 }],
  },
  bou: {
    flex: 1,
    flexDirection: "row",
    maxWidth: 300,
    flexWrap: "wrap",
  },
  imageBowl: {
    width: width * 0.83,
    resizeMode: "contain",
    margin: "auto",
  },
  container3: {
    marginTop: -30,
    margin: "auto",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "black",
  },
  image: {
    width: width * 0.34,
    height: height * 0.17,
    resizeMode: "contain",
    margin: "auto",
  },
  image3: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%",
    borderWidth: 0,
  },
  image2: {
    width: height * 0.42,
    resizeMode: "contain",
    margin: "auto",
  },
  imageHolder: {
    overflow: "hidden",
    width: width * 0.31,
    borderRadius: 10,
    height: height * 0.13,
  },
});
