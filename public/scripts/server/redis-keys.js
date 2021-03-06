function j(array) {
    return array.join(":");
}
exports.j = j;

function baseArticles() {
    return "articles";
}
exports.baseArticles = baseArticles;
function article(args) {
    return exports.j([exports.baseArticles(), args.article.id]);
}
exports.article = article;
function articlesIdCounter() {
    return exports.j([exports.baseArticles(), "idCounter"]);
}
exports.articlesIdCounter = articlesIdCounter;
function articlesIdSet() {
    return exports.j([exports.baseArticles(), "idSet"]);
}
exports.articlesIdSet = articlesIdSet;

function articleUpScore(args) {
    return exports.j([exports.baseArticles(), args.article.id, 'score', 'up']);
}
exports.articleUpScore = articleUpScore;
function articleDownScore(args) {
    return exports.j([exports.baseArticles(), args.article.id, 'score', 'down']);
}
exports.articleDownScore = articleDownScore;

function changesBase(args) {
    return exports.j([exports.article(args), 'changes']);
}
exports.changesBase = changesBase;
function change(args) {
    return exports.j([exports.changesBase(args), args.change.id]);
}
exports.change = change;
function changeUpScore(args) {
    return exports.j([exports.change(args), 'score', 'up']);
}
exports.changeUpScore = changeUpScore;
function openedChangesSet(args) {
    return exports.j([exports.changesBase(args), 'openedIdSet']);
}
exports.openedChangesSet = openedChangesSet;
function closedChangesSet(args) {
    return exports.j([exports.changesBase(args), 'closedIdSet']);
}
exports.closedChangesSet = closedChangesSet;
function changesIdSet(args) {
    return exports.j([exports.changesBase(args), 'idSet']);
}
exports.changesIdSet = changesIdSet;
function changesIdCounter(args) {
    return exports.j([exports.changesBase(args), 'idCounter']);
}
exports.changesIdCounter = changesIdCounter;

function baseDependencies(args) {
    return exports.j([exports.article({ article: { id: args.dependent.id } }), 'dependencies']);
}
exports.baseDependencies = baseDependencies;
function dependency(args) {
    return exports.j([exports.baseDependencies(args), args.dependency.id]);
}
exports.dependency = dependency;
function dependencyScoreUserSet(args) {
    return exports.j([exports.dependency(args), 'UserScoreSet']);
}
exports.dependencyScoreUserSet = dependencyScoreUserSet;
function dependenciesIdCounter(args) {
    return exports.j([exports.baseDependencies(args), "idCounter"]);
}
exports.dependenciesIdCounter = dependenciesIdCounter;
function dependenciesIdSet(args) {
    return exports.j([exports.baseDependencies(args), "idSet"]);
}
exports.dependenciesIdSet = dependenciesIdSet;

function usersBase() {
    return "users";
}
exports.usersBase = usersBase;
function user(args) {
    return exports.j([exports.usersBase(), args.user.id]);
}
exports.user = user;
function usersIdSet() {
    return exports.j([exports.usersBase(), 'idSet']);
}
exports.usersIdSet = usersIdSet;
function usersIdCounter() {
    return exports.j([exports.usersBase(), 'idCounter']);
}
exports.usersIdCounter = usersIdCounter;
function usernamesSets(args) {
    return exports.j(['usernames', args.user.username]);
}
exports.usernamesSets = usernamesSets;
//# sourceMappingURL=redis-keys.js.map
