const { spawnSync } = require('child_process');

const ImageFormat = {
    PNG: "PNG",
    JPEG: "JPEG",
    TIFF: "TIFF",
    GIF: "GIF",
    BMP: "BMP"
};

function commonMethod(options, programName) {
    if (!options) options = {};
    let imageFormat = checkForImageFormatValidity(options);
    let child = spawnSync("cmd.exe", ["/c", `${__dirname}\\libs\\${programName} ${imageFormat}`]);
    return JSON.parse(child.stdout.toString());
}

function coordinatesMethod(options, programName) {
    if (!options) options = {};
    let imageFormat = checkForImageFormatValidity(options);
    let coords = checkForCoordinatesValidity(options);
    let child = spawnSync("cmd.exe", ["/c", `${__dirname}\\libs\\${programName} ${coords.x1} ${coords.y1} ${coords.x2} ${coords.y2} ${imageFormat}`]);
    return child.stdout.toString();
}

function checkForImageFormatValidity(options) {
    if ('imageFormat' in options) {
        switch (options.imageFormat) {
            case ImageFormat.BMP:
                return ImageFormat.BMP;
            case ImageFormat.GIF:
                return ImageFormat.GIF;
            case ImageFormat.JPEG:
                return ImageFormat.JPEG;
            case ImageFormat.PNG:
                return ImageFormat.PNG;
            case ImageFormat.TIFF:
                return ImageFormat.TIFF;
            default:
                return ImageFormat.PNG;
        }
    } else {
        return ImageFormat.PNG;
    }
}

function checkForCoordinatesValidity(options) {
    if ('coords' in options) {
        let coords = options.coords;
        return {
            x1: ('x1' in coords) ? coords.x1 : 0,
            y1: ('y1' in coords) ? coords.y1 : 0,
            x2: ('x2' in coords) ? coords.x2 : 100,
            y2: ('y2' in coords) ? coords.y2 : 100
        }
    } else {
        let child = spawnSync("cmd.exe", ["/c", `${__dirname}\\libs\\get_screen_resolution.exe`]);
        let screenResolution = JSON.parse(child.stdout.toString());
        return {
            x1: 0,
            y1: 0,
            x2: screenResolution.screenWidth,
            y2: screenResolution.screenHeight
        }
    }
}

class Screenshot {

    static captureAllWindows(options) {
        return new Promise(function (resolve, reject) {
            resolve(commonMethod(options, "capture_all_windows.exe"));
        });
    }

    static captureByCoordinates(options) {
        return new Promise(function (resolve, reject) {
            resolve(coordinatesMethod(options, "capture_coordinates.exe"));
        });
    }

    static captureFullScreen(options) {
        return new Promise(function (resolve, reject) {
            resolve(commonMethod(options, "capture_fullscreen.exe"));
        });
    }

    static captureTaskbar(options) {
        return new Promise(function (resolve, reject) {
            resolve(commonMethod(options, "capture_taskbar.exe"));
        });
    }

    static captureWorkingArea(options) {
        return new Promise(function (resolve, reject) {
            resolve(commonMethod(options, "capture_working_area.exe"));
        });
    }
}

module.exports = {
    Screenshot,
    ImageFormat
};