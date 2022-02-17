//ф-ЦИИ КОНСТРУКТОРЫ

/*
const  num = new Number(3);
console.log(num);

function User(name, id ) {
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function () {
        console.log(`Hello ${this.name}`);
    };
}
*/
//клоны через класс
/*class  User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.human = true;
    }
    hello() {
        console.log(`Hello ${this.name}`);
    }
    exit() {
        console.log(`User ${this.name} exit`)
    }
}*/
/*
const ivan = new  User('Ivan', 23);
const alex = new User('Alex', 24);
console.log(ivan);//User{name:'Ivan', id: 23; human: true}
console.log(alex);//
ivan.hello();//Hello Ivan
// добавление св-в через proto
User.prototype.exit = function () {
    console.log(`User ${this.name} exit`);// наследуется всеми потомками, кот были созданы после нее
}
ivan.exit()*/

//КОНТЕКСТ ВЫЗОВА THIS

//1) простой вызов ф-и this = window, else 'use strict' = undefined
/*
function showThis(a, b) {
    console.log(this);//und.
    function sum() {
        console.log(this);//und.
        return this.a + this.b;
        //что бы работало return a+b, sum берет a i b у родителя
    }
    console.log(sum());//err
}
showThis(5, 6)
*/
//2) если использ метод вн. obj, то контекст вызова ссыл на этот obj
/*
const obj = {
    a: 20,
    b: 15,
    sum: function () {
        console.log(this);
        function shout() {
            console.log(this);//und.т.к это не метод obj
        }
    }
};//контекст у методов обЪекта-сам obj
obj.sum();//{a: 20, b: 15,sum: f}*/
//3) this в конструкторах и классах-это новый экземпляр obj
/*
function User(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
}
let ivan = new User('Ivan', 23);*/
//4) прописывание this в ручную call, bind, apply
/*
function sayName(surname) {
    console.log(this);
    console.log(this.name + surname);
}
const user = {
    name: 'John'
}
sayName.call(user, 'Smith');//{name: 'John'} JohnSmith
sayName.apply(user, ['Smith']);//{name: 'John'} JohnSmith
//bind вызыв новую ф-цию
function count(num) {
    return this*num;
}
const double = count.bind(2);
console.log(13)//26*/
//обычная ф-я
/*btn.addEventListener('click', function () {
    console.log(this);//<button> = this
    this.style.backgroundColor = 'red';
})*/
//=>
/*
btn.addEventListener('click', (e)  => {
    this.style.backgroundColor = 'red';//err
    e.target.style.backgroundColor = 'red';
})
const obj = {
    num: 5,
    sayNumber: function () {
        const say = () => {
            console.log(this);//this=obj
            console.log(this.num);//5
        }
        say();
    }
}
obj.sayNumber();//{ num: 5, sayNumber: f}
const double = a   =>  a * 2;
*/

//КЛАССЫ
/*
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    calcArea () {//это метод = ф-я
        return this.height * this.width;
    }
}
const square = new Rectangle(10, 10);
console.log(square.calcArea())//100
const long = new Rectangle(20, 100);//2000

class ColorRectangleWidthText  extends Rectangle{//наследование Rectangle
    constructor(height, width, text, bgColor) {
        super();//методы родителя  this.height = height; this.width = width;
        this.text = text;
        this.bgColor = bgColor;
    }
    showMyProps() {
        console.log(`текст: ${this.text}, цвет: ${this.bgColor}`);
    }
}
const div = new ColorRectangleWidthText(25, 10, 'Hello', 'red');
div.showMyProps();//текст: Hello, цвет: red
console.log(div.calcArea())//250 метод родителя
*/

// REST
/*
const log = function (a, b, ...rest) {
    console.log(a, b, rest);
}
log('basic', 'rest', 'operator', 'usage')//basic rest['operator, 'usage']
// параметр по умолчанию
function calcDouble(number, basis = 2) {
    console.log(number * basis);
}
calcDouble(3, )//6*/

//JSON
/*
const person = {
    name: 'Alex',
    tel: '+7994939299',
    parents: {
        mom: 'Olga',
        dad: 'Nik'
    }
}
console.log(JSON.stringify(person))//{name: "Alex",tel: "+7994939299}// json
console.log(JSON.parse(JSON.stringify(person)))//person obj

const clone = JSON.parse(JSON.stringify(person)); // клонир по значения, глубокая копия
clone.parents.mom = 'Ann';
console.log(person);//mom: 'Olga'
console.log(clone);//mom = 'Ann'
*/
//AJAX
const inputRub = document.querySelector('#rub'),
      inputUsd = document.querySelector('#usd')
inputRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();
    request.open('GET', 'current.json');//'GET', 'current.json', async, login, pass
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8;');
    request.send();
//readystatechange
/*
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status ===200 ) {
            console.log(request.response);
            const data = JSON.parse(request.response);
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
        } else  {
            inputUsd.value = 'Error';
        }
*/
  //load
        request.addEventListener('load', () => {
            if (request.status ===200 ) {
                console.log(request.response);
                const data = JSON.parse(request.response);
                inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
            } else  {
                inputUsd.value = 'Error';
            }
    })
    //status 404,201
    //statusText=ok, not found
    //response
    //readyState
});

//Promise
//обычные асинхр операции
/*
console.log('Запрос данных');
setTimeout(() => {
    console.log('Подготовка данных');
    const  product = {
        name: 'TV',
        price: 1000
    };
    setTimeout(() => {
        product.status = 'order';
        console.log(product)
    }, 2000);
}, 2000);*/
//promise
console.log('Запрос данных');
/*
const  req = new Promise(function (resolve, reject) {
    // resolve-что то выполнилось правильно function
    //reject что то выполнилось не правильно function
    setTimeout(() => {
        console.log('Подготовка данных');
        const  product = {
            name: 'TV',
            price: 1000
        };
       resolve(product);
    }, 2000);
});
req.then((product) => {//что то выполнилось правильно
    setTimeout(() => {
        product.status = 'order';
        console.log(product)
    }, 2000);
});
*/

const  req = new Promise( (resolve, reject) => {
    // resolve-что то выполнилось правильно function
    //reject что то выполнилось не правильно function
    setTimeout(() => {
        console.log('Подготовка данных');
        const  product = {
            name: 'TV',
            price: 1000
        };
        resolve(product);
    }, 2000);
});
/*
req.then((product) => {//что то выполнилось правильно
    return  new  Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = 'order';
            //вывод данных
            resolve(product);
            console.log(data);//{name: 'TV',price: 1000}

        }, 2000);
    });
    }).then(data => {//data =>  resolve(product)
        data.modify = true;
        return data;
    console.log(data);//{name: 'TV',price: 1000, status: order}
}).then(data => {//передача по цепочке и очереодь выполнения
        console.log(data);//{name: 'TV',price: 1000, status: order, modify: true}
});
*/
// reject
req.then((product) => {//что то выполнилось правильно
    return  new  Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = 'order';
            //вывод данных
            resolve(product)
            // reject();
            console.log(data);//{name: 'TV',price: 1000}

        }, 2000);
    });
}).then(data => {//data =>  resolve(product)
    data.modify = true;
    return data;
    console.log(data);//{name: 'TV',price: 1000, status: order}
}).then(data => {//передача по цепочке и очереодь выполнения
    console.log(data);//{name: 'TV',price: 1000, status: order, modify: true}
}).catch(() => {
    console.error('Произошла ошибка');//Запрос данных=>Подготовка данных=>Произошла ошибка
}).finally(() => {
    console.log('finally');
});

//all, rice
const test = time => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time)
    });
};
// test(1000).then(() => console.log('1000 ms'));//1000 ms
// test(2000).then(() => console.log('2000 ms'));//2000 ms
Promise.all([test(1000), test(2000)]).then(() => {
    //all ждет окончания всех промисов
    console.log('All');// All через 2 сек
});
Promise.race([test(1000), test(2000)]).then(() => {
    //race ждет загрузки первого промиса=> что то выполняет
    console.log('Race');// Race через 1 сек
});

//Fetch API
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({name: 'Alex'}),
    headers: {
        'Content-type': 'application/json'
    }
})
    .then(response => response.json())//json=>js
    .then(json => console.log(json));//json=obj// {name: 'Alex', id: 101}


