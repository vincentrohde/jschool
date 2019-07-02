var path = require('path');

var apos = require('apostrophe')({
    shortName: 'jschool',

    // See lib/modules for basic project-level configuration of our modules
    // responsible for serving static assets, managing page templates and
    // configuring user accounts.

    modules: {
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
        'analytics-widgets': {},
        'video-widgets': {},
    }
});
