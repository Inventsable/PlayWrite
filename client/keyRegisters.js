csInterface.registerKeyEventsInterest([{"keyCode": 0x08}]);


// var appName=csInterface.hostEnvironment.appName;
// var OSVersion=csInterface.getOSInformation();
//   // Specify OS-specific virtual key code
//   // Let all basic keystrokes through, including undo, cut, copy, paste
//   if (OSVersion.indexOf("Windows") >= 0)    {
//     console.log("Creating key events for Windows");
//     var keyEventsInterest = JSON.stringify([
//       {"keyCode": 0x20},
//       {"keyCode": 0x20, "shiftKey": true}
//     ])



// keyEventsInterest = JSON.stringify([
// {"keyCode": 0x08}, // "BACKSPACE"
// {"keyCode": 0x0D}, // "RETURN"
// {"keyCode": 0x20}, // "SPACE"
// {"keyCode": 0x21}, // "PAGE UP"
// {"keyCode": 0x22}, // "PAGE DOWN"
// {"keyCode": 0x23}, // "END"
// {"keyCode": 0x24}, // "HOME"
// {"keyCode": 0x25}, // "LEFT ARROW"
// {"keyCode": 0x26}, // "UP ARROW"
// {"keyCode": 0x27}, // "RIGHT ARROW"
// {"keyCode": 0x28}, // "DOWN ARROW"
// {"keyCode": 0x2D}, // "DELETE"
// {"keyCode": 0x30}, // "0"
// {"keyCode": 0x30, "shiftKey": true},
// {"keyCode": 0x31}, // "1"
// {"keyCode": 0x31, "shiftKey": true},
// {"keyCode": 0x32}, // "2"
// {"keyCode": 0x32, "shiftKey": true},
// {"keyCode": 0x33}, // "3"
// {"keyCode": 0x33, "shiftKey": true},
// {"keyCode": 0x34}, // "4"
// {"keyCode": 0x34, "shiftKey": true},
// {"keyCode": 0x35}, // "5"
// {"keyCode": 0x35, "shiftKey": true},
// {"keyCode": 0x36}, // "6"
// {"keyCode": 0x36, "shiftKey": true},
// {"keyCode": 0x37}, // "7"
// {"keyCode": 0x37, "shiftKey": true},
// {"keyCode": 0x38}, // "8"
// {"keyCode": 0x38, "shiftKey": true},
// {"keyCode": 0x39}, // "9"
// {"keyCode": 0x39, "shiftKey": true},
// {"keyCode": 0x41}, // "a"
// {"keyCode": 0x41, "shiftKey": true},
// {"keyCode": 0x41, "ctrlKey": true},
// {"keyCode": 0x42}, // "b"
// {"keyCode": 0x42, "shiftKey": true},
// {"keyCode": 0x43}, // "c"
// {"keyCode": 0x43, "shiftKey": true},
// {"keyCode": 0x43, "ctrlKey": true},
// {"keyCode": 0x44}, // "d"
// {"keyCode": 0x44, "shiftKey": true},
// {"keyCode": 0x45}, // "e"
// {"keyCode": 0x45, "shiftKey": true},
// {"keyCode": 0x46}, // "f"
// {"keyCode": 0x46, "shiftKey": true},
// {"keyCode": 0x47}, // "g"
// {"keyCode": 0x47, "shiftKey": true},
// {"keyCode": 0x48}, // "h"
// {"keyCode": 0x48, "shiftKey": true},
// {"keyCode": 0x49}, // "i"
// {"keyCode": 0x49, "shiftKey": true},
// {"keyCode": 0x4A}, // "j"
// {"keyCode": 0x4A, "shiftKey": true},
// {"keyCode": 0x4B}, // "k"
// {"keyCode": 0x4B, "shiftKey": true},
// {"keyCode": 0x4C}, // "l"
// {"keyCode": 0x4C, "shiftKey": true},
// {"keyCode": 0x4D}, // "m"
// {"keyCode": 0x4D, "shiftKey": true},
// {"keyCode": 0x4E}, // "n"
// {"keyCode": 0x4E, "shiftKey": true},
// {"keyCode": 0x4F}, // "o"
// {"keyCode": 0x4F, "shiftKey": true},
// {"keyCode": 0x50}, // "p"
// {"keyCode": 0x50, "shiftKey": true},
// {"keyCode": 0x51}, // "q"
// {"keyCode": 0x51, "shiftKey": true},
// {"keyCode": 0x52}, // "r"
// {"keyCode": 0x52, "shiftKey": true},
// {"keyCode": 0x53}, // "s"
// {"keyCode": 0x53, "shiftKey": true},
// {"keyCode": 0x54}, // "t"
// {"keyCode": 0x54, "shiftKey": true},
// {"keyCode": 0x55}, // "u"
// {"keyCode": 0x55, "shiftKey": true},
// {"keyCode": 0x56}, // "v"
// {"keyCode": 0x56, "shiftKey": true},
// {"keyCode": 0x56, "ctrlKey": true},
// {"keyCode": 0x57}, // "w"
// {"keyCode": 0x57, "shiftKey": true},
// {"keyCode": 0x58}, // "x"
// {"keyCode": 0x58, "shiftKey": true},
// {"keyCode": 0x58, "ctrlKey": true},
// {"keyCode": 0x59}, // "y"
// {"keyCode": 0x59, "shiftKey": true},
// {"keyCode": 0x5A}, // "z"
// {"keyCode": 0x5A, "shiftKey": true},
// {"keyCode": 0x5A, "ctrlKey": true},
// {"keyCode": 0x60}, // "0 on Numeric Keypad"
// {"keyCode": 0x61}, // "1 on Numeric Keypad"
// {"keyCode": 0x62}, // "2 on Numeric Keypad"
// {"keyCode": 0x63}, // "3 on Numeric Keypad"
// {"keyCode": 0x64}, // "4 on Numeric Keypad"
// {"keyCode": 0x65}, // "5 on Numeric Keypad"
// {"keyCode": 0x66}, // "6 on Numeric Keypad"
// {"keyCode": 0x67}, // "7 on Numeric Keypad"
// {"keyCode": 0x68}, // "8 on Numeric Keypad"
// {"keyCode": 0x69} // "9 on Numeric Keypad"
// ]);
// }    else if (OSVersion.indexOf("Mac") >= 0)    {
// keyEventsInterest = JSON.stringify([
// {"keyCode": 0}, // "a"
// {"keyCode": 0, "shiftKey": true},
// {"keyCode": 0, "metaKey" : true},
// {"keyCode": 1}, // "s"
// {"keyCode": 1, "shiftKey" : true},
// {"keyCode": 2}, // "d"
// {"keyCode": 2, "shiftKey" : true},
// {"keyCode": 3}, // "f"
// {"keyCode": 3, "shiftKey" : true},
// {"keyCode": 4}, // "h"
// {"keyCode": 4, "shiftKey" : true},
// {"keyCode": 5}, // "g"
// {"keyCode": 5, "shiftKey" : true},
// {"keyCode": 6}, // "z"
// {"keyCode": 6, "shiftKey" : true},
// {"keyCode": 6, "metaKey" : true},
// {"keyCode": 7}, // "x"
// {"keyCode": 7, "shiftKey" : true},
// {"keyCode": 7, "metaKey" : true},
// {"keyCode": 8}, // "c"
// {"keyCode": 8, "shiftKey" : true},
// {"keyCode": 8, "metaKey" : true},
// {"keyCode": 9}, // "v"
// {"keyCode": 9, "shiftKey" : true},
// {"keyCode": 9, "metaKey" : true},
// {"keyCode": 11}, // "b"
// {"keyCode": 11, "shiftKey" : true},
// {"keyCode": 12}, // "q"
// {"keyCode": 12, "shiftKey" : true},
// {"keyCode": 13}, // "w"
// {"keyCode": 13, "shiftKey" : true},
// {"keyCode": 14}, // "e"
// {"keyCode": 14, "shiftKey" : true},
// {"keyCode": 15}, // "r"
// {"keyCode": 15, "shiftKey" : true},
// {"keyCode": 16}, // "y"
// {"keyCode": 16, "shiftKey" : true},
// {"keyCode": 17}, // "t"
// {"keyCode": 17, "shiftKey" : true},
// {"keyCode": 18}, // "1"
// {"keyCode": 18, "shiftKey" : true},
// {"keyCode": 19}, // "2"
// {"keyCode": 19, "shiftKey" : true},
// {"keyCode": 20}, // "3"
// {"keyCode": 20, "shiftKey" : true},
// {"keyCode": 21}, // "4"
// {"keyCode": 21, "shiftKey" : true},
// {"keyCode": 22}, // "6"
// {"keyCode": 22, "shiftKey" : true},
// {"keyCode": 23}, // "5"
// {"keyCode": 23, "shiftKey" : true},
// {"keyCode": 24}, // "="
// {"keyCode": 24, "shiftKey" : true},
// {"keyCode": 25}, // "9"
// {"keyCode": 25, "shiftKey" : true},
// {"keyCode": 26}, // "7"
// {"keyCode": 26, "shiftKey" : true},
// {"keyCode": 27}, // "-"
// {"keyCode": 27, "shiftKey" : true},
// {"keyCode": 28}, // "8"
// {"keyCode": 28, "shiftKey" : true},
// {"keyCode": 29}, // "0"
// {"keyCode": 29, "shiftKey" : true},
// {"keyCode": 30}, // "]"
// {"keyCode": 30, "shiftKey" : true},
// {"keyCode": 31}, // "o"
// {"keyCode": 31, "shiftKey" : true},
// {"keyCode": 32}, // "u"
// {"keyCode": 32, "shiftKey" : true},
// {"keyCode": 33}, // "["
// {"keyCode": 33, "shiftKey" : true},
// {"keyCode": 34}, // "i"
// {"keyCode": 34, "shiftKey" : true},
// {"keyCode": 35}, // "p"
// {"keyCode": 35, "shiftKey" : true},
// {"keyCode": 36}, // "RETURN"
// {"keyCode": 37}, // "l"
// {"keyCode": 37, "shiftKey" : true},
// {"keyCode": 38}, // "j"
// {"keyCode": 38, "shiftKey" : true},
// {"keyCode": 39}, // "'"
// {"keyCode": 39, "shiftKey" : true},
// {"keyCode": 40}, // "k"
// {"keyCode": 40, "shiftKey" : true},
// {"keyCode": 41}, // "},"
// {"keyCode": 41, "shiftKey" : true},
// {"keyCode": 42}, // "\"
// {"keyCode": 42, "shiftKey" : true},
// {"keyCode": 43}, // ","
// {"keyCode": 43, "shiftKey" : true},
// {"keyCode": 44}, // "/"
// {"keyCode": 44, "shiftKey" : true},
// {"keyCode": 45}, // "n"
// {"keyCode": 45, "shiftKey" : true},
// {"keyCode": 46}, // "m"
// {"keyCode": 46, "shiftKey" : true},
// {"keyCode": 47}, // "."
// {"keyCode": 47, "shiftKey" : true},
// {"keyCode": 48}, // "TAB"
// {"keyCode": 49}, // "SPACE"
// {"keyCode": 50}, // "`"
// {"keyCode": 50, "shiftKey" : true},
// {"keyCode": 51}, // "DELETE"
// {"keyCode": 52}, // "ENTER"
// {"keyCode": 53}, // "ESCAPE"
// {"keyCode": 65}, // "."
// {"keyCode": 65, "shiftKey" : true},
// {"keyCode": 67}, // "*"
// {"keyCode": 67, "shiftKey" : true},
// {"keyCode": 69}, // "+"
// {"keyCode": 69, "shiftKey" : true},
// {"keyCode": 71}, // "CLEAR"
// {"keyCode": 75}, // "/"
// {"keyCode": 75, "shiftKey" : true},
// {"keyCode": 76}, // "ENTER" numberpad on full kbd
// {"keyCode": 78}, // "="
// {"keyCode": 78, "shiftKey" : true},
// {"keyCode": 81}, // "="
// {"keyCode": 81, "shiftKey" : true},
// {"keyCode": 82}, // "0"
// {"keyCode": 82, "shiftKey" : true},
// {"keyCode": 83}, // "1"
// {"keyCode": 83, "shiftKey" : true},
// {"keyCode": 84}, // "2"
// {"keyCode": 84, "shiftKey" : true},
// {"keyCode": 85}, // "3"
// {"keyCode": 85, "shiftKey" : true},
// {"keyCode": 86}, // "4"
// {"keyCode": 86, "shiftKey" : true},
// {"keyCode": 87}, // "5"
// {"keyCode": 87, "shiftKey" : true},
// {"keyCode": 88}, // "6"
// {"keyCode": 88, "shiftKey" : true},
// {"keyCode": 89}, // "7"
// {"keyCode": 89, "shiftKey" : true},
// {"keyCode": 91}, // "8"
// {"keyCode": 91, "shiftKey" : true},
// {"keyCode": 92}, // "9"
// {"keyCode": 92, "shiftKey" : true},
// {"keyCode": 115}, // "HOME"
// {"keyCode": 116}, // "PGUP"
// {"keyCode": 117}, // "DELETE"
// {"keyCode": 119}, // "END"
// {"keyCode": 121}, // "PGDN"
// {"keyCode": 123}, // "LEFT"
// {"keyCode": 123, "shiftKey" : true},
// {"keyCode": 124}, // "RIGHT"
// {"keyCode": 124, "shiftKey" : true},
// {"keyCode": 125}, // "DOWN"
// {"keyCode": 125, "shiftKey" : true},
// {"keyCode": 126}, // "UP"
// {"keyCode": 126, "shiftKey" : true}
// ]);
// }
// csInterface.registerKeyEventsInterest(keyEventsInterest);
