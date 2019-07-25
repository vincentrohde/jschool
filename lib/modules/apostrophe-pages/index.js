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

            const { type } = req.data.page;
            let res = req.data;

            const isPost = req.data.piece;

            // check if user can edit the requested page
            let editMode;

            if (req.user) {
                editMode = req.user._permissions.edit;
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
