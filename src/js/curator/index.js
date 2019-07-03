module.exports = (function () {

    // const createCopy = (original) => {
    //     return
    // }

    const filterPostContent = (input) => {
        const { body } = input.page;

        body.items.forEach((item, index) => {
            const { type } = item;

            if (type == '') {
                body.items.splice(index, 1);
            }
        });

        body.items.forEach((item) => {
            console.log('### item: ', item);
        });
    }

    return {
        filterPostContent
    }

})();