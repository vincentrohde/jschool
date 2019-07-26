module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Exercises',
    addFields: [
        {
            type: 'array',
            name: 'exercises',
            label: 'Exercises',
            schema: [
                {
                    name: 'description',
                    label: 'Descccription',
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
        }
    ]
};