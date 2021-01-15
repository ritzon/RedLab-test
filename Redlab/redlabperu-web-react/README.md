# Deploy in development

- git clone https://gitlab.com/redlabperu/redlabperu-web-react.git
- cd redlabperu-web-react
- yarn
- yarn start

# Deploy in production

- git clone https://gitlab.com/redlabperu/redlabperu-web-react.git
- cd redlabperu-web-react
- yarn run build
- npm install -g serve
- serve -s -p %PORT% build