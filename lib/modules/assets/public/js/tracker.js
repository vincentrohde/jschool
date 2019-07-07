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

        this.initializeEventListeners()
    }

    initializeEventListeners() {
        this.registerLikeEventHandler();
    }

    registerLikeEventHandler() {
        const likeOptions = document.querySelectorAll('.jst_likes');

        likeOptions.forEach((item) => {
            item.addEventListener('click', (e) => {

                const { target } = e;

                if (target.classList.contains('js-like') || target.classList.contains('js-dislike')) {
                    const parent = item.parentNode;
                    const data = this.getDataAttributes(item);
                    let isLike = true;

                    if (target.classList.contains('js-dislike')) {
                        isLike = false;
                    }

                    this.setPreferencesCookie(isLike, data);

                    parent.removeChild(item);
                }
            });
        });
    }

    setPreferencesCookie(isLike, data) {
        const section = isLike ? 'likes' : 'dislikes';
        const cookieName = 'preferenceProfile';

        let cookieObject;

        if (this.cookieExists(cookieName)) {
            const cookieString =
                document
                    .cookie
                    .replace(/(?:(?:^|.*;\s*)preferenceProfile\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            cookieObject = JSON.parse(cookieString);

            this.updateCookieObject(data, section, cookieObject);
        } else {
            cookieObject = {
                likes: {},
                dislikes: {}
            }

            this.updateCookieObject(data, section, cookieObject);
        }

        console.log('cookieObject: ', cookieObject);

        this.setCookieFromObject(cookieName, cookieObject);
    }

    updateCookieObject(data, section, cookieObject) {
        Object.keys(data).forEach(prop => {

            // if cookie was not set before, otherwise it would remove data
            if (!(cookieObject[section][prop])) {
                cookieObject[section][prop] = {}
            }

            let attributesObject = cookieObject[section][prop];

            data[prop].forEach((propertyItem, index) => {
                if (attributesObject[propertyItem]) {
                    attributesObject[propertyItem] = attributesObject[propertyItem] + 1;
                } else {
                    attributesObject[propertyItem] = 1;
                }
            });
        });
    }

    setCookieFromObject(name, cookieObject) {
        document.cookie = name + '=' + JSON.stringify(cookieObject);
    }

    getDataAttributes(item) {
        const { dataset } = item;
        let data = {};

        Object.keys(dataset).forEach(prop => {
            if (dataset[prop].length > 0) {
                // separate for multiple values in prop
                // ex: styles: diverging, converging, ..
                data[prop] = dataset[prop].split(',');
            }
        });

        return data;
    }

    cookieExists(name) {
        // Source:
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
        return document.cookie.split(';').filter((item) => item.trim().startsWith(name + '=')).length;
    }
};

let tracker = new Tracker();