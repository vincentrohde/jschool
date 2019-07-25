class Curator {
    constructor() {}

    filterPostContent(input, preferences) {
        // set learning style for filtering
        this.preferences = preferences;

        const { body } = input.piece;

        if (body) {
            let items = body.items;

            items.forEach((item, index) => {
                const { areaContext } = item;
                this.filterContentGroup(areaContext);
            });
        } else {
            return;
        }
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

        // type iteration if items still contains items
        if (items.length) {
            this.filterForAttribute(items, 'dislikedTypes');
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
                        if (attributeName == 'dislikedTypes') {
                            if (this.isPreferredAttribute(attributeName, attributeList)) {
                                // remove from list
                                items.splice(index, 1);
                            }
                        } else {
                            if (!this.isPreferredAttribute(attributeName, attributeList)) {
                                // remove from list
                                items.splice(index, 1);
                            }
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