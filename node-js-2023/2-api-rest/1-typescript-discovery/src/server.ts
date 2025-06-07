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
