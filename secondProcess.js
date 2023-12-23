function logResponsebody(logBody){
    console.log(logBody);
}
function callbackfn(result){
    result.json().then(logResponsebody);
}

var sendObj = {
    methode:"GET"
};

fetch("http://localhost:3000/handleSum?counter=10",sendObj).then(callbackfn);