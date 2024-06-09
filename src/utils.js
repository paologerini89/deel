const buildResponse = (res, status, message) => {
  if (!message) {
    return res.status(status).end();
  }
  return res.status(status).json({ message });
};

const resUnathorized = (res, message) => {
  return buildResponse(res, 401, message);
};

const resForbidden = (res, message) => {
  return buildResponse(res, 403, message);
};

const resNotFound = (res, message) => {
  return buildResponse(res, 404, message);
};

const resInternalServerError = (res, message) => {
  return buildResponse(res, 500, message);
};

module.exports = {
  resUnathorized,
  resForbidden,
  resNotFound,
  resInternalServerError,
};
