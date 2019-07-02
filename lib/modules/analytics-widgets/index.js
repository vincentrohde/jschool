module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Analytics',
    addFields: [
        {
            name: 'url',
            type: 'url',
            label: 'URL',
            required: true
        },
        {
            name: 'title',
            type: 'string',
            label: 'Title',
            required: true
        }
    ]
};