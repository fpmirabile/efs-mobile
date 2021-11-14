import * as React from "react";
import { Text, StyleSheet, View, ScrollView,Image } from "react-native";
import WhiteBackgroundView from "../../components/common/white-background-view/white-background-view";
import Answer from "../profile-test/components/answer";
import Button from "../../components/common/button";
import LoadingBanner from "../../components/common/loading-banner/loading-banner";
import { QuestionState } from "../../util/profile";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "../../components/common/text-button/text-button";
import ButtonWithLoading from "../../components/common/button-with-loading/button-with-loading";

interface Props {
  currentIndex: number;
  status: number;
  surveyOver: boolean;
  onPressPrevQuestion: () => void;
  onPressNextQuestion: () => void;
  onSelectAnswer: (status: number) => void;
  onPressEnd: () => void;
  isLoading: boolean;
  questions: QuestionState[];
  onSkipProfilePress: () => void;
  onContinuePress:()=>void; 
}

const renderSkipProfile = ({
  onSkipProfilePress,
  onContinuePress
}:{onSkipProfilePress:Props["onSkipProfilePress"],
    onContinuePress:Props["onContinuePress"]}) =>{
  return (
    <><Text style={styles.title}>
      Registro Finalizado
    </Text>
      <Text style={styles.subtitle}>
        Muchas gracias por registrarte en EFS.Antes de comenzar te pedimos que contestes esta breve encuesta para conocer un poco mas sobre vos.
      </Text>
      <View style={styles.termsAndCondsContainer}>
          <View style={styles.container}>
      <Image style={styles.logo} source={require("../../../assets/images/register/register.png")} />
    </View>
          <TextButton
            textStyle={styles.termsAndCondButtonText}
            containerStyle={styles.termsAndCondButtonContainer}
            text="Omitir perfil de inversor"
            onPress={onSkipProfilePress}
          />
        </View>
        <ButtonWithLoading
          text="Empecemos"
          style={{
            //TODO container: registerButtonContainerEnabled,
           //TODO text: buttonTextStyles,
          }}
          onPress={onContinuePress}
        />
      </>
  )
}
export default function ProfileView({
  currentIndex,
  questions,
  onSelectAnswer,
  status,
  surveyOver,
  onPressPrevQuestion,
  onPressNextQuestion,
  onPressEnd,
  onContinuePress,
  onSkipProfilePress,
  isLoading,
}: Props): JSX.Element {
  if (isLoading) {
    return (
      <View style={styles.loadingPage}>
        <LoadingBanner style={styles.loadingBanner} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {renderSkipProfile({ onSkipProfilePress,onContinuePress })}
        {questions.length > 0 ? (
          <>
            <Text style={styles.title}>{questions[currentIndex].question}</Text>
            <WhiteBackgroundView viewStyles={styles.registerBox}>
              <View>
                <Answer
                  onSelectAnswer={onSelectAnswer}
                  userAnswer={undefined}
                  answers={questions[currentIndex].options}
                  status={status}
                />
              </View>
            </WhiteBackgroundView>
          </>
        ) : null}
        <View style={styles.buttonContainer}>
          {!surveyOver && !isLoading && currentIndex != questions.length - 1 ? (
            <>
              {currentIndex > 0 ? (
                <>
                  <View style={styles.buttonView}>
                    <Ionicons
                      name="chevron-back"
                      size={25}
                      color={Colors.orange}
                    />
                    <Button
                      text="Volver"
                      style={{
                        text: styles.buttonSec,
                      }}
                      onPress={onPressPrevQuestion}
                    />
                  </View>
                </>
              ) : null}
              <View style={styles.buttonView}>
                <Button
                  text="Continuar"
                  style={{
                    text: styles.buttonPrim,
                  }}
                  onPress={onPressNextQuestion}
                />
                <Ionicons
                  name="chevron-forward"
                  size={25}
                  color={Colors.orange}
                />
              </View>
            </>
          ) : (
            <View style={styles.buttonContainer}>
              <View style={{flexDirection:"row", alignItems:"center", justifyContent: 'center' }}>
                <Ionicons name="chevron-back" size={20} color={Colors.orange} style={styles.icon} />
                <Button
                  text="Volver"
                  style={{
                    text: styles.buttonSec,
                  }}
                  onPress={onPressPrevQuestion}
                />
              </View>
              <View style={{flexDirection:"row", alignItems:"center" }}>
              <Button
                text="Finalizar"
                style={{
                  text: styles.buttonPrim,
                }}
                onPress={onPressEnd}
              />
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.orange}
                style={styles.icon}
              />
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "100%",
    marginTop: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  loadingPage: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "bold",
    color: Colors.blue
  },
  subtitle: {
    marginHorizontal: 16,
    maxWidth: 328,
    fontSize: 16,
    lineHeight: 26,
    color: Colors.lightGray,
    marginBottom: 9,
    fontFamily: 'redhatdisplay-regular'
  },
  registerBox: {
    marginLeft: 15,
    marginRight: 15,
    paddingVertical: 80,
    paddingHorizontal: 8,
    alignSelf: "stretch",
  },
  buttonContainer: {
    marginLeft: 24,
    marginRight: 39,
    flexDirection: "row",
    alignItems:"center",
    marginTop:12
  },

  buttonPrim: {
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 10,
    fontWeight: "bold",
    color: Colors.blue,
  },
  buttonSec: {
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 10,
    fontWeight: "bold",
    color: Colors.blue,
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 35,
    alignItems: "baseline",
  },
  loadingBanner: {
    width: 150,
    height: 150,
  },
  icon: {
    paddingTop: 10
  },
  ermsAndCondsContainer: {
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
  termsAndCondsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  registerButtonContainerEnabled: {
    backgroundColor: Colors.blue,
  },
  logo: {
    height: 213,
    width: 319
  },
});
