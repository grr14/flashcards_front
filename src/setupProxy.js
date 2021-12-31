// typescript not supported here
// https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually

const proxy = require("http-proxy-middleware")

const isDev = process.env.NODE_ENV === "development"

console.log("isDev =" + isDev.toString())

module.exports = (app) => {
  app.use(
    proxy("/api", {
      target: isDev
        ? `${process.env.REACT_APP_FLASK_BACKEND_URL_DEV}:${process.env.REACT_APP_FLASK_PORT_DEV}`
        : process.env.REACT_APP_FLASK_BACKEND_URL_PROD,
      changeOrigin: true,
      secure: true
    })
  )
  app.use(
    proxy("/deck", {
      target: isDev
        ? `${process.env.REACT_APP_FLASK_BACKEND_URL_DEV}:${process.env.REACT_APP_FLASK_PORT_DEV}`
        : process.env.REACT_APP_FLASK_BACKEND_URL_PROD,
      changeOrigin: true,
      secure: true
    })
  )
  app.use(
    proxy("/card", {
      target: isDev
        ? `${process.env.REACT_APP_FLASK_BACKEND_URL_DEV}:${process.env.REACT_APP_FLASK_PORT_DEV}`
        : process.env.REACT_APP_FLASK_BACKEND_URL_PROD,
      changeOrigin: true,
      secure: true
    })
  )
}
