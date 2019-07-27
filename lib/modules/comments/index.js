// code by Stuart Romanek
// https://github.com/stuartromanek/apostrophe-comment-system

module.exports = {
    name: 'comments',
    extend: 'apostrophe-pieces',
    label: 'Comments',
    pluralLabel: 'Comments',
    addFields: [
        {
            type: 'array',
            name: 'comments',
            label: 'Comments',
            schema: [
                {
                    name: 'comment',
                    label: 'Comment',
                    type: 'string'
                },
                {
                    name: 'user',
                    label: 'User',
                    type: 'string'
                }
            ]
        },
    ],
    construct: function (self, options) {
        // add route for adding new comments
        self.route('post', 'comment', function (req, res) {
            self.apos.modules['comments'].find(req, {_id: req.body.pieceId}).toArray(function (err, docs) {

                if (!req.user) {
                    return;
                }

                var comment = {
                    _id: self.apos.utils.generateId(),
                    comment: req.body.comment,
                    user: req.user.username
                }

                docs.forEach(function (doc) {
                    doc.comments.push(comment);
                    self.apos.modules['comments'].update(req, doc, function () {
                        return res.json({status: 'okay'});
                    })
                })
            });
        });
    }
};