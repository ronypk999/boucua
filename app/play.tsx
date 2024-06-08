import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import back from "../assets/images/back.png";
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

export default function Play() {
  const [liftBowl, setLiftBowl] = useState({
    flex: 1,
    marginTop: -892,
    marginLeft: -13,
  });
  const [liftedBowl, setLiftedBowl] = useState(true);

  const nav = useNavigation();

  const goToHomeScreen = () => {
    nav.navigate("index" as never);
  };

  const [bouWin, setBouWin] = useState([bau, kakra, murgi]);
  const [won, setWon] = useState([]);

  const { sound, setSound, shakeSound, winSound } = useContext(BouContext)!;
  const updateBouWin = () => {
    const winner = [
      bouImages[getRandomNumber()],
      bouImages[getRandomNumber()],
      bouImages[getRandomNumber()],
    ] as never;
    setBouWin(winner);
    setWon(winner);
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
        marginTop: -892,
        marginLeft: -13,
      });
      setTimeout(() => {
        setLiftBowl({
          flex: 1,
          marginTop: -792,
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
          marginTop: -592,
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
          marginTop: -792,
          marginLeft: -13,
        });
      }, 120);
      setTimeout(() => {
        setLiftBowl({
          flex: 1,
          marginTop: -892,
          marginLeft: -13,
        });
      }, 150);
    }

    setLiftedBowl(!liftedBowl);
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={back as any} style={styles.backgroundImage}>
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

          <TouchableOpacity style={{ flex: 0, position: "absolute", top: 30 }}>
            <ImageBackground
              source={bgCash as any}
              style={{ width: 117, height: 45 }}
            >
              <View
                style={{
                  margin: "auto",
                  width: 90,
                }}
              >
                <TextStroke stroke={1.7} color={"#000000"}>
                  <Text style={styles.textBalance}>100,000</Text>
                </TextStroke>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={{ flex: 0, position: "absolute", right: 0, top: 25 }}>
            <Song sound={sound} setSound={setSound}></Song>
          </View>
          <TouchableOpacity
            onPress={goToHomeScreen}
            style={{ flex: 0, position: "absolute", bottom: 0 }}
          >
            <Image
              source={btnBack as any}
              style={{ maxHeight: 70, resizeMode: "contain" }}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.container4}>
          <View style={{ position: "relative" }}>
            <Image
              source={horin_flat as any}
              style={
                won.length === 0 || won.includes(horin as never)
                  ? styles.image3
                  : [styles.image3, { opacity: 0.8 }]
              }
            ></Image>
            {won.includes(horin as never) && (
              <Image
                source={border as any}
                style={[styles.image3, { position: "absolute" }]}
              ></Image>
            )}
          </View>

          <View style={{ position: "relative" }}>
            <Image
              source={bau_flat as any}
              style={
                won.length === 0 || won.includes(bau as never)
                  ? styles.image3
                  : [styles.image3, { opacity: 0.8 }]
              }
            ></Image>
            {won.includes(bau as never) && (
              <Image
                source={border as any}
                style={[styles.image3, { position: "absolute" }]}
              ></Image>
            )}
          </View>
          <View style={{ position: "relative" }}>
            <Image
              source={murgi_flat as any}
              style={
                won.length === 0 || won.includes(murgi as never)
                  ? styles.image3
                  : [styles.image3, { opacity: 0.8 }]
              }
            ></Image>
            {won.includes(murgi as never) && (
              <Image
                source={border as any}
                style={[styles.image3, { position: "absolute" }]}
              ></Image>
            )}
          </View>
          <View style={{ position: "relative" }}>
            <Image
              source={mas_flat as any}
              style={
                won.length === 0 || won.includes(mas as never)
                  ? styles.image3
                  : [styles.image3, { opacity: 0.8 }]
              }
            ></Image>
            {won.includes(mas as never) && (
              <Image
                source={border as any}
                style={[styles.image3, { position: "absolute" }]}
              ></Image>
            )}
          </View>
          <View style={{ position: "relative" }}>
            <Image
              source={kakra_flat as any}
              style={
                won.length === 0 || won.includes(kakra as never)
                  ? styles.image3
                  : [styles.image3, { opacity: 0.8 }]
              }
            ></Image>
            {won.includes(kakra as never) && (
              <Image
                source={border as any}
                style={[styles.image3, { position: "absolute" }]}
              ></Image>
            )}
          </View>
          <View style={{ position: "relative" }}>
            <Image
              source={chingri_flat as any}
              style={
                won.length === 0 || won.includes(chingri as never)
                  ? styles.image3
                  : [styles.image3, { opacity: 0.8 }]
              }
            ></Image>
            {won.includes(chingri as never) && (
              <Image
                source={border as any}
                style={[styles.image3, { position: "absolute" }]}
              ></Image>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={handleBowlPress}
          style={{ flex: 0, margin: "auto" }}
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
