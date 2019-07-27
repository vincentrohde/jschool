class Tracker {
    constructor() {
        this.cookieData = document.cookie;
        this.location = window.location.href;
        this.favoriteOption = document.querySelector('.jst_favorite');
        this.onboarding = document.querySelector('.jst_onboarding');
        this.onboardingIsActive = false;
        this.learningStyleCookieName = 'learningStyle';
        this.initializeTracker();
    }

    initializeTracker() {
        if (this.cookieData) {
            if (this.favoriteOption) {
                this.handleElementState('favorites', this.favoriteOption);
            }

            if (!this.cookieExists(this.learningStyleCookieName)) {
                this.initializeOnboarding();
            }

        } else {
            this.initializeOnboarding();
        }

        this.initializeEventListeners()
    }

    initializeEventListeners() {
        if (this.onboardingIsActive) {
            this.registerLearningStyleEventHandler();
            this.registerOnboardingScrollHandler();
        }

        this.registerLikeEventHandler();
        this.registerFavoriteEventHandler();
    }

    initializeOnboarding() {
        this.onboarding.classList.add('active');
        this.onboardingIsActive = true;
    }

    handleElementState(cookieName, element) {

        const regString = '(?:(?:^|.*;\\s*)' + cookieName + '\\s*\\=\\s*([^;]*).*$)|^.*$';
        const reg = new RegExp(regString);

        const cookieString =
            document
                .cookie
                .replace(reg, "$1");

        if (cookieString) {
            const cookieObject = JSON.parse(cookieString);

            if (cookieName == 'favorites') {
                const data = JSON.parse(element.dataset.information);

                const postIsFavorite = cookieObject.map(e => e.id).indexOf(data.id);


                if (postIsFavorite > -1) {
                    element.classList.add('js-is-favorite');
                }
            }

            if (cookieName == 'votes') {
                const id = element.dataset.id;

                const elementHasVote = cookieObject.indexOf(id);

                if (elementHasVote > -1) {
                    element.remove();
                }
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

                this.setListCookie(data, isLike, 'favorites');
            });
        }
    }

    registerLearningStyleEventHandler() {
        const form = this.onboarding.querySelector('.learning-styles');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const value = form.querySelector(':checked').value;
            const cookieObject = {
                style: value
            }
            this.setCookieFromObject(this.learningStyleCookieName, cookieObject);

            this.onboarding.remove();
        });
    }

    registerOnboardingScrollHandler() {
        const scrollContainer = this.onboarding.querySelector('.js-style-cards');
        const scrollPositions = [0.00, 0.33, 0.67, 1.00];
        const dots = this.onboarding.querySelectorAll('.js-dots input');
        let prevSelect;

        scrollContainer.addEventListener('scroll', e => {
            const checkInput = (index) => {
                if (prevSelect) {
                    prevSelect.checked = false;
                }
                dots[index].checked = true;
                prevSelect = dots[index];
            };

            let scrollPercentage = scrollContainer.scrollLeft /
                (scrollContainer.scrollWidth-scrollContainer.clientWidth);

            scrollPercentage = scrollPercentage.toFixed(2);

            if (scrollPercentage == 0) {
                checkInput(0);
            }

            if (scrollPercentage == 0.33) {
                checkInput(1);
            }

            if (scrollPercentage == 0.67) {
                checkInput(2);
            }

            if (scrollPercentage == 1) {
                checkInput(3);
            }

            // console.log('scrollPercentage: ', scrollPercentage);
        });
    }

    registerLikeEventHandler() {
        const likeOptions = document.querySelectorAll('.jst_likes');

        if (likeOptions) {

            likeOptions.forEach((item) => {
                this.handleElementState('votes', item);
            });

            likeOptions.forEach((item) => {
                item.addEventListener('click', (e) => {

                    const { target } = e;

                    if (target.classList.contains('js-like') ||
                        target.classList.contains('js-dislike')) {

                        const parent = item.parentNode;
                        const data = this.getDataAttributes(item);
                        let isLike = true;

                        if (target.classList.contains('js-dislike')) {
                            isLike = false;
                        }

                        this.setListCookie(data.id[0], true, 'votes');

                        delete data.id;

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

    setListCookie(data, isLike, cookieName) {

        let cookieObject;

        if (this.cookieExists(cookieName)) {
            const regString = '(?:(?:^|.*;\\s*)' + cookieName + '\\s*\\=\\s*([^;]*).*$)|^.*$';
            const reg = new RegExp(regString);

            const cookieString =
                document
                    .cookie
                    .replace(reg, "$1");
            cookieObject = JSON.parse(cookieString);
            console.log('data : ', data);
            console.log('cookieObject: ', cookieObject);

        } else {
            console.log('cookieName: ', cookieName);
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