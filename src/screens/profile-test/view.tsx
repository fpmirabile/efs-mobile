import * as React from "react";
import { Text, StyleSheet, View,ScrollView } from "react-native";
import WhiteBackgroundView from "../../components/common/white-background-view/white-background-view";
import Answer from "../profile-test/components/answer";
import Button from "../../components/common/button";
import LoadingBanner from "../../components/common/loading-banner/loading-banner";
import { QuestionState } from "../../util/profile";
import Colors from "../../constants/colors";

interface Props {
  currentIndex: number;
  status: number;
  surveyOver: boolean;
  onPressPrevQuestion: () => void;
  onPressNextQuestion: () => void;
  onSelectAnswer: (status: number) => void;
  isLoading: boolean;
  questions: QuestionState[];
}

export default function ProfileView({
  currentIndex,
  questions,
  onSelectAnswer,
  status,
  surveyOver,
  onPressPrevQuestion,
  onPressNextQuestion,
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
      <Text style={styles.title}>{questions[currentIndex].question}</Text>
      <WhiteBackgroundView viewStyles={styles.registerBox}>
        <View >
          <Answer
            onSelectAnswer={onSelectAnswer}
            userAnswer={undefined}
            answers={questions[currentIndex].options}
            status={status}
          />
        </View>
      </WhiteBackgroundView>
      <View style={styles.buttomContainer}>
        {!surveyOver && !isLoading && currentIndex != questions.length - 1 ? (
          <>
            {currentIndex > 0 ? (
            <View >  
              <Button text="Volver" 
              style={{
                text: styles.buttonSec
              }} 
              onPress={onPressPrevQuestion} />
            </View>  
            ) : null}
            <View >  
            <Button text="Continuar" 
                style={{
                  text: styles.buttonPrim
                }}
                  onPress={onPressNextQuestion} />
              <i className="fas fa-chevron-right"></i>    
            </View>  
          </>
        ) : (
          <>
           <View >
            <Button text="Volver"
                     style={{
                      text: styles.buttonSec
                    }} onPress={onPressPrevQuestion} />
           </View> 
            {/* <Button text="Finalizar" onPress={} /> */}{" "}
          </>
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
    color: Colors.blue,
    marginVertical: 75,
  },
  registerBox: {
    marginLeft: 15,
    marginRight: 15,
    paddingVertical: 80,
    paddingHorizontal: 8,
    alignSelf: "stretch",
  },
   buttomContainer: {
    marginLeft: 39,
    marginRight: 39,
    flexDirection: "row"
  },
  buttonPrim:{
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 10,
    fontWeight: "bold",
    color: Colors.blue
  },
  buttonSec:{
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 10,
    fontWeight: "bold",
    color: Colors.blue
  },
  loadingBanner: {
    width: 150,
    height: 150,
  },
});
