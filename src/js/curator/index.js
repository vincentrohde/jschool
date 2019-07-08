class Curator {
    constructor() {}

    filterPostContent(input, preferences) {
        // set learning style for filtering
        this.preferences = preferences;

        const { body } = input.piece;

        let items = body.items;

        items.forEach((item, index) => {
            const { areaContext } = item;
            this.filterContentGroup(areaContext);
        });
    }

    filterContentGroup(contentGroup) {
        const { items } = contentGroup;

        this.filterForAttribute(items, 'style');

        // second iteration
        if (items.length > 1) {
            this.filterForAttribute(items, 'difficulty');
        }

        // third iteration
        if (items.length > 1) {
            this.filterForAttribute(items, 'practicality');
        }
    }

    filterForAttribute(items, attributeName) {
        items.forEach((item, index) => {
            // check if information widget exists for item
            if (item.information) {
                const information = item.information.items[0];

                // check if items were set for information
                if (information) {
                    const attributeList = information[attributeName];

                    if (attributeList) {
                        if (!this.isPreferredAttribute(attributeName, attributeList)) {
                            items.splice(index, 1);
                        }
                    }
                }
            }
        });
    }

    isPreferredAttribute(name, array) {
        return array.filter(item => item === this.preferences[name]).length;
    }
}

module.exports = Curator;