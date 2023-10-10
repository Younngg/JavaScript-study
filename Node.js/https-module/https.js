/*
1. 데이터를 암호화해서 특정 경로에 요청 보냄
2. 암호화 돼서 온 결과 데이터를 복호화
*/

const request = require('./request');
const response = require('./response');

function makeRequest(url, data) {
  // 요청 보내기
  request.send(url);
  // 데이터를 return 하기
  return response.read();
}

const responseData = makeRequest('https://', 'any data');

console.log('responseData', responseData);
