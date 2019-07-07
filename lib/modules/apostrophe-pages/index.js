const Curator = require('../../../src/js/curator/index.js');

module.exports = {
    types: [
        {
            name: 'home',
            label: 'Home'
        },
        {
            name: 'post',
            label: 'Post'
        }
    ],
    construct: function(self, options) {
        // Apostrophe Promise Event
        self.on('apostrophe-pages:beforeSend', 'printData',function(req) {
            const curator = new Curator();
            const learningStyle = 'diverging';
            const preferences = {
                style: 'diverging',
                difficulty: 'easy',
                practicality: 'practical'
            }

            const { type } = req.data.page;

            let res = req.data;
            let editMode;

            // check if user can edit the requested page
            if (req.user) {
                editMode = req.user._permissions.edit;
            } else {
                editMode = false;
            }

            if (type == 'post' && !(editMode)) {
                curator.filterPostContent(res, preferences);
            }
        });
    }
};
