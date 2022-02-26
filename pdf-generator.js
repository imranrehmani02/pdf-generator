const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");



async function createPDF(data, pageNumber, totalPages) {

	var templateHtml = fs.readFileSync(path.join(process.cwd(), 'template.html'), 'utf8');
	var template = handlebars.compile(templateHtml);
	var html = template(data);
	//console.log('html : ',html);

	try {
		var milis = new Date();
		milis = milis.getTime();

		var pdfPath = path.join('pdfs-2', `${milis}.pdf`);
		//	var pdfPath = path.join('pdfs-2', `${milis}.pdf`);       //for page-number testing

		var options = {
			width: '1230px',
			headerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;">
		${new Date().toDateString()}
		<span style="margin-left: 10px;">Generated PDF</span>
	</div>`,
			footerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;width:100%;">
	   PDF Generated 
		<span style="display:inline-block;float:right;margin-right:10px;">
			<!--<span class="pageNumber"></span> / <span class="totalPages"></span>-->
			<span>${pageNumber}</span> / <span> ${totalPages}</span>
		</span>
	</div>`,
			displayHeaderFooter: true,
			margin: {
				top: "40px",   //10px
				bottom: "30px"
			},
			printBackground: true,
			path: pdfPath,
		}

		const browser = await puppeteer.launch({
			args: ['--no-sandbox'],
			headless: true
		});

		var page = await browser.newPage();


		await page.goto(`data:text/html;charset=UTF-8,${html}`, {
			waitUntil: 'networkidle0'
		});
		await page.pdf(options);
		await browser.close();
	}
	catch (error) {
		console.log('catch error : ', error);
	}
}

const data = [{
	title: "The Delhi Public School",
	date: "05/12/2018",
	name: "Aman Sharma",
	age: 28,
	birthdate: "12/07/1990",
	course: "Computer Science",
	obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce."
},
{
	title: "Himalaya International School",
	date: "05/12/2018",
	name: "Rashi Soni",
	age: 24,
	birthdate: "12/07/1990",
	course: "Civil",
	obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce."
},
{
	title: "The Prestige School",
	date: "05/12/2018",
	name: "Jay Talera",
	age: 20,
	birthdate: "12/07/1990",
	course: "ME",
	obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce."
}
]

// create pdf calling
for (var i = 0; i < data.length; i++) {
	createPDF(data[i], i + 1, data.length)
}