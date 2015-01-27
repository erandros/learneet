import Gui = require("./../gui");
import url = require('./../../common/url');

declare var headerName;
declare var userId;

var base = '#rightHeader ';

class LoggedHeaderGui extends Gui {
    avatar = this.propertize(base + '#avatar');
    avatarImg = this.propertize(base + '#avatar img');
    constructor() {
        super();
        var _self = this;
        $(document).ready(() => {
            //_self.redirect('/');
            _self.avatar.transitionURL(url.user.edit(userId));
        });
    }
}

export = LoggedHeaderGui;