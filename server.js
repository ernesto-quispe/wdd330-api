const express = require('express');
const cors = require('cors'); // Import the cors middleware

const app = express();

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });




const PORT = process.env.PORT || 3030;

function getRandomQuestion(max1, max2, level = 'easy', operator = '') {
    function getLevel(answer) {
        if (answer < 150) {
            let wrong1 = answer -  Math.floor(Math.random() * max1) + 1;
            let wrong2 = answer -  Math.floor(Math.random() * max1) + 1;
            let wrong3 = parseInt(answer) +  Math.floor(Math.random() * max1) + 1;
            wrong1 = Number.isInteger(wrong1) ? wrong1.toString() : wrong1.toFixed(2);
            wrong2 = Number.isInteger(wrong2) ? wrong2.toString() : wrong2.toFixed(2);
            wrong3 = Number.isInteger(wrong3) ? wrong3.toString() : wrong3.toFixed(2);

            return { level: 'EASY', wrong: [wrong1, wrong2, wrong3] };
        } else if (answer < 500) {
            let wrong1 = answer -  Math.floor(Math.random() * max1) + 1;
            let wrong2 = answer -  Math.floor(Math.random() * max1) + 1;
            let wrong3 = parseInt(answer) +   Math.floor(Math.random() * max1) + 1;
            wrong1 = Number.isInteger(wrong1) ? wrong1.toString() : wrong1.toFixed(2);
            wrong2 = Number.isInteger(wrong2) ? wrong2.toString() : wrong2.toFixed(2);
            wrong3 = Number.isInteger(wrong3) ? wrong3.toString() : wrong3.toFixed(2);

            return { level: 'MEDIUM', wrong: [wrong1, wrong2, wrong3] };
        } else {
            let wrong1 = answer -  Math.floor(Math.random() * max1) + 1;
            let wrong2 = answer -  Math.floor(Math.random() * max1) + 1;
            let wrong3 = parseInt(answer) +   Math.floor(Math.random() * max1) + 1;
            wrong1 = Number.isInteger(wrong1) ? wrong1.toString() : wrong1.toFixed(2);
            wrong2 = Number.isInteger(wrong2) ? wrong2.toString() : wrong2.toFixed(2);
            wrong3 = Number.isInteger(wrong3) ? wrong3.toString() : wrong3.toFixed(2);

            return { level: 'HARD', wrong: [wrong1, wrong2, wrong3] };
        }
    }

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
        wrong_answers: getLevel(result).wrong,
    };

    return question;
}

const validLevels = ['easy', 'medium', 'hard'];

app.get('/api/random', (req, res) => {
    let { max1 = 100, max2 = 100, level = 'easy', operator="" } = req.query;

    if (operator == "sum"){
        operator = "+"
    }
    else if (operator == "sub"){
        operator = "-"
    }
    else if (operator == "mul"){
        operator = "x"
    }
    else if (operator == "div"){
        operator = "/"
    }


    if (!validLevels.includes(level.toLowerCase())) {
        return res.status(400).json({ error: 'Enter a valid level!', validLevels });
    }

    const operators = operator
        ? [operator]
        : level === 'easy'
        ? ['+', '-']
        : ['+', '-', 'x', '/'];

    const selectedOperator = operators[Math.floor(Math.random() * operators.length)];

    const question = getRandomQuestion(max1, max2, level, selectedOperator);
    res.json(question);
});

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});