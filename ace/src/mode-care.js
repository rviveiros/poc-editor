//ace.define('ace/mode/care', function(require, exports, module) {
//"use strict";

//var oop = require("../lib/oop");
//// defines the parent mode
//var TextMode = require("./text").Mode;
//var Tokenizer = require("../tokenizer").Tokenizer;
////var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;

//// defines the language specific highlighters and folding rules
//var MyNewHighlightRules = require("ace/mode/care/highlight_rules").MyNewHighlightRules;
////var MyNewFoldMode = require("ace/mode/care/folding").FoldMode;

//var Mode = function() {
//    // set everything up
//    this.HighlightRules = MyNewHighlightRules;
//    //this.$outdent = new MatchingBraceOutdent();
//    //this.foldingRules = new MyNewFoldMode();
//};
//oop.inherits(Mode, TextMode);

//(function() {
//    // configure comment start/end characters
//    this.lineCommentStart = "//";
//    this.blockComment = {start: "/*", end: "*/"};
    
//    // special logic for indent/outdent. 
//    // By default ace keeps indentation of previous line
//    this.getNextLineIndent = function(state, line, tab) {
//        var indent = this.$getIndent(line);
//        return indent;
//    };

//    this.checkOutdent = function(state, line, input) {
//        return this.$outdent.checkOutdent(line, input);
//    };

//    this.autoOutdent = function(state, doc, row) {
//        this.$outdent.autoOutdent(doc, row);
//    };
    
//    // create worker for live syntax checking
//    //this.createWorker = function(session) {
//    //    var worker = new WorkerClient(["ace"], "ace/mode/mynew_worker", "NewWorker");
//    //    worker.attachToDocument(session.getDocument());
//    //    worker.on("errors", function(e) {
//    //        session.setAnnotations(e.data);
//    //    });
//    //    return worker;
//    //};
    
//}).call(Mode.prototype);

//exports.Mode = Mode;
//});

//ace.define('ace/mode/care/highlight_rules', function(require, exports, module) {
//"use strict";

//var oop = require("../lib/oop");
//var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

//var MyNewHighlightRules = function() {

//    // regexp must not have capturing parentheses. Use (?:) instead.
//    // regexps are ordered -> the first match is used
//   this.$rules = {
//        "start" : [
//            {
//                token: "lista1", // String, Array, or Function: the CSS token to apply
//                regex: /\b(eu|vc|ele|nos)\b/ //, // String or RegExp: the regexp to match
//                //next:  <next>   // [Optional] String: next state to enter
//            }
//        ]
//    };
//};

//oop.inherits(MyNewHighlightRules, TextHighlightRules);

//exports.MyNewHighlightRules = MyNewHighlightRules;

//});



define('ace/mode/care', function (require, exports, module) {

    var oop = require("../lib/oop");
    // defines the parent mode
    var TextMode = require("./text").Mode;
    var Tokenizer = require("../tokenizer").Tokenizer;
    
    // defines the language specific highlighters and folding rules
    var CareHighlightRules = require("ace/mode/care_highlight_rules").CareHighlightRules;
    //var MyNewFoldMode = require("./folding/mynew").MyNewFoldMode;

    var Mode = function () {
        this.$tokenizer = new Tokenizer(new CareHighlightRules().getRules());
        this.HighlightRules = CareHighlightRules;

    };
    oop.inherits(Mode, TextMode);

    (function () {

        this.getNextLineIndent = function(state, line, tab) {
            console.log("Estado HL:" + state + " Linha:" + line);
        };

        // configure comment start/end characters
        this.lineCommentStart = "//";
        this.blockComment = { start: "/*", end: "*/" };

        // create worker for live syntax checking
        // TODO: TRABALHAR NO WORKER
        //this.createWorker = function (session) {
        //    var worker = new WorkerClient(["ace"], "ace/mode/mynew_worker", "NewWorker");
        //    worker.attachToDocument(session.getDocument());
        //    worker.on("errors", function (e) {
        //        session.setAnnotations(e.data);
        //    });
        //    return worker;
        //};


    }).call(Mode.prototype);

    exports.Mode = Mode;
});

define('ace/mode/care_highlight_rules', function (require, exports, module) {

    var oop = require("ace/lib/oop");
    //var TextHighlightRules = require("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules;
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    var CareHighlightRules = function() {

        this.$rules = {
            "start" : [
                {
                    token: "comment",
                    regex: "(lista1|vc|eu|ele|nos)"
                },
                {
                    token: "string",
                    regex: "(verbo1|fazer|dormir|comer|andar)"
                },
                {
                    token: "variable",
                    regex: "(lista2|AAA|BBB|CCC|DDD)"
                },
                {
                    token: "keyword",
                    regex: "(verbo2|ir|voltar|buscar|voar)"
                }
            ]
        };

    };

    oop.inherits(CareHighlightRules, TextHighlightRules);

    exports.CareHighlightRules = CareHighlightRules;
});