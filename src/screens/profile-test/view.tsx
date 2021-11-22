import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Image } from "react-native";
import { TextStyle, ViewStyle } from "react-native-material-ui";
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
  score:number;
  profile:string;
  surveyOver: boolean;
  onPressPrevQuestion: () => void;
  onPressNextQuestion: () => void;
  onSelectAnswer: (status: number) => void;
  onPressEnd: () => void;
  isLoading: boolean;
  isContinue: boolean;
  questions: QuestionState[];
  onSkipProfilePress: () => void;
  onContinuePress: () => void;
  onContinueEndPress: () => void;
}

const renderBeginProfile = ({
  onSkipProfilePress,
  onContinuePress,
}: {
  onSkipProfilePress: Props["onSkipProfilePress"];
  onContinuePress: Props["onContinuePress"];
}) => {
  const buttonContainerStyles: ViewStyle = [styles.beginButtonContainer];
  const buttonTextStyles: TextStyle = [styles.beginButtonText];
  return (
    <View style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.beginConText}>
          <Text style={styles.title}>Registro Finalizado</Text>
        </View>
        <View style={styles.beginConText}>
          <Text style={styles.subtitle}>
            Muchas gracias por registrarte en EFS.Antes de comenzar te pedimos
            que contestes esta breve encuesta para conocer un poco mas sobre
            vos.
          </Text>
        </View>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/register/register.png")}
        />
        <ButtonWithLoading
          text="Empecemos"
          style={{
            container: buttonContainerStyles,
            text: buttonTextStyles,
          }}
          onPress={onContinuePress}
        />
        <TextButton
          textStyle={styles.termsAndCondButtonText}
          containerStyle={styles.termsAndCondButtonContainer}
          text="Omitir perfil de inversor"
          onPress={onSkipProfilePress}
        />
      </View>
    </View>
  );
};

const renderEndProfile = ({
  profile,
  onContinueEndPress }:{ profile: Props["profile"],onContinueEndPress: Props["onContinueEndPress"]})=>{
    return( <View style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.beginConText}>
          <Text style={styles.title}>¡Tu perfil ya está listo!</Text>
        </View>
        <View style={styles.beginConText}>
          <Text style={styles.subtitle}>
          En base a las preguntas que te hicimos, podemos decir que tu perfil es {profile}.  
          Te recomendaremos distintos contenidos relevantes en base a el.
           Para realizar nuevamente el test lo podrás hacer desde configuración.
          </Text>
        </View>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/register/register.png")}
        />
        <ButtonWithLoading
          text="IR A VER REELS"
          style={{
            container: styles.beginButtonContainer,
            text: styles.beginButtonText,
          }}
          onPress={onContinueEndPress}
        />
      </View>
    </View>);
  };
export default function RenderQuiz({
  currentIndex,
  questions,
  onSelectAnswer,
  status,
  score,
  profile,
  surveyOver,
  isContinue,
  onPressPrevQuestion,
  onPressNextQuestion,
  onPressEnd,
  onContinuePress,
  onContinueEndPress,
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
        {!isContinue &&
          (renderBeginProfile({ onSkipProfilePress, onContinuePress }))}
        {questions.length > 0 && isContinue && score===0 && (
          <>
            <View style={styles.continerTitle}>
              <Text style={styles.title}>
                {questions[currentIndex].question}
              </Text>
            </View>
            <WhiteBackgroundView viewStyles={styles.whiteBox}>
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
        )}
        <View style={styles.buttonContainer}>
          {!surveyOver && !isLoading && currentIndex != questions.length - 1 && (
            <>
              {currentIndex >= 0 && isContinue && (
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
              )}
            </>
          )}   
          {  score ===0 && surveyOver && (
            <View style={styles.buttonContainer}>
              <View style={styles.iconButton}>
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color={Colors.orange}
                  style={styles.icon}
                />
                <Button
                  text="Volver"
                  style={{
                    text: styles.buttonSec,
                  }}
                  onPress={onPressPrevQuestion}
                />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          { surveyOver && score >0 &&  renderEndProfile({ profile, onContinueEndPress }) }
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
    color: Colors.blue,
  },
  subtitle: {
    marginHorizontal: 16,
    maxWidth: 328,
    fontSize: 16,
    lineHeight: 26,
    color: Colors.lightGray,
    marginBottom: 9,
    fontFamily: "redhatdisplay-regular",
  },
  continerTitle:{ 
    flex:1,
    margin: 19 
  },
  whiteBox: {
    flex: 1,
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
    alignItems: "center",
    marginTop: 12,
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
    paddingTop: 10,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  termsAndCondsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
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
    marginTop: 30,
  },
  beginButtonContainer: {
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.blue,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 24,
    marginRight: 39,
    marginTop: 70,
    alignSelf: "stretch",
  },
  beginButtonText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  registerCondsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  logo: {
    height: 213,
    width: 319,
  },
  beginConText: {
    marginTop: 30,
  },
});
