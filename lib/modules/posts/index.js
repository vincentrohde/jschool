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
    ]
};