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
btn.addEventListener('click', function () {
    console.log(this);//<button> = this
    this.style.backgroundColor = 'red';
})
//=>
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
