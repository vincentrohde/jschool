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
            return this.getPreferredProfile();
        } else {
            return this.getPreferredProfile();
        }
    }

    getPreferredProfile() {
        this.preferenceProfile = {}
        this.preferenceProfile.style = this.getLearningStyle();
        this.preferenceProfile.difficulty = this.getBooleanPreferences('difficulty', 'hard');
        this.preferenceProfile.practicality =
            this.getBooleanPreferences('practicality', 'theoretical');
        this.preferenceProfile.dislikedTypes = this.getDislikedTypes();

        return this.preferenceProfile;
    }

    getLearningStyle() {
        if (this.preferenceData) {
            const dataObject = this.preferenceData.likes.style;
        }
        const onboardingData = JSON.parse(this.cookie.learningStyle);
        const onboardingStyle = onboardingData.style;

        // return onboardingStyle as default value
        if (typeof dataObject == 'undefined') {
            return onboardingStyle;
        }

        let dataObjectStylesList = [];

        Object.keys(dataObject).forEach(prop => {
            dataObjectStylesList.push({
                name: prop,
                count: dataObject[prop]
            });
        });

        dataObjectStylesList.forEach((item, index) => {
            if (item.name == onboardingStyle) {
                item.count = item.count * 1.5;
            }
        });

        // sort list descending
        dataObjectStylesList.sort((a, b) => b.count - a.count);

        if (dataObjectStylesList[0].count >= (dataObjectStylesList[1].count * 1.2)) {
            return dataObjectStylesList[0].name;
        } else {
            return onboardingStyle;
        }
    }

    getBooleanPreferences(dataObjectName, defaultValue) {
        let dataObject, dataObjectLength;

        if (this.preferenceData) {
            dataObject = this.preferenceData.likes[dataObjectName];
            dataObjectLength = Object.keys(dataObject).length;
        }

        // if empty or no comparison
        if (!this.preferenceData || dataObjectLength <= 1) {
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
    }

    getDislikedTypes() {
        if (!this.preferenceData) {
            return [];
        }

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