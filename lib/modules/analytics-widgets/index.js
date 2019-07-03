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
                    value: 'diverging'
                },
                {
                    label: 'Converging',
                    value: 'converging'
                },
                {
                    label: 'Assimilating',
                    value: 'assimilating'
                },
                {
                    label: 'Accommodating',
                    value: 'accommodating'
                }
            ]
        },
        {
            type: 'checkboxes',
            name: 'difficulty',
            label: 'Learning Difficulty',
            required: true,
            choices: [
                {
                    label: 'Easy',
                    value: 'easy'
                },
                {
                    label: 'Hard',
                    value: 'hard'
                }
            ]
        },
        {
            type: 'checkboxes',
            name: 'practicality',
            label: 'Learning Difficulty',
            required: true,
            choices: [
                {
                    label: 'Practical',
                    value: 'practical'
                },
                {
                    label: 'Theoretical',
                    value: 'theoretical'
                }
            ]
        }
    ]
};