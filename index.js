require('electron-css-reload')(250);

var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    //various options - see CodeMirror docs
    lineNumbers: true,
    lineWrapping: true,
    theme: 'mbo',
    mode: 'text/x-java',
    scrollbarStyle: 'overlay'
  });

const exec = require('child_process').exec;

function execute(command, callback) {
    
};

var runButton = document.getElementById("runButton");
var output = document.getElementById("output");
runButton.onclick = function(){
    exec("echo bean", (error, stdout, stderr) => { 
        output.innerHTML = "";
        output.innerHTML += stdout;
    });
}