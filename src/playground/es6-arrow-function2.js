const add = (a, b) => {
    //console.log(arguments);
    return a + b;
};

console.log(add(12,11));

const user = {
    name: "Benjamin",
    cities: ["Rome", "Thorigny", "Namek"],
    printPlacesLived() {
        return this.cities.map((city) => this.name + " has lived in " + city);
    }
};

console.log(user.printPlacesLived());

const multiplier = {
    numbers: [3, 6, 9, 12],
    multiplyBy: 2,
    multiply() {
        return this.numbers.map((number) => this.multiplyBy * number);
    }
};



console.log(multiplier.multiply());