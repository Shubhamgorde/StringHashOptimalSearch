
const readline = require('readline');
const fs = require('fs');
const crypto = require('crypto');

let foundFlag = 0;
let hashArray = [];
let stringToMatch = process.argv[3];
// crypto.createHash('md5').update(stringToMatch).digest('hex');
const readInterface = readline.createInterface({
  input: fs.createReadStream('./' + process.argv[2])
});

let calculateHash = function(inputString){
  // p = prime number near to characters you want to support
  let p = 257;
  // m = some large number which is used as modulo
  let m = 1e9 + 9;

  var hashValue = 0;
  let power = 1;
  // calculate hash value
  for (var i = 0; i < inputString.length; i++) {
    hashValue = ( hashValue + inputString.charAt(i).charCodeAt(0) * power) % m;
    power = (power * p) % m;
  }

  // console.log("Hash of string : " + inputString + " is : " + hashValue );
  return hashValue;
}

let hashOfStringTomatch = calculateHash(stringToMatch);
// console.log("Hash of string to be matched : " + hashOfStringTomatch); 

// read line by line in stream
readInterface.on('line', function(line) {
  // Remove whitespace and split on space
  let s = line.trim().split(" ");

  for(let i=0; i < s.length; i++){
    
    let hash = calculateHash(s[i]);
    
    // crypto.createHash('md5').update(s[i]).digest('hex');
    if(hashOfStringTomatch === hash){
        // console.log("----------------------- Matched:: ");
        foundFlag = 1;
        console.log("Matching hash string found: " + s[i] + "\nand its hash is: "+ hash);
        break;
    }
      
    hashArray.push(hash); 
  }

  // console.log("line :" + count++ + ' ', line + " splitted : "+ s);

  // console.log("HashArray : "+ hashArray);
});
readInterface.on('close',()=>{
  if(foundFlag == 0)
    console.log("No matching string hash found");
})
