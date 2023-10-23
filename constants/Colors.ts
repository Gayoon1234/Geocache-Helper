const tintColorLight = "#2f95dc";
const tintColorDark = "#DDA15E"; //tint is like active color

export default {
  // light: {
  //   text: "#000",
  //   background: "#fff",
  //   tint: tintColorLight,
  //   tabIconDefault: "#ccc",
  //   tabIconSelected: tintColorLight,
  // },
  dark: {
    text: "#FEFAE0",
    background: "#283618",
    tint: tintColorDark,
    tabIconDefault: "#283618",
    tabIconSelected: tintColorDark,
  },
  //The default create-expo-app creates a light and dark mode,
  // however I can't be bothered to make a light theme
  light: {
    text: "#FEFAE0",
    background: "#283618",
    tint: tintColorDark,
    tabIconDefault: "#283618",
    tabIconSelected: tintColorDark,
  },
  yolo: {
    wood: "#DDA15E",
  },
  //https://coolors.co/palette/606c38-283618-fefae0-dda15e-bc6c25
  theme: {
    DarkMoss: "#606c38",
    Pakistan: "#283618",
    Cornsilk: "#fefae0",
    EarthYellow: "#dda15e",
    TigersEye: "#bc6c25",
  },
};
