import mongoose from 'mongoose';
import userModel from '../../Model/searchUser.js'
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/', {
      dbName: 'test_migrations',
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error: ", error);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("Database Disconnected");
  } catch (error) {
    console.error("Database Disconnection Error: ", error);
  }
};

export const up = async () => {
  await connectDB();


  // Create a sample user document
  const sampleUser = new userModel({
    "firstName": "Abhishek",
    "lastName": "Pandit",
    "email": "apandit04@gmail.com",
    "mobileNumber": 9876543210,
    "birthdate": new Date("1997-04-10"),
    "addresses": [
      {
        "addressLine1": "Surat",
        "addressLine2": "Suart",
        "pincode": 12345,
        "city": "Surat",
        "state": "Gujarat",
        "type": "Home",
      }
    ],
  });

  try {
    const collections = await mongoose.connection.db.listCollections({ name: 'users' }).toArray();
       
    if (collections.length === 0) {
          await sampleUser.save()
        }
    console.log('User document inserted successfully');
  } catch (error) {
    console.error('Error inserting user document:', error);
  }

  await disconnectDB();
};
export const down = async () => {
  await connectDB();
  await mongoose.connection.db.dropCollection('users');
  await disconnectDB();
};
