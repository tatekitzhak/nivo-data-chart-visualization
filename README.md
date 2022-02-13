This is an example project for setting up react to handle cross origin resource sharing (CORS) while in development. The project accesses the latest XKCD comic from the endpoint https://xkcd.com/info.0.json.
            
This request would normally be blocked by the browser, however using the proxy setting within the package.json tells react to setup a proxy server that allows us to access resources on different origins. Note, this only works in development (using npm start) more details can be found within the react docs.
                   
https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development