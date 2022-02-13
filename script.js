//ф-ЦИИ КОНСТРУКТОРЫ
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
const ivan = new  User('Ivan', 23);
const alex = new User('Alex', 24);
console.log(ivan);//User{name:'Ivan', id: 23; human: true}
console.log(alex);//
ivan.hello();//Hello Ivan
// добавление св-в через proto
User.prototype.exit = function () {
    console.log(`User ${this.name} exit`);// наследуется всеми потомками, кот были созданы после нее

}
ivan.exit()