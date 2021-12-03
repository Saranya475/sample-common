const error_codes = require('./error_codes.js');
const logger = require("../config/logger").getLogger;

const setHeaders = (req, axiosInstance, isGet = false) => {
  const ignoreHeaders = ['host'];
  axiosInstance.defaults.headers = {}; // setting headers empty.
  logger.info("Request headers from client :: ", req.headers);
  for (headerOne in req.headers) {
    var setHeader = (ignoreHeaders.indexOf(headerOne) === -1) ? (axiosInstance.defaults.headers[headerOne] = req.headers[headerOne]) : '';
  }
  const removeContentTypeHeader = (req.method === "GET" || isGet) ? removeHeaders(axiosInstance.defaults.headers, ['content-length']) : '';
  logger.info("setHeaders :: axios headers :: sending to MS ::", axiosInstance.defaults.headers);
}

const removeHeaders = (headers, ignoreHeadersList) => {
  ignoreHeadersList.map(oneHeader => {
    delete headers[oneHeader];
  })
}

const sendResponse = (resp, responseObj) => {
  logger.info("sendResponse :: headers from MS :: ", responseObj.headers);
  const setRespHeaders = responseObj.headers ? resp.set(responseObj.headers) : '';
  resp.removeHeader('transfer-encoding'); // Removing header.
  logger.info("sendResponse :: headers sending to client :: ", resp.getHeaders());
  return resp.status(responseObj.status).json(responseObj.data);
}

const sendErrorResponse = (error, next, defaultStatus = 500, defaultMessage = "Internal Server Error") => {
  const message = (error) ? getErrorMessage(error) : defaultMessage;
  const status = (defaultStatus !== 500) ? defaultStatus :
    (
      (error && error.response && error.response.status) ? (error.response.status) : (defaultStatus)
    );
  const respHeaders = (error && error.response && error.response.headers) ? error.response.headers : null;
  const removeContentTypeHeader = (respHeaders) ? removeHeaders(respHeaders, ['transfer-encoding', 'content-length']) : '';
  const errorObj = {
    status: status,
    message: message,
    headers: respHeaders
  }
  logger.error("sendErrorResponse :: errorObj ", errorObj);
  return next(errorObj);
}


const getErrorMessage = (error) => {
  var code = 500;
  if (error.response && error.response.data && error.response.data.errorCode) {
    code = error.response.data.errorCode;
  } else if (error.response && error.response.data && error.response.data.status) {
    code = error.response.data.status;
  } else if (error.response && error.response.status) {
    code = error.response.status
  }

  if (error_codes[code]) {
    message = { statusCode: code, message: error_codes[code] };
  } else if (error.response && error.response.data && error.response.data.exception) {
    message = { statusCode: code, message: error.response.data.exception };
  } else if (error.response && error.response.data && error.response.data.message) {
    message = { statusCode: code, message: error.response.data.message };
  } else if (error.message) {
    message = { statusCode: code, message: error.message };
  } else {
    message = { statusCode: code, message: error };
  }
  return message;
}

const getEvents = () => {
  return {
    PAYMENT: 'com.edge.event.payment:initiate'
  }
}

module.exports = {
  getEvents: getEvents,
  setHeaders: setHeaders,
  sendResponse: sendResponse,
  sendErrorResponse: sendErrorResponse,
}
