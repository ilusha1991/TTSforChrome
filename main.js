var franc = require('franc');
var $ = require('jquery');
var ee = require('event-emitter');
var CountryLanguage = require('country-language');

var emitter = ee({}), listener;




var counter = 0;


function Tts() {
    var thisTTS = this;
    this.rate = 1.2;
    this.playing = false;
    this.utterance = null;
    this.text = '';
    this.target = null;
    this.charIndex = 0;
    this.counter = 0 ;

    this.isPlaying= function () {
        return this.playing;
    };

    this.init = function (text,target) {
        this.text= text;
        if (target)
            this.target= target;
        var isoLang = franc(toBeSpoken,3);
        CountryLanguage.getLanguage(isoLang, function (err, data) {
            if(err) console.log(err);
            if(data)
            {
                var utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = thisTTS.rate;
                utterance.voice = window.speechSynthesis.getVoices().filter(function(item){
                    return item.lang.indexOf(data.iso639_1)!=-1
                })[0];
                utterance.onend=function () {
                    thisTTS.playing=false;
                    thisTTS.eject();
                };
                utterance.onboundary = function (e) {
                    emitter.emit('index',e.charIndex);
                };
                thisTTS.utterance = utterance;
            }
        });
    };

    this.inject = function (element) {
        var overlay = $('<div class="ttsoverlay"> ' + element+' </div>');
        overlay.appendTo(document.body)

    };
    this.eject = function () {
        $('.ttsoverlay').remove();
        this.counter = 0;
    };

    this.play = function () {
        if(thisTTS.utterance){
            window.speechSynthesis.speak(thisTTS.utterance);
            thisTTS.playing = true;
        }
        this.inject(this.markDOM(this.text));
    };
    this.stop = function () {
        this.eject();
        window.speechSynthesis.cancel();
        thisTTS.playing = false;
    };
    this.resume = function () {
        window.speechSynthesis.resume();
        thisTTS.playing = true;
    };
    this.pause = function () {
        window.speechSynthesis.pause();
        thisTTS.playing = false;
    };
    this.goFaster = function () {
        this.rate= this.rate+0.1;
        this.init(this.text);
    };
    this.goSlower = function () {
        this.rate= this.rate-0.1;
        this.init(this.text);
    };

    this.markDOM = function (selectedText) {

        var fullElText = this.target.text();
        var sIndex = fullElText.indexOf(selectedText);
        var eIndex = sIndex+selectedText.length;

        var split = selectedText.splitWithIndex(/[ .]+/);
        //console.log(split);
        var marked = "";
        for (var i = 0 ; i<split.length ; i++ ){
            marked += "<span class='w" +split[i][0]+"'>"+split[i][1]+" </span>" ;
        }
        result = fullElText.slice(0,sIndex) + marked +
            fullElText.slice(eIndex);
        return marked;
    }
}

var player = new Tts() ;

$(document).ready(function () {


    emitter.on('index', listener = function (index) {
        var selector=".w0";
        for (var i=1;i<=index;i++) {
            selector += " , .w" + i;
        }
        console.log(selector);
        $(selector)
            .css("background-color","#f7e50a")
            .css("text-decoration", "underline");
    });



    $(document).click(function (event) {
        if (window.getSelection) {
            toBeSpoken = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            toBeSpoken = document.selection.createRange().text;
        }
        var target = $(event.target);
        player.init(toBeSpoken, target);




    }).keydown(function (e) {
        if (e.keyCode == 84 && e.altKey) {
            if (player.isPlaying()) {
                player.stop();
            } else {
                if (player.utterance) {
                    player.play();
                }
            }
        } else if (e.keyCode == 68 && e.altKey) {
            if (player.isPlaying()) {
                player.pause();
            } else {
                player.resume();
            }
        } else if (e.keyCode == 187 && e.altKey) {
            player.goFaster();
        } else if (e.keyCode == 189 && e.altKey) {
            player.goSlower();
        }
    });

});

String.prototype.splitWithIndex=function(delim){
    var ret=[];
    var splits=this.split(delim);
    var index=0;
    for(var i=0;i<splits.length;i++){
        ret.push([index,splits[i]]);
        index+=splits[i].length+1;
    }
    return ret;
};
