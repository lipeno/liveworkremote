unless User.any?
  puts 'Creating users'

  PASSWORD = 'castle'

  User.create({
                  email: 'john@smith.com',
                  full_name: 'John Smith',
                  work: 'developer',
                  plans: 'travel the world',
                  hobbies: 'kitesurfing',
                  latitude: '40.71',
                  longitude: '-74.21',
                  password: PASSWORD,
                  password_confirmation: PASSWORD,
                  })

  User.create({
                  email: 'katie@hudson.com',
                  full_name: 'Katie Hudson',
                  work: 'designer',
                  plans: 'learn surfing while working',
                  hobbies: 'knitting',
                  latitude: '40.73',
                  longitude: '-74.19',
                  password: PASSWORD,
                  password_confirmation: PASSWORD,
                  })
  User.create({
                  email: 'mackey@jones.com',
                  full_name: 'Mackey Jones',
                  work: 'entrepeneur',
                  plans: 'maximize profits while working less',
                  hobbies: 'meeting people, having beers',
                  latitude: '40.72',
                  longitude: '-74.18',
                  password: PASSWORD,
                  password_confirmation: PASSWORD,
                  })

end