# Вступ
___
## Що таке і для чого використовується Express.js?
Express - найбільш популярний та, як вказано на [офіційному сайті](https://expressjs.com/), швидкий, гнучкий та
мінімалістичний вебфреймворк для [Node.js](https://nodejs.org/uk/).
Він є базовою бібліотекою для багатьох інших популярних фреймворків,
таких як [Kraken](https://krakenjs.com/), [NestJs](https://github.com/nestjs/nest),
[Blueprint](https://github.com/onehilltech/blueprint) та [багатьох інших.](https://expressjs.com/en/resources/frameworks.html)

Він надає такі можливості:
* Написання обробників для запитів з різними HTTP-методами в різних URL-адреси (маршрутах).
* Інтеграція з механізмами рендерингу «view», для генерації відповідей, вставляючи дані в шаблони.
* Установка загальних параметрів веб-додатку, таких як порт для підключення, і розташування шаблонів, 
  які використовуються для відображення відповідей.
* «Проміжне ПЗ» для додаткової обробки запиту в будь-який момент в конвеєрі обробки запитів. (Що, мабуть, і є найголовнішим)

# Установка
___
Будемо вважати, що Node.js уже встановлена на комп'ютері. Перейдемо в текстовий редактор WebStorm і створимо пустий проєкт.
В терміналі введемо команду ініціалізації:
```bash
    npm init -y
```
яка створить файл package.json, де буде відображена інформація про щойно створений проєкт. Параметр [-y] дозволяє
вказує на те, що дані не будуть вказуватись при ініціалізації, а будуть заповнені автоматично:

![Screenshot_1](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_1.png?raw=true)

Далі потрібно створити точку входу для нашого майбутнього додатку, це буде файл *index.js*. Після цього необхідно
встановити саму бібліотеку **Express.js**. Для цього в терміналі потрібно ввести команду:
```bash
    npm install express
```
Після того, як фреймворк завантажиться та установиться, в файлі *packege.json* має з'явитись поле *dependencies*, а в
ньому поле *express* та версія фреймворку:

![Screenshot_2]https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_2.png?raw=true)

Після цього вже можна починати працювати з **Express**, але щоб зробити написання коду комфортнішим, можна встановити
деякі додаткові пакети. Для того, щоб середовище розробки WebStorm краще "розуміло", що ми працюємо з Express
та використовуємо деякі методи прямо звідти, нам потрібно явно про це вказати:
```bash
    npm install -D @types/express
```
Параметр *[-D]* означає, що ми встановлюємо пакети для саме для розробки, а не для безпосередньої роботи додатку.
Тепер в нас встановлені інтерфейси і типи для роботи з **Express**, і WebStorm зможе ще більше розуміти наш код.
# Hello World
___
Для того, щоб почати використовувати **Express**, нам потрібно його імпортувати та створити екземпляр класу, з яким ми
і будемо далі працювати:
```javascript
const express = require('express')

const app = express()
```
Створимо перший веб-сервер. Екземпляр класу експрес має метод *listen()*, який запускає сервер через вказаний порт:
```javascript
const express = require('express')

const app = express()
    
app.listen(3000)
```
Переходимо в термінал і запускаємо виконання нашого файлу:
```bash
    node index.js
```
Переходимо в браузер, вводимо в адресній строці *localhost:3000* і бачимо результат:

![Screenshot_3](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_3.png?raw=true)

Результат, який виглядає, як помилка і поки не дуже зрозумілий, але є важливим для розуміння таких термінів,
як rout та middleware. Отже, що це все означає? Cannot GET / означає, що ми не можемо отримати відповідь по запиту GET
нашої корневої сторінки, адреса/rout/маршрут якої це - *localhost:3000/*.

Вдосконалимо наш код. Замість звичайного числа, зробимо певну перевірку і запишемо номер порта в змінну, яку далі будемо
використовувати в методі *listen()*. Для того, щоб опрацювати запит GET по маршруту "/", викличемо метод класу *express*
*get()*, який приймає в якості першого аргументу сам маршрут/rout, в нашому випадку це "/", a другим аргументом приймає
callback-функцію, яка, в свою чергу, в якості аргументів приймає *req* - тобто request (запит) та *res* -
тобто response (відповідь). Аргументи *req* та *res* - це, як і майже все в JavaScript, об'єкти. Тому ми можемо
викликати з ними методи з ***express***. Метод *send()* може посилати у відповідь на запис текст, у нашому випадку - *html*:
```javascript
const express = require('express')

const app = express()
const PORT = process.env.PORT ?? 3000

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}...`);
})
```
Переглянемо код сторінки:

![Screenshot_5](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_5.png?raw=true)

Крім написаного нами заголовку `<h1>Hello World!<\h1>`, ми також бачимо, що ***Express*** додав базову структуру
для *html*.
Перейдемо на вкладку **Network**, відфільтруємо по **'All'** та перезавантажимо сторінку. Виберемо наш `localhost:3000`
та вкладку `Headers`, в якій зможемо побачити, що ***Express*** згенерував для нас всі header'и, сам визначив
`Content-Type` та `Content-Length`.

![Screenshot_6](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_6.png?raw=true)

#Робота з статичними файлами
___
Передавати в методі `res.send()` одразу *html-код* не дуже зручно і практично, можна створити папку де будуть всі
статичні файли, такі як html, css та зображення. Створимо папку `static` (назва може бути будь-якою, в даному випадку
static для наглядності), в ній створимо файл `html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Express</title>
</head>
<body>
<h1>Hello World!</h1>
</body>
</html>
```
Для того, щоб передати в Response цілий файл, а не просто текст, потрібно викликати метод `res.sendFile()`. Щоб коректно
передати шлях до папки *static*, потрібно імпортувати модуль `path`:
```javascript
const path = require('path')
```
За допомогою методу `path.resolve()` передамо в метод `res.sendFile()` шлях до нашого html-файлу:
```javascript
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
})
```
Перезапустимо сервер, відкриємо браузер. Візуально у нас нічого не змінилось, але якщо ми перейдемо `Переглянути код
сторінки > Network > All > Response`, то побачимо, що тепер у відповідь відправляється не згенерований
***Express'ом*** html для нашого `<h1></h1>`, як це було раніше, а створений нами `index.html`.

Для наглядності додамо ще декілька сторінок нашому додатку. У папці static cтворимо 2 html-файли з схожим змістом.

`contacts.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contacts</title>
</head>
<body>
<h1>Contacts</h1>
</body>
</html>
```
та `about.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>About</title>
</head>
<body>
<h1>About us</h1>
</body>
</html>
```
У файлі `index.html` додамо 2 посилання на наші файли:
```html
...
<body>
<h1>Hello World!</h1>

<a href="/contacts">Contacts</a>
<a href="/about">About us</a>
</body>
...
```
У файлі `index.js` додамо обробники 2 нових роутів:
```javascript
app.get('/contacts', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'contacts.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'about.html'))
})
```
Перезапустимо сервер, перейдемо у браузер і перевіримо : все працює коректно.

Для того, щоб кожен раз не перезапускати сервер вручну, встановимо додатковий пакет, який буде робити це за нас:
```bash
npm insatall nodemon -D
```
Перейдемо до файлу `package.json` та додамо 2 скрипти в поле `sripts`:
```
...
"scripts": {
    "start": "node index",
    "dev": "nodemon index"
  },
...
```
Після цього введемо в консолі:
```
npm run dev
```
Тепер сервер буде автоматично перезапускатись після збереження змін у файлі.

Повернемось до нашого додатку. Для того, щоб для кожного роуту не прописувати метод **get**, можемо скористатись методом
`app.use()`, який підключає middleware-функції. В даному випадку нам потрібна стандартна вбудована функція `express.static()`,
яка приймає шлях до папки з статичними файлами, і коли приходить запит з серверу, то файл-відповідь буде взятий з папки
`static` (знову ж таки, назва папки може бути будь якою, і взагалі папок може бути декілька).

У файлі `index.html` у посиланнях на сторінки `contacts` i `about` потрібно додати розширення `.html`:
```html
<a href="/contacts.html">Contacts</a>
<a href="/about.html">About us</a>
```

Далі видаляємо попередні обробники, а замість них напишемо:
```
...
app.use(express.static(path.resolve(__dirname, 'static')))
...
```
Зберігаємо, переходимо в браузер, перевіряємо - все працює.

# API example

Для подальшого розгляду функції і можливостей ***Express*** створимо власний невеликий додаток.
Створимо окремий файл `users.js`, в якому зімітуємо роботу з базою даних, створивши масив користувачів, та експортуємо
його:
```js
const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        status: 'inactive'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@gmail.com',
        status: 'active'
    },
    {
        id: 3,
        name: 'Will Smith',
        email: 'will@gmail.com',
        status: 'active'
    }
];

module.exports = users
```
В файлі `index.html` для зручності створимо посилання на наше `api` та закоментуємо попередні посилання:
```html
...
<!--<a href="/contacts.html">Contacts</a>-->
<!--<a href="/about.html">About us</a>-->
<a href="/api/users">Users</a>
...
```
Напишемо початковий обробник запису для сторінки з користувачами:
```js
app.get('/api/users', ((req, res) => res.json(users)))
```
Після перезапуску серверу отримаємо результат:

![Screenshot_7](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_7.png?raw=true)

Такий зовнішній вигляд `.json` формату забезпечує розширення для Google Chrome
[JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh/related?hl=ru).
### Middleware-функції
Відійдемо трохи в сторону від нашого `api` та на прикладі розглянемо концепт, який знадобиться нам для подальшої роботи.

Middleware функції (функції проміжкової обробки) - це функції, які мають доступ до об'єкта запиту `(req)`,
об'єкту відповіді `(res)` і до наступної middleware-функції в циклі "запит-відповідь" додатка.

Middleware-функції можуть виконувати такі завдання:

* Виконання будь-якого коду.
* Внесення змін до об'єктів запитів і відповідей.
* Завершення циклу "запит-відповідь".
* Виклик наступного проміжного обробника з стека.

Якщо поточна middleware-функція завершує цикл "запит-відповідь", вона повинна викликати `next()` для передачі
управління наступній middleware-функції. В іншому випадку запит зависне.

![Screenshot_8](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_8.png?raw=true)

Починаючи з Express 5, middleware-функції, які повертають Promise, викличуть `next(value)`, коли вони відхиляють
або видають помилку. `next()` буде викликано або з відхиленим значенням, або з видаленою помилкою.

Створимо для прикладу просту middleware-функцію, яка буде просто виводити текст в консоль:
```
...
const logger = (req, res, next) => {
    console.log('Hello! Its simple middleware function!')
    next()
}
...
```
Для того, щоб проініціалізувати нашу функцію, тобто забезпечити її на виконання, потрібно передати її аргументом в
`app.use()`:
```
...
app.use(logger)
...
```
Тепер, коли ми перезапустимо сервер, і будемо робити будь-які запити, в консолі буде виводитись текст нашої функції.
Це дуже простий приклад, насправді middleware-функції мають дуже великий набір різноманітних можливостей.

Спробуємо трохи ускладнити нашу функцію, наприклад, для того, щоб отримати повну url-адресу та час переходу на цю адресу.

Щоб працювати з часом встановимо додатковий пакет : `npm insatall moment` та імпортуєсо його:


Одразу для зручності перенесемо функцію в окремий файл `logger.js` в папці `middleware`
(яку теж треба створити) та експортуємо її:
```js
const moment = require('moment')

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
    next()
}
 module.exports = logger
```
Перезапустимо сервер, спробуємо переходити на різні сторінки і побачимо в консолі результат:

![Screenshot_9](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_9.png?raw=true)

### Express.Router()
Клас `express.Router` використовується для створення модульних обробників маршрутів. Проміжкові функції з
`express.Router`дозволяють групувати обробники маршрутів для певної частини сайту і отримувати до них доступ
через загальний префікс маршруту.

Повернемося до нашого невеликого api та спробуємо написати декілька методів для взаємодії з даними.

Створимо папку `routes`, в ній папку `api`, і в середині файл `users.js`. Імпортуємо `express` i `express.Router`:
```js
const express = require('express')
const router = express.Router()
```
Напишемо метод, щоб доступатись до кожного користувача по його `id`:
```js
const express = require('express')
const router = express.Router()

const users = require('../../Users')

//All users
router.get('/', ((req, res) => res.json(users)))

//Single user
router.get('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id} `})
    }
})

module.exports = router
```
Далі імпортуємо `router` в головному файлі `index.js` та за допомогою методу `app.use()` проініціалізуємо його:
```js
'...'
const router = require('./routes/api/users')

'...'

app.use('/api/users', router)
'...'
```
Для швидкості та зручності будемо тестувати наші методи, користуючись сервісом
[Postman](https://www.postman.com/), який дозволяє змоделювати запити різних типів.

Переходимо на сервіс, вводимо шлях та отримуємо результат:

![Screenshot_10](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_10.png?raw=true)

![Screenshot_11](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_11.png?raw=true)

Далі створимо можливість додавати нових користувачів з прямо з сайту за допомогою http-метода POST та body-parser.
Оскільки ми не використовуємо бази даних, а лише імітуємо, то нам знадобиться бібліотека, яка б могла генерувати
унікальне `id`:
``` 
npm install uuid
```
Напишемо код нашої middleware-функції:
```js
router.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newUser.name || !newUser.email) {
        return res.status(400).json({msg: 'Input a name and email'})
    }
    users.push(newUser)
    res.json(users)
})
```
Для того, щоб мати змогу опрацьовувати POST запит, нам потрібно буде використовувати `body-parser`. Раніше це була
окрема бібліотека, яку необхідно було завантажувати та інсталювати, а зараз це вбудовані middleware-функції
які "парсять" тіло запиту у різних форматах. Ми будемо використовувати `express.json()` i `express.urlencoded()`.
Викликаються ці методи в головному файлі `index.js`:
```js
'...'
app.use(express.json())
app.use(express.urlencoded({extended: false}))
'...'
```
Тепер ми зможемо динамічно додавати об'єкти на нашу сторінку, використовуючи Postman:

![Screenshot_12](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_12.png?raw=true)

Напишемо ще декілька функцій, які дозволять оновлювати/змінювати дані користувача та видаляти користувача:
```js
//Update user
router.put('/:id', (req, res) => {
    const found = users.some((user) => user.id === parseInt(req.params.id))
    if (found) {
        const updUser = req.body
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updUser.name ? updUser.name : user.name;
                user.email = updUser.email ? updUser.email : user.email;
                res.json({msg: 'User updated', member: user})
            }
        })

    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }
})

//Delete user
router.delete('/:id', (req, res) => {
    const found = users.some((user) => user.id === parseInt(req.params.id))
    if (found) {
        res.json(users.filter(user => user.id !== parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }
})

```

### Тестування за допомогою Postman
___

Сервіс Postman дозволяє не просто надсилати запити різних типів, а й надає зручні інструменти для
написання тестів будь-якої складності.

Отже, напишемо декілька простих тестів для нашого так званого API. Знаходимо вкладку `Tests`:

![Screenshot_14](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_14.png?raw=true)

Одразу можемо помітити справа меню вже з готовими шаблонами, які можна використовувати для тестування,
наприклад валідувати коди і зміст відповідей, парсити і зберігати значення в змінні оточення або глобальні змінні,
перевіряти їх відповідність заданим значенням і т.д.

Напишемо найпростіший тест, який перевіряє, чи дорівнює [код стану HTTP](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP)
коду 200, який означає те, що запит був успішним. З меню вибираємо шаблон `Status code is 200`. У вбудованому
вікні з'являється скрипт, написаний на *JavaScript*:

![Screenshot_15](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_15.png?raw=true)

Тест починається з виклику метода  `.test()` об'єкта `pm`. В метод передаються 2 аргументи: текст, який буде виводитись
з результатом, та функція, в якій і знаходиться тіло тесту, яке написане достатньо просто та візуально зрозуміло.
Натискаємо `SEND` і знизу бачимо результат:

![Screenshot_16](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_16.png?raw=true)

Якщо ж ми введемо якийсь маршрут, який ніяк не обробляється на сервері, або просто випадково допустимо помилку в url,
то тест буде не пройдено:

![Screenshot_17](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_17.png?raw=true)

Напишемо ще декілька тестів, які покажуть як парсити дані формату `json` та користуватись важливим методом
`pm.expect()`:

![Screenshot_18](https://github.com/greensadfrog/express-tutorial/blob/master/express/imgs/Screenshot_18.png?raw=true)

Postman - дуже потужний і корисний інструмент для тестування API, але в контексті нашого простого невеликого міні-API важко
детально розглянути всі можливості цього сервісу, тому для більш поглибленого розуміння
краще ознайомитись з [офіційною документацією](https://learning.postman.com/docs/getting-started/introduction/).

___
Матеріал підготував: студент групи ІВ-92 [Дудка Михайло](https://github.com/greensadfrog).