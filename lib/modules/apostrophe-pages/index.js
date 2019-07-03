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

            const { type } = req.data.page;

            // prevent data loss, by creating a copy
            let res = {...req.data};

            if (type == 'post') {
                curator.filterPostContent(res, 'converging');
                console.log(curator.score);
            }

            return res;
        });
    }
};
