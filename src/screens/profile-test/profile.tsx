<<<<<<< HEAD
import * as React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import Button from "../../components/common/button";
=======
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: "white",
  },
});
>>>>>>> bb4dd8fb28c741c3552fb3837eb159b3f8648361

const Profile = () => {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text style={styles.title}>¿Qué experiencia previa tiene en inversiones?</Text>
      <View style={styles.separator} />
      <View style={styles.formGroup}>
        <Text style={styles.formTitle}>Email o Username</Text>
        <TextInput style={styles.formInput}></TextInput>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.formTitle}>Password</Text>
        <TextInput style={styles.formInput} textAlign='center' secureTextEntry textContentType="password"></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <Button text="Login" onPress={() => { }} style={{ container: styles.button}} />
      </View>
    </View>
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
    flexDirection: 'column',
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
  formInput: {
    margin: 0,
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: 200,
    backgroundColor: 'lightblue',
    marginTop: 10
  },
  button: {
    width: '100%'
  },
  buttonText: {

  }
});
=======
      <FlatList
        data={[
          { key: "Devin" },
          { key: "Dan" },
          { key: "Dominic" },
          { key: "Jackson" },
          { key: "James" },
          { key: "Joel" },
          { key: "John" },
          { key: "Jillian" },
          { key: "Jimmy" },
          { key: "Julie" },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
};
>>>>>>> bb4dd8fb28c741c3552fb3837eb159b3f8648361

export default Profile;
