
//Getting Started 
const Excel = require('exceljs');
const path = require('path');

let workbook = new Excel.Workbook()

let worksheet = workbook.addWorksheet('New Sheet');     //sheet name


// Data
var Data = [{
    firstName: 'John',
    lastName: 'Bailey',
    purchasePrice: 1000,
    paymentsMade: 100
  }, {
    firstName: 'Leonard',
    lastName: 'Clark',
    purchasePrice: 1000,
    paymentsMade: 150
  }, {
    firstName: 'Phil',
    lastName: 'Knox',
    purchasePrice: 1000,
    paymentsMade: 200
  }, {
    firstName: 'Sonia',
    lastName: 'Glover',
    purchasePrice: 1000,
    paymentsMade: 250
  }, {
    firstName: 'Adam',
    lastName: 'Mackay',
    purchasePrice: 1000,
    paymentsMade: 350
  }, {
    firstName: 'Lisa',
    lastName: 'Ogden',
    purchasePrice: 1000,
    paymentsMade: 400
  }, {
    firstName: 'Elizabeth',
    lastName: 'Murray',
    purchasePrice: 1000,
    paymentsMade: 500
  }, {
    firstName: 'Caroline',
    lastName: 'Jackson',
    purchasePrice: 1000,
    paymentsMade: 350
  }, {
    firstName: 'Kylie',
    lastName: 'James',
    purchasePrice: 1000,
    paymentsMade: 900
  }, {
    firstName: 'Harry',
    lastName: 'Peake',
    purchasePrice: 1000,
    paymentsMade: 1000
  }]

var milis= new Date();
milis = milis.getTime();

// Worksheet columns
worksheet.columns = [
    {header:'First Name', key : 'firstName'},
    {header:'Last Name', key : 'lastName'},
    {header:'Purchase Price', key : 'purchasePrice'},
    {header:'Payments Made', key : 'paymentsMade'},
    {header:'Amount Remaining', key : 'amountRemining'},
    {header:'% Remaining', key:'percentRemaining'}
]

// formatting the header
worksheet.columns.forEach(column=>{
    column.width = column.header.length < 12?12 : column.header.length
})

worksheet.getRow(1).font = {bold:true}

// Insert the data into excel
Data.forEach((e, index)=>
{
    //console.log('index : ',index);
    const rowIndex = index+2
    //console.log('rowIndex : ',rowIndex)
    worksheet.addRow({
        firstName: e.firstName,
        lastName: e.lastName,
        purchasePrice: e.purchasePrice,
        paymentsMade: e.paymentsMade,
        amountRemining:{
            formula: `=C${rowIndex}-D${rowIndex}`
        },
        percentRemaining:{
            formula: `=E${rowIndex}/C${rowIndex}`
        }
    })
})

// Formatting data
const figureColumns = [3,4,5]
figureColumns.forEach((i)=>{
    worksheet.getColumn(i).numFmt = '$0.00'
    worksheet.getColumn(i).alignment={horizantal:'center'}
})

worksheet.getColumn(6).numFmt='0.00%'

// Formatting borders
// loop through all of the rows and set the outline style.
worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
    worksheet.getCell(`A${rowNumber}`).border = {
      top: {style: 'thin'},
      left: {style: 'thin'},
      bottom: {style: 'thin'},
      right: {style: 'none'}
    }
  
    const insideColumns = ['B', 'C', 'D', 'E']
    insideColumns.forEach((v) => {
      worksheet.getCell(`${v}${rowNumber}`).border = {
        top: {style: 'thin'},
        bottom: {style: 'thin'},
        left: {style: 'none'},
        right: {style: 'none'}
      }
    })
  
    worksheet.getCell(`F${rowNumber}`).border = {
      top: {style: 'thin'},
      left: {style: 'none'},
      bottom: {style: 'thin'},
      right: {style: 'thin'}
    }
  })

//Saving the excel file
workbook.xlsx.writeFile(path.join('excels',`DataSheet-${milis}.xlsx`))    //file name