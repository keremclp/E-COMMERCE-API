// for not importing, default import
const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};