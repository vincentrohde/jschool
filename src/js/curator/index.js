class Curator {
    constructor() {
        this.learningStyles = ['accommodating', 'assimilating', 'converging', 'diverging'];
        this.score = this.createScoreArray();
    }

    createScoreArray() {
        let score = [];

        this.learningStyles.forEach((item) => {
            let scoreObject = {};
            scoreObject.style = item;
            scoreObject.score = 0;

            score.push(scoreObject);
        });

        return score;
    }

    // set total learning style score
    setTotalLearningStylesScore(items) {
        this.totalLearningStylesScore = [...this.score];

        let array = []

        items.forEach((item) => {
            console.log('item');
            const { style } = item.information.items[0];

            console.log(style.length);

            // items with all styles should not be filtered out

            if (style.length != 4 && style.length != 0) {
                style.forEach((item) => {
                    console.log('style: ', item);
                });
            }

        })
    }

    filterPostContent(input, style) {
        // set learning style for filtering
        this.style = style;

        const { body } = input.page;
        let items = body.items;

        this.setTotalLearningStylesScore(items);

        // items.forEach((item, index) => {
        //     const { type } = item;
        //
        //     // remove item from render process
        //     if (type == '') {
        //         items.splice(index, 1);
        //     }
        // });
        //
        // items.forEach((item) => {
        //     console.log('### item: ', item);
        // });
    }
}

module.exports = Curator;

// module.exports = (function () {
//     const learningStyles = ['accommodating', 'assimilating', 'converging', 'diverging'];
//
//     const createScoreObject = () => {
//         let score = [];
//
//         learningStyles.forEach((item) => {
//             let scoreObject = {};
//             scoreObject.style = item;
//             scoreObject.score = 0;
//
//             score.push(scoreObject);
//         });
//
//         return score;
//     }
//
//     const filterPostContent = (input) => {
//         let score = createScoreObject();
//
//         const { body } = input.page;
//
//         body.items.forEach((item, index) => {
//             const { type } = item;
//
//             // remove item from render process
//             if (type == '') {
//                 body.items.splice(index, 1);
//             }
//         });
//
//         // body.items.forEach((item) => {
//         //     console.log('### item: ', item);
//         // });
//     }
//
//     return {
//         filterPostContent
//     }
//
// })();