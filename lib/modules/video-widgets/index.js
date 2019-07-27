module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Video',
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
        },
        {
            name: 'description',
            label: 'Description',
            type: 'string',
            textarea: true,
            required: true
        },
        {
            type: 'singleton',
            name: 'information',
            widgetType: 'analytics',
            label: 'Information',
            required: true
        }
    ]
};