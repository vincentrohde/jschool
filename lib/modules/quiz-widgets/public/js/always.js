apos.define('quiz-widgets', {
    extend: 'apostrophe-widgets',
    construct: function (self, options) {
        self.play = function ($widget, data, options) {
            const answersArray = $widget.find('.answers');
            let userHasAnswered = false;

            $widget.on('click', function ({target}) {
                if (target.classList.contains('answer') && !userHasAnswered) {
                    userHasAnswered = true;

                    if (typeof target.dataset.correct !== 'undefined') {
                        target.classList.add('correct');
                    } else {
                        target.classList.add('wrong');
                        answersArray.find('[data-correct]')[0].classList.add('correct');
                    }
                }
            });
        };
    }
});