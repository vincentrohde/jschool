// This configures the apostrophe-users module to add an admin-level
// group by default:
module.exports = {
    groups: [
        {
            title: 'guest',
            permissions: []
        },
        {
            title: 'editor',
            permissions: ['edit']
        },
        {
            title: 'admin',
            permissions: ['admin']
        }
    ],
    addFields:[
        {
            type: 'attachment',
            name: 'avatar',
            label: 'Avatar'
        },
        {
            name: '_post',
            type: 'joinByOneReverse',
            withType: 'post',
            label: 'Posts',
            idField: 'apostrophe-user',
            filters: {
                projection: {
                    title: 1,
                    slug: 1,
                    type: 1,
                    tags: 1,
                    postImage: 1,
                    description: 1
                }
            }
        }
    ]
};
