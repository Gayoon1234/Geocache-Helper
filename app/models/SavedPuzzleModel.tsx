export default interface Variable {
  name: string;
  value: string;
}
export default interface SavedPuzzleModel {
  title: string;
  variables: Variable[];
  coordinates: {
    lat: { direction: string; degrees: string; minutes: string };
    long: { direction: string; degrees: string; minutes: string };
  };
  notes: string;
}
