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
        // testing of pre render filter
        self.on('apostrophe-pages:beforeSend', 'printData',function(req) {
            const { type, body } = req.data.page;
            let res = req.data;

            if (type == 'post') {
                body.items.forEach((item, index) => {
                    const { type } = item;

                    if (type == 'video') {
                        res.page.body.items.splice(index, 1);
                    }
                });

                console.log('### type: ', type);
                body.items.forEach((item) => {
                    console.log('### item: ', item);
                });
            }

            return res;
        });
    }
};
