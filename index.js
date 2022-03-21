document.addEventListener('DOMContentLoaded', function() {

    document.getElementsByTagName('form')[0].onsubmit = function(evt) {
      evt.preventDefault(); // Preventing the form from submitting
      checkWord(); // Do your magic and check the entered word/sentence
      window.scrollTo(0,150);
    }
  
    // Get the focus to the text input to enter a word right away.
    document.getElementById('terminalTextInput').focus();
  
    // Getting the text from the input
    var textInputValue = document.getElementById('terminalTextInput').value.trim();
  
    //Getting the text from the results div
    var textResultsValue = document.getElementById('terminalReslutsCont').innerHTML;
  
    // Clear text input
    var clearInput = function(){
      document.getElementById('terminalTextInput').value = "";
    }
  
    // Scrtoll to the bottom of the results div
    var scrollToBottomOfResults = function(){
      var terminalResultsDiv = document.getElementById('terminalReslutsCont');
      terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
    }
  
    // Scroll to the bottom of the results
    scrollToBottomOfResults();
  
    // Add text to the results div
    var addTextToResults = function(textToAdd){
      document.getElementById('terminalReslutsCont').innerHTML += "<p>" + textToAdd + "</p>";
      scrollToBottomOfResults();
    }
  //--------------------------HELP--------------------------------------------HELP-----------------------------------------HELP--------------------------------
    // Getting the list of keywords for help & posting it to the screen
    var postHelpList = function(){
      // Array of all the help keywords
      var helpKeyWords = [
        "- 这是Rinkore服务器的文档（确信",
        "- 下面将会是一些你能用到的命令",
        "- IP 查询你的IP情况，如果是IPV6就恭喜你可以使用低延迟通道",
        "- QA 查看常见问题"
      ].join('<br>');
      addTextToResults(helpKeyWords);
    }
  
    // Getting the time and date and post it depending on what you request for
    var getTimeAndDate = function(postTimeDay){
      var timeAndDate = new Date();
      var timeHours = timeAndDate.getHours();
      var timeMinutes = timeAndDate.getMinutes();
      var dateDay = timeAndDate.getDate();
      console.log(dateDay);
      var dateMonth = timeAndDate.getMonth() + 1; // Because JS starts counting months from 0
      var dateYear = timeAndDate.getFullYear(); // Otherwise we'll get the count like 98,99,100,101...etc.
  
      if (timeHours < 10){ // if 1 number display 0 before it.
        timeHours = "0" + timeHours;
      }
  
      if (timeMinutes < 10){ // if 1 number display 0 before it.
        timeMinutes = "0" + timeMinutes;
      }
  
      var currentTime = timeHours + ":" + timeMinutes;
      var currentDate = dateDay + "/" + dateMonth + "/" + dateYear;
  
      if (postTimeDay == "time"){
        addTextToResults(currentTime);
      }
      if (postTimeDay == "date"){
        addTextToResults(currentDate);
      }
    }
  
    // Opening links in a new window
    var openLinkInNewWindow = function(linkToOpen){
      window.open(linkToOpen, '_blank');
      clearInput();
    }
  //-----------------------------------REPLY-----------------------------------------REPLY-------------------------------------REPLY----------------------
    // Having a specific text reply to specific strings
    var textReplies = function() {
      switch(textInputValueLowerCase){
        // funny replies [START]
        case "mahdi":
          clearInput();
          addTextToResults("He's my maker <a target='_blank' href='https://twitter.com/mahdif'>@mahdif</a>");
          break;

        case "ip":
          clearInput();
          addTextToResults('推荐使用低延迟ip,即ob.rinkore.xyz');
          openLinkInNewWindow('https://ipw.cn');
          break;

        case "time":
          clearInput();
          getTimeAndDate("time");
          break;
  
        case "date":
          clearInput();
          getTimeAndDate("date");
          break;
  
        case "help":
        case "?":
          clearInput();
          postHelpList();
          break;
  
        default:
        clearInput();
        addTextToResults("<p><i>命令 " + "<b>" + textInputValue + "</b>" + " 不存在。 键入 <b>Help</b> 来查看所有命令 </i></p>");
        break;
      }
    }
  
  // Main function to check the entered text and assign it to the correct function
    var checkWord = function() {
      textInputValue = document.getElementById('terminalTextInput').value.trim(); //get the text from the text input to a variable
      textInputValueLowerCase = textInputValue.toLowerCase(); //get the lower case of the string
  
      if (textInputValue != ""){ //checking if text was entered
        addTextToResults("<p class='userEnteredText'>> " + textInputValue + "</p>");
        if (textInputValueLowerCase.substr(0,5) == "open ") { //if the first 5 characters = open + space
          openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5));
          addTextToResults("<i>The URL " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened now.</i>");
        } else if (textInputValueLowerCase.substr(0,8) == "youtube ") {
          openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8));
          addTextToResults("<i>I've searched on YouTube for " + "<b>" + textInputValue.substr(8) + "</b>" + " it should be opened now.</i>");
        } else if (textInputValueLowerCase.substr(0,7) == "google ") {
          openLinkInNewWindow('https://www.google.com/search?q=' + textInputValueLowerCase.substr(7));
          addTextToResults("<i>I've searched on Google for " + "<b>" + textInputValue.substr(7) + "</b>" + " it should be opened now.</i>");
        } else if (textInputValueLowerCase.substr(0,5) == "wiki "){
          openLinkInNewWindow('https://wikipedia.org/w/index.php?search=' + textInputValueLowerCase.substr(5));
          addTextToResults("<i>I've searched on Wikipedia for " + "<b>" + textInputValue.substr(5) + "</b>" + " it should be opened now.</i>");
        } else{
          textReplies();
        }
      }
    };
  
  });
  