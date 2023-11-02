import { useState } from "react";
import { Text } from "../Themed";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
// import Clipboard from "@react-native-clipboard/clipboard";
import { Clipboard } from "react-native";
// import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSaveData } from "../../app/contexts/SaveDataContext";
interface CalculatorProps {
  variables: { name: string; value: string }[];
}

const Calculator: React.FC<CalculatorProps> = ({ variables }) => {
  const { saveData, setSaveData } = useSaveData();

  const [northSouthDirection, setNorthSouthDirection] = useState("S");
  const [northDegrees, setNorthDegrees] = useState("37");
  const [northMinutes, setNorthMinutes] = useState("");

  const [eastWestDirection, setEastWestDirection] = useState("E");
  const [eastDegrees, setEastDegrees] = useState("144");
  const [eastMinutes, setEastMinutes] = useState("");
  const [finalCoordinate, setFinalCoordinate] = useState("");

  const copyToClipboard = () => {
    Clipboard.setString(finalCoordinate);
    alert("The coordinates have been copied to the clipboard");
  };

  const handleCalc = () => {
    let coordinate = {
      lat: {
        direction: northSouthDirection,
        degrees: northDegrees,
        minutes: northMinutes,
      },
      long: {
        direction: eastWestDirection,
        degrees: eastDegrees,
        minutes: eastMinutes,
      },
    };

    variables.forEach((v) => {
      const { name, value } = v;
      const replaceRegex = new RegExp(name, "g");

      // Update latitude degrees and minutes
      coordinate.lat.degrees = coordinate.lat.degrees.replace(
        replaceRegex,
        value
      );
      coordinate.lat.minutes = coordinate.lat.minutes.replace(
        replaceRegex,
        value
      );

      // Update longitude degrees and minutes
      coordinate.long.degrees = coordinate.long.degrees.replace(
        replaceRegex,
        value
      );
      coordinate.long.minutes = coordinate.long.minutes.replace(
        replaceRegex,
        value
      );
    });

    const evaluatedCoordinate = {
      lat: {
        direction: coordinate.lat.direction,
        degrees: parseFloat(coordinate.lat.degrees),
        minutes: evalExpression(coordinate.lat.minutes),
      },
      long: {
        direction: coordinate.long.direction,
        degrees: parseFloat(coordinate.long.degrees),
        minutes: evalExpression(coordinate.long.minutes),
      },
    };

    function evalExpression(expression: string) {
      const values = expression.split(".");
      try {
        const final = `${eval(values[0])}.${eval(values[1])}`;
        return final;
      } catch (error) {
        return expression;
      }
    }
    const latString = `${evaluatedCoordinate.lat.direction} ${evaluatedCoordinate.lat.degrees} ${evaluatedCoordinate.lat.minutes}`;
    const longString = `${evaluatedCoordinate.long.direction} ${evaluatedCoordinate.long.degrees} ${evaluatedCoordinate.long.minutes}`;

    const formattedString = `${latString} ${longString}`;

    setFinalCoordinate(formattedString);
  };

  const save = async () => {
    let result = await AsyncStorage.getItem("saved");
    const newObject = {
      title: "DateTime-" + Date.now(),
      variables: variables,
      coordinates: {
        lat: {
          direction: northSouthDirection,
          degrees: northDegrees,
          minutes: northMinutes,
        },
        long: {
          direction: eastWestDirection,
          degrees: eastDegrees,
          minutes: eastMinutes,
        },
      },
    };

    //when local storage is not empty
    console.log(result);
    if (result) {
      const existingData = JSON.parse(result);
      existingData.saved.push(newObject);
      const updatedSaved = JSON.stringify(existingData);
      await AsyncStorage.setItem("saved", updatedSaved);
      //when local storage is empty
    } else {
      const newSaved = JSON.stringify({ saved: [newObject] });
      await AsyncStorage.setItem("saved", newSaved);
    }
    alert("Your thing was saved");
  };

  return (
    <>
      <Text style={styles.heading}>Calculator</Text>
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            style={styles.inputDirection}
            placeholder="N/S"
            value={northSouthDirection}
            onChangeText={setNorthSouthDirection}
          />
          <TextInput
            style={styles.inputDegree}
            placeholder="Degrees"
            value={northDegrees}
            onChangeText={setNorthDegrees}
          />
          <TextInput
            style={styles.input}
            placeholder="Decimal Minutes"
            value={northMinutes}
            onChangeText={setNorthMinutes}
          />
        </View>

        {/* Second Row: East/West */}
        <View style={styles.row}>
          <TextInput
            style={styles.inputDirection}
            placeholder="E/W"
            value={eastWestDirection}
            onChangeText={setEastWestDirection}
          />
          <TextInput
            style={styles.inputDegree}
            placeholder="Degrees"
            value={eastDegrees}
            onChangeText={setEastDegrees}
          />
          <TextInput
            style={styles.input}
            placeholder="Decimal Minutes"
            value={eastMinutes}
            onChangeText={setEastMinutes}
          />
        </View>

        <View style={styles.CalcSaveContainer}>
          <Pressable
            onPress={handleCalc}
            style={[styles.fauxButton, { flex: 0.8 }]}
          >
            <FontAwesome
              name="calculator"
              style={{ textAlign: "center", color: Colors.theme.TigersEye }}
              size={20}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              save();
            }}
            style={[styles.fauxButton, { flex: 0.2 }]}
          >
            <FontAwesome
              name="save"
              style={{ textAlign: "center", color: Colors.theme.TigersEye }}
              size={20}
            />
          </Pressable>
        </View>
        {finalCoordinate && (
          <View
            style={{
              borderColor: Colors.theme.Pakistan,
              borderWidth: 2,
              borderRadius: 10,
              borderStyle: "dashed",
              width: "80%",
              alignSelf: "center",
              marginTop: 20,
              paddingBottom: 10,
            }}
          >
            <Text style={[styles.heading, { paddingTop: 30 }]}>Result</Text>
            <Text style={[styles.heading, { paddingTop: 10 }]}>
              {finalCoordinate}
            </Text>
            <Pressable
              onPress={copyToClipboard}
              style={[styles.fauxButton, { width: "20%", alignSelf: "center" }]}
            >
              <FontAwesome
                name="copy"
                style={{ textAlign: "center", color: Colors.theme.TigersEye }}
                size={20}
              />
            </Pressable>
          </View>
        )}
      </View>
    </>
  );
};

const baseInputStyle = {
  paddingHorizontal: 4,
  fontSize: 24,
  color: Colors.theme.Pakistan,
};

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 24,
    paddingTop: 5,
    paddingBottom: 15,
    color: Colors.theme.Pakistan,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    ...baseInputStyle,
  },
  inputDirection: {
    flex: 0.05,
    ...baseInputStyle,
  },
  inputDegree: {
    flex: 0.2,
    ...baseInputStyle,
  },
  CalcSaveContainer: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
  },
  fauxButton: {
    backgroundColor: Colors.theme.Pakistan,
    padding: 10,
    paddingVertical: 20,
    margin: 2,
    borderRadius: 10,
  },
});

export default Calculator;
