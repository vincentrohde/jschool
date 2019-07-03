module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Text',
    addFields: [
        {
            name: 'title',
            type: 'string',
            label: 'Title'
        },
        {
            name: 'summary',
            label: 'Summary',
            type: 'area',
            options: {
                widgets: {
                    'apostrophe-rich-text': {}
                }
            }
        }
    ]
};