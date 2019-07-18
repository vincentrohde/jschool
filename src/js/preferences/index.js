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

    getPreferences(cookieData) {
        this.cookie = cookieData;
        if (this.cookie.preferenceProfile) {
            this.preferenceData = JSON.parse(this.cookie.preferenceProfile);
            this.getPreferredStyle();
        }
    }

    getPreferredStyle() {
        this.preferenceProfile = {}
        this.preferenceProfile.style = '';
        this.preferenceProfile.difficulty = this.getBooleanPreferences('difficulty', 'hard');
        this.preferenceProfile.practicality =
            this.getBooleanPreferences('practicality', 'theoretical');
        this.preferenceProfile.dislikedTypes = this.getDislikedTypes();

        console.log(this.preferenceProfile);
    }

    getBooleanPreferences(dataObjectName, defaultValue) {
        const dataObject = this.preferenceData.likes[dataObjectName];
        const dataObjectLength = Object.keys(dataObject).length;

        // if empty or no comparison
        if (dataObjectLength <= 1) {
            return defaultValue;
        }

        let previousValue;
        const setValue = (name, value) => {
            previousValue = {
                name,
                value
            };
        }

        Object.keys(dataObject).forEach((prop) => {
            if (typeof previousValue === 'undefined') {
                setValue(prop, dataObject[prop]);
            } else {
                if (previousValue.value < dataObject[prop]) {
                    setValue(prop, dataObject[prop]);
                }
            }
        });

        console.log(previousValue);
    }

    getDislikedTypes() {
        const { type } = this.preferenceData.likes;
        let dislikedTypes = [];

        Object.keys(type).forEach((prop) => {
            if (Math.sign(type[prop]) === -1) {
                dislikedTypes.push(prop);
            }
        });

        return dislikedTypes;
    }
}

module.exports = Preferences;