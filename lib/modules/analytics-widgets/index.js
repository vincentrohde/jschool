module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Analytics',
    addFields: [
        {
            type: 'checkboxes',
            name: 'style',
            label: 'Learning Style',
            required: true,
            choices: [
                {
                    label: 'Diverging',
                    value: '1'
                },
                {
                    label: 'Converging',
                    value: '2'
                },
                {
                    label: 'Assimilating',
                    value: '3'
                },
                {
                    label: 'Accommodating',
                    value: '4'
                }
            ]
        }
    ]
};