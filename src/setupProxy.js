// typescript not supported here
// https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually

const proxy = require("http-proxy-middleware")

const isDev = process.env.NODE_ENV === "development"

console.log("isDev =" + isDev.toString())

module.exports = (app) => {
  app.use(
    proxy("/api", {
      target: isDev
        ? `http://127.0.0.1:${process.env.REACT_APP_FLASK_PORT}`
        : process.env.REACT_APP_FLASK_BACKEND_URL,
      changeOrigin: true,
      secure: true,
    })
  )
}
