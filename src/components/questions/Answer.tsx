import React, { Fragment, useState } from 'react';
import { StyleSheet, View } from "react-native";
import RadioButton from "../../components/common/radio-button";
import { AnswerObject } from "../../screens/profile-test/profile";

interface AnswersProps {
  answers: {
    key: number;
    value: string;
    }[];
  setAnswer: any;
  checkAnswer: () => void;
  userAnswer: AnswerObject | undefined;
}

const Answer = ({answers, setAnswer}:AnswersProps ) => {
    const [checked, setChecked] = useState(false);
    return (
      <View style={styles.container}> 
        {answers.map((answer, key)=>(
          <Fragment key = {answer.key}>
             <RadioButton
              label={answer.value}
              checked={checked}
              value={answer.value}
              onSelect={() => {
             console.log(answer)
              setChecked(true);
             setAnswer.current =answer.value;
        }}
       />
          </Fragment>
        ))}   
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F2F2F2",
    },
    formGroup: {
      flexDirection: "column",
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
  
export default Answer;
