var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");

var RenderedArticle = require('./templates/rendered-article');

var Gui = require("./gui");
var url = require("./../common/url");
var Arrows = require('./utils/score-arrow');

var ChangeGui = (function (_super) {
    __extends(ChangeGui, _super);
    function ChangeGui() {
        var _this = this;
        _super.call(this);
        this.title = this.propertize('.title', 'html');
        this.description = this.propertize('.description', 'html');
        this.state = this.propertize('.state.octicon');
        this.date = this.propertize('.date', 'html');
        this.acceptBtn = this.propertize('button.accept');
        this.articleCrumb = this.propertize('.article-crumb');
        this.article = { id: "-1" };
        this.change = { id: "-1" };
        this.parseURL();
        var changeCb = ajax.changes.get({ article: this.article, change: this.change });
        this.renderedArticle = new RenderedArticle();
        var _self = this;
        $(document).ready(function () {
            _self.articleCrumb.transitionURL(url.article.get(_this.article.id));
            _self.changeScore = new Arrows.ChangeScore(_this.article, _this.change);
            changeCb.done(function (res) {
                var change = res.result.change;
                var article = res.result.article;
                _self.description.val = change.description;

                _self.date.val = change.date;
                var state = '';
                if (change.state == 'open')
                    state = 'octicon-issue-opened';
                if (change.state == 'close')
                    state = 'octicon-issue-closed';
                _self.state.jq.addClass(state);

                var changed = JsDiff.applyPatch(article.content, change.changes);
                var diff = JsDiff.diffChars(article.content, changed);

                var diffed = '';
                diff.forEach(function (part) {
                    var cls = part.added ? 'diff added' : part.removed ? 'diff removed' : null;
                    diffed += cls ? "<span class='" + cls + "'>" + part.value + '</span>' : part.value;
                });
                _self.renderedArticle.setContent(diffed);
                _self.renderedArticle.setTitle(article.title);
            });
        });
    }
    ChangeGui.prototype.getEditBtn = function () {
        return $("#editBtn");
    };
    ChangeGui.prototype.setCrumb = function () {
    };
    ChangeGui.prototype.parseURL = function () {
        var re = url.change.get('(\\d+)', '(\\d+)');
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.article.id = matches[1];
        this.change.id = matches[2];
    };
    return ChangeGui;
})(Gui);

module.exports = ChangeGui;
//# sourceMappingURL=change-gui.js.map
