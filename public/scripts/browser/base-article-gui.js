var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var url = require("./../common/url");
var Gui = require("./gui");

var ArticleGui = require("./article-gui");
var EditArticleGui = require("./edit-article-gui");
var ChangeGui = require("./change-gui");

var BaseArticleGui = (function (_super) {
    __extends(BaseArticleGui, _super);
    function BaseArticleGui() {
        _super.call(this);
        var _self = this;
        window.onpopstate = function () {
            console.log('pop state');
            _self.viewTransition(location.pathname, true);
        };
        $.get(url.article.partials()).done(function (res) {
            $(document).ready(function () {
                $("#main").append(res);

                subGui.main.jq[1].remove();
            });
        });
    }
    BaseArticleGui.prototype.viewTransition = function (urlToGo, isBack) {
        var before = performance.now();
        $("#main *").unbind();
        console.log(performance.now() - before);
        var _self = this;
        if (!isBack)
            history.pushState({}, '', urlToGo);

        $(".partial").hide();
        var partials = [
            {
                re: url.article.get('\\d+'),
                gui: function () {
                    return new ArticleGui({});
                },
                sel: '.article.partial' },
            {
                re: url.article.edit('\\d+'),
                gui: function () {
                    return new EditArticleGui({});
                },
                sel: '.edit-article-partial' },
            {
                re: url.change.get('\\d+', '\\d+'),
                gui: function () {
                    return new ChangeGui();
                },
                sel: '.change.partial' }
        ];
        partials.forEach(function (partial) {
            var match = location.pathname.match('^' + partial.re + '$');
            if (match) {
                subGui = partial.gui();
            }
        });
    };
    return BaseArticleGui;
})(Gui);

if (guiName == 'BaseArticleGui') {
    gui = new BaseArticleGui();
}

module.exports = BaseArticleGui;
//# sourceMappingURL=base-article-gui.js.map
