class Tracker {
    constructor() {
        this.cookieData = document.cookie;
        this.location = window.location.href;
        this.initializeTracker();
    }

    initializeTracker() {
        if (this.cookieData) {
            this.cookieExists('favorites');
            this.cookieExists('learningStyle');
        }
    }

    initializeEventListeners() {}

    cookieExists(name) {
        // taken from https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
        return document.cookie.split(';').filter((item) => item.trim().startsWith(name + '=')).length;
    }
};

let tracker = new Tracker();