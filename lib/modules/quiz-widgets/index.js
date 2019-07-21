module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Quiz',
    addFields: [
        {
            name: 'question',
            label: 'Question',
            type: 'string'
        },
        {
            type: 'array',
            name: 'answers',
            label: 'Answers',
            schema: [
                {
                    name: 'answer',
                    label: 'Answer Option',
                    type: 'string'
                },
                {
                    type: 'boolean',
                    name: 'correct',
                    label: 'Correct Answer',
                    choices: [
                        {
                            value: true
                        }
                    ]
                }
            ]
        },
    ]
};