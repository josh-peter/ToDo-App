import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";

const OnBoardingScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const COLORS = { primary: "#282534", secondary: "ffffff" };

  const slides = [
    {
      key: "s1",
      image: require("./../../../assets/image1.png"),
      title: "Welcome to Todo App",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    },
    {
      key: "s2",
      image: require("./../../../assets/image2.png"),
      title: "Create your account",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  ",
    },

    {
      key: "s3",
      image: require("./../../../assets/image3.png"),
      title: "Enjoy your life",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    },
  ];

  const ref = useRef();

  const Slides = ({ item }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={item?.image}
          style={{ height: "75%", width, resizeMode: "contain" }}
        />
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>
      </View>
    );
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: "#fff",
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
        <View style={{ marginBottom: 70 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ height: 50 }}>
                        <TouchableOpacity style={styles.btn} onPress={()=> navigation.replace("Registration")}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: "#fff",
                    borderWidth: 1,
                    backgroundColor: "transparent",
                  },
                ]}
                onPress={Skip}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#fff",
                  }}
                >
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={goNextSlide}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goPrevSlide = () => {
    const prevSlideIndex = currentSlideIndex - 1;
    if (prevSlideIndex != 0) {
      const offset = prevSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const Skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary, flex: 1 }}>
      <StatusBar />
      <FlatList
        ref={ref}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        contentContainerStyle={{
          height: height * 0.75,
        }}
        renderItem={({ item }) => <Slides item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  subtitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
    maxWidth: 500,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 23,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  indicator: {
    height: 3,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 3,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
