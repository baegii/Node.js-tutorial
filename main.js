var fs = require("fs");

//비동기식 함수는 첫 매개변수로 error, 마지막 매개변수로 callback 함수를 호출한다.
//fs.readFile()은 파일 내용을 다 읽고 출력한다.
fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("Program has ended");
//결과는 맨 마지막 줄이 먼저 출력된다.