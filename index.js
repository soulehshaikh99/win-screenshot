const { spawnSync } = require('child_process');

/**
 * A specialized enumeration version of Image Format Constants
 *
 * @public
 * @const
 * @returns {string} Returns `Image Format Name`.
 */
const ImageFormat = {
    PNG : "PNG",
    JPEG: "JPEG",
    TIFF: "TIFF",
    GIF: "GIF"
};

/**
 * Common Method which acts as a template for captureAllWindows, captureFullScreen, captureTaskBar, captureWorkingArea functions
 *
 * @private
 * @function
 * @returns {object} Returns JS Object which is parsed from executable's standard output JSON String.
 */
function commonMethod(options, programName) {
    if (!options) options={};
    let imageFormat = checkForImageFormatValidity(options);
    let child = spawnSync("cmd.exe", ["/c", `${__dirname}\\libs\\${programName} ${imageFormat}`]);
    return JSON.parse(child.stdout.toString());
}

/**
 * Backend Method which acts as a template for captureByCoordinates function
 *
 * @private
 * @function
 * @returns {object} Returns JS Object which is parsed from executable's standard output JSON String.
 */
function coordinatesMethod(options, programName) {
    if (!options) options={};
    let imageFormat = checkForImageFormatValidity(options);
    let coords = checkForCoordinatesValidity(options);
    let child = spawnSync("cmd.exe", ["/c", `${__dirname}\\libs\\${programName} ${coords.x1} ${coords.y1} ${coords.x2} ${coords.y2} ${imageFormat}`]);
    return JSON.parse(child.stdout.toString());
}

/**
 * Validity method which checks for Image Format
 *
 * @private
 * @function
 * @returns {object} [ImageFormat] Returns default value ImageFormat.PNG if no appropriate ImageFormat was found.
 */
function checkForImageFormatValidity(options) {
    if ('imageFormat' in options) {
        switch (options.imageFormat) {
            case ImageFormat.GIF:
                return ImageFormat.GIF;
            case ImageFormat.JPEG:
                return ImageFormat.JPEG;
            case ImageFormat.PNG:
                return ImageFormat.PNG;
            case ImageFormat.TIFF:
                return ImageFormat.TIFF;
        }
    } else {
        return ImageFormat.PNG;
    }
}

/**
 * Validity method which checks for all coordinates values
 *
 * @private
 * @function
 * @returns {object} [ImageFormat] Returns default value (x1 = 0, y1 = 0, x2 = ScreenWidth, y2 = ScreenHeight) if no appropriate coordinate values was found.
 */
function checkForCoordinatesValidity(options) {
    if ('coords' in options)    {
        let coords = options.coords;
        return {
            x1: ('x1' in coords) ? coords.x1 : 0,
            y1: ('y1' in coords) ? coords.y1 : 0,
            x2: ('x2' in coords) ? coords.x2 : 100,
            y2: ('y2' in coords) ? coords.y2 : 100
        }
    } else {
        let child = spawnSync("cmd.exe",["/c",`${__dirname}\\libs\\get_screen_resolution.exe`]);
        let screenResolution = JSON.parse(child.stdout.toString());
        return {
            x1: 0,
            y1: 0,
            x2: screenResolution.screenWidth,
            y2: screenResolution.screenHeight
        }
    }
}

/**
 * The main class which acts as the core of module
 * containing 5 static functions for taking screenshots
 *
 * @public
 * @class
 */
class Screenshot {

    /**
     * This function finds every possible process which has a Main Window Title or the Active Windows.
     * It focuses every window and tries to calculates its most perfect Region (i.e. Starting and Ending Coordinates) using a complex algorithm.
     * It then saves screenshot of every window's calculated region at temporary location and reads its buffer value and discards that temporary file
     * at the end of the program.
     *
     * @public
     * @static
     * @function
     * @param {Object} [options={}] The Options object
     * @param {Object} [options.ImageFormat=ImageFormat.PNG] Specifies the format type of the image.
     * @return {Array} [array] An array which contains multiple JS objects. The JS object is made up of:
     * processId: The Process Id of every active window.
     * processHandle: The Process Handle of every active window.
     * processName: The Process Name of every active window.
     * mainWindowTitle: The Window Title of every active window.
     * mainWindowHandle: The Window Handle of every active window.
     * topLeftX: Starting Coordinate X axis of window.
     * topLeftY: Starting Coordinate Y axis of window.
     * bottomRightX: Ending Coordinate X axis of window.
     * bottomRightY: Ending Coordinate Y axis of window.
     * imageBuffer: returns a base64 encoded string which needs to be converted to buffer to be written into image format.
     */
    static captureAllWindows(options) {
        return new Promise(function (resolve, reject) {
            resolve(commonMethod(options, "capture_all_windows.exe"));
        });
    }

    /**
     * This function fills the missing coordinates object with some default values like (x1 = 0, y1 = 0, x2 = 100, y2 = 100)
     * It takes a screenshot of the coordinates supplied to it if all 4 coordinates are supplied.
     *
     * @public
     * @static
     * @function
     * @param {Object} [options={}] The Options object
     * @param {Object} [options.ImageFormat=ImageFormat.PNG] Specifies the format type of the image.
     * @return {string}returns a base64 encoded string which needs to be converted to buffer to be written into image format
     */
    static captureByCoordinates(options) {
        return new Promise(function (resolve, reject) {
            resolve(coordinatesMethod(options, "capture_coordinates.exe"));
        });
    }

    /**
     * This function finds the Current Screen Region Coordinates for e.g. (0, 0, 1600, 900).
     * The last 2 coordinates are the current screen's resolution (width and height).
     *
     * @public
     * @static
     * @function
     * @param {Object} [options={}] The Options object
     * @param {Object} [options.ImageFormat=ImageFormat.PNG] Specifies the format type of the image.
     * @return {Array} [array] An array which contains multiple JS objects. The JS object is made up of:
     * topLeftX: Starting Coordinate X axis of taskbar.
     * topLeftY: Starting Coordinate Y axis of taskbar.
     * bottomRightX: Ending Coordinate X axis of taskbar.
     * bottomRightY: Ending Coordinate Y axis of taskbar.
     * imageBuffer: returns a base64 encoded string which needs to be converted to buffer to be written into image format.
     */
    static captureFullScreen(options) {
        return new Promise(function (resolve, reject) {
            resolve(commonMethod(options, "capture_fullscreen.exe"));
        });
    }

    /**
     * This function finds the alignment of taskbar and accordingly calculates its coordinates and
     * selects the most appropriate coordinates of taskbar and converts it into relevant data.
     *
     * @public
     * @static
     * @function
     * @param {Object} [options={}] The Options object
     * @param {Object} [options.ImageFormat=ImageFormat.PNG] Specifies the format type of the image.
     ** @return {Array} [array] An array which contains multiple JS objects. The JS object is made up of:
     * topLeftX: Starting Coordinate X axis of taskbar.
     * topLeftY: Starting Coordinate Y axis of taskbar.
     * bottomRightX: Ending Coordinate X axis of taskbar.
     * bottomRightY: Ending Coordinate Y axis of taskbar.
     * imageBuffer: returns a base64 encoded string which needs to be converted to buffer to be written into image format.
     */
    static captureTaskbar(options) {
        return new Promise(function (resolve, reject) {
            resolve(commonMethod(options, "capture_taskbar.exe"));
        });
    }

    /**
     * This function finds the working area of the Windows Screen excluding the taskbar from the screenshot.
     *
     * @public
     * @static
     * @function
     * @param {Object} [options={}] The Options object
     * @param {Object} [options.ImageFormat=ImageFormat.PNG] Specifies the format type of the image.
     ** @return {Array} [array] An array which contains multiple JS objects. The JS object is made up of:
     * topLeftX: Starting Coordinate X axis of taskbar.
     * topLeftY: Starting Coordinate Y axis of taskbar.
     * bottomRightX: Ending Coordinate X axis of taskbar.
     * bottomRightY: Ending Coordinate Y axis of taskbar.
     * imageBuffer: returns a base64 encoded string which needs to be converted to buffer to be written into image format.
     */
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