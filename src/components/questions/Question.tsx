import React from 'react'
import { StyleSheet, SafeAreaView, Text, View } from "react-native";

interface QuestionProps {
  questionNr: number;
  question: string;
}

 const QuestionComp = ({question, questionNr}: QuestionProps) => {
    return (
        <SafeAreaView>
            {/* <Text style={styles.title}>{questionNr}</Text> */}
            <Text style={styles.title}>{questionNr + question}</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F2F2F2",
    },
    title: {
      color: "#160266",
      fontSize: 24,
      fontWeight: "bold",
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
      margin: 1,
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
export default QuestionComp;
