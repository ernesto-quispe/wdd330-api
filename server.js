const express = require('express');
const app = express();
const port = 8000;

function getRandomQuestion(max1, max2, level = 'easy', operator = '') {
    function getLevel(answer) {
        if (answer < 150) {
            const wrong1 = answer - 1;
            const wrong2 = answer - 5;
            const wrong3 = answer - 50;
            return { level: 'EASY', wrong: [wrong1, wrong2, wrong3] };
        } else if (answer < 500) {
            const wrong1 = answer - 100;
            const wrong2 = answer - 52;
            const wrong3 = answer - 42;
            return { level: 'MEDIUM', wrong: [wrong1, wrong2, wrong3] };
        } else {
            const wrong1 = answer - 250;
            const wrong2 = answer - 30;
            const wrong3 = answer - 11;
            return { level: 'HARD', wrong: [wrong1, wrong2, wrong3] };
        }
    }

    let num1 = Math.floor(Math.random() * max1) + 1;
    let num2 = Math.floor(Math.random() * max2) + 1;

    if ((operator === '-' || operator === '/') && num1 < num2) {
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
    const { max1 = 100, max2 = 100, level = 'easy', operator } = req.query;

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

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});