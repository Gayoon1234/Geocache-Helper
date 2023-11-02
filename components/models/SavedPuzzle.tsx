export default interface SavedPuzzle {
  title: string;
  variables: Record<string, number>;
  coordinates: {
    lat: {
      direction: "N" | "S";
      degrees: string;
      minutes: string;
    };
    long: {
      direction: "E" | "W";
      degrees: string;
      minutes: string;
    };
  };
}
