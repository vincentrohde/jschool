class Tracker {
    constructor() {
        this.cookieData = document.cookie;
        this.location = window.location.href;
        this.favoriteOption = document.querySelector('.jst_favorite');
        this.initializeTracker();
    }

    initializeTracker() {
        if (this.cookieData) {
            this.handleFavoriteState();
        }

        this.initializeEventListeners()
    }

    initializeEventListeners() {
        this.registerLikeEventHandler();
        this.registerFavoriteEventHandler();
    }

    handleFavoriteState() {

        const cookieString =
            document
                .cookie
                .replace(/(?:(?:^|.*;\s*)favorites\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        if (cookieString) {
            const cookieObject = JSON.parse(cookieString);

            const data = JSON.parse(this.favoriteOption.dataset.information);

            const postIsFavorite = cookieObject.map(e => e.id).indexOf(data.id);


            if (postIsFavorite > -1) {
                this.favoriteOption.classList.add('js-is-favorite');
            }
        }
    }

    registerFavoriteEventHandler() {
        if (this.favoriteOption) {
            this.favoriteOption.addEventListener('click', () => {

                const data = JSON.parse(this.favoriteOption.dataset.information);
                this.favoriteOption.classList.toggle('js-is-favorite');

                let isLike = true;

                if (!this.favoriteOption.classList.contains('js-is-favorite')) {
                    isLike = false;
                }

                this.setFavoritesCookie(data, isLike);
            });
        }
    }

    registerLikeEventHandler() {
        const likeOptions = document.querySelectorAll('.jst_likes');

        if (likeOptions) {
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

                        this.setPreferencesCookie('likes', data, isLike);

                        parent.removeChild(item);
                    }
                });
            });
        }
    }

    setPreferencesCookie(section, data, isLike) {
        const cookieName = 'preferenceProfile';

        let cookieObject;

        if (this.cookieExists(cookieName)) {
            const cookieString =
                document
                    .cookie
                    .replace(/(?:(?:^|.*;\s*)preferenceProfile\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            cookieObject = JSON.parse(cookieString);

            this.updateCookieObject(data, 'likes', cookieObject, isLike);
        } else {
            cookieObject = {
                likes: {}
            }

            this.updateCookieObject(data, 'likes', cookieObject, isLike);
        }

        this.setCookieFromObject(cookieName, cookieObject);
    }

    setFavoritesCookie(data, isLike) {

        const cookieName = 'favorites';
        let cookieObject;

        if (this.cookieExists(cookieName)) {
            const cookieString =
                document
                    .cookie
                    .replace(/(?:(?:^|.*;\s*)favorites\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            cookieObject = JSON.parse(cookieString);

        } else {
            cookieObject = [];
        }

        if (isLike) {
            cookieObject.push(data);
        } else {
            const indexToDelete = cookieObject.indexOf(data);
            if (indexToDelete) {
                cookieObject.splice(indexToDelete, 1);
            }
        }

        this.setCookieFromObject(cookieName, cookieObject);
    }

    updateCookieObject(data, section, cookieObject, isPositive) {

        const updateValue = isPositive ? 1 : - 1;

        // if cookie was not set before
        if (!(cookieObject[section])) {
            cookieObject[section] = {}
        }

        Object.keys(data).forEach(prop => {

            // if cookie was not set before
            if (!(cookieObject[section][prop])) {
                cookieObject[section][prop] = {};
            }

            // Reference to prop
            let attributesObject = cookieObject[section][prop];

            data[prop].forEach((propertyItem, index) => {
                let maximumPropertyItems;

                switch (prop) {
                    case 'style':
                        maximumPropertyItems = 4;
                        break;

                    case 'difficulty':
                    case 'practicality':
                        maximumPropertyItems = 2;
                        break;

                    default:
                        maximumPropertyItems = 4;
                        break;
                }

                // prevent update if all values of attribute are checked
                if (data[prop].length < maximumPropertyItems) {
                    if (attributesObject[propertyItem]) {
                        attributesObject[propertyItem] =
                            attributesObject[propertyItem] + 1 * updateValue;
                    } else {
                        attributesObject[propertyItem] = 1 * updateValue;
                    }
                }
            });
        });

        console.log('cookieObject: ', cookieObject);
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