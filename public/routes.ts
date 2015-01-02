﻿/*
 * GET home page.
 */
import url = require('./scripts/common/url');
import express = require('express');
import db = require('./scripts/server/db');

function renderCb(url: string, title: string, 
	fn? : (req: express.Request, res: express.Response) => void) {
    return function (req: any, res: express.Response) {
        console.log('Is it logged? ' + req.isAuthenticated());
    	if (fn != null) fn(req, res);	
        else res.render(url, { title: title + ' - Learneet' });
    };
}

export function set(app) {
    app.get('/', renderCb('index', 'Express'));
    app.get('/browse', renderCb('browse', 'Browse'));
    app.get(url.article.get(), (req: express.Request, res: express.Response) => {
        var id = req.params.id;
        db.hget('article:' + id, 'title')
        .then(title => {
            res.render('article', { 
                onClickAddProposal: "location.href = '" + url.proposals.add(id) + "';",
                viewProposalsUrl: url.proposals.getAll(id),
                id: id,
                title: title + ' - Learneet',
                edit_url: url.article.edit(id)
            });
        });
    });
    app.get(url.article.create(), renderCb('create_article', 'Create Article'));
    app.get(url.article.edit(), (req, res) => {
        var id = req.params.id;
        db.hget('article:' + id, 'title')
        .then(title => {
            res.render('edit_article', { 
                url: url.article.edit(id), id: id, title: title + ' - Learneet'
            });
        }); 
    });
    app.get(url.article.partials(), renderCb('partials/partials-article', ''))
    app.get(url.change.get(), renderCb('change', ''));
    app.get(url.proposals.add(), (req, res) => {
        var id = req.params.id;
        db.hget('article:' + id, 'title')
        .then(title => {
            res.render('add_proposal', { 
                url: url.article.edit(id), 
                id: id, 
                title: title + ' - Learneet'
            });
        }); 
    })
    app.get(url.proposals.getAll(), (req, res) => {
        res.render('proposals', {id: req.params.id});
    })
    app.get('/login', renderCb('login', 'Login'));
    app.get(url.user.register(), renderCb('register', 'Register'));
    app.get('/register_finished', renderCb('register_finished', 'Register Finished'));
}

/*export function index(req: express.Request, res: express.Response) {
    res.render('index', { title: 'Express' });
};*/