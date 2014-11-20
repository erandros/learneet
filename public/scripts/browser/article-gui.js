﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clientAjax = require("./client-ajax");

var RenderedArticle = require('./templates/rendered-article');
var Gui = require("./gui");
var url = require("./../common/url");

var ArticleGui = (function (_super) {
    __extends(ArticleGui, _super);
    function ArticleGui() {
        _super.call(this);
        this.id = "-1";
        this.addProposalBtn = this.propertize("button#addProposal");
        var _self = this;
        $(document).ready(function () {
            _self.dependenciesTemplate = _self.propertize("#dependencies-template");
            _self.article = new RenderedArticle();
            _self.id = $("[type=hidden]#article-id").val();
            clientAjax.article.get({ article: { id: _self.id } }).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                _self.article.title.val = result.title;
                _self.article.content.val = marked(result.content);
            });
            clientAjax.article.getDependencies({
                article: { id: _self.id }
            }).done(function (res) {
                var deps = res.result;
                var length = deps.length;
                for (var i = 0; i < length; i++) {
                    deps[i].url = url.article.get(deps[i].id);
                }
                var template = _self.dependenciesTemplate.jq.html();
                Mustache.parse(template);
                var rendered = Mustache.render(template, { deps: deps });
                _self.dependenciesTemplate.jq.after(rendered);
            });
            _self.getEditBtn().click(function () {
                _self.redirect(url.article.edit(_self.id));
            });
            _self.addProposalBtn.jq.click(function () {
                _self.redirect(url.proposals.add(_self.id));
            });
        });
    }
    ArticleGui.prototype.getEditBtn = function () {
        return $("#editBtn");
    };
    return ArticleGui;
})(Gui);
exports.ArticleGui = ArticleGui;

if (guiName == 'ArticleGui') {
    gui = new ArticleGui();
}
//# sourceMappingURL=article-gui.js.map
