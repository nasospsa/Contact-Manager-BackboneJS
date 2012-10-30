({
    appDir: "",
    baseUrl: "../scripts",
    dir: "build",
    paths: {
        'backbone' : 'libs/backbone-min',
        //'main': 'main-built'
    },
    shim:{
        'backbone': {
            deps: ['libs/jquery-1.7.1.min', 'libs/underscore-min'],
            exports: 'Backbone'
        }
    },
    deps: ['backbone'],
    modules: [
        {
            name: "main"
        }
    ]
})