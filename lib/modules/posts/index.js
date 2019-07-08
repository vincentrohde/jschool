module.exports = {
    extend: 'apostrophe-pieces',
    name: 'post',
    label: 'Post',
    pluralLabel: 'Posts',
    addFields: [
        {
            name: 'title',
            label: 'Title',
            type: 'string',
            required: true
        },
        {
            name: 'description',
            label: 'Description',
            type: 'string',
            textarea: true,
            required: true
        },
        {
            type: 'attachment',
            name: 'postImage',
            label: 'Post Image'
        }
    ],
    construct: function(self, options) {
        self.on('apostrophe-pages:beforeSend', 'fetchPosts', async function(req) {
            const cookieData = req.cookies;
            req.data.filteredPosts = await self.apos.docs.getManager('post')
                .find(req)
                // TODO: Update for Analytics
                .search('physik')
                .sort({ updatedAt: -1 })
                .toArray();
        });
    }
};