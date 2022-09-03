const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = '701a6fd0cf144e52995ced07d4796566';
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
        "property": "Tried",
        "checkbox": {
          "equals": true
        }
      },
  });

  const triedRestaurants = response.results.map(result => {
      return result.properties.Name.title[0].text.content;
  });

  const response2 = await notion.databases.query({
    database_id: databaseId,
    filter: {
        "property": "Tried",
        "checkbox": {
          "equals": false
        }
      },
  });

  const notTriedRestaurants = response2.results.map(result => {
    return result.properties.Name.title[0].text.content;
});

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const triedindex = getRandomInt(triedRestaurants.length)
  const nottriedindex = getRandomInt(notTriedRestaurants.length)

  console.log("Tried and True: ", triedRestaurants[triedindex])
  console.log("Something New: ", notTriedRestaurants[nottriedindex])

  return {tried: triedRestaurants[triedindex], nottried: notTriedRestaurants[nottriedindex]} 
})();