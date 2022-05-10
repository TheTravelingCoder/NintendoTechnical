const fs = require('fs');

try {
  let writeToNewFiles = [];
  let writeToOldFiles = [];
  let oldFilesArray = [];
  let newFilesArray = [];
  const oldFiles = fs.readFileSync('./Old.sha1.txt', 'utf8').toString().split("\r\n").sort();
  const newFiles = fs.readFileSync('./New.sha1.txt', 'utf8').toString().split("\r\n").sort();
  
  for(let i = 0; i < oldFiles.length; i++){
    let [first, ...rest] = oldFiles[i].split(' ');
    oldFilesArray.push(first);
    oldFilesArray.push(rest.join(' '));
  }

  for(let i = 0; i < newFiles.length; i++){
    let [first, ...rest] = newFiles[i].split(' ');
    newFilesArray.push(first);
    newFilesArray.push(rest.join(' '));
  }

  function createOldNotInNew(){
    for(let i = 0; i < oldFilesArray.length; i++){
      if(i % 2 === 1){
        i++;
      }
      let currentIndexCheck = newFilesArray.indexOf(oldFilesArray[i]);
      if(currentIndexCheck < 0 && oldFilesArray[i] != undefined){
        writeToOldFiles.push(`${oldFilesArray[i]} ${oldFilesArray[i + 1]}`);
      }
    }
  }

  function createNewNotInOld(){
    for(let i = 0; i < newFilesArray.length; i++){
      if(i % 2 === 1){
        i++;
      }
      let currentIndexCheck = oldFilesArray.indexOf(newFilesArray[i]);
      if(currentIndexCheck < 0 && newFilesArray[i] != undefined){
        writeToNewFiles.push(`${newFilesArray[i]} ${newFilesArray[i + 1]}`);
      }
    }
  }
  
  createOldNotInNew();
  createNewNotInOld();

  if(writeToNewFiles.length > 0){
    var file = fs.createWriteStream('NewNotInOld.txt');
    file.on('error', function(err) { /* error handling */ });
    writeToNewFiles.forEach(function(v) { file.write(v + '\n'); });
    file.end();
  }
  if(writeToOldFiles.length > 0){
    var file = fs.createWriteStream('OldNotInNew.txt');
    file.on('error', function(err) { /* error handling */ });
    writeToOldFiles.forEach(function(v) { file.write(v + '\n'); });
    file.end();
  }
} catch (err) {
  console.error(err)
}