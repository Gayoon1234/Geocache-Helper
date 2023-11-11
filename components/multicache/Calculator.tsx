import { useEffect, useState } from "react";
import { Text } from "../Themed";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
// import Clipboard from "@react-native-clipboard/clipboard";
import { Clipboard } from "react-native";
// import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSaveData } from "../../app/contexts/SaveDataContext";
import SavedPuzzleModel from "../../app/models/SavedPuzzleModel";
import Variable from "../../app/models/SavedPuzzleModel";
import { LinearGradient } from "expo-linear-gradient";
interface CalculatorProps {
  variables: Variable[];
  savedPuzzle: SavedPuzzleModel | null;
}

// Note:
// There is a variables field in savedPuzzle, however that is
// not in sync with the latest updates, instead it is the saved state.
const Calculator: React.FC<CalculatorProps> = ({ variables, savedPuzzle }) => {
  const { saveData, setSaveData } = useSaveData();

  const [northSouthDirection, setNorthSouthDirection] = useState("S");
  const [northDegrees, setNorthDegrees] = useState("37");
  const [northMinutes, setNorthMinutes] = useState("");

  const [eastWestDirection, setEastWestDirection] = useState("E");
  const [eastDegrees, setEastDegrees] = useState("144");
  const [eastMinutes, setEastMinutes] = useState("");
  const [finalCoordinate, setFinalCoordinate] = useState("");

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // const setPuzzle = async () => {
    if (savedPuzzle) {
      setNorthMinutes(savedPuzzle.coordinates.lat.minutes);
      setNorthSouthDirection(savedPuzzle.coordinates.lat.direction);
      setNorthDegrees(savedPuzzle.coordinates.lat.degrees);

      setEastMinutes(savedPuzzle.coordinates.long.minutes);
      setEastWestDirection(savedPuzzle.coordinates.long.direction);
      setEastDegrees(savedPuzzle.coordinates.long.degrees);

      setTitle(savedPuzzle.title);
      setNotes(savedPuzzle.notes);
      setFinalCoordinate("");
    }
  }, [savedPuzzle]);

  useEffect(() => {
    handleCalc();
  }, [variables]);

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

    console.log(coordinate);

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
    return formattedString;
  };

  const save = async () => {
    // let result = await AsyncStorage.getItem("saved");
    const newObject = {
      title: title ? title : "DateTime-" + Date.now(),
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
      notes: notes,
    };

    //when local storage is not empty
    if (saveData) {
      // It will try to remove any pre-existing puzzle with that name.
      //then it appends the new puzzle to the saved list
      setSaveData([
        ...saveData.filter((x) => x.title !== newObject.title),
        newObject as SavedPuzzleModel,
      ]);
      //when local storage is empty
    } else {
      setSaveData([newObject as SavedPuzzleModel]);
    }
    alert(`Your puzzle was saved as ${title}`);
  };

  const clear = () => {
    setNorthSouthDirection("S");
    setNorthDegrees("37");
    setNorthMinutes("");

    setEastWestDirection("E");
    setEastDegrees("144");
    setEastMinutes("");

    setTitle("");
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
              clear();
            }}
            style={[styles.fauxButton, { flex: 0.2 }]}
          >
            <FontAwesome
              name="eraser"
              style={{ textAlign: "center", color: Colors.theme.TigersEye }}
              size={20}
            />
          </Pressable>
        </View>
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
          <Text style={[styles.heading, { paddingTop: 30, fontSize: 20 }]}>
            Result
          </Text>
          {/* {finalCoordinate && ( */}
          <Text style={[styles.heading, { paddingTop: 5, fontSize: 18 }]}>
            {finalCoordinate}
          </Text>
          {/* )} */}

          <Pressable
            onPress={copyToClipboard}
            style={[styles.fauxButton, { width: "80%", alignSelf: "center" }]}
          >
            <FontAwesome
              name="copy"
              style={{ textAlign: "center", color: Colors.theme.TigersEye }}
              size={20}
            />
          </Pressable>
        </View>
        <Text style={[styles.heading, { paddingTop: 30 }]}>Notes</Text>
        <TextInput
          style={[
            styles.input,
            { fontSize: 18, width: "80%", alignSelf: "center" },
          ]}
          multiline
          numberOfLines={4}
          placeholder="Enter some notes about the cache"
          value={notes}
          onChangeText={setNotes}
          textAlignVertical="top"
        ></TextInput>
        <Text style={[styles.heading, { paddingTop: 30 }]}>Save As</Text>
        <View style={[styles.CalcSaveContainer, { paddingBottom: 200 }]}>
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
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
      </View>
    </>
  );
};

const baseInputStyle = {
  padding: 6,
  fontSize: 24,
  color: Colors.theme.Pakistan,
  backgroundColor: Colors.theme.EarthYellow,
  marginHorizontal: 3,
  borderRadius: 10,
  paddingTop: 10,
  paddingBottom: 10,
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
  titleInput: {
    fontSize: 24,
    flex: 1,
    color: Colors.theme.Pakistan,
    backgroundColor: Colors.theme.EarthYellow,
    marginRight: 5,
    paddingLeft: 5,
    borderRadius: 10,
  },
});

export default Calculator;
