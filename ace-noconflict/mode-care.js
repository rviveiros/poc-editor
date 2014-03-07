ace.define('ace/mode/care', function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
// defines the parent mode
var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;

// defines the language specific highlighters and folding rules
var MyNewHighlightRules = require("./highlight_rules").MyNewHighlightRules;
var MyNewFoldMode = require("./folding").MyNewFoldMode;

var Mode = function() {
    // set everything up
    this.HighlightRules = MyNewHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new MyNewFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    // configure comment start/end characters
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    
    // special logic for indent/outdent. 
    // By default ace keeps indentation of previous line
    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);
        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };
    
    // create worker for live syntax checking
    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/mynew_worker", "NewWorker");
        worker.attachToDocument(session.getDocument());
        worker.on("errors", function(e) {
            session.setAnnotations(e.data);
        });
        return worker;
    };
    
}).call(Mode.prototype);

exports.Mode = Mode;
});

ace.define('ace/mode/care/highlight_rules', function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;


var colors = lang.arrayToMap(
    ("aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|" +
    "purple|red|silver|teal|white|yellow").split("|")
);

var fonts = lang.arrayToMap(
    ("arial|century|comic|courier|garamond|georgia|helvetica|impact|lucida|" +
    "symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|" +
    "serif|monospace").split("|")
);


var MyNewHighlightRules = function() {

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
   this.$rules = {
        "start" : [
            {
                token: "lista1", // String, Array, or Function: the CSS token to apply
                regex: /\b(eu|vc|ele|nos)\b/ //, // String or RegExp: the regexp to match
                //next:  <next>   // [Optional] String: next state to enter
            },
            {
                token : "constant.language.boolean",
                regex : /(?:true|false)\b/
            },
            {
                token: function(value) {
                    if (colors.hasOwnProperty(value.toLowerCase())) {
                        return "support.constant.color";
                    }
                    else if (fonts.hasOwnProperty(value.toLowerCase())) {
                        return "support.constant.fonts";
                    }
                    else {
                        return "text";
                    }
                },
                regex: "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"
            }
        ]
    };
};

oop.inherits(MyNewHighlightRules, TextHighlightRules);

exports.MyNewHighlightRules = MyNewHighlightRules;

});

ace.define('ace/mode/care/folding', define(function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    // regular expressions that identify starting and stopping points
    this.foldingStartMarker; 
    this.foldingStopMarker;

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);

        // test each line, and return a range of segments to collapse
    };

}).call(FoldMode.prototype);

