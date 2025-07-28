const { MongoClient } = require("mongodb");

// Get the secret database connection string from Netlify's environment variables
const mongoUri = process.env.MONGODB_URI;

exports.handler = async function(event) {
  // A check to ensure the function is triggered by a POST request
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  const client = new MongoClient(mongoUri);

  try {
    const data = JSON.parse(event.body);

    await client.connect();
    
    // We'll save this data to a new database and collection
    const collection = client.db("nasaHackathon").collection("teams");
    
    // Insert the team's data
    await collection.insertOne(data);

    // Send back a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success! Your team has been registered." })
    };
    
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error saving your registration." })
    };
  } finally {
    // Always close the connection to the database
    await client.close();
  }
};