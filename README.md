# Getting Started GitHub Pages

`npm install gh-pages --save-dev`

Add an homepage field with its value to be the string http://{username}.github.io/{repo-name}, where {username} is your GitHub username, and {repo-name} is the name of the GitHub

`"homepage": "https://myusername.github.io/guide-react-gh-pages",`

Update the existing scripts field with the following:

```
"scripts": {
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
"start": "react-scripts start",
"build": "react-scripts build",
}
```
