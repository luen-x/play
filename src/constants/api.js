const api = {
  _HELLO: "/hello",
  _LOGIN: "/login"
};
const baseUrl = "http://localhost:3000";
for (let key in api) {
  api[key] = baseUrl + api[key];
}
export default api;
