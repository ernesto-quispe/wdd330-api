# Math Question API

### How to install

```
adapted from: https://github.com/Saikomantisu/math-question-api.git

npm istall
```

#### Run

 ```npm run start```
 ```npm run dev```
 
 ---
 
### Endpoints
`/api/random` - Get all the questions

| Key | Description | Data Type
| ----------- | ----------- | ----------- |
| `max1` | Set a maximum number to be used (it will be randomized after) Default is 100 | `String`
| `max2` | Set a second maximum number to be used (it will be randomized after) Default is 100 | `String`
| `level` | Get question based on the level - ["easy", "hard"] | `String`
| `operator` | Get question based on the opertaion - ["-", "+", "/" "+ needs to be sent as %2B] | `String`


examples:


add: 
    http://127.0.0.1:8000/api/random?level=easy&operator=%2B
subtract: 
    http://127.0.0.1:8000/api/random?level=easy&operator=-
divide: 
    http://127.0.0.1:8000/api/random?level=easy&operator=/
multiply: 
    http://127.0.0.1:8000/api/random?level=easy&operator=x
adding max1 and max2 
    http://127.0.0.1:8000/api/random?level=easy&operator=x&max1=300&max2=10

    https://wdd330-api.onrender.com/api/random