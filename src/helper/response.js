const resp = (status=false, response="") => {
  return status
    ? {
        status: "success",
        response:
          typeof response == "string" && response.length === 0 ? {} : response,
      }
    : {
        status: "error",
        response:
          typeof response == "string" && response.length === 0 ? {} : response,
      };
}

module.exports = {
  resp
}