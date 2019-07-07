module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Text',
    addFields: [
        {
            type: 'area',
            name: 'text',
            label: 'Text',
            options: {
                widgets: {
                    'apostrophe-rich-text': {
                        toolbar: ['Bold', 'Italic']
                    }
                }
            }
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