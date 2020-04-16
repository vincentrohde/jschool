module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Image',
    addFields: [
        {
            type: 'area',
            name: 'image',
            label: 'Image',
            options: {
                widgets: {
                    'apostrophe-images': {}
                }
            }
        },
        {
            name: 'title',
            type: 'string',
            label: 'Title',
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