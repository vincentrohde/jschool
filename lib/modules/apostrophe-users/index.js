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
            permissions: ['edit', 'edit-post', 'edit-attachment', 'admin-author']
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
        }
    ]
};
