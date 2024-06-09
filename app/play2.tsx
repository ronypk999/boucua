import {
  Image,
  ImageBackground,
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

import { TextStroke } from "@/components/TextStroke";
import { useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";

import Song from "@/components/Song";
import { BouContext } from "@/provider/BouContext";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

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
  const handleBowlPress = async () => {
    if (liftedBowl) {
      await shakeSound?.stopAsync();
      await shakeSound?.playAsync();
      setLiftBowl({
        flex: 1,
        marginTop: -1592,
        marginLeft: -13,
      });
      setTimeout(() => {
        setLiftBowl({
          flex: 1,
          marginTop: -1092,
          marginLeft: -13,
        });
      }, 40);
      setTimeout(() => {
        setLiftBowl({
          flex: 1,
          marginTop: -692,
          marginLeft: -13,
        });
      }, 80);
      setTimeout(() => {
        setLiftBowl({
          flex: 1,
          marginTop: -592,
          marginLeft: -13,
        });
      }, 120);
      setTimeout(() => {
        setLiftBowl({
          flex: 1,
          marginTop: -492,
          marginLeft: -13,
        });
      }, 150);
    } else {
      updateBouWin();
      await winSound?.stopAsync();
      await winSound?.playAsync();
      setLiftBowl({
        flex: 1,
        marginTop: -492,
        marginLeft: -13,
      });
      setTimeout(() => {
        setLiftBowl({
          flex: 1,
          marginTop: -692,
          marginLeft: -13,
        });
      }, 40);
      setTimeout(() => {
        setLiftBowl({
          flex: 1,
          marginTop: -892,
          marginLeft: -13,
        });
      }, 80);
      setTimeout(() => {
        setLiftBowl({
          flex: 1,
          marginTop: -1092,
          marginLeft: -13,
        });
      }, 120);
      setTimeout(() => {
        setLiftBowl({
          flex: 1,
          marginTop: -2092,
          marginLeft: -13,
        });
      }, 150);
    }

    setLiftedBowl(!liftedBowl);
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={back as any} style={styles.backgroundImage}>
        <View style={styles.container4}>
          <View style={{ position: "relative" }}>
            <Image source={bouWinFlat[0] as any} style={styles.image3}></Image>
          </View>

          <View style={{ position: "relative" }}>
            <Image source={bouWinFlat[1] as any} style={styles.image3}></Image>
          </View>
          <View style={{ position: "relative" }}>
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
            <View style={liftBowl}>
              <Image source={bowl as any} style={styles.imageBowl}></Image>
            </View>
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

        <TouchableOpacity
          onPress={handleBowlPress}
          style={{ flex: 0, margin: "auto" }}
          activeOpacity={1}
        >
          <Image source={liftedBowl ? btnMo : (btnXoc as any)}></Image>
        </TouchableOpacity>
        <View style={{ flex: 0 }}>
          <Text style={styles.textVersion}>Vs: 23.34.56</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    position: "absolute",
    backgroundColor: "black",
    borderRadius: 10,
    opacity: 0.4,
    width: 120,
    height: 110,
    marginTop: 5,
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
    flex: 3,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
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
    width: "103%",
    resizeMode: "contain",
    margin: "auto",
    flex: 1,
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
    width: 150,
    height: 150,
    resizeMode: "contain",
    margin: "auto",
  },
  image3: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    margin: "auto",
  },
  image2: {
    width: "90%",
    resizeMode: "contain",
    margin: "auto",
    flex: 1,
  },
});
