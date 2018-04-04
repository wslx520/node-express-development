### node-express-development

本项目是阅读《Node与Express开发》一书所产生的步骤代码

这本书涉及到的知识方方面面, 看完后对web开发整个流程会有更全面的认识. 当然, 有的方面没有讲的太深(毕竟web开发某一部分就可能需要好多本书才能讲完)

与原书代码区别在于:

1. 以es6编写
1. 模板引擎换成了 nunjucks 


### headless 浏览器

书中提到了测试使用的 headless 浏览器, 列举了Selenium、PhantomJS , 选用的是 Zombie. 但现在可选用的比成书时更多了, 比如 `nightmare`和 `puppeteer`.

### JSLint, JSHint

这两个代码规范检查都比较老了，我换成了 `eslint`

### grunt

grunt十分难用, 反正我是用`gulp`

### 模板引擎

Express支持的模板引擎(或者说, 支持Express的模板引擎)现在有非常多

书中使用的是 `handlebars` ,但为了使用它,居然要加一个插件`express3-handlebars`

handlebars 有的语法看起来很挫, 比如解析如下data:

```javascript
{
currency: {
name: 'United States dollars',
abbrev: 'USD',
},
tours: [
{ name: 'Hood River', price: '$99.95' },
{ name: 'Oregon Coast', price, '$159.95' },
],
specialsUrl: '/january-specials',
currencies: [ 'USD', 'GBP', 'BTC' ],
}
```

循环 tours:

```handlebars
{{#each tours}}
{{! I'm in a new block...and the context has changed }}
<li>
{{name}} - {{price}}
{{#if ../currencies}}
({{../../currency.abbrev}})
{{/if}}
</li>
{{/each}}
```

感觉这是自找不痛快.

 我使用更强大的 `nunjucks`

`nunjucks`支持我心目中一个模板引擎所需要的所有功能

所以我跳过了本书的第7章 ヽ(°◇° )ノヽ(°◇° )ノヽ(°◇° )ノ

