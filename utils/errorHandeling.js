function success(data, message) {
  return {
    status: true,
    message: message || "",
    data: data || [],
  };
}
function error(message, data) {
  return {
    status: false,
    message: message || "",
    data: data || [],
  };
}
module.exports = { success, error };
