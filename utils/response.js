/**
 * Send a success response
 * @param {object} res - Express response object
 * @param {number} statusCode
 * @param {string} message
 * @param {object|array} data
 */
// TODO: add documentation
export const sendSuccess = (res, statusCode = 200, message = "Success", data = null) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 * @param {object} res - Express response object
 * @param {number} statusCode
 * @param {string} message
 * @param {object} errors - optional field errors
 */
// TODO: add documentation
export const sendError = (res, statusCode = 500, message = "Something went wrong", errors = null) => {
  const response = { success: false, message };
  if (errors !== null) response.errors = errors;
  return res.status(statusCode).json(response);
};