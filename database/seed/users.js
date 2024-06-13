import mongoose from 'mongoose';
import faker from 'faker';
import userModel from '../../Model/searchUser.js'

mongoose.connect('mongodb://0.0.0.0:27017/test_migrations');

const seedUsers = async () => {
    try {
        await userModel.deleteMany({});
        const users = [];

        for (let i = 0; i <= 50; i++) {
            users.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                mobileNumber: faker.datatype.number({ min: 1000000000, max: 9999999999 }),
                birthdate: faker.date.past(50, new Date(2000, 0, 1)),
                addresses: [{
                    addressLine1: faker.address.streetAddress(),
                    addressLine2: faker.address.secondaryAddress(),
                    pincode: faker.datatype.number({ min: 1000, max: 999999 }),
                    city: faker.address.city(),
                    state: faker.address.state(),
                    type: faker.random.arrayElement(['Home', 'Office'])
                }]
            });
        }

        await userModel.insertMany(users);
        console.log('Seed data inserted successfully');
    } catch (err) {
        console.error('Error inserting seed data:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedUsers();
