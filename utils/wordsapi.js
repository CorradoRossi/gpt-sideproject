const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "364a1ca3eemsh805357223025438p1ad097jsnc54fa13cb126",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
};

fetch("https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
