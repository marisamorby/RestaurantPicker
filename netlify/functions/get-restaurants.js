const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });

//Netlify function syntax
export async function handler() {
  //link to database: https://www.notion.so/marisamorby/Restaurants-2fa3be41a3e04aa1a3e4992a9020f473
  const databaseId = '701a6fd0cf144e52995ced07d4796566';
  
  //Query to pull tried restaurants
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      "property": "Tried",
      "checkbox": {
        "equals": true
      }
    },
  });

//Return the title of the restaurants that have been tried
  const triedRestaurants = response.results.map(result => {
    return result.properties.Name.title[0].text.content;
  });

 //Query to pull not tried restaurants 
  const response2 = await notion.databases.query({
    database_id: databaseId,
    filter: {
      "property": "Tried",
      "checkbox": {
        "equals": false
      }
    },
  });

//Return the title of not tried restaurants
  const notTriedRestaurants = response2.results.map(result => {
    return result.properties.Name.title[0].text.content;
  });

// Utility function to get a random number
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// Get a random number between 0 and the length of arrays (total number of tried or not tried restaurants)
  const triedindex = getRandomInt(triedRestaurants.length)
  const nottriedindex = getRandomInt(notTriedRestaurants.length)

// Out of the list of tried restaurants, give me the random number
  return {
    statusCode: 200,
    body: JSON.stringify({
      tried: triedRestaurants[triedindex],
      nottried: notTriedRestaurants[nottriedindex]
    })

  }

}
