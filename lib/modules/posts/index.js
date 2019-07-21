const Preferences = require('../../../src/js/preferences/index.js');

module.exports = {
    extend: 'apostrophe-pieces',
    name: 'post',
    label: 'Post',
    pluralLabel: 'Posts',
    permissions: 'edit',
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
        },
        {
            name: '_author',
            idField: 'author',
            withType: 'author',
            type: 'joinByOne',
            filters: {
                projection: {
                    title: 1,
                    slug: 1,
                    type: 1,
                    tags: 1,
                    authorName: 1,
                    avatar: 1,
                }
            }
        },
    ],
    construct: function(self, options) {
        self.on('apostrophe-pages:beforeSend', 'fetchPosts', async function(req) {
            const preferences = new Preferences();
            const cookies = req.cookies;
            const tagPreferences = preferences.getFavoriteTags(cookies);

            console.log('tagPreferences: ', tagPreferences);

            if (tagPreferences && tagPreferences.length) {
                req.data.filteredPosts = await self.apos.docs.getManager('post')
                    .find(req)
                    .tags(tagPreferences)
                    // newest posts
                    .sort({ updatedAt: -1 })
                    .limit(5)
                    .toArray();
                console.log('req.data.filteredPosts: ', req.data.filteredPosts.tags);
            } else {
                req.data.filteredPosts = await self.apos.docs.getManager('post')
                    .find(req)
                    .sort({ updatedAt: -1 })
                    .limit(5)
                    .toArray();
            }
        });
    }
};