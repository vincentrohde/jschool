module.exports = {
    afterConstruct: function (self) {
        // The styles are is compiled to
        // `lib/modules/assets/public/css/style.css` here
        self.pushAsset('stylesheet', 'style', { when: 'always' });
    }
};