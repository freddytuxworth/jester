require('electron-css-reload')(250);
var temp = require('temp'),
    fs   = require('fs');

temp.track();

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
    runButton.classList.add("working");
    runButton.innerHTML = "saving";
    temp.open('jester_java_code', function(err, javatmp) {
        if (!err) {
            fs.write(javatmp.fd, editor.getValue(), function(){
                fs.close(javatmp.fd, function(err) {
                    runButton.innerHTML = "compiling";
                    exec("type " + javatmp.path, function(err, stdout) {
                        runButton.innerHTML = "RUN";
                        runButton.classList.remove("working");
                        if(err){
                            output.classList.add("error");
                            output.innerHTML = err;
                        } else {
                            output.classList.remove("error");
                            output.innerHTML = stdout;
                        }
                    });
                })
            });
        }
    });
}