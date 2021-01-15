const prodConfig = {
    apiKey           : "",
    authDomain       : "",
    databaseURL      : "",
    projectId        : "",
    storageBucket    : "",
    messagingSenderId: ""
};

const devConfig = {
    apiKey           : "",
    authDomain       : "",
    databaseURL      : "",
    projectId        : "",
    storageBucket    : "",
    messagingSenderId: ""
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
