const path = require('path');

const apos = require('apostrophe')({
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
        'apostrophe-db': {
            uri: process.env.APOS_MONGODB_URI
        },
        'apostrophe-pages': {
            park: [
                {
                    title: 'Search',
                    slug: '/search',
                    type: 'apostrophe-search',
                    label: 'Search',
                    published: true
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
        'exercises-widgets': {},
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
