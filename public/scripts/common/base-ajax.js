﻿exports.AjaxType = {
    GET: "GET",
    POST: "POST"
};

(function (_article) {
    function WrapFieldWithId(fields, id) {
        return { article: { title: fields.article.title, content: fields.article.content, id: id } };
    }
    _article.WrapFieldWithId = WrapFieldWithId;

    (function (create) {
        function url() {
            return '/api/create_article';
        }
        create.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        create.type = type;
    })(_article.create || (_article.create = {}));
    var create = _article.create;

    (function (get) {
        function url() {
            return '/api/get';
        }
        get.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        get.type = type;
    })(_article.get || (_article.get = {}));
    var get = _article.get;

    (function (getTitleWithId) {
        function url() {
            return '/api/gettitleandid';
        }
        getTitleWithId.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        getTitleWithId.type = type;
    })(_article.getTitleWithId || (_article.getTitleWithId = {}));
    var getTitleWithId = _article.getTitleWithId;

    (function (getAll) {
        function url() {
            return '/api/getall';
        }
        getAll.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        getAll.type = type;
    })(_article.getAll || (_article.getAll = {}));
    var getAll = _article.getAll;

    (function (update) {
        function url() {
            return '/api/update';
        }
        update.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        update.type = type;
    })(_article.update || (_article.update = {}));
    var update = _article.update;

    (function (queryTitle) {
        function url() {
            return '/api/querytitle';
        }
        queryTitle.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        queryTitle.type = type;
    })(_article.queryTitle || (_article.queryTitle = {}));
    var queryTitle = _article.queryTitle;

    (function (addDependency) {
        function url() {
            return '/api/adddependency';
        }
        addDependency.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        addDependency.type = type;
    })(_article.addDependency || (_article.addDependency = {}));
    var addDependency = _article.addDependency;

    (function (getDependencies) {
        function url() {
            return '/api/getdependencies';
        }
        getDependencies.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        getDependencies.type = type;
    })(_article.getDependencies || (_article.getDependencies = {}));
    var getDependencies = _article.getDependencies;

    (function (remDependency) {
        function url() {
            return '/api/remdependency';
        }
        remDependency.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        remDependency.type = type;
    })(_article.remDependency || (_article.remDependency = {}));
    var remDependency = _article.remDependency;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (proposal) {
    (function (add) {
        function url() {
            return '/api/add_proposal';
        }
        add.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        add.type = type;
    })(proposal.add || (proposal.add = {}));
    var add = proposal.add;
})(exports.proposal || (exports.proposal = {}));
var proposal = exports.proposal;

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
