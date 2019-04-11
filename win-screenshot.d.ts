interface TakeScreenShotOptions {
    imageFormat?: {
        BMP : "BMP",
        GIF : "GIF",
        JPEG : "JPEG",
        PNG : "PNG",
        TIFF : "TIFF"
    }
    coords?: {
        x1: number
        y1: number
        x2: number
        y2: number
    }
    path?: string
}

interface ImageFormatOptions   {
    imageFormat?: {
        BMP : "BMP",
        GIF : "GIF",
        JPEG : "JPEG",
        PNG : "PNG",
        TIFF : "TIFF"
    }
}

interface TakeReturnValues {
    writeStatus: boolean,
    buffer: string
}

interface AllWindowsReturnValues {
    processId: number,
    processHandle: number,
    processName: string,
    mainWindowTitle: string,
    mainWindowHandle: number,
    topLeftX: number,
    topLeftY: number,
    bottomRightX: number,
    bottomRightY: number,
    imageBuffer: string
}

interface CaptureTaskBarReturnValues {
    topLeftX: number,
    topLeftY: number,
    bottomRightX: number,
    bottomRightY: number,
    imageBuffer: string
}

declare module 'win-screenshot' {

    /**
     * The main class which acts as the core of module
     * containing two static functions for taking screenshots
     *
     * @public
     * @class
     */
    const Screenshot : {

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
         *  buffer: returns a base64 encoded string which needs to be converted to buffer to be written into image format.
         */
        take(options?: TakeScreenShotOptions): TakeReturnValues,

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
        allWindows(options?: ImageFormatOptions): AllWindowsReturnValues

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
        captureTaskBar(options?: ImageFormatOptions): CaptureTaskBarReturnValues
    };

    /**
     * A specialized enumeration version of Image Format Constants
     *
     * @public
     * @const
     * @returns {string} Returns `Image Format Name`.
     */
    const ImageFormat : {
        BMP : "BMP",
        GIF : "GIF",
        JPEG : "JPEG",
        PNG : "PNG",
        TIFF : "TIFF"
    }
}