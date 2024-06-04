import { getWrongAnswers } from "./controllers/questionController.js";



for (let i = 0; i < 10; i++) {
    console.log(`Running iteration ${i + 1}...`);
    console.log(getWrongAnswers(30.5))
    // Add your task here, e.g., a function call or some code
    // exampleTask();
  }