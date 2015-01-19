var db = require('./db');
var keys = require('./redis-keys');

function isOk(err, reject) {
    if (err) {
        reject(err);
        return false;
    } else
        return true;
}

function notOkObj(reason) {
    return {
        ok: false,
        why: reason
    };
}
exports.notOkObj = notOkObj;

function okObj(obj) {
    return {
        ok: true,
        why: '',
        result: obj
    };
}
exports.okObj = okObj;
function add(args) {
    debugger;
    var dependent = args.dependent;
    var dependency = args.dependency;
    return db.sadd(keys.dependenciesIdSet(args), args.dependency.id).then(function (res) {
        return exports.upScore(args);
    }).then(function (res) {
        return exports.okObj(true);
    });
}
exports.add = add;

function upScore(args) {
    var user = '1';
    return db.sadd(keys.dependencyScoreUserSet(args), user).then(function (res) {
        return db.hmset(keys.dependency(args), { score: '1', starred: 'false' });
    });
}
exports.upScore = upScore;

function removeScore(args) {
    var user = '1';
    return db.del(keys.dependencyScoreUserSet(args), keys.dependency(args));
}
exports.removeScore = removeScore;

function getAll(args) {
    var deps = [];
    var dependent = args.dependent;
    return db.sort(keys.dependenciesIdSet(args), 'by', 'nosort', 'GET', keys.article({ article: { id: '*->id' } }), 'GET', keys.article({ article: { id: '*->title' } }), 'GET', keys.dependency({ dependent: { id: dependent.id }, dependency: { id: '*->score' } }), 'GET', keys.dependency({ dependent: { id: dependent.id }, dependency: { id: '*->starred' } })).then(function (array) {
        debugger;
        while (array.length > 0) {
            var id = array.shift();
            var title = array.shift();
            var score = array.shift();
            var starred = array.shift();
            deps.push({ id: id, title: title, score: score, starred: starred });
        }
        return exports.okObj(deps);
    });
}
exports.getAll = getAll;

function getCurrentUserScore(args) {
    return db.sismember(keys.dependencyScoreUserSet(args), "1").then(function (isMember) {
        var found = ((isMember) ? true : false);
        return exports.okObj({ score: found });
    });
}
exports.getCurrentUserScore = getCurrentUserScore;

function changeStarState(args, state) {
    var _state = (state ? 'true' : 'false');
    return db.hmset(keys.dependency(args), { starred: _state }).then(function (res) {
        if (!res)
            return exports.notOkObj('Couldn\'t change the starred state');
        else
            return exports.okObj(res);
    });
}

function star(args) {
    return changeStarState(args, true);
}
exports.star = star;

function unstar(args) {
    return changeStarState(args, false);
}
exports.unstar = unstar;

function remove(args) {
    var dependent = args.dependent;
    var dependency = args.dependency;
    return db.srem(keys.dependenciesIdSet(args), dependency.id).then(function (res) {
        return exports.removeScore(args);
    }).then(function (res) {
        return exports.okObj(res == '1');
    });
}
exports.remove = remove;
//# sourceMappingURL=dependencies.js.map
