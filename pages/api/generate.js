import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const time = req.body.time || '';
  const season = req.body.season || '';
  const state = req.body.state || '';
  if (time.trim().length === 0 || season.trim().length === 0 || state.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid time, season, and state.",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(time, season, state),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(time, season, state) {
  const capitalizedTime =
    time[0].toUpperCase() + time.slice(1).toLowerCase();
  const capitalizedSeason =
    season[0].toUpperCase() + season.slice(1).toLowerCase();
  const capitalizedState =
    state[0].toUpperCase() + state.slice(1).toLowerCase();
    console.log(capitalizedTime, capitalizedSeason, capitalizedState);
  return `Suggest three activities to do during the season, at the time, and in the state specified.

Time: Morning
Season: Summer
State: Florida
Activities: Go to the beach, go to the park, go to the mall
Time: Alaska
Season: Winter
State: Afternoon
Activities: Hike a mountain, go crabfishing, go snowboarding
Time: ${capitalizedTime}
Season: ${capitalizedSeason}
State: ${capitalizedState}
Activities:`;
}
