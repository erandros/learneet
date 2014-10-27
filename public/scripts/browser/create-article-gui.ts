﻿import utils = require("./Utils");
import clientAjax = require("./client-ajax");
import PreviewableArticle = require("./previewable-article");
import Gui = require("./gui");
import url = require("./../common/url")

class CreateArticleGui extends Gui {
    previewArticle: PreviewableArticle;
    constructor() {
        super();
        var _self = this;
        $(document).ready(function () {
            _self.previewArticle = new PreviewableArticle();
            $("#create").click(() => {
                console.log('Trying to create: ');
                var article = _self.previewArticle.getArticle();
                console.log(article);
                new clientAjax.article.Create().ajax(article)
                .done(function(res) {
                    var id = res.result.id;
                    _self.redirect(url.article.get(id));
                });
            });
        })
    }
}
declare var guiName;
if (guiName == 'CreateArticleGui') {
    new CreateArticleGui();
}