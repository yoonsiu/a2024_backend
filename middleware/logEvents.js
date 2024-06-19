// 1. 날짜, 시간 만들고 
// 2. uuid 만들고
// 3. 파일, 폴더 만들고 
// 4. log 쓰고 

const {format} = require('date-fns');
const {v4:uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// 미들웨어 : 함수, express에서 자주 사용하는 기능
// winston, morgan : logger model
// API : 만들진 내용에 대한 설명
// expressAPI :
// get : url로데이터 읽어오기
// post : body 데이터 읽어오기
// delete : 지울때 읽어오기
// use : 공통 코드 넣는 곳

 
const logEvents = async (message) => {
// logName을 추가로 받음 
//const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), "yyyMMdd\tHH:mm:ss")}`;
    const logItem = `\n ${dateTime}\t${uuid()}\t${message}`;
    // console.log(logItem);
    //20240516        19:23:49        c5c7ec09-bd0e-4e83-a757-99770a2b578e    hello test

    try {

      if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
        await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
      }
      
      await fsPromises.appendFile(
        //path.join(__dirname, "logs", logName), // 'eventLog.txt가 아니라 logName
        path.join(__dirname, "..", "logs", 'eventLog.txt'), 
        // 'eventLog.txt가 아니라 logName   
        logItem
      );
    } catch (err) {
       console.log(err)
    }
  };
  
  // logEvents('hello test')
  module.exports = logEvents;
  