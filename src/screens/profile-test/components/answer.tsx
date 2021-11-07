import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native";
import RadioButton from "../../../components/common/radio-button";
import { AnswerObject } from "../profile";
import Colors from "../../../constants/colors";

interface AnswersProps {
  answers: {
    key: number;
    value: string;
    }[];
  onSelectAnswer: any;
  userAnswer: AnswerObject | undefined;
  status: number;
}


const Answer = ({answers, onSelectAnswer, status}:AnswersProps ) => {
    // const [selectAnswer, setSelectAnswer] = useState(status);
    console.log(answers[status].value)
    return (
      <View> 
        {answers.map((answer, key)=>(
          <Fragment key = {answer.key}>
            <View >
             <RadioButton
              label={answer.value}
              checked={status==answer.key}
              value={answer.value}
              onSelect={()=>{onSelectAnswer(answer.key)}}
              />
              </View>
          </Fragment>
        ))}   
      </View>
    )
}


export default Answer;
