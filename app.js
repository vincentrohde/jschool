var path = require('path');

var apos = require('apostrophe')({
    shortName: 'jschool',
    modules: {
        'additional-widgets': {},
        'apostrophe-email': {
            // See the nodemailer documentation, many
            // different transports are available, this one
            // matches how PHP does it on Linux servers
            nodemailer: {
                sendmail: true,
                newline: 'unix',
                path: '/usr/sbin/sendmail'
            }
        },
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
        'apostrophe-signup': {
            // How long a signup email remains valid
            hours: 48,
            // Apostophe group newly signed-up users are added to,
            // with optional permissions
            group: {
                title: 'editor',
                permissions: [ 'edit-post', 'edit-attachment' ]
            },
            signupUrl: '/signup',
            signupConfirmUrl: '/signup-confirm',
            afterSignupUrl: '/',
            fields: [ 'firstName', 'lastName', 'username' ]
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
