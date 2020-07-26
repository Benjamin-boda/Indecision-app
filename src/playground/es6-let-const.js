var nameVar = "Benjamin";
var nameVar = "Ours";
console.log("nameVar", nameVar)

let nameLet = "Benjamin";
nameLet = "Lion";
console.log("nameLet", nameLet)

const nameConst = "Benjamin";

console.log("nameConst", nameConst)

function getPetName() {
    var petName = "trex";
    return petName
}

const petName = getPetName();

console.log(petName);

const fullName = "King Koopa";
let firstName;

if (fullName) {
    firstName = fullName.split(" ")[0];
    console.log(firstName);
}

console.log(firstName);