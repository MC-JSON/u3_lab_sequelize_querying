const { User, sequelize } = require('./models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function stringify(data) {
  console.log(JSON.stringify(data, null, 2))
}

const findAllUsers = async () => {
  const result = await User.findAll()
  stringify(result)
  // Find all users
  // Raw SQL: SELECT * FROM users;
}

const createNewUser = async () => {
  const result = await User.create({
    firstName: 'Ruthie',
    lastName: 'Girl',
    email: 'your@ruthie.com',
    userName: 'Ruthster',
    password: 'Nonono',
    jobTitle: 'Barker'
  })
  stringify(result)
  // Create a new user
  // Raw SQL: INSERT INTO users (id, firstName, lastName, email, userName, password, jobTitle) VALUES (DEFAULT, 'Jane', 'Doe', 'jane@jane.com', 'janedoe', '123456789', 'Systems Analyst')
}

const deleteWhere = async () => {
  const result = await User.destroy({ where: { firstName: 'Jane' } })
  stringify(result)
  // Delete everyone named "Jane"
  // Raw SQL: DELETE FROM users WHERE firstName = 'Jane'
}

const updateUser = async () => {
  const result = await User.update(
    {
      lastName: 'Smith'
    },
    { where: { lastName: 'Doe' } }
  )
  stringify(result)
  // Change lastname "Doe" to "Smith"
  // UPDATE users SET lastName='Smith' WHERE lastName = 'Doe'
}

const findUsersOnlyEmail = async () => {
  const result = await User.findAll({ attributes: ['email'] })
  stringify(result)
  // Find all users and only show their email
  // Raw SQL: SELECT email FROM users;
}

const findAllJohns = async () => {
  const result = await User.findAll({ where: { firstName: 'John' } })
  stringify(result)
  // Find all users where firstname is John
  // Raw SQL: SELECT * FROM users WHERE firstName = "John";
}

const findJohnOrJane = async () => {
  const result = await User.findAll({
    where: { [Op.or]: [{ firstName: 'John' }, { firstName: 'Jane' }] }
  })
  stringify(result)
  // Find all users where firstname is either John or Jane
  // Raw SQL: SELECT * FROM users WHERE firstName = "John" OR firstName = "Jane";
}

const run = async () => {
  try {
    // await findAllUsers()
    // await createNewUser()
    // await updateUser()
    // await findUsersOnlyEmail()
    // await findAllJohns()
    await findJohnOrJane()
    // await deleteWhere()
  } catch (error) {
  } finally {
    await sequelize.close()
  }
}

run()
