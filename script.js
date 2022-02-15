var secretWord;
var wordExists = null;
var secretWord = localStorage.getItem("dailyWord");
var today = new Date();
var todayNum = String(today.getDate()) + String((today.getMonth() + 1)) + String(today.getFullYear());

//var wordExists = "false";

    var lines;
    var randomNumber;
    var lastRandomNumber;
    
    
    $(document.body).ready(function () {
      
      // load the trivia from the server
      $.ajax({
		  url: 'https://raw.githubusercontent.com/DoWhileBothered/Words/main/words.txt'
        //url: 'words.txt'
      }).done(function(content) {
        
        // normalize the line breaks, then split into lines
        lines = content.replace(/\r\n|\r/g, '\n').trim().split('\n');
        //if (hasOneDayPassed()){
          // only set up the click handler if there were lines found
          if (lines && lines.length) {
            $(function () {
              while(!wordExists){
                // loop to prevent repeating the last random number
                while (randomNumber === lastRandomNumber) {
					
                  //randomNumber = parseInt(Math.random() * lines.length);
				  randomNumber = parseInt(todayNum) * today.getDate() * (today.getMonth() + 1) * today.getFullYear();
				  var divider = 3367;
				  while (randomNumber > lines.length){
					  randomNumber = randomNumber/divider;
					  divider = divider/10;
				  }
				  randomNumber = Math.round(randomNumber);
                  // check to prevent infinite loop
                  if (lines.length === 1) { break; }
                }
                // keep track of the last random number
                lastRandomNumber = randomNumber;
                secretWord = lines[randomNumber];
                secretWord = secretWord.toUpperCase();
                secretWord = localStorage.setItem("dailyWord", secretWord);
                var secretWord = localStorage.getItem("dailyWord");
                wordExists = $.getValues(secretWord.toLowerCase());;
                // show the corresponding line
				while (!wordExists){
					lastRandomNumber = randomNumber;
					secretWord = lines[randomNumber];
					secretWord = secretWord.toUpperCase();
					secretWord = localStorage.setItem("dailyWord", secretWord);
					var secretWord = localStorage.getItem("dailyWord");
					wordExists = $.getValues(secretWord.toLowerCase());
					if(!wordExists){
						randomNumber = randomNumber + 1;
					}
				}
              }
            });
          }
        //}
      });
    });

window.onload = onOpen;








function enterLetter(input){
	
	var visibleSub = null;

	for (i = 1; i<7; i++){
		if(i == 2 && document.getElementById("firstGuess").style.visibility === 'visible'){
			return;
		}
		if(i == 3 && document.getElementById("secondGuess").style.visibility === 'visible'){
			return;
		}
		if(i == 4 && document.getElementById("thirdGuess").style.visibility === 'visible'){
			return;
		}
		if(i == 5 && document.getElementById("fourthGuess").style.visibility === 'visible'){
			return;
		}
		if(i == 6 && document.getElementById("fifthGuess").style.visibility === 'visible'){
			return;
		}
		var row = "R" + String(i);
		for (j = 0; j<7; j++){
			var letter = "L" + String(j);
			var id = row + letter;
			if (document.getElementById(id).value === ""){
				document.getElementById(id).value = input;
				var nextId = row + "L" + String(j + 1);
				document.getElementById(String(nextId)).focus();
				return;
			}
		}
	}
}

function deleteButton(){
	var row = "R";
	var letter = "L";
	
	for (r = 6; r > 0; r--){
		if (r == 6){
			var subId = "sixthGuess";
		}
		if (r == 5){
			var subId = "fifthGuess";
		}
		if (r == 4){
			var subId = "fourthGuess";
		}
		if (r == 3){
			var subId = "thirdGuess";
		}
		if (r == 2){
			var subId = "secondGuess";
		}
		if (r == 1){
			var subId = "firstGuess";
		}
		for (l = 6; l >= 0; l--){
			var checkId = row + String(r) + letter + String(l);
			//alert(checkId);
			//alert(document.getElementById(checkId).value);
			if (!(document.getElementById(checkId).value === "") && document.getElementById(subId).style.visibility === 'visible'){
				document.getElementById(checkId).value = "";
				return;
			}
		}
	}
}


jQuery.extend({
      getValues: function(word) {
        const url = "https://api.wordnik.com/v4/word.json/" + word + "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
        var checker = null;
        $.ajax({
          async: false,
            type: "GET",
            url: url
        }).done(function (result) {
            checker = true;
            
        }).fail(function () {
            checker = false;
        });
        return checker;
      }
});


function hasOneDayPassed(){
  // get today's date. eg: "7/37/2007"
  var date = new Date().toLocaleDateString();

  // if there's a date in localstorage and it's equal to the above: 
  // inferring a day has yet to pass since both dates are equal.
  if( localStorage.yourapp_date == date ) 
      return true;

  // this portion of logic occurs when a day has passed
  localStorage.yourapp_date = date;
  return true;
}

function lockAllInputs(){
	$('input').attr('readonly', true);
}

function onOpen(){
  document.getElementById('firstGuess').style.visibility = 'visible';
  document.getElementById('secondGuess').style.visibility = 'hidden';
  document.getElementById('thirdGuess').style.visibility = 'hidden';
  document.getElementById('fourthGuess').style.visibility = 'hidden';
  document.getElementById('fifthGuess').style.visibility = 'hidden';
  document.getElementById('sixthGuess').style.visibility = 'hidden';
  document.getElementById("R1L0").focus();
  lockAllInputs();
  //alert(check_if_word_exists("savages"));
  //var results = $.getValues("savages");
  //alert(results);
  
}

function validate(input){
    input.value = input.value.replace(/\W|\d/g, '').substr(0, 1).toUpperCase();
}
  
  String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
  }
  
  function checkWordR1(){
   // var secretWord = "WELCOME";
    var copySecretWord = secretWord;
    var L0 = document.getElementsByClassName('R1')[0].value;
    var L1 = document.getElementsByClassName('R1')[1].value;
    var L2 = document.getElementsByClassName('R1')[2].value;
    var L3 = document.getElementsByClassName('R1')[3].value;
    var L4 = document.getElementsByClassName('R1')[4].value;
    var L5 = document.getElementsByClassName('R1')[5].value;
    var L6 = document.getElementsByClassName('R1')[6].value;
    var out = [L0, L1, L2, L3, L4, L5, L6]
    var word = "";
	var count = 0;
    for (i=0; i<out.length; i++){
      word = word + out[i];
    }
	wordExists = $.getValues(word.toLowerCase());
	if (!wordExists){
		alert("The Word Entered Was Not A Valid Word");
		return;
	}
    if (word.length<7){
      alert("Not All Fields Filled");
      return;
    }
    else{
      var correctArr = [];
      var incorrectArr = [];
      for (i=0; i<secretWord.length; i++){
        const currLetter = document.getElementsByClassName('R1')[i];
        if(word.charAt(i) === secretWord.charAt(i)){
          console.log("Letter in position " + i + " is correct")
          currLetter.style.backgroundColor = 'green';
		  count = count + 1;
          currLetter.style.color = 'white';
          correctArr.push(i);
        }
      }
		if (count == 7){
			alert("You're A Genius! (But Probably Just A Cheater...)");
			document.getElementById('firstGuess').style.visibility = 'hidden';
			document.getElementById('secondGuess').style.visibility = 'hidden';
			document.getElementById('thirdGuess').style.visibility = 'hidden';
			document.getElementById('fourthGuess').style.visibility = 'hidden';
			document.getElementById('fifthGuess').style.visibility = 'hidden';
			document.getElementById('sixthGuess').style.visibility = 'hidden';
			lockAllInputs();
			return;
		}

      console.log(correctArr);
      for (i = 0; i < secretWord.length; i++){
        if (!correctArr.includes(i)){
          incorrectArr.push(i);
        }
      }
    }
    console.log(incorrectArr);
    var copyIncorrectArr = incorrectArr;
    var count = 0;
    for (i = 0; i < incorrectArr.length; i++){
      const currLetter = document.getElementsByClassName('R1')[incorrectArr[i]];
      for (j = 0; j < incorrectArr.length; j++){
        if (word.charAt(incorrectArr[i]) === copySecretWord.charAt(incorrectArr[j])){
          currLetter.style.backgroundColor = 'orange';
          currLetter.style.color = 'white';
          copySecretWord = copySecretWord.replaceAt(incorrectArr[j], " ");
          console.log(incorrectArr[j]);
          console.log(copySecretWord);
        }
      }
    }
    for (z = 0; z < secretWord.length; z++){
      if (document.getElementsByClassName('R1')[z].style.backgroundColor === ''){
        document.getElementsByClassName('R1')[z].style.backgroundColor = 'grey';
        document.getElementsByClassName('R1')[z].style.color = 'white';
      }
    }
    var id = "";
    for(i = 0; i < 7; i++){
      id = "R1L" + i;
      document.getElementById(id).readOnly = true;
    }
	for (i = 0; i < 7; i++){
		var currLetter = "R1L" + String(i);
		if(document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === ''){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = document.getElementById(currLetter).style.backgroundColor;
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'orange' && document.getElementById(currLetter).style.backgroundColor === 'green'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'green';
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'grey' && document.getElementById(currLetter).style.backgroundColor === 'green'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'green';
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'grey' && document.getElementById(currLetter).style.backgroundColor === 'orange'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'orange';
		}
	}
    document.getElementById('firstGuess').style.visibility = 'hidden';
    document.getElementById('secondGuess').style.visibility = 'visible';
	document.getElementById("R2L0").focus();
  }

function checkWordR2(){
    var copySecretWord = secretWord;
    var L0 = document.getElementsByClassName('R2')[0].value;
    var L1 = document.getElementsByClassName('R2')[1].value;
    var L2 = document.getElementsByClassName('R2')[2].value;
    var L3 = document.getElementsByClassName('R2')[3].value;
    var L4 = document.getElementsByClassName('R2')[4].value;
    var L5 = document.getElementsByClassName('R2')[5].value;
    var L6 = document.getElementsByClassName('R2')[6].value;
    var out = [L0, L1, L2, L3, L4, L5, L6]
    var word = "";
	var count = 0;
    for (i=0; i<out.length; i++){
      word = word + out[i];
    }
    if (word.length<7){
      alert("Not All Fields Filled");
      return;
    }
    else{
      var correctArr = [];
      var incorrectArr = [];
      for (i=0; i<secretWord.length; i++){
        const currLetter = document.getElementsByClassName('R2')[i];
        if(word.charAt(i) === secretWord.charAt(i)){
          console.log("Letter in position " + i + " is correct")
          currLetter.style.backgroundColor = 'green';
          currLetter.style.color = 'white';
		  count = count + 1;
          correctArr.push(i);
        }
      }
	  	if (count == 7){
			alert("Down in Two! (You're Either Lucky Or A Cheater.... Probably Just A Cheater)");
			document.getElementById('firstGuess').style.visibility = 'hidden';
			document.getElementById('secondGuess').style.visibility = 'hidden';
			document.getElementById('thirdGuess').style.visibility = 'hidden';
			document.getElementById('fourthGuess').style.visibility = 'hidden';
			document.getElementById('fifthGuess').style.visibility = 'hidden';
			document.getElementById('sixthGuess').style.visibility = 'hidden';
			lockAllInputs();
			return;
		}
      console.log(correctArr);
      for (i = 0; i < secretWord.length; i++){
        if (!correctArr.includes(i)){
          incorrectArr.push(i);
        }
      }
    }
    console.log(incorrectArr);
    var copyIncorrectArr = incorrectArr;
    var count = 0;
    for (i = 0; i < incorrectArr.length; i++){
      const currLetter = document.getElementsByClassName('R2')[incorrectArr[i]];
      for (j = 0; j < incorrectArr.length; j++){
        if (word.charAt(incorrectArr[i]) === copySecretWord.charAt(incorrectArr[j])){
          currLetter.style.backgroundColor = 'orange';
          currLetter.style.color = 'white';
          copySecretWord = copySecretWord.replaceAt(incorrectArr[j], " ");
          console.log(incorrectArr[j]);
          console.log(copySecretWord);
        }
      }
    }
    for (z = 0; z < secretWord.length; z++){
      if (document.getElementsByClassName('R2')[z].style.backgroundColor === ''){
        document.getElementsByClassName('R2')[z].style.backgroundColor = 'grey';
        document.getElementsByClassName('R2')[z].style.color = 'white';
      }
    }
    var id = "";
    for(i = 0; i < 7; i++){
      id = "R2L" + i;
      document.getElementById(id).readOnly = true;
    }
	for (i = 0; i < 7; i++){
		var currLetter = "R2L" + String(i);
		if(document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === ''){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = document.getElementById(currLetter).style.backgroundColor;
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'orange' && document.getElementById(currLetter).style.backgroundColor === 'green'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'green';
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'grey' && document.getElementById(currLetter).style.backgroundColor === 'green'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'green';
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'grey' && document.getElementById(currLetter).style.backgroundColor === 'orange'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'orange';
		}
	}
    document.getElementById('secondGuess').style.visibility = 'hidden';
    document.getElementById('thirdGuess').style.visibility = 'visible';
	document.getElementById("R3L0").focus();
    //alert(secretWord);
  }

  function checkWordR3(){
    var copySecretWord = secretWord;
    var L0 = document.getElementsByClassName('R3')[0].value;
    var L1 = document.getElementsByClassName('R3')[1].value;
    var L2 = document.getElementsByClassName('R3')[2].value;
    var L3 = document.getElementsByClassName('R3')[3].value;
    var L4 = document.getElementsByClassName('R3')[4].value;
    var L5 = document.getElementsByClassName('R3')[5].value;
    var L6 = document.getElementsByClassName('R3')[6].value;
    var out = [L0, L1, L2, L3, L4, L5, L6]
    var word = "";
	var count = 0;
    for (i=0; i<out.length; i++){
      word = word + out[i];
    }
    if (word.length<7){
      alert("Not All Fields Filled");
      return;
    }
    else{
      var correctArr = [];
      var incorrectArr = [];
      for (i=0; i<secretWord.length; i++){
        const currLetter = document.getElementsByClassName('R3')[i];
        if(word.charAt(i) === secretWord.charAt(i)){
          console.log("Letter in position " + i + " is correct")
          currLetter.style.backgroundColor = 'green';
          currLetter.style.color = 'white';
		  count = count + 1;
          correctArr.push(i);
        }
      }
	  	if (count == 7){
			alert("Congrats, Down In Three!");
			document.getElementById('firstGuess').style.visibility = 'hidden';
			document.getElementById('secondGuess').style.visibility = 'hidden';
			document.getElementById('thirdGuess').style.visibility = 'hidden';
			document.getElementById('fourthGuess').style.visibility = 'hidden';
			document.getElementById('fifthGuess').style.visibility = 'hidden';
			document.getElementById('sixthGuess').style.visibility = 'hidden';
			lockAllInputs();
			return;
		}
      console.log(correctArr);
      for (i = 0; i < secretWord.length; i++){
        if (!correctArr.includes(i)){
          incorrectArr.push(i);
        }
      }
    }
    console.log(incorrectArr);
    var copyIncorrectArr = incorrectArr;
    var count = 0;
    for (i = 0; i < incorrectArr.length; i++){
      const currLetter = document.getElementsByClassName('R3')[incorrectArr[i]];
      for (j = 0; j < incorrectArr.length; j++){
        if (word.charAt(incorrectArr[i]) === copySecretWord.charAt(incorrectArr[j])){
          currLetter.style.backgroundColor = 'orange';
          currLetter.style.color = 'white';
          copySecretWord = copySecretWord.replaceAt(incorrectArr[j], " ");
          console.log(incorrectArr[j]);
          console.log(copySecretWord);
        }
      }
    }
    for (z = 0; z < secretWord.length; z++){
      if (document.getElementsByClassName('R3')[z].style.backgroundColor === ''){
        document.getElementsByClassName('R3')[z].style.backgroundColor = 'grey';
        document.getElementsByClassName('R3')[z].style.color = 'white';
      }
    }
    var id = "";
    for(i = 0; i < 7; i++){
      id = "R3L" + i;
      document.getElementById(id).readOnly = true;
    }
	for (i = 0; i < 7; i++){
		var currLetter = "R3L" + String(i);
		if(document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === ''){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = document.getElementById(currLetter).style.backgroundColor;
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'orange' && document.getElementById(currLetter).style.backgroundColor === 'green'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'green';
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'grey' && document.getElementById(currLetter).style.backgroundColor === 'green'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'green';
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'grey' && document.getElementById(currLetter).style.backgroundColor === 'orange'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'orange';
		}
	}
    document.getElementById('thirdGuess').style.visibility = 'hidden';
    document.getElementById('fourthGuess').style.visibility = 'visible';
	document.getElementById("R4L0").focus();
  }


  function checkWordR4(){
    var copySecretWord = secretWord;
    var L0 = document.getElementsByClassName('R4')[0].value;
    var L1 = document.getElementsByClassName('R4')[1].value;
    var L2 = document.getElementsByClassName('R4')[2].value;
    var L3 = document.getElementsByClassName('R4')[3].value;
    var L4 = document.getElementsByClassName('R4')[4].value;
    var L5 = document.getElementsByClassName('R4')[5].value;
    var L6 = document.getElementsByClassName('R4')[6].value;
    var out = [L0, L1, L2, L3, L4, L5, L6]
    var word = "";
	var count = 0;
    for (i=0; i<out.length; i++){
      word = word + out[i];
    }
    if (word.length<7){
      alert("Not All Fields Filled");
      return;
    }
    else{
      var correctArr = [];
      var incorrectArr = [];
      for (i=0; i<secretWord.length; i++){
        const currLetter = document.getElementsByClassName('R4')[i];
        if(word.charAt(i) === secretWord.charAt(i)){
          console.log("Letter in position " + i + " is correct")
          currLetter.style.backgroundColor = 'green';
          currLetter.style.color = 'white';
		  count = count + 1;
          correctArr.push(i);
        }
      }
	  	if (count == 7){
			alert("Respectable. Down In Four.");
			document.getElementById('firstGuess').style.visibility = 'hidden';
			document.getElementById('secondGuess').style.visibility = 'hidden';
			document.getElementById('thirdGuess').style.visibility = 'hidden';
			document.getElementById('fourthGuess').style.visibility = 'hidden';
			document.getElementById('fifthGuess').style.visibility = 'hidden';
			document.getElementById('sixthGuess').style.visibility = 'hidden';
			lockAllInputs();
			return;
		}
      console.log(correctArr);
      for (i = 0; i < secretWord.length; i++){
        if (!correctArr.includes(i)){
          incorrectArr.push(i);
        }
      }
    }
    console.log(incorrectArr);
    var copyIncorrectArr = incorrectArr;
    var count = 0;
    for (i = 0; i < incorrectArr.length; i++){
      const currLetter = document.getElementsByClassName('R4')[incorrectArr[i]];
      for (j = 0; j < incorrectArr.length; j++){
        if (word.charAt(incorrectArr[i]) === copySecretWord.charAt(incorrectArr[j])){
          currLetter.style.backgroundColor = 'orange';
          currLetter.style.color = 'white';
          copySecretWord = copySecretWord.replaceAt(incorrectArr[j], " ");
          console.log(incorrectArr[j]);
          console.log(copySecretWord);
        }
      }
    }
    for (z = 0; z < secretWord.length; z++){
      if (document.getElementsByClassName('R4')[z].style.backgroundColor === ''){
        document.getElementsByClassName('R4')[z].style.backgroundColor = 'grey';
        document.getElementsByClassName('R4')[z].style.color = 'white';
      }
    }
    var id = "";
    for(i = 0; i < 7; i++){
      id = "R4L" + i;
      document.getElementById(id).readOnly = true;
    }
	for (i = 0; i < 7; i++){
		var currLetter = "R4L" + String(i);
		if(document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === ''){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = document.getElementById(currLetter).style.backgroundColor;
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'orange' && document.getElementById(currLetter).style.backgroundColor === 'green'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'green';
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'grey' && document.getElementById(currLetter).style.backgroundColor === 'green'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'green';
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'grey' && document.getElementById(currLetter).style.backgroundColor === 'orange'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'orange';
		}
	}
    document.getElementById('fourthGuess').style.visibility = 'hidden';
    document.getElementById('fifthGuess').style.visibility = 'visible';
	document.getElementById("R5L0").focus();
  }

  function checkWordR5(){
    var copySecretWord = secretWord;
    var L0 = document.getElementsByClassName('R5')[0].value;
    var L1 = document.getElementsByClassName('R5')[1].value;
    var L2 = document.getElementsByClassName('R5')[2].value;
    var L3 = document.getElementsByClassName('R5')[3].value;
    var L4 = document.getElementsByClassName('R5')[4].value;
    var L5 = document.getElementsByClassName('R5')[5].value;
    var L6 = document.getElementsByClassName('R5')[6].value;
    var out = [L0, L1, L2, L3, L4, L5, L6]
    var word = "";
	var count = 0;
    for (i=0; i<out.length; i++){
      word = word + out[i];
    }
    if (word.length<7){
      alert("Not All Fields Filled");
      return;
    }
    else{
      var correctArr = [];
      var incorrectArr = [];
      for (i=0; i<secretWord.length; i++){
        const currLetter = document.getElementsByClassName('R5')[i];
        if(word.charAt(i) === secretWord.charAt(i)){
          console.log("Letter in position " + i + " is correct")
          currLetter.style.backgroundColor = 'green';
          currLetter.style.color = 'white';
		  count = count + 1;
          correctArr.push(i);
        }
      }
	  	if (count == 7){
			alert("Down In Five. Borderline Embarrassing...");
			document.getElementById('firstGuess').style.visibility = 'hidden';
			document.getElementById('secondGuess').style.visibility = 'hidden';
			document.getElementById('thirdGuess').style.visibility = 'hidden';
			document.getElementById('fourthGuess').style.visibility = 'hidden';
			document.getElementById('fifthGuess').style.visibility = 'hidden';
			document.getElementById('sixthGuess').style.visibility = 'hidden';
			lockAllInputs();
			return;
		}
      console.log(correctArr);
      for (i = 0; i < secretWord.length; i++){
        if (!correctArr.includes(i)){
          incorrectArr.push(i);
        }
      }
    }
    console.log(incorrectArr);
    var copyIncorrectArr = incorrectArr;
    var count = 0;
    for (i = 0; i < incorrectArr.length; i++){
      const currLetter = document.getElementsByClassName('R5')[incorrectArr[i]];
      for (j = 0; j < incorrectArr.length; j++){
        if (word.charAt(incorrectArr[i]) === copySecretWord.charAt(incorrectArr[j])){
          currLetter.style.backgroundColor = 'orange';
          currLetter.style.color = 'white';
          copySecretWord = copySecretWord.replaceAt(incorrectArr[j], " ");
          console.log(incorrectArr[j]);
          console.log(copySecretWord);
        }
      }
    }
    for (z = 0; z < secretWord.length; z++){
      if (document.getElementsByClassName('R5')[z].style.backgroundColor === ''){
        document.getElementsByClassName('R5')[z].style.backgroundColor = 'grey';
        document.getElementsByClassName('R5')[z].style.color = 'white';
      }
    }
    var id = "";
    for(i = 0; i < 7; i++){
      id = "R5L" + i;
      document.getElementById(id).readOnly = true;
    }
	for (i = 0; i < 7; i++){
		var currLetter = "R5L" + String(i);
		if(document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === ''){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = document.getElementById(currLetter).style.backgroundColor;
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'orange' && document.getElementById(currLetter).style.backgroundColor === 'green'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'green';
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'grey' && document.getElementById(currLetter).style.backgroundColor === 'green'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'green';
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'grey' && document.getElementById(currLetter).style.backgroundColor === 'orange'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'orange';
		}
	}
    document.getElementById('fifthGuess').style.visibility = 'hidden';
    document.getElementById('sixthGuess').style.visibility = 'visible';
	document.getElementById("R6L0").focus();
  }

  function checkWordR6(){
    var copySecretWord = secretWord;
    var L0 = document.getElementsByClassName('R6')[0].value;
    var L1 = document.getElementsByClassName('R6')[1].value;
    var L2 = document.getElementsByClassName('R6')[2].value;
    var L3 = document.getElementsByClassName('R6')[3].value;
    var L4 = document.getElementsByClassName('R6')[4].value;
    var L5 = document.getElementsByClassName('R6')[5].value;
    var L6 = document.getElementsByClassName('R6')[6].value;
    var out = [L0, L1, L2, L3, L4, L5, L6]
    var word = "";
	var count = 0;
    for (i=0; i<out.length; i++){
      word = word + out[i];
    }
    if (word.length<7){
      alert("Not All Fields Filled");
      return;
    }
    else{
      var correctArr = [];
      var incorrectArr = [];
      for (i=0; i<secretWord.length; i++){
        const currLetter = document.getElementsByClassName('R6')[i];
        if(word.charAt(i) === secretWord.charAt(i)){
          console.log("Letter in position " + i + " is correct")
          currLetter.style.backgroundColor = 'green';
          currLetter.style.color = 'white';
          correctArr.push(i);
		  count = count + 1;
        }
      }
	  	if (count == 7){
			alert("Just In Time. Do Better...");
			document.getElementById('firstGuess').style.visibility = 'hidden';
			document.getElementById('secondGuess').style.visibility = 'hidden';
			document.getElementById('thirdGuess').style.visibility = 'hidden';
			document.getElementById('fourthGuess').style.visibility = 'hidden';
			document.getElementById('fifthGuess').style.visibility = 'hidden';
			document.getElementById('sixthGuess').style.visibility = 'hidden';
			lockAllInputs();
			return;
		}
		else{
			alert("You're Shit!");
		}
      console.log(correctArr);
      for (i = 0; i < secretWord.length; i++){
        if (!correctArr.includes(i)){
          incorrectArr.push(i);
        }
      }
    }
    console.log(incorrectArr);
    var copyIncorrectArr = incorrectArr;
    var count = 0;
    for (i = 0; i < incorrectArr.length; i++){
      const currLetter = document.getElementsByClassName('R6')[incorrectArr[i]];
      for (j = 0; j < incorrectArr.length; j++){
        if (word.charAt(incorrectArr[i]) === copySecretWord.charAt(incorrectArr[j])){
          currLetter.style.backgroundColor = 'orange';
          currLetter.style.color = 'white';
          copySecretWord = copySecretWord.replaceAt(incorrectArr[j], " ");
          console.log(incorrectArr[j]);
          console.log(copySecretWord);
        }
      }
    }
    for (z = 0; z < secretWord.length; z++){
      if (document.getElementsByClassName('R6')[z].style.backgroundColor === ''){
        document.getElementsByClassName('R6')[z].style.backgroundColor = 'grey';
        document.getElementsByClassName('R6')[z].style.color = 'white';
      }
    }
    var id = "";
    for(i = 0; i < 7; i++){
      id = "R6L" + i;
      document.getElementById(id).readOnly = true;
    }
	for (i = 0; i < 7; i++){
		var currLetter = "R6L" + String(i);
		if(document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === ''){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = document.getElementById(currLetter).style.backgroundColor;
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'orange' && document.getElementById(currLetter).style.backgroundColor === 'green'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'green';
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'grey' && document.getElementById(currLetter).style.backgroundColor === 'green'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'green';
		}
		else if (document.getElementById(document.getElementById(currLetter).value).style.backgroundColor === 'grey' && document.getElementById(currLetter).style.backgroundColor === 'orange'){
			document.getElementById(document.getElementById(currLetter).value).style.backgroundColor = 'orange';
		}
	}
    document.getElementById('sixthGuess').style.visibility = 'hidden';

	
    //document.getElementById('fourthGuess').style.visibility = 'visible';
  }