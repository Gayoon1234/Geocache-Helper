import React, {
  createContext,
  useContext,
  ReactNode,
  ReactElement,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage from your preferred package
import SavedPuzzleModel from "../models/SavedPuzzleModel";

interface SaveDataContextType {
  saveData: SavedPuzzleModel[] | null;
  setSaveData: (data: SavedPuzzleModel[] | null) => void;
  getSaveDataByTitle: (title: string) => SavedPuzzleModel | null;
}

const SaveDataContext = createContext<SaveDataContextType | undefined>(
  undefined
);

export function SaveDataProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [saveData, setSaveData] = useState<SavedPuzzleModel[] | null>(null);

  // Load the data from AsyncStorage when the component mounts
  useEffect(() => {
    const getData = async () => {
      let savedData = await AsyncStorage.getItem("saved");
      if (savedData) {
        setSaveData(JSON.parse(savedData).saved);
      }
    };
    getData();
  }, []);

  // Update AsyncStorage when saveData changes
  useEffect(() => {
    if (saveData !== null) {
      AsyncStorage.setItem("saved", JSON.stringify({ saved: saveData }));
    } else {
      // Handle the case when saveData is null, e.g., clear AsyncStorage
      AsyncStorage.removeItem("saved");
    }
  }, [saveData]);

  const getSaveDataByTitle = (title: string) => {
    if (!saveData) {
      return null;
    }
    const foundPuzzle = saveData.find((puzzle) => puzzle.title === title);
    return foundPuzzle || null;
  };
  return (
    <SaveDataContext.Provider
      value={{ saveData, setSaveData, getSaveDataByTitle }}
    >
      {children}
    </SaveDataContext.Provider>
  );
}

export function useSaveData(): SaveDataContextType {
  const context = useContext(SaveDataContext);
  if (context === undefined) {
    throw new Error("useSaveData must be used within a SaveDataProvider");
  }
  return context;
}
