class Preferences {
    constructor() {
        this.defaultDifficulty = 'hard';
    }

    getFavoriteTags(cookieData) {
        this.cookie = cookieData;
        if (this.cookie.favorites) {
            this.favoritesData = JSON.parse(this.cookie.favorites);
            this.favoriteTagsAll = this.favoritesData.map(item => item.tags);

            if (this.favoriteTagsAll) {
                const tagsByCount = this.sortFavoriteTags();
                const favoriteTagsByPopularity = tagsByCount.map(item => item.id);
                let selectedFavoriteTags;

                if (favoriteTagsByPopularity.length <= 3) {
                    selectedFavoriteTags = favoriteTagsByPopularity;
                } else {
                    selectedFavoriteTags = favoriteTagsByPopularity.slice(0, 3);
                }

                // return final list
                return selectedFavoriteTags;

            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    getPreferences(cookieData) {
        this.cookie = cookieData;
        if (this.cookie.preferenceProfile) {
            this.preferenceData = JSON.parse(this.cookie.preferenceProfile);
            this.getPreferredStyle();
        }
    }

    getPreferredStyle() {
        const { style } = this.preferenceData.likes;
        let styleRanking = [];

        // console.log('this.preferenceData: ', this.preferenceData);
        Object.keys(style).forEach((prop) => {
            console.log(prop);
            console.log(style[prop]);
        });
    }

    sortFavoriteTags() {
        const list = [];

        // count all tags by occurrence and push to list
        this.favoriteTagsAll.forEach(favoriteTag => {
            let occurredIndex;

            const findOccurrence = (element, index) => {
                if (element.id == favoriteTag[0]) {
                    occurredIndex = index;
                }

                return element.id == favoriteTag[0];
            }

            list.some(findOccurrence);

            if (typeof occurredIndex !== 'undefined') {
                list[occurredIndex].count++
            } else {
                list.push({
                    id: favoriteTag[0],
                    count: 1
                })
            }
        });

        // sort list by count numbers
        list.sort((a, b) => b.count - a.count);

        return list;
    }
}

module.exports = Preferences;