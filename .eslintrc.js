module.exports = {
  "ecmaFeatures": {
    "jsx": true,
    "modules": true
  },
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 2,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
  "extends": "airbnb",
};
