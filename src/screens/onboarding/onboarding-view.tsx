import React, { useState, useRef } from "react";
import { TextStyle, ViewStyle } from "react-native-material-ui";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Text,
  Animated,
} from "react-native";
import Onboarding from "../../components/common/onboarding/onboarding";
import Colors from "../../constants/colors";
import ButtonWithLoading from "../../components/common/button-with-loading/button-with-loading";

interface Props {
  isLoading: boolean;
  onPress: () => void;
  onTouch: () => void;
  onboardingScreen: any[];
}

export default function onboardingView({
  isLoading,
  onPress,
  onTouch,
  onboardingScreen
}: Props) {
  const buttonContainerStyles: ViewStyle = [styles.buttonContainerStyles];
  const buttonTextStyles: TextStyle = [styles.buttonTextStyles];
  const scrollX = useRef(new Animated.Value(0)).current;
  
  const viewConfig = useRef({ viewAreaCoveragePercentThreshod:50 }).current
  return (
    <ScrollView style={styles.scrollView}>
      <FlatList
        data={onboardingScreen}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator = {false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } }
        ], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        viewabilityConfig={viewConfig}
        renderItem={({ item }) => (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Onboarding
              title={item.title}
              text={item.description}
              img1Url={item.image}
              onPress={onPress}
            />
            {item.id==3 && (
              <ButtonWithLoading 
                text="EMPECEMOS"
                isLoading={isLoading}
                onPress={onTouch}
                style={{
                  container: buttonContainerStyles,
                  text: buttonTextStyles,
                }}
               />
            )}
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainerStyles: {
    borderWidth: 1,
    backgroundColor: Colors.blue,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    width: 280,
    height: 36
  },
  buttonTextStyles: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  scrollView: {
    width: "100%",
    height: "100%",
    marginTop: 15,
  },
  view: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  titleContainer: {
    marginHorizontal: 23,
    marginBottom: 16,
  },

  inputContainer: {
    marginVertical: 7,
    marginHorizontal: 8,
    borderColor: Colors.inputBorder,
  },
  errorText: {
    marginHorizontal: 10,
  },
  termsAndCondsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  termsAndCondsTitle: {
    color: Colors.gray,
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  termsAndCondButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 15,
    marginVertical: 1,
  },
  termsAndCondButtonText: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  registerButtonContainer: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 24,
    marginRight: 39,
    alignSelf: "stretch",
  },
  registerButtonText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
    color: Colors.gray,
  },
  registerButtonTextEnabled: {
    color: Colors.white,
  },
  registerButtonContainerEnabled: {
    backgroundColor: Colors.blue,
  },
  dropdownContainer: {
    borderColor: Colors.inputBorder,
    borderRadius: 3.5,
    borderWidth: 0.3,
    marginHorizontal: 8,
    paddingHorizontal: 5,
  },
  dropdown: {
    width: "100%",
    height: 48,
  },
  dropdownText: {
    color: Colors.black,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.16,
  },
});
