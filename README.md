# Flashcards frontend
This is the back-end of a personnal full-stack project I am working on. It is written in **Typescript** using **React**. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and it uses the component library [Chakra UI](https://chakra-ui.com/).
You can see the app here : https://cranky-wilson-6ddd90.netlify.app/

## Setup
If you wish to install the app locally, follow these steps:
- Clone the app on your computer
- Add a .env file in the root of your project folder and add these lines:
```bash
REACT_APP_FLASK_PORT_DEV=5000
REACT_APP_FLASK_BACKEND_URL_DEV=http://127.0.0.1
```
- Install dependencies using
```bash
yarn install 
```
- Start the app with
```bash
yarn start
```

Open your browser at http://localhost:3000/ to see the result.
