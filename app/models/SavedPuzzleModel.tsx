interface Coordinates {
  direction: "N" | "S" | "E" | "W";
  degrees: string;
  minutes: string;
}

export default interface SavedPuzzleModel {
  title: string;
  variables: Record<string, string>;
  coordinates: {
    lat: Coordinates;
    long: Coordinates;
  };
}
