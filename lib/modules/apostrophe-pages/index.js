const curator = require('../../../src/js/curator/index.js');

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
            const { type } = req.data.page;

            // prevent data loss, by creating a copy
            let res = {...req.data};

            if (type == 'post') {
                res = curator.filterPostContent(res);
            }

            return res;
        });
    }
};
