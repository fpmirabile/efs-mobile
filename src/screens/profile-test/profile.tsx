import * as React from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import Button from "../../components/common/button";
import { getsurveyQuestions, QuestionState } from "../../util/profile";
import { useEffect, useRef, useState } from "react";
import  QuestionComp  from "../../components/questions/Question";
import Answer from "../../components/questions/Answer";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [surveyOver, setSurveyOver] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(6);
  const [number, setNumber] = useState(0);
 
  const setAnswer = useRef(null);
  const checkAnswer = ()=>{};

  const startQuizProfile = async ()=>{
    setLoading(true)
    setSurveyOver(false)
    const survey =  await getsurveyQuestions();
    setQuestions(survey);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  useEffect (()=>{
    startQuizProfile();
  },[]);

  return (
    <SafeAreaView style={styles.container}>
      {questions.length > 0 ? (
        <>
        <QuestionComp questionNr={number+1}
        question = {questions[number].question}
        />
        <Answer answers={questions[number].options}
          {...setAnswer}
          checkAnswer
          />
        </>
      ): null}
      <View style={styles.buttonContainer}>
        {/*  <Button text="Volver" onPress={() => { }} style={{ container: styles.button}} /> */}
        <Button text="Continuar" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
  },
  formGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    marginVertical: 1,
  },
  formTitle: {
    alignSelf: "flex-start",
    margin: 0,
    width: 200,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    color: "#160266",
  },
  buttonText: {},
});

export default Profile;
