
const path = require('path');
const PDFMerger = require('pdf-merger-js');
const fs = require('fs');

var merger = new PDFMerger();

(async () => {

  var milis = new Date();
  milis = milis.getTime();
  const directoryPath = path.join(__dirname, 'pdfs-2');    
  //const directoryPath = path.join(__dirname, 'pdfs-2');    //for page-number testing


  // merger.add('pdf/Aman Sharma-1.pdf');
  // merger.add('pdf/Jay Talera-1.pdf');
  fs.readdir(directoryPath, function (error, files) {
    if (error) {
      return console.log('unable to scan directory: ', error)
    }
    console.log(files);

    for (const file of files) {
      console.log("PATH : ", directoryPath + "\\" + file);
      merger.add(directoryPath + "\\" + file);
    }
    merger.save(path.join('merged-pdfs', `${milis}.pdf`)); //save under given name
  })

})();

