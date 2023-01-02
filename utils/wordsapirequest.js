const request = require("request");

const options = {
  method: "GET",
  url: "https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf",
  headers: {
    "X-RapidAPI-Key": "364a1ca3eemsh805357223025438p1ad097jsnc54fa13cb126",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    useQueryString: true,
  },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
