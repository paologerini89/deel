const resUnathorized = (res) => {
  res.status(401).end();
};

const resForbidden = (res) => {
  res.status(403).end();
};

const resNotFound = (res) => {
  res.status(404).end();
};

module.exports = {
  resUnathorized,
  resForbidden,
  resNotFound,
};
