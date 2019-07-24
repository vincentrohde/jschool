var path = require('path');

var apos = require('apostrophe')({
    shortName: 'jschool',
    modules: {
        'additional-widgets': {},
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
        'apostrophe-users': {},
        'authors': {},
        'authors-pages': {
            extend: 'apostrophe-pieces-pages'
        },
        'assets': {},
        'analytics-widgets': {},
        'comments': {},
        'comments-widgets': {},
        'context-widgets': {},
        'image-widgets': {},
        'posts': {},
        'posts-pages': {
            extend: 'apostrophe-pieces-pages'
        },
        'quiz-widgets': {},
        'text-widgets': {},
        'video-widgets': {},
    }
});
