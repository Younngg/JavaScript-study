// 요청에 필요한 함수
// 데이터를 암호화해서 특정 경로에 요청을 보냄

function encrypt(data) {
  return 'encrypted data';
}

function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`${encryptedData} is being sent to ${url}`);
}

module.exports = {
  send,
};
