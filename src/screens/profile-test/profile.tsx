import * as React from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import RadioButton from "../../components/common/radio-button";
import Button from "../../components/common/button";
import { getsurveyQuestions } from "../../util/profile";

const Profile = () => {
  const [loading, setLoading] = React.useState(false);
  const [questions, setQuestion] = React.useState([]);
  const [userAnswers,setUserAnswers] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [surveyOver, setSurveyOver] = React.useState(true);
  // const [totalQuestions, setTotalQuestions] = React.useState(8);
  const [checked, setChecked] = React.useState(false);
  const [position, setPositon] = React.useState(0);
  const survey = getsurveyQuestions();
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{survey[position].question}</Text>
      <View />
           <RadioButton
            label={survey[position].options[0].value}
            checked={checked}
            value="value" 
            onSelect={()=>{setChecked(true)}}/> 
      <View style={styles.buttonContainer}>
       {/*  <Button text="Volver" onPress={() => { }} style={{ container: styles.button}} /> */}
        <Button text="Continuar" onPress={() => { }}/>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2"
  },
  title: {
    color: '#160266',
    fontSize: 24,
    fontWeight: "bold",
  },
  formGroup: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    marginVertical: 1,
  },
  formTitle: {
    alignSelf: 'flex-start',
    margin: 0,
    width: 200
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
    color: "#160266"
  },
  buttonText: {
   
  }
});

export default Profile;
