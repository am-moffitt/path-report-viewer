
import * as Constants from '../services/clientConstants';
// const sprintf = require('sprintf-js').sprintf;

export default class ClientUtil {

    /**
     * Log error message with datetime, as well as function name
     *
     * @param funcName
     * @param error
     * @returns {{errorFunction: *} & {message: *, statusCode: *}}
     */
    logError = (funcName, error) => {
        let errorObj = { errorFunction: this.getNullableValue(funcName) };
        if (this.isEmpty(error)) {
            errorObj = Object.assign({}, errorObj,
                {statusCode: '', message: 'error is NULL/undefined/empty.'});
        } else {
            errorObj = Object.assign({}, errorObj,
                {
                    statusCode: this.getNullableValue(error.statusCode),
                    message: this.getNullableValue(error.message)
                });
        }

        console.error((new Date()).toLocaleString() + ' !!!!!! ERROR: ' + JSON.stringify(errorObj));
        return errorObj;
    }

    /**
     * Log debugging message with datetime if REACT_APP_LOG_DEBUG_CLIENT (defined in file .env.development
     * or .env.production) or DEFAULT_LOG_DEBUG_CLIENT (defined in file clientConstants.js) = Yes
     *
     * @param debugMesg
     */
    logDebug = (debugMesg) => {
        let logDebug = this.isEmpty(process.env.REACT_APP_LOG_DEBUG_CLIENT) ?
                                    Constants.DEFAULT_LOG_DEBUG_CLIENT : process.env.REACT_APP_LOG_DEBUG_CLIENT;

        if (this.getBooleanByValue(logDebug, Constants.CLIENT_BOOLEAN_VALUES.true))
            console.log((new Date()).toLocaleString() + ' - DEBUG: ' + debugMesg);
    }

    /**
     *
     * @param warningMesg
     */
    logWarning = (warningMesg) => {
        console.warn((new Date()).toLocaleString() + ' - WARNING: ' + warningMesg);
    }

    /**
     * Log info message with datetime
     *
     * @param infoMesg
     */
    logInfo = (infoMesg) => {
        console.info((new Date()).toLocaleString() + ' - INFO: ' + infoMesg);
    }

    /**
     * Check if a variable is undefined, NULL, or empty.
     * Return true if value = undefined, null, '', [], {}
     * Otherwise return false
     *
     * @param value
     * @returns {boolean|boolean}
     */
    isEmpty = (value) => {
        return (
            // null or undefined
            (value == null) || (typeof value === "undefined") ||

            // has length and it's zero
            (value.hasOwnProperty('length') && value.length === 0) ||

            // is an Object and has no keys
            (value.constructor === Object && Object.keys(value).length === 0) ||

            // is an empty or blank string
            (typeof value === 'string' && value.trim().length === 0)
        )
    }

    /**
     * Parse the http response error from calling component and return an error object.
     *
     * @param error
     * @param compName
     * @returns {{}|{message: string}}
     */
    handleHttpError = (error, compName) => {
        if (this.isEmpty(error)) {
            this.logError('clientUtil.handleHttpError()', {message: 'error is undefined/NULL/empty.'});
            return {};
        }

        let funcName = 'clientUtil.handleHttpError()' + (this.isEmpty(compName) ? '' : ' --- ' + compName);
        let retErrObj = {message: {error: this.getNullableValue(error.message)}};
        let errObj = {};

        try {
            if (!this.isEmpty(error.response)) {
                // The request was made and the server responded with a status code != 2XX
                errObj = {
                    message: error.response.data,
                    statusCode: error.response.status,
                    errorHeader: error.response.headers
                };

                if (!this.isEmpty(error.response.data) && !this.isEmpty(error.response.data.error)) {
                    retErrObj.message.error = JSON.stringify(error.response.data.error);
                }
            } else if (!this.isEmpty(error.request)) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                errObj = {errorRequest: error.request};
            } else {
                // Something happened in setting up the request that triggered an Error
                errObj = {message: error.message};
            }
            // return Object.assign(retErrObj, errObj, {errorConfig: error.config});
            // Object.assign(retErrObj, errObj, {errorConfig: error.config});
            Object.assign(errObj, {errorConfig: error.config});
            this.logError(funcName,  {message: JSON.stringify(errObj)});
        } catch (error) {
            this.logError(funcName + ' --- catch', error.message);
            // return Object.assign(retErrObj, error);
            // Object.assign(retErrObj, error);
        }

        this.logError(funcName, retErrObj);
        return retErrObj;
    }

    /**
     * Return true if inValue != NULL and trueValue != NULL and inValue === trueValue regardless case.
     *
     * @param inValue
     * @param trueValue
     * @returns {boolean}
     */
    getBooleanByValue = (inValue, trueValue) => {
        if (this.isEmpty(inValue) || this.isEmpty(trueValue))
            return false;
        else
            return inValue.toString().toUpperCase() === trueValue.toString().toUpperCase();
    }
}