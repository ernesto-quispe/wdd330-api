

const validLevels = ['easy', 'medium', 'hard'];

const getRandomQuestion = (max1, max2, level = 'easy', operator = '') => {
  let num1 = Math.floor(Math.random() * max1) + 1;
  let num2 = Math.floor(Math.random() * max2) + 1;

  if ((operator === '-' || operator === '/') && num1 < num2 && level == "easy") {
    [num1, num2] = [num2, num1];
  }

  const calculate = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    'x': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  const result = calculate[operator](num1, num2).toFixed(2);

  const question = {
    num1,
    num2,
    operator,
    question: `${num1} ${operator} ${num2}`,
    level,
    answer: parseFloat(result),
    wrong_answers: getWrongAnswers(result).wrong,
  };

  return question;
};
const getWrongAnswers = (answer) => {
  const wrongAnswers = [];
  let maxOffset;
  if (answer < 25 ) {
    maxOffset = 5;
  }
  else if (answer >= 25 && answer <= 100) {
    maxOffset = 25;
  }
  else if (answer > 100 && answer <= 250) {
    maxOffset = 50;
  }
  else if (answer > 250) {
    maxOffset = 100;
  }
  else {
    maxOffset = 2;
  }
  // Generate a set of unique wrong answers
  while (wrongAnswers.length < 3) {
    const offset = Math.floor(Math.random() * (maxOffset * 2 + 1)) - maxOffset;
    const wrongAnswer = parseFloat(answer) + offset;

    // Check if the generated answer is not a duplicate
    if (!wrongAnswers.includes(wrongAnswer) && wrongAnswer !== answer) {
      wrongAnswers.push(parseFloat(wrongAnswer.toFixed(2)));
    }
  }

  return { wrong: wrongAnswers };
};
const getQuestion = (req, res) => {
  let { max1 = 10, max2 = 10, level = 'easy', operator = "" } = req.query;
  let operators = []
  let selectedOperator = ""
  if (!validLevels.includes(level.toLowerCase())) {
    return res.status(400).json({ error: 'Enter a valid level!', validLevels });
  }

  if (level == "easy") {

    operators = ['+', '-']
  }
  else if (level == "hard") {
    operators = ['+', '-', 'x', '/'];
  }

  if (operator == "sum") {
    selectedOperator = "+"
  }
  else if (operator == "sub") {
    selectedOperator = "-"
  }
  else if (operator == "mul") {
    selectedOperator = "x"
  }
  else if (operator == "div") {
    selectedOperator = "/"
  }
  else {
    selectedOperator = operators[Math.floor(Math.random() * operators.length)];
  }
  const question = getRandomQuestion(max1, max2, level, selectedOperator);
  res.json(question);
};







module.exports = { getQuestion };