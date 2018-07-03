//Procedural vs functional programming

//In Procedural programming, you structure your code with functions (procedures) which may or may not read or alter global state. 

//think classes

//In Functional programming, you structure your code such that you do not reference or alter on global state, and instead your functions always-and-only return transformations of their input.

//think redux --> the reducer always returns a new state

// let state = {
//   data: []
// }

// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case 'GET_DATA_FULFILLED':
//       return Object.assign({}, state, { data: action.payload });
//     default:
//       return state;
//   }
// }

//LOOPING

let arr = [1, 2, 3, 4, 5]

//Looping in procedural programming is done via for/while/for-in loops

// for (var i = 0; i < arr.length; i++) {
//   console.log(arr[i])
// }

//Looping in functional programming is usually done recursively

// function looper(arr) {
//   if (arr.length > 0) {
//     console.log(arr[0])
//     looper(arr.slice(1))
//   }
// }

// looper(arr);

//procedural programming is more imperative.  step-by-step what to do
//functional is declartive
//example with filtering an array to include only multiples of 2

// var evens = [2, 4, 6, 8, 10]

//procedural

// var evens = []

// for (var i = 0; i < numbers.length; i++) {
  //   if (numbers[i] % 2 === 0) {
    //     evens.push(numbers[i])
    //   }
    // }
    
    // console.log(evens)
    
    //functional
    
    // var evens = numbers.filter(num => num % 2 === 0)
    
    //data structures in procedural programming are generally mutable
    //in functional programming objects, and variables are immutable
    
    //multiply every number in an array by 2
    
    // let times2 = []
    
    // for (let i = 0; i < numbers.length; i++) {
      //   times2.push(numbers[i] * 2)
      // }
      
      // let numbersTimes2 = numbers.map(num => num*2)
      
      // chaining functions
      let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      // sum of squares of all even numbers

// let evens = numbers.filter(num => num % 2 === 0)
// let evensSquared = evens.map(num => num * num)
// let sumOfEvensSquared = evensSquared.reduce((sum, num) => sum + num)

// let sumOfEvensSquared = numbers.filter(num => num % 2 === 0)
//   .map(num => num * num)
//   .reduce((sum, num) => sum + num)

const _ = require('lodash');
const axios = require('axios');
const movies = require('./movies.json');

let states = {
  california: { population: 38332523, size: 162695 },
  texas: { population: 26448193, size: 268580 },
  newYork: { population: 19651127, size: 54556 },
  florida: { population: 19552860, size: 65754 },
  illinois: { population: 12882135, size: 57914 },
  pennsylvania: { population: 12773801, size: 46055 },
  ohio: { population: 11570808, size: 44824 }
}


// map -> mapValues / mapKeys

let stateArray = _.map(states, (value, key, wholeObj)=>{
  let result = { ...value }
  result.density = result.population / result.size;
  return result;
})

let stateObj = _.mapValues(states, (elem, key, wholeObj)=>{
  elem.density = elem.population / elem.size;
  return elem;
})

// reduce

let scores = {
  mark: 23,
  carolyn: 99,
  marc: 23,
  luke: 42,
  zach: 42,
  joe: 53,
  andrew: 23,
  steve: 0,
  kelly: 23,
  fred: 23
}

// let byScore = _.reduce(scores, (result, value, key) => {
//   (result[value] || (result[value] = [])).push(key);
//   return result;
// }, {})



// chain in lodash

// let nums = [1, 2, 3, 4, 5]
// let sumsOfEvensSquared = _(nums).filter(n => n % 2 === 0).map(n => n * n).sum()

// find

let foundMovie = _.find(movies, {
  year: '2006',
  contentRating: '11'
})

// console.log(foundMovie);

// groupBy

let moviesByYear = _.groupBy(movies, 'year');

let moviesByDecade = _.groupBy(movies, (movie)=>{
  return  Math.floor(movie.year/10)*10
})


// union

let marksFavoritePlaces = [
  'Utah', 
  'Hawaii', 
  'Thailand', 
  'Belize', 
  'Playa Del Carmen'
];

let annasFavoritePlaces = [
  'Hilton Head', 
  'Spain', 
  'Cancun', 
  'Colorado', 
  'Hawaii',
  'Utah'
];

let carolynsFavoritePlaces = [
  'Hawaii',
  'Orange County',
  'Hawaii',
  'Thailand',
  'Hawaii',
  'Craotia',
  'Hawaii',
  'Utah',
  'Colorado'
];

let friendsFavoritePlaces = _.union(marksFavoritePlaces, annasFavoritePlaces, carolynsFavoritePlaces);

// intersection

let commonFavoritePlaces = _.intersection(marksFavoritePlaces, annasFavoritePlaces, carolynsFavoritePlaces);

// memoize
let slowFunction = function(n){
  let total = 0;
  for (var i = 0; i < n; i++){
    for (var j = 0; j < n; j++){
      for (var k = 0; k < n; k++){
        total += 1;
      }
    }
  }
  return total;
}

let memFunction  = _.memoize(slowFunction);

// console.time('slowFunc 1');
// memFunction(1000);
// console.timeEnd('slowFunc 1');

// console.time('slowFunc 1');
// memFunction(1000);
// console.timeEnd('slowFunc 1');

// console.time('slowFunc 2');
// memFunction(999);
// console.timeEnd('slowFunc 2');

// console.time('slowFunc 3');
// memFunction(999);
// console.timeEnd('slowFunc 3');

// We can memoize API requests

function getPerson(i) {
  return axios.get(`https://swapi.co/api/people/${i}`)
}

let memGetPerson = _.memoize(getPerson);

// console.time(11111111111);
// memGetPerson(5).then(response => {
//   console.log(response.data);
//   console.timeEnd(11111111111)
// })

// setTimeout(()=>{
//   console.time(222222222);
//   memGetPerson(5).then(response => {
//     console.log(response.data);
//     console.timeEnd(222222222)
//   })
// }, 2000)


// Debounce
// a good example of when to use _.debounce, is user input on a form before making an axios request

function doStuff(a){
  console.log(a);
}

let debounced = _.debounce(doStuff, 100);

// for (let i = 0; i < 50; i++) {
//   debounced(i);
// }

// Throttle

let throttled = _.throttle(doStuff, 100);

// for (let i = 0; i < 5000; i++) {
//   throttled(i)
// }



