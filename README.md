# Windows Screenshot Library for JS Lovers

> :rocket: :telescope: A mighty, robust screenshot library for Windows, Electron and Node.JS Developers.

<strong>Screenshot type offered by this library:</strong>
1) Coordinate Based or Specific Region (x1, y1, x2, y2)
2) Full Screen
3) Windows Working Area only (taskbar is excluded)
3) Only Taskbar
4) All Active Windows at once

<strong>What so special about this library: </strong>
1) It is capable of finding accurate coordinates of an Active Window or Taskbar irrespective of the taskbar location (BOTTOM, LEFT, TOP, RIGHT) on the screen.
2) This is a Node.JS library but some part of the backend is developed using C#, which is useful for invoking Windows native methods easily.
3) All Active Windows can be screenshoted at once automatically just by calling a single method.
4) This library supports various image formats to save your screenshot in. (BMP, GIF, JPEG, PNG, TIFF).

```
function test() {
  console.log("notice the blank line before this function?");
}
```

<h3>:clipboard: License: </h3> 
Licensed under the <a href="https://github.com/soulehshaikh99/win-screenshot/blob/master/LICENSE">MIT License</a>.
