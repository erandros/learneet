var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clientAjax = require("./client-ajax");
var PreviewableArticle = require("./templates/previewable-article");
var Gui = require("./gui");

var validate = require('./../common/validate');

var AddProposalGui = (function (_super) {
    __extends(AddProposalGui, _super);
    function AddProposalGui() {
        _super.call(this);
        this.id = "-1";
        this.proposeBtn = this.propertize('button#propose');
        this.changesDescription = this.propertize("#changesDescription", "val");
        var _self = this;
        $(document).ready(function () {
            _self.changesDescription = _self.propertize("#changesDescription", "val");
            _self.article = new PreviewableArticle();
            _self.id = $("[type=hidden]#article-id").val();
            _self.article.fetchDBArticle({ id: _self.id }).then(function () {
                _self.oldStr = _self.article.input.content.val;
            });
            _self.proposeBtn.jq.click(function () {
                var description = _self.changesDescription.val;
                var its = validate.version.changesDescription(description);
                if (!its.ok) {
                    var api = _self.changesDescription.jq.qtip({
                        content: { text: its.because },
                        show: { when: false, ready: true },
                        position: { my: 'top left', at: 'bottom center' },
                        hide: false
                    });
                    setTimeout(api.qtip.bind(api, 'destroy'), 5000);
                    return;
                }
                clientAjax.proposal.add({ proposal: {
                        article: { id: _self.id },
                        description: _self.changesDescription.val,
                        modifiedContent: _self.article.input.content.val
                    } });
            });
        });
    }
    AddProposalGui.prototype.saveArticle = function () {
    };
    return AddProposalGui;
})(Gui);
exports.AddProposalGui = AddProposalGui;

if (guiName == 'AddProposalGui') {
    gui = new AddProposalGui();
}
//# sourceMappingURL=add-proposal-gui.js.map
