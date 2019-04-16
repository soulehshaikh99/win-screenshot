# Windows Screenshot Library for JS Lovers

> :rocket: :telescope: A mighty, robust screenshot library for Windows, Electron and Node.JS Developers.

<strong>Install</strong>
```
$ npm i win-screenshot
```

<strong>Screenshot type offered by this library:</strong>
1) Coordinate Based or Specific Region (x1, y1, x2, y2)
2) Full Screen
3) Windows Working Area only (taskbar is excluded)
3) Only Taskbar
4) All Active Windows at once

<strong>What so special about this library: </strong>
1) It is capable of finding accurate coordinates of an Active Window or Taskbar irrespective of the taskbar location (BOTTOM, LEFT, TOP, RIGHT) on the screen.
2) This is a Node.JS library but some part of the backend is developed using C#, which is useful for invoking Windows native methods easily.
3) All Active Windows can be screenshotted at once automatically just by calling a single method.
4) This library supports various image formats to save your screenshot in. (BMP, GIF, JPEG, PNG, TIFF).

<strong>Note:</strong>
1) This library has a limitation for taking screenshots of only primary monitor/screen.
2) It requires .NET Framework 3.5 Client Profile as it is build upon C# Code.

<strong>Screenshot all active windows:</strong>
```javascript
// ES6 Destructuring Assignment
const { Screenshot, ImageFormat } = require('win-screenshot');
const { writeFileSync } = require('fs');
const { homedir } = require('os');
const { spawnSync } = require('child_process');

// Destination Directory
const directoryName = `${homedir()}\\Desktop`;

let returnValues = Screenshot.captureAllWindows({
    // Use of PNG format for taking screenshot
    imageFormat: ImageFormat.PNG
});

// This is necessary as the return Value of captureAllWindows() is an array
for (let r of returnValues)  {
    // Now r contains an element from the array
    // You need to convert encoded base64 string into buffer before writing
    // This will save each screenshot with its process name.
    writeFileSync(`${directoryName}\\${r.processName}.png`, Buffer.from(r.imageBuffer, 'base64'));
}

// This will open the destination directory using cmd as inter-process communication call,
// once all screenshots are done writing
spawnSync("cmd.exe", ["/c", `start ${directoryName}`]);
```

<strong>Screenshot using given coordinates:</strong>
```javascript
// ES6 Destructuring Assignment
const { Screenshot, ImageFormat } = require('win-screenshot');
const { writeFileSync } = require('fs');
const { homedir } = require('os');
const { spawnSync } = require('child_process');

// Absolute File Path
let fileName = `${homedir()}\\Desktop\\Coordinates Image.jpg`;

let imageString = Screenshot.captureByCoordinates({
    // Pass coordinates like this
    coords:{
        x1: 0,
        y1: 0,
        x2: 800,
        y2: 800
    },
    // Use of JPEG format for taking screenshot
    imageFormat: ImageFormat.JPEG
});

// You need to convert encoded base64 string into buffer before writing
// This will save the screenshot with the specified file name.
writeFileSync(fileName, Buffer.from(imageString, 'base64'));

// This will show the saved screenshot with a blue selection in an explorer window
// using cmd as inter-process communication call,
// once the file is done writing
spawnSync("cmd.exe", ["/c", `explorer.exe /select, ${fileName}`]);
```

<strong>Screenshot of fullscreen:</strong>
```javascript
// ES6 Destructuring Assignment
const { Screenshot, ImageFormat } = require('win-screenshot');
const { writeFileSync } = require('fs');
const { homedir } = require('os');
const { spawnSync } = require('child_process');

// Absolute File Path
let fileName = `${homedir()}\\Desktop\\Fullscreen Image.bmp`;

let returnValues = Screenshot.captureFullScreen({
    // Use of BMP format for taking screenshot
    imageFormat: ImageFormat.BMP
});

// You need to convert encoded base64 string into buffer before writing
// This will save the screenshot with the specified file name.
writeFileSync(fileName, Buffer.from(returnValues.imageBuffer, 'base64'));

// This will show the saved screenshot with a blue selection in an explorer window
// using cmd as inter-process communication call,
// once the file is done writing
spawnSync("cmd.exe", ["/c", `explorer.exe /select, ${fileName}`]);
```

<strong>Screenshot of taskbar:</strong>
```javascript
// ES6 Destructuring Assignment
const { Screenshot, ImageFormat } = require('win-screenshot');
const { writeFileSync } = require('fs');
const { homedir } = require('os');
const { spawnSync } = require('child_process');

// Absolute File Path
let fileName = `${homedir()}\\Desktop\\Taskbar Image.gif`;

let returnValues = Screenshot.captureTaskbar({
    // Use of GIF format for taking screenshot
    imageFormat: ImageFormat.GIF
});

// You need to convert encoded base64 string into buffer before writing
// This will save the screenshot with the specified file name.
writeFileSync(fileName, Buffer.from(returnValues.imageBuffer, 'base64'));

// This will show the saved screenshot with a blue selection in an explorer window
// using cmd as inter-process communication call,
// once the file is done writing
spawnSync("cmd.exe", ["/c", `explorer.exe /select, ${fileName}`]);
```

<strong>Screenshot of working area of windows:</strong>
```javascript
// ES6 Destructuring Assignment
const { Screenshot, ImageFormat } = require('win-screenshot');
const { writeFileSync } = require('fs');
const { homedir } = require('os');
const { spawnSync } = require('child_process');

// Absolute File Path
let fileName = `${homedir()}\\Desktop\\Working Area Image.tiff`;

let returnValues = Screenshot.captureWorkingArea({
    // Use of TIFF format for taking screenshot
    imageFormat: ImageFormat.TIFF
});

// You need to convert encoded base64 string into buffer before writing
// This will save the screenshot with the specified file name.
writeFileSync(fileName, Buffer.from(returnValues.imageBuffer, 'base64'));

// This will show the saved screenshot with a blue selection in an explorer window
// using cmd as inter-process communication call,
// once the file is done writing
spawnSync("cmd.exe", ["/c", `explorer.exe /select, ${fileName}`]);
```

<h3>Made with :heart: from Souleh</h3>

<h3>:clipboard: License: </h3>
Licensed under the <a href="https://github.com/soulehshaikh99/win-screenshot/blob/master/LICENSE">MIT License</a>.
