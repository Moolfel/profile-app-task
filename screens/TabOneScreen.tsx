import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,Image,Platform,
  Alert,
} from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Feather } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [pickedImagePath, setPickedImagePath] = useState(null);

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Profile Picture</Text>
        <Text style={styles.description}>
          Upload Your Photo so that you can optionally display to others.
        </Text>
      </View>
     

{!image ? <Feather
        name="camera"
        style={styles.cameraIcon}
        size={150}
        color="white"
      /> : <Image source={{ uri: image }} style={{ marginLeft:50,width: 250, height: 250,}} />}
      <View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add a Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => alert("Hello, Thank you for using this App!")}
          style={styles.skipButton}
        >
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >   
        <View
          style={styles.centeredView}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {openCamera();setModalVisible(!modalVisible);}}
              style={styles.buttonWithIcon}
            >

      <Feather
        name="camera"
        style={styles.cameraIcon}
        size={25}
        color="white"
      />
              <Text style={styles.buttonText}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {setModalVisible(!modalVisible); pickImage()}}
              style={styles.buttonWithIcon}
            >
              <Entypo name="image" size={25} color="white" />
              <Text style={styles.buttonText}>Choose  a Picture</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    // alignItems: 'flex-start',
    justifyContent: "space-between",
    backgroundColor:
      "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(61,0,110,1) 100%)",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
  },
  cameraIcon: {
    textAlign: "center",
  },
  description: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "left",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  button: {
    backgroundColor: "#BD6EE9",
    padding: 20,
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
  },
  buttonWithIcon: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
    borderBottomColor: "rgba(145, 145, 145, 0.424)",
    borderStyle: "solid",
    borderBottomWidth: 1,
    display: "flex",
    textAlign: "left",
    flexDirection: "row",
    justifyContent:"space-evenly",
    alignItems: "flex-start",
    fontSize: 20,
  },
  skipButton: {
    backgroundColor: "black",
    borderColor: "white",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },

  centeredView: {
    flex: 1,
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.8)",
    // justifyContent: 'center',
    // alignItems: 'flex-end',
  },
  modalView: {
    // marginTop: 500,
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 15,
    height: 250,
    borderTopColor:'rgba(145, 145, 145, 0.424)',
    borderLeftColor:'rgba(145, 145, 145, 0.424)',
    borderRightColor:'rgba(145, 145, 145, 0.424)',
    borderWidth:2,
   
    // justifyContent: 'space-between',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
