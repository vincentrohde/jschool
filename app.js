var path = require('path');

var apos = require('apostrophe')({
    shortName: 'jschool',
    modules: {
        'apostrophe-search': {
            types: [
                'post'
            ],
            filters: [
                {
                    name: 'apostrophe-pages',
                    label: 'Posts'
                }
            ]
        },
        'apostrophe-templates': {
            viewsFolderFallback: path.join(__dirname, 'views'),
            types: [
                {
                    name: 'post',
                    label: 'Post'
                },
                {
                    name: 'home',
                    label: 'Home'
                },
            ]
        },
        'assets': {},
        'analytics-widgets': {},
        'context-widgets': {},
        'image-widgets': {},
        'text-widgets': {},
        'video-widgets': {},
    }
});
