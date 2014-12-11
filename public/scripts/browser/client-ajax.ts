﻿import utils = require('./Utils');
import baseAjax = require('./../common/base-ajax');
import AjaxType = baseAjax.AjaxType;


export function buildAjax<ArgType, ReturnType>
(url: string, type: string, params: ArgType) {
    var obj = {p: JSON.stringify(params)};
    switch (type) {
    case AjaxType.GET:
        return $.get(url, obj); break;
    case AjaxType.POST:
        return $.post(url, obj); break;
    }
}

export module article {
    import baseGet = baseAjax.article.get;
    export function get(params: baseGet.ParamsType) 
    : JQueryXHR<baseGet.ReturnType> {
        return buildAjax(baseGet.url(), baseGet.type(), params);
    }

    import baseCreate = baseAjax.article.create;
    export function create(params: baseCreate.ParamsType) 
    : JQueryXHR<baseCreate.ReturnType> {
        return buildAjax(baseCreate.url(), baseCreate.type(), params);
    }

    import baseGetAll = baseAjax.article.getAll;
    export function getAll(params: baseGetAll.ParamsType) 
    : JQueryXHR<baseGetAll.ReturnType> {
        return buildAjax(baseGetAll.url(), baseGetAll.type(), params);
    }

    import baseUpdate = baseAjax.article.update;
    export function update(params: { article: {title: string; content: string; id: string}}) 
    : JQueryXHR<baseUpdate.ReturnType> {
        return buildAjax(baseUpdate.url(), baseUpdate.type(), params);
    }

    import baseQuery = baseAjax.article.queryTitle;
    export function query(params: baseQuery.ParamsType)
    : JQueryXHR<baseQuery.ReturnType> {
        return buildAjax(baseQuery.url(), baseQuery.type(), params);
    }

    import baseAddDep = baseAjax.article.addDependency;
    export function addDependency(params: baseAddDep.ParamsType)
    : JQueryXHR<baseQuery.ReturnType> {
        return buildAjax(baseAddDep.url(), baseAddDep.type(), params);
    }

    import baseGetDeps = baseAjax.article.getDependencies;
    export function getDependencies(params: baseGetDeps.ParamsType)
    : JQueryXHR<baseGetDeps.ReturnType> {
        return buildAjax(baseGetDeps.url(), baseGetDeps.type(), params)
    }

    import baseRemDep = baseAjax.article.remDependency;
    export function remDependency(params: baseRemDep.ParamsType)
    : JQueryXHR<baseRemDep.ReturnType> {
        return buildAjax(baseRemDep.url(), baseRemDep.type(), params);
    }

    import baseGetScore = baseAjax.article.getScore;
    export function getScore(params: baseGetScore.ParamsType)
    : JQueryXHR<baseGetScore.ReturnType> {
        return buildAjax(baseGetScore.url(), baseGetScore.type(), params);
    }    
}

export module proposal {
    import baseAddProp = baseAjax.proposal.add;
    export function add(params: baseAddProp.ParamsType)
    : JQueryXHR<baseAddProp.ReturnType> {
        return buildAjax(baseAddProp.url(), baseAddProp.type(), params);
    }

    import baseGetAll = baseAjax.proposal.getAll;
    export function getAll(params: baseGetAll.ParamsType)
    : JQueryXHR<baseGetAll.ReturnType> {
        return buildAjax(baseGetAll.url(), baseGetAll.type(), params);
    }
}

export module user {
    import baseRegister = baseAjax.user.register;
    export function register(params: baseRegister.ParamsType) 
    : JQueryXHR<baseRegister.ReturnType> {
        return buildAjax(baseRegister.url(), baseRegister.type(), params);
    }

    import baseAuth = baseAjax.user.auth;
    export function auth(params: baseAuth.ParamsType) 
    : JQueryXHR<baseAuth.ReturnType> {
        return buildAjax(baseAuth.url(), baseAuth.type(), params);
    }
}

