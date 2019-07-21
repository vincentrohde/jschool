module.exports = {
    extend: 'apostrophe-pieces',
    name: 'author',
    label: 'Author',
    pluralLabel: 'Authors',
    addFields: [
        {
            name: 'authorName',
            label: 'Name',
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
            name: 'avatar',
            label: 'Avatar',
            required: true
        },
        {
            name: '_post',
            type: 'joinByOneReverse',
            withType: 'post',
            label: 'Posts',
            idField: 'author',
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