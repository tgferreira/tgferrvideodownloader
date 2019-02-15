var express = require('express');
var app = express();
var fs = require('fs');
var ytdl = require('ytdl-core');

/* GET: download */
app.get('/download', function (req, res) {

	let url = req.param('url');
	let title;

	ytdl(url).on('info', (info) => {
		title = info.title;
		ytdl(url).pipe(fs.createWriteStream(title + '.mp3')).on('close', (close) => {
			console.log('Downloading ' + title);
			console.log('....Done')
			var file = title + '.mp3';
			res.download(file);
		});
	});
});

/* GET: PAGINA HOME */
app.get('/home', function (req, res) {
	res.sendfile('./views/home.html');
});



/*
*
*	SERVER LISTENING
*
*/
app.listen(3000, function () {
console.log('Listening on port 3000');
});

