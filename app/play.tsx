import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
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
import thorStand from "../assets/images/thor_05-stand.gif";
import thorSkill from "../assets/images/thor_05-skill.gif";
import * as Animatable from "react-native-animatable";

import { TextStroke } from "@/components/TextStroke";
import { useNavigation } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";

import Song from "@/components/Song";
import { BouContext } from "@/provider/BouContext";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { useNetInfo } from "@react-native-community/netinfo";
const alphabet = ["K", "C"];

const bouImages = [bau, kakra, murgi, mas, horin, chingri];

export default function Play() {
  const [liftBowl, setLiftBowl] = useState({
    flex: 1,
    marginTop: -1092,
    marginLeft: -13,
  });
  const [liftedBowl, setLiftedBowl] = useState(true);
  const [versionGen, setVersionGen] = useState("23.354.56");

  const nav = useNavigation();
  const netInfo = useNetInfo();
  const goToHomeScreen = () => {
    nav.navigate("index" as never);
  };

  const [bouWin, setBouWin] = useState([bau, kakra, murgi]);
  const [won, setWon] = useState([]);
  const [customWin, setCustomWon] = useState([]);
  const [balance, setBalance] = useState(100000);
  const [horinNumber, setHorinNumber] = useState(0);
  const [masNumber, setMasNumber] = useState(0);
  const [bauNumber, setBauNumber] = useState(0);
  const [kakraNumber, setKakraNumber] = useState(0);
  const [chingriNumber, setChingriNumber] = useState(0);
  const [murgiNumber, setMurgiNumber] = useState(0);
  const [thor, setThor] = useState(thorStand);

  const { sound, setSound, shakeSound, winSound } = useContext(BouContext)!;
  const updateBouWin = () => {
    const array = [1, 1, 1, 1, 1, 1];
    let added = 0;
    let total = 0;
    let rand1;
    let rand2;
    let rand3;
    if (customWin.length > 0) {
      rand1 = customWin[0];
      rand2 = customWin[1];
      rand3 = customWin[2];
      setCustomWon([]);
    } else {
      rand1 = getRandomNumber();
      rand2 = getRandomNumber();
      rand3 = getRandomNumber();
    }

    const winner = [
      bouImages[rand1],
      bouImages[rand2],
      bouImages[rand3],
    ] as never;

    setBouWin(winner);
    setWon(winner);

    [rand1, rand2, rand3].forEach((win) => {
      const r = (array[win] = array[win] + 1);
    });

    if (array[0] > 1) {
      added = bauNumber * array[0];
      total = added + total;
      setBauNumber(added);
    }
    if (array[1] > 1) {
      added = kakraNumber * array[1];
      total = added + total;
      setKakraNumber(added);
    }
    if (array[2] > 1) {
      added = murgiNumber * array[2];
      total = added + total;
      setMurgiNumber(added);
    }
    if (array[3] > 1) {
      added = masNumber * array[3];
      total = added + total;
      setMasNumber(added);
    }
    if (array[4] > 1) {
      added = horinNumber * array[4];
      total = added + total;
      setHorinNumber(added);
    }
    if (array[5] > 1) {
      added = chingriNumber * array[5];
      total = added + total;
      setChingriNumber(added);
    }

    setBalance(balance + total);
  };
  const getRandomNumber = () => {
    const ranndomNumer = Math.floor(Math.random() * 6); // Generates a random number between 0 and 5

    if (ranndomNumer < 6 && ranndomNumer >= 0) {
      return ranndomNumer;
    } else {
      return 0;
    }
  };
  const loadWinner = () => {
    if (netInfo.isConnected) {
      fetch("https://anoxpay.com/boucua.php")
        .then(async (response: any) => {
          const data = await response.json();
          if (data?.action) {
            setCustomWon(data?.win);
          }
        })
        .catch((e) => {});
    }
  };

  const popupRef = useRef(null);

  const fadeIn = {
    from: {
      marginTop: -1092,
    },
    to: {
      marginTop: -506,
    },
  };
  const fadeout = {
    from: {
      marginTop: -506,
    },
    to: {
      marginTop: -1092,
    },
  };

  // const handleBowlPress = () => {

  //   setLiftedBowl(!liftedBowl);
  // };
  const handleBowlPress = async () => {
    if (liftedBowl) {
      loadWinner();
      setBauNumber(0);
      setMasNumber(0);
      setMurgiNumber(0);
      setKakraNumber(0);
      setChingriNumber(0);
      setHorinNumber(0);
      await shakeSound?.stopAsync();
      await shakeSound?.playAsync();
    } else {
      updateBouWin();
      await winSound?.stopAsync();
      await winSound?.playAsync();
    }

    setLiftedBowl(!liftedBowl);
  };

  const handlePress = (type: any) => {
    if (!liftedBowl) {
      if (type === "horin") {
        setHorinNumber(horinNumber + 100);
      }
      if (type === "kakra") {
        setKakraNumber(kakraNumber + 100);
      }
      if (type === "bau") {
        setBauNumber(bauNumber + 100);
      }
      if (type === "mas") {
        setMasNumber(masNumber + 100);
      }
      if (type === "murgi") {
        setMurgiNumber(murgiNumber + 100);
      }
      if (type === "chingri") {
        setChingriNumber(chingriNumber + 100);
      }
      setBalance(balance - 100);
    }
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
  const { height, width } = Dimensions.get("screen");
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
            {!liftedBowl && (
              <Animatable.View
                animation={fadeIn}
                duration={100}
                style={{ flex: 1, marginTop: -506, marginLeft: -10 }}
              >
                <Image source={bowl as any} style={styles.imageBowl}></Image>
              </Animatable.View>
            )}
            {liftedBowl && (
              <Animatable.View
                animation={fadeout}
                duration={100}
                style={{ flex: 1, marginTop: -506, marginLeft: -10 }}
              >
                <Image source={bowl as any} style={styles.imageBowl}></Image>
              </Animatable.View>
            )}
          </View>

          <TouchableOpacity
            style={{ flex: 0, position: "absolute", top: 0, left: 0 }}
          >
            <ImageBackground
              source={bgCash as any}
              style={{ width: 117, height: 45 }}
            >
              <View
                style={{
                  margin: "auto",
                }}
              >
                <TextStroke stroke={1.7} color={"#000000"}>
                  <Text style={styles.textBalance}>
                    {balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                </TextStroke>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <View style={{ flex: 0, position: "absolute", right: 0, top: 0 }}>
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

        <View style={[styles.container4, styles.container4_1]}>
          {/* Horin */}
          <View style={styles.containerRow}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.imageHolder}
              onPress={() => {
                handlePress("horin");
              }}
            >
              <Image source={horin_flat as any} style={styles.image3}></Image>
              {won.includes(horin as never) && (
                <Image
                  source={border as any}
                  style={[styles.image3, { position: "absolute" }]}
                ></Image>
              )}
              {won.length !== 0 && !won.includes(horin as never) && (
                <View style={styles.layer}></View>
              )}
              {won.length !== 0 &&
                horinNumber > 0 &&
                liftedBowl &&
                !won.includes(horin as never) && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: [{ translateX: -60 / 2 }],
                    }}
                  >
                    <TextStroke stroke={1.7} color={"#000000"}>
                      <Text style={styles.textBauNumberRed}>THUA</Text>
                    </TextStroke>
                  </View>
                )}

              {won.length !== 0 &&
                horinNumber > 0 &&
                liftedBowl &&
                won.includes(horin as never) && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: [{ translateX: -80 / 2 }],
                    }}
                  >
                    <TextStroke stroke={1.7} color={"#000000"}>
                      <Text style={styles.textBauNumberGreen}>THÁNG</Text>
                    </TextStroke>
                  </View>
                )}

              {horinNumber > 0 && (
                <View style={styles.textBauNumberBox}>
                  <TextStroke stroke={1.7} color={"#000000"}>
                    <Text
                      style={
                        won.includes(horin as never)
                          ? !liftedBowl
                            ? styles.textBauNumberYellow
                            : styles.textBauNumberGreen
                          : styles.textBauNumberYellow
                      }
                    >
                      {horinNumber}
                    </Text>
                  </TextStroke>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Bau*/}

          <View style={styles.containerRow}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.imageHolder}
              onPress={() => {
                handlePress("bau");
              }}
            >
              <Image source={bau_flat as any} style={styles.image3}></Image>
              {won.includes(bau as never) && (
                <Image
                  source={border as any}
                  style={[styles.image3, { position: "absolute" }]}
                ></Image>
              )}
              {won.length !== 0 && !won.includes(bau as never) && (
                <View style={styles.layer}></View>
              )}
              {won.length !== 0 &&
                bauNumber > 0 &&
                liftedBowl &&
                !won.includes(bau as never) && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: [{ translateX: -60 / 2 }],
                    }}
                  >
                    <TextStroke stroke={1.7} color={"#000000"}>
                      <Text style={styles.textBauNumberRed}>THUA</Text>
                    </TextStroke>
                  </View>
                )}
              {won.length !== 0 &&
                bauNumber > 0 &&
                liftedBowl &&
                won.includes(bau as never) && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: [{ translateX: -80 / 2 }],
                    }}
                  >
                    <TextStroke stroke={1.7} color={"#000000"}>
                      <Text style={styles.textBauNumberGreen}>THÁNG</Text>
                    </TextStroke>
                  </View>
                )}
              {bauNumber > 0 && (
                <View style={styles.textBauNumberBox}>
                  <TextStroke stroke={1.7} color={"#000000"}>
                    <Text
                      style={
                        won.includes(bau as never)
                          ? !liftedBowl
                            ? styles.textBauNumberYellow
                            : styles.textBauNumberGreen
                          : styles.textBauNumberYellow
                      }
                    >
                      {bauNumber}
                    </Text>
                  </TextStroke>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/* Murgi */}
          <View style={styles.containerRow}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.imageHolder}
              onPress={() => {
                handlePress("murgi");
              }}
            >
              <Image source={murgi_flat as any} style={styles.image3}></Image>
              {won.includes(murgi as never) && (
                <Image
                  source={border as any}
                  style={[styles.image3, { position: "absolute" }]}
                ></Image>
              )}
              {won.length !== 0 && !won.includes(murgi as never) && (
                <View style={styles.layer}></View>
              )}
              {won.length !== 0 &&
                murgiNumber > 0 &&
                liftedBowl &&
                !won.includes(murgi as never) && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: [{ translateX: -60 / 2 }],
                    }}
                  >
                    <TextStroke stroke={1.7} color={"#000000"}>
                      <Text style={styles.textBauNumberRed}>THUA</Text>
                    </TextStroke>
                  </View>
                )}
              {won.length !== 0 &&
                murgiNumber > 0 &&
                liftedBowl &&
                won.includes(murgi as never) && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: [{ translateX: -80 / 2 }],
                    }}
                  >
                    <TextStroke stroke={1.7} color={"#000000"}>
                      <Text style={styles.textBauNumberGreen}>THÁNG</Text>
                    </TextStroke>
                  </View>
                )}
              {murgiNumber > 0 && (
                <View style={styles.textBauNumberBox}>
                  <TextStroke stroke={1.7} color={"#000000"}>
                    <Text
                      style={
                        won.includes(murgi as never)
                          ? !liftedBowl
                            ? styles.textBauNumberYellow
                            : styles.textBauNumberGreen
                          : styles.textBauNumberYellow
                      }
                    >
                      {murgiNumber}
                    </Text>
                  </TextStroke>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container4}>
          {/* Mas */}

          <View style={styles.containerRow}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.imageHolder}
              onPress={() => {
                handlePress("mas");
              }}
            >
              <Image source={mas_flat as any} style={styles.image3}></Image>
              {won.includes(mas as never) && (
                <Image
                  source={border as any}
                  style={[styles.imageLayer, { position: "absolute" }]}
                ></Image>
              )}
              {won.length !== 0 && !won.includes(mas as never) && (
                <View style={styles.layer}></View>
              )}
              {won.length !== 0 &&
                masNumber > 0 &&
                liftedBowl &&
                !won.includes(mas as never) && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: [{ translateX: -60 / 2 }],
                    }}
                  >
                    <TextStroke stroke={1.7} color={"#000000"}>
                      <Text style={styles.textBauNumberRed}>THUA</Text>
                    </TextStroke>
                  </View>
                )}
              {won.length !== 0 &&
                masNumber > 0 &&
                liftedBowl &&
                won.includes(mas as never) && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: [{ translateX: -80 / 2 }],
                    }}
                  >
                    <TextStroke stroke={1.7} color={"#000000"}>
                      <Text style={styles.textBauNumberGreen}>THÁNG</Text>
                    </TextStroke>
                  </View>
                )}
              {masNumber > 0 && (
                <View style={styles.textBauNumberBox}>
                  <TextStroke stroke={1.7} color={"#000000"}>
                    <Text
                      style={
                        won.includes(mas as never)
                          ? !liftedBowl
                            ? styles.textBauNumberYellow
                            : styles.textBauNumberGreen
                          : styles.textBauNumberYellow
                      }
                    >
                      {masNumber}
                    </Text>
                  </TextStroke>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Kakra */}

          <View style={styles.containerRow}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.imageHolder}
              onPress={() => {
                handlePress("kakra");
              }}
            >
              <Image source={kakra_flat as any} style={styles.image3}></Image>
              {won.includes(kakra as never) && (
                <Image
                  source={border as any}
                  style={[styles.image3, { position: "absolute" }]}
                ></Image>
              )}
              {won.length !== 0 && !won.includes(kakra as never) && (
                <View style={styles.layer}></View>
              )}
              {won.length !== 0 &&
                kakraNumber > 0 &&
                liftedBowl &&
                !won.includes(kakra as never) && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: [{ translateX: -60 / 2 }],
                    }}
                  >
                    <TextStroke stroke={1.7} color={"#000000"}>
                      <Text style={styles.textBauNumberRed}>THUA</Text>
                    </TextStroke>
                  </View>
                )}
              {won.length !== 0 &&
                kakraNumber > 0 &&
                liftedBowl &&
                won.includes(kakra as never) && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: [{ translateX: -80 / 2 }],
                    }}
                  >
                    <TextStroke stroke={1.7} color={"#000000"}>
                      <Text style={styles.textBauNumberGreen}>THÁNG</Text>
                    </TextStroke>
                  </View>
                )}
              {kakraNumber > 0 && (
                <View style={styles.textBauNumberBox}>
                  <TextStroke stroke={1.7} color={"#000000"}>
                    <Text
                      style={
                        won.includes(kakra as never)
                          ? !liftedBowl
                            ? styles.textBauNumberYellow
                            : styles.textBauNumberGreen
                          : styles.textBauNumberYellow
                      }
                    >
                      {kakraNumber}
                    </Text>
                  </TextStroke>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Chingri */}

          <View style={styles.containerRow}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.imageHolder}
              onPress={() => {
                handlePress("chingri");
              }}
            >
              <Image source={chingri_flat as any} style={styles.image3}></Image>
              {won.includes(chingri as never) && (
                <Image
                  source={border as any}
                  style={[styles.image3, { position: "absolute" }]}
                ></Image>
              )}
              {won.length !== 0 && !won.includes(chingri as never) && (
                <View style={styles.layer}></View>
              )}
              {won.length !== 0 &&
                chingriNumber > 0 &&
                liftedBowl &&
                !won.includes(chingri as never) && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: [{ translateX: -60 / 2 }],
                    }}
                  >
                    <TextStroke stroke={1.7} color={"#000000"}>
                      <Text style={styles.textBauNumberRed}>THUA</Text>
                    </TextStroke>
                  </View>
                )}
              {won.length !== 0 &&
                chingriNumber > 0 &&
                liftedBowl &&
                won.includes(chingri as never) && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: [{ translateX: -80 / 2 }],
                    }}
                  >
                    <TextStroke stroke={1.7} color={"#000000"}>
                      <Text style={styles.textBauNumberGreen}>THÁNG</Text>
                    </TextStroke>
                  </View>
                )}
              {chingriNumber > 0 && (
                <View style={styles.textBauNumberBox}>
                  <TextStroke stroke={1.7} color={"#000000"}>
                    <Text
                      style={
                        won.includes(chingri as never)
                          ? !liftedBowl
                            ? styles.textBauNumberYellow
                            : styles.textBauNumberGreen
                          : styles.textBauNumberYellow
                      }
                    >
                      {chingriNumber}
                    </Text>
                  </TextStroke>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* End*/}
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
              height: "800%",
              width: "800%",
              resizeMode: "contain",
              position: "absolute",
              bottom: -height / 3.1,
              left: -width * 3.7,
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
    </View>
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
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  textBauNumberYellow: {
    fontSize: 24,
    color: "yellow",
    fontWeight: "bold",
  },
  textBauNumberGreen: {
    fontSize: 24,
    color: "#00ff08",
    fontWeight: "bold",
  },
  textBauNumberRed: {
    fontSize: 24,
    color: "red",
    fontWeight: "bold",
  },
  textBauNumberBox: { position: "absolute", top: 10, left: 10 },
  container4: {
    flex: 1,
    flexDirection: "row",
    width: "100%",

    justifyContent: "space-between",
  },
  container: {
    flex: 1,
  },
  disk: {
    position: "relative",
    flex: 3.5,
    marginTop: 2,
  },
  absolute: {
    position: "absolute",
    top: height * 0.18,
    left: "50%",
    transform: [{ translateX: -350 / 2 }],
  },
  bou: {
    flex: 1,
    flexDirection: "row",
    maxWidth: 350,
    flexWrap: "wrap",
  },
  imageBowl: {
    width: width * 0.89,
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
    width: width * 0.4,
    height: height * 0.16,
    resizeMode: "contain",
    margin: "auto",
  },
  image3: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%",

    borderWidth: 0,
  },
  imageLayer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  image2: {
    width: height * 0.42,
    resizeMode: "contain",
    margin: "auto",
  },
  containerRow: {
    position: "relative",
    width: width * 0.32,
    height: "85%",
  },
  imageHolder: {
    overflow: "hidden",
    width: "100%",
    borderRadius: 10,
  },
  container4_1: {
    marginTop: 10,
  },
});
