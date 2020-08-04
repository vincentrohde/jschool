const Curator = require('../../../src/js/curator/index.js');
const Preferences = require('../../../src/js/preferences/index.js');

module.exports = {
    types: [
        {
            name: 'home',
            label: 'Home'
        },
        {
            name: 'post',
            label: 'Post'
        },
        {
            name: 'posts-page',
            label: 'Posts'
        },
        {
            name: 'apostrophe-users-page',
            label: 'Users'
        }
    ],
    construct: function(self, options) {
        // Apostrophe Promise Event
        self.on('apostrophe-pages:beforeSend', 'printData',function(req) {
            const preferences = new Preferences();
            const curator = new Curator();

            const cookies = req.cookies;

            const type = typeof req.data.page !== 'undefined'
                ? req.data.page.type
                : '';
            let res = req.data;

            const isPost = req.data.piece;

            // check if user can edit the requested page
            let editMode;

            if (req.user && isPost) {
                editMode = req.data.piece.editUsersIds[0] === req.user._id;

                if (req.data.piece['apostrophe-user']) {
                    if (req.data.piece['apostrophe-user'] === req.user._id) {
                        editMode = true;
                    }
                }

            } else {
                editMode = false;
            }

            if (type == 'posts-page' && !(editMode) && isPost) {
                const pref = preferences.getPreferences(cookies);

                curator.filterPostContent(res, pref);
            }
        });
    }
};
