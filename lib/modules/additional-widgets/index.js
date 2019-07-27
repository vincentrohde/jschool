module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Additional',
    addFields: [
        {
            type: 'array',
            name: 'additionalInformation',
            label: 'Additional Information',
            schema: [
                {
                    name: 'url',
                    type: 'url',
                    label: 'URL',
                    required: true
                },
                {
                    name: 'title',
                    label: 'Title',
                    type: 'string',
                    required: true
                }
            ]
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