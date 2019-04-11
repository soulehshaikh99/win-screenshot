const { spawnSync } = require('child_process');
const os = require('os');
const fs = require('fs');

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
    GIF: "GIF",
    BMP: "BMP"
};

/**
 * The main class which acts as the core of module
 * containing two static functions for taking screenshots
 *
 * @public
 * @class
 */
class Screenshot {

    /**
     * This function can be used to take screenshot of a specific region if the coordinates are specified or
     * it takes the screenshot of fullscreen.
     *
     * @public
     * @static
     * @function
     * @param {Object} [options={}] The options object.
     * @param {ImageFormat} [options.imageFormat=ImageFormat.PNG] Specifies the format type of the image.
     * @param {object} [options.coords={}] The Coordinates object
     * @param {number} [options.coords.x1] The Top Left X coordinate
     * @param {number} [options.coords.y1] The Top Left Y coordinate
     * @param {number} [options.coords.x2] The Bottom Right X coordinate
     * @param {number} [options.coords.y2] The Bottom Right Y coordinate
     * @param {string} [options.path] The absolute path where to save the screenshot.
     *  It must contains both the parent directory and file name along with its extension.
     *  @return {Array} It return an array containing :
     *  writeStatus: returns true if the path parameter was specified and file was written successfully.
     *  buffer: buffered value of the screenshot.
     */
    static take(options)    {
        if (options)    {
            let imageFormat = (options.imageFormat) ? options.imageFormat : "PNG";
            if (options.coords) {
                let coords = options.coords;
                let x1 = coords.x1;
                let x2 = coords.x2;
                let y1 = coords.y1;
                let y2 = coords.y2;
                if (x1 >= 0 && y1 >= 0 && x2 >= 0 && y2 >= 0) {
                    return commonMethod1(options.path, `${__dirname}\\libs\\screenshot_coordinates.exe ${x1} ${y1} ${x2} ${y2} ${imageFormat}`);
                } else {
                    throw new Exception("Missing coordinate values or negative coordinates received.")
                }
            }
            else  {
                return commonMethod1(options.path, `${__dirname}\\libs\\screenshot_fullscreen.exe ${imageFormat}`);
            }
        }
    };

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
    static allWindows(options)  {
        return commonMethod2(options, "get_all_windows_data.exe");
    }

    /**
     * This function returns coordinates of taskbar and its image buffer encoded in base64 string format.
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
    static captureTaskBar(options) {
        return commonMethod2(options, "capture_taskbar.exe");
    }
}

/**
 * Common Method for take function
 *
 * @private
 * @function
 * @param {string} [path] Specifies the format type of the image.
 * @param {string} [command] Specifies the inter-process call command i.e. executable name with appropriate arguments
 * @return {Array} It return an array containing :
 * writeStatus: returns true if the path parameter was specified and file was written successfully.
 * buffer: returns a base64 encoded string which needs to be converted to buffer to be written into image format.
 */
function commonMethod1(path, command) {
    const tempFile = `${os.tmpdir()}\\temp1.png`;
    const process = spawnSync('cmd.exe', ["/c", `${command} ${tempFile}`]);
    if (process.status === 0)   {
        let buffer = fs.readFileSync(tempFile);
        let status = [];
        fs.unlinkSync(tempFile);
        if (path)   {
            fs.writeFileSync(path, buffer);
            status['writeStatus'] = (fs.existsSync(path));
        }
        status['buffer'] = buffer;
        return {...status};
    } else  {
        return new Exception('Process failed due to an unknown error!'); 
    }
}

/**
 * Common Method for allWindows and captureTaskBar function
 *
 * @private
 * @function
 * @param {Object} [options={}] The Options object
 * @param {Object} [options.imageFormat=ImageFormat.PNG] Specifies the format type of the image.
 * @param {string} [programName] Specifies the program name for inter-process communication call.
 * @return {Array} It return an array containing the appropriate JS Object parsed from JSON data fetched from executable.
 */
function commonMethod2(options, programName)    {
    if (options) {
        let child = spawnSync("cmd.exe", ["/c", `${__dirname}\\libs\\${programName} ${options.imageFormat}`]);
        return JSON.parse(child.stdout.toString());
    } else {
        throw new Exception("Missing parameter format name { PNG, JPEG, GIF, BMP, TIFF}");
    }
}

module.exports = {
    Screenshot,
    ImageFormat
};
