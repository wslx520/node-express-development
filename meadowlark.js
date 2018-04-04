const express = require('express');
const nunjucks = require('nunjucks');

const formidable = require('formidable');

const getFortune = require('./lib/fortunes');

let app = express();

app.set('port', process.env.PORT || 3000);

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    // 模板变化不用重启服务器
    watch: true
});

// 加载 body-parser
app.use(require('body-parser')());
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

app.get('/', (req, res) => {
    res.render('index.html', {
        pageTitle: 'Meadowlark: Welcome'
    });
});
app.get('/about', (req, res) => {
    res.render('about.html', {
        pageTitle: 'About Meadowlark',
        fortune: getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river',
    (req, res) => (res.render('tours/hood-river.html'))
);
app.get('/tours/request-group-rate',
    (req, res) => (res.render('tours/request-group-rate.html'))
);

app.get('/newsletter', (req, res) => (res.render('newsletter.html', {
    csrf: 'mock csrf token!'
})));

app.post('/process', function (req, res) {
    if (req.xhr || req.accepts('json,html') === 'json') {
        res.send({
            secuess: true
        });
    } else {
        console.log('From (from querystring):', req.query.form);
        console.log('CSRF token (from hidden form field):', req.body._csrf);
        console.log('Name (from visible form field):', req.body.name);
        console.log('Email (from visble form field):', req.body.email);
        res.redirect(303, '/thank-you');
    }

});
app.get('/thank-you', (req, res) => {
    res.send('Succeed!<a href="/">Home</a>');
});

app.get('/contest/vacation-photo', (req, res) => {
    const now = new Date();
    res.render('contest/vacation-photo.html', {
        year: now.getFullYear(),
        month: now.getMonth(),
        pageTitle: 'Upload Your Photos'
    });
});

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/thank-you');
    });
});
// 404
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
    console.log(`Express started at http://localhost:${app.get('port')}, 
        press Ctrl+C to terminate`);
});