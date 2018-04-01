const express = require('express');
const nunjucks = require('nunjucks');



const getFortune = require('./lib/fortunes');

let app = express();

app.set('port', process.env.PORT || 3000);

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    // 模板变化不用重启服务器
    watch: true
});

app.get('/', (req, res) => {
    res.render('index.html', {
        pageTitle: 'Meadowlark: Welcome'
    });
});
app.get('/about', (req, res) => {
    res.render('about.html', {
        pageTitle: 'About Meadowlark',
        fortune: getFortune()
    });
});
app.use(express.static(__dirname + '/public'));
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
    res.status(500)
    res.send('500 - Server Error')
});

app.listen(app.get('port'), () => {
    console.log(`Express started at http://localhost:${app.get('port')}, 
        press Ctrl+C to terminate`);
})