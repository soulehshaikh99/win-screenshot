interface CaptureByCoordinatesOptions {
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
}

interface ImageFormatOptions {
    imageFormat?: {
        BMP : "BMP",
        GIF : "GIF",
        JPEG : "JPEG",
        PNG : "PNG",
        TIFF : "TIFF"
    }
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

interface ScreenshotReturnValues {
    topLeftX: number,
    topLeftY: number,
    bottomRightX: number,
    bottomRightY: number,
    imageBuffer: string
}

declare module 'win-screenshot' {

    /**
     * The main class which acts as the core of module
     * containing 5 static functions for taking screenshots
     *
     * @public
     * @class
     */
    const Screenshot : {

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
        captureAllWindows(options? : ImageFormatOptions) : AllWindowsReturnValues[];

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
        captureByCoordinates(options? : CaptureByCoordinatesOptions) : string;

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
        captureFullScreen(options? : ImageFormatOptions) : ScreenshotReturnValues;

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
        captureTaskbar(options? : ImageFormatOptions) : ScreenshotReturnValues;

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
        captureWorkingArea(options? : ImageFormatOptions) : ScreenshotReturnValues;
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