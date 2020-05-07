/*
  0. Проверка неизменности HTML (в лоб, потому что не надо там ничего менять)
  1. Проверка существования (+ поиск) styleshit с нужным селектором
  2. Проверка колличества селекторов в нужном styleshit
  3. Проверка колличества атрибутов селектора
  4. Проверка значения каждого атрибута, в том числе искомого
*/

const errors = [];

function check(){
  var styles = document.styleSheets, 
  styleshitIndex;

  //  0. Проверка неизменности HTML (в лоб, потому что не надо там ничего менять)

  function checkHTML(){
    var originalHTMLSource = 
  `<html><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>4 правила вёрстки</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>4 правила вёрстки</h1>
  <h2>
    Задача веб-дизайна — сделать не только красиво. Задача веб-дизайна —
    сделать как можно проще и удобнее для пользователя. Это важно знать
    не только дизайнеру, но и разработчику.
  </h2>
  <div class="content"></div>

  <!-- Подключаем тесты -->
  <script src="../__test__/index.js"></script></body></html>`,

    studentHTMLSourse = document.querySelector('html').outerHTML;

    if (studentHTMLSourse != originalHTMLSource){
      errors.push('Изменение в index.html');
      return(0);
    }
   return(1);
  }

  //  1. Проверка существования (+ поиск) styleshit с нужным селектором

  function findTheStyleshit(){
    for (let i = 0; i < styles['length']; i +=1 ){  
      for (let j = 0; j < styles[i].cssRules['length']; j += 1) {
        if (styles[i].cssRules[j]['selectorText'] == 'div.content') {
          return(i);
        };
      }
    }
    errors.push('div.content не найден в css');
    return(-1);
  }
  
  //  2. Проверка колличества селекторов в нужном styleshit


  function checkNumberOfSelectors(){
    if (styles[styleshitIndex].cssRules['length'] > 1) {
      errors.push('Должен быть только один селектор div.content');
      return (0);
    }
    return (1);
  }

  //  3. Проверка колличества атрибутов селектора


  function checkNumberOfAttrs(){
    if (styles[styleshitIndex].cssRules[0]['styleMap']['size'] != 3) {
      errors.push('Должно быть три аттрибута: width, height, background-color');
      return (0);
    }
    return (1);
  }

  //  4. Проверка значения каждого атрибута, в том числе искомого


  function checkAttrs(){
    var attrsReference = {
      "width": "100%",
      "height": "100vh",
      "background-color": "black"
    }
  
    for (let i in attrsReference){
      if (styles[styleshitIndex].cssRules[0]['style'][i] != attrsReference[i]){
        errors.push('Неправильное значение аттрибута ' + styles[styleshitIndex].cssRules[0]['style'][i]);
        return (0);
      }
    }
    return (1);
  }

  checkHTML();
  if ((styleshitIndex = findTheStyleshit()) >= 0){
    if (checkNumberOfSelectors()) {
      if (checkNumberOfAttrs()) {
        checkAttrs();
      }
    }
  }
}

check();
console.log(errors);
