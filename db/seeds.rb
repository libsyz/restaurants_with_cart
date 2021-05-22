# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

2.times do
  # Create a restaurant
  Restaurant.create(
    name: Faker::Restaurant.name,
    cuisine: ['Spanish', 'Indian', 'Malay'].sample
    )
    6.times do
      # Create a dish for each restaurant
      Dish.create(
        restaurant: Restaurant.last,
        name: Faker::Food.dish,
        price: rand(150),
        )
    end
end
