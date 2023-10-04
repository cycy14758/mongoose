// Import the Express.js framework by requiring the 'express' module

const express = require('express');
// Import the Mongoose library
const mongoose = require('mongoose');
// Define the port number for the web server to listen on
const port =  3000; 
// It is used to establish a connection to a database.
const connectdb=require('./config/connect')
//it is used to import the 'User' model, which likely represents user-related data and functionality.
const User=require('./modele/user')
// Load environment variables from the .env file located in the ./config directory

require('dotenv').config({path:'./config/.env'})
// Create an instance of the Express.js application

const app = express();


// Define an array of people with their attributes
const create = async () => {
  try {
      const arrayOfPeople = [
          { name: "John", age: 50, favoriteFoods: ["burritos"] },
          { name: "Mary", age: 12, favoriteFoods: ["burritos", "pizza"] },
          { name: "Jane", age: 15, favoriteFoods: [] } // Changed "Mary" to "Jane"
      ];

      // Use User.insertMany() to insert the array of objects
      const users = await User.insertMany(arrayOfPeople);

      console.log("Users created successfully:", users);
  } catch (error) {
      console.error("Error creating users:", error);
  }
};
// Define an asynchronous function to find people by name in the database
const findPeople=async()=>{
  try {
    // Use Model.find() to find all people with the specified name
    const users = await User.find();

    console.log(users);
  } catch (error) {
    console.error('Error searching for people:', error);

  }
}


// Define an asynchronous function to find a person by name in the database

const findPeopleByName=async()=>{
  try {
    // Use Model.find() to find all people with the specified name
    const users = await User.findOne({ name:"John" });

    console.log(users);
  } catch (error) {
    console.error('Error searching for people:', error);

  }
}

// Define an asynchronous function to find a person by their favorite food in the database

async function findPersonByFavoriteFood() {
  try {
    // Use Model.findOne() to find a person with the specified favorite food
    const person = await User.findOne({ favoriteFoods: "pizza" });
console.log(person);
    return person;
  } catch (error) {
    console.error('Error searching for a person:', error);
    return null; // Return null in case of an error
  }
}




 // Define an asynchronous function to find a person by their unique _id in the database

async function findPersonById(personId) {
  try {
    // Use Model.findById() to search for the person by _id
    const person = await User.findById(personId);

console.log(person);
  } catch (error) {
    console.error('Error searching for person:', error);
  }
}
// Define an asynchronous function to update a person's favorite food in the database

async function updatePersonFavoriteFood(personId) {
  try {
    // Find the person by _id
    const users = await User.findOne({ personId });

    

    // Add "hamburger" to the list of favoriteFoods
    users.favoriteFoods.push('hamburger');

    // Save the updated person
    await users.save();
    console.log('user updated successfully:', users);
  } catch (error) {
    console.error('Error updating user:', error);
  } }
// Define an asynchronous function to update a person's age in the database by name

async function updatePersonAgeByName() {
  try {
    const updatedusers = await User.findOneAndUpdate(
      { name:"Jane" }, // Search criteria
      { age: 14}, // Update age to 20
      { new: true } // Return the updated document
    );

    if (updatedusers) {
      console.log('Updated user:', updatedusers);
    } else {
      console.log('user not found.');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
}
// Define an asynchronous function to delete a user by their unique _id in the database

async function deleteUserById(userId) {
  try {
    const deletedUser = await User.findByIdAndRemove("651b15bca4a1d6785773736b");
    if (!deletedUser) {
      console.log('User not found.');
    } else {
      console.log(`Deleted user: ${deletedUser}`);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  } }
  // Define an asynchronous function to delete all users with the name "Mary" from the database

async function deletedUser() {
  try {
  
    // Delete all people with the name "Mary"
    const result = await User.deleteMany({ name: 'Mary' });
    console.log(`Deleted ${result.deletedCount} documents.`);
  } catch (err) {
    console.error(err);
  }  }
  // Define an asynchronous function to find people who like burritos in the database with callback


  async function findPeopleWhoLikeBurritosWithCallback() {
    try {
      const user2 = await User.find({ favoriteFoods: "burritos" })
        .sort('name')
        .limit(2)
        .select('-age')
        .exec((err, user2) => {
          if (err) return handleError(err);
          console.log(user2);
        })
        console.log(user2);
    }
     catch (err) {
      console.error(err);
    }
  }
  

// Call the create function to insert the users into the database
//create();
//findPeople()
//findPeopleByName()
//findPersonByFavoriteFood()
//findPersonById("651b15bca4a1d6785773736b")
//updatePersonFavoriteFood()
//updatePersonAgeByName()
//deleteUserById("651b15bca4a1d6785773736b")
//deletedUser()
findPeopleWhoLikeBurritosWithCallback()

connectdb()
app.listen(port,(err)=>{err?console.log(err):console.log("server running");})
