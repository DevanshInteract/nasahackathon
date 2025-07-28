exports.handler = async function(event) {
  console.log("--- Starting Debug Session ---");

  // Get the environment variable from Netlify's settings
  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri) {
    console.log("✅ SUCCESS: The MONGODB_URI variable was found.");
    // For security, we'll only log a small, non-sensitive part of it.
    console.log("It starts with:", mongoUri.substring(0, 20) + "...");
  } else {
    console.error("❌ FAILURE: The MONGODB_URI variable is MISSING or UNDEFINED.");
  }

  console.log("--- Ending Debug Session ---");

  // We'll return a message to the front-end so we know the function ran.
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Debug check complete. Please check your function log on Netlify." })
  };
};
