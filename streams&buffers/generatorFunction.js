function* simpleGenerator() {
    yield 1
    yield 2
    yield 3
}

const myGenerator = simpleGenerator()

console.log(myGenerator.next()); // { value: 1, done:false}
console.log(myGenerator.next()); // { value: 1, done:false}
console.log(myGenerator.next()); // { value: 1, done:false}
console.log(myGenerator.next()); // { value: undefinided, done:true}

function* count() {
    yield 1
    yield 2
    yield 3
}

for (let value of count()) {
    console.log(value) // 1,2,3
}