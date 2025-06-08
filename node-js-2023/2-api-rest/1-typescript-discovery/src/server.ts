import { add, subtract, multiply } from './functions'

interface User {
  birthYear: number
}

function calculateAgeOfUser(user: User): number {
  const currentYear = new Date().getFullYear()
  const age = currentYear - user.birthYear
  return age
}

const user: User = {
  birthYear: 1994,
}

const age = calculateAgeOfUser(user)
console.log(`The user is ${age} years old.`)

const result1 = add(10, 5)
const result2 = subtract(10, 5)
const result3 = multiply(10, 5)

console.log(`Addition result: ${result1}`)
console.log(`Subtraction result: ${result2}`)
console.log(`Multiplication result: ${result3}`)
