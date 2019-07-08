class Preferences {
    constructor() {
        this.defaultDifficulty = 'hard';
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
}

module.exports = Preferences;