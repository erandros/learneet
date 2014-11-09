﻿exports.AjaxType = {
    GET: "GET",
    POST: "POST"
};

(function (article) {
    function WrapFieldWithId(fields, id) {
        return { title: fields.title, content: fields.content, id: id };
    }
    article.WrapFieldWithId = WrapFieldWithId;

    (function (create) {
        function url() {
            return '/api/create_article';
        }
        create.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        create.type = type;
    })(article.create || (article.create = {}));
    var create = article.create;

    (function (get) {
        function url() {
            return '/api/get';
        }
        get.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        get.type = type;
    })(article.get || (article.get = {}));
    var get = article.get;

    (function (getTitleWithId) {
        function url() {
            return '/api/gettitleandid';
        }
        getTitleWithId.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        getTitleWithId.type = type;
    })(article.getTitleWithId || (article.getTitleWithId = {}));
    var getTitleWithId = article.getTitleWithId;

    (function (getAll) {
        function url() {
            return '/api/getall';
        }
        getAll.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        getAll.type = type;
    })(article.getAll || (article.getAll = {}));
    var getAll = article.getAll;

    (function (update) {
        function url() {
            return '/api/update';
        }
        update.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        update.type = type;
    })(article.update || (article.update = {}));
    var update = article.update;

    (function (queryTitle) {
        function url() {
            return '/api/querytitle';
        }
        queryTitle.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        queryTitle.type = type;
    })(article.queryTitle || (article.queryTitle = {}));
    var queryTitle = article.queryTitle;

    (function (addDependency) {
        function url() {
            return '/api/adddependency';
        }
        addDependency.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        addDependency.type = type;
    })(article.addDependency || (article.addDependency = {}));
    var addDependency = article.addDependency;

    (function (getDependencies) {
        function url() {
            return '/api/getdependencies';
        }
        getDependencies.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        getDependencies.type = type;
    })(article.getDependencies || (article.getDependencies = {}));
    var getDependencies = article.getDependencies;

    (function (remDependency) {
        function url() {
            return '/api/remdependency';
        }
        remDependency.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        remDependency.type = type;
    })(article.remDependency || (article.remDependency = {}));
    var remDependency = article.remDependency;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (user) {
    (function (register) {
        function url() {
            return '/api/register';
        }
        register.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        register.type = type;
    })(user.register || (user.register = {}));
    var register = user.register;

    (function (auth) {
        function url() {
            return '/api/auth';
        }
        auth.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        auth.type = type;
        ;
    })(user.auth || (user.auth = {}));
    var auth = user.auth;
})(exports.user || (exports.user = {}));
var user = exports.user;

if (typeof customExports != 'undefined')
    customExports[getScriptName()] = exports;
//# sourceMappingURL=base-ajax.js.map
