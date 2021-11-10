window.onload = function(){
    var lookupCountryBtn = document.getElementById("lookupCountry");
    var lookupCitiesBtn = document.getElementById("lookupCities");
    

    lookupCountryBtn.addEventListener("click", function(event){
      event.preventDefault();
      //console.log("button clicked");
      var httpRequest = new XMLHttpRequest();
      var input = document.querySelector("input").value;
      var valid = true;
      var url = "world.php?country="+input;
      httpRequest.onreadystatechange = searchForCountry;
      httpRequest.open('GET', url);
      httpRequest.send();

      if (!isValidInput(input.trim())) {
        valid = false;
        alert("Incorrect format for text. Only letters, parentheses and spaces allowed.");
      }
      
      function isValidInput(input) {
        var regex = /^([a-zA-Z\s-,\(\)])*$/;
        if(regex.test(input)){
          return true
        }
      }
      function searchForCountry(){
        if(isValidInput(input)==true){
          if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
              var response = httpRequest.responseText;
              var result = document.getElementById("result");
              result.innerHTML = response;
            }
            else {
              alert('There was a problem with the request.');
            }
          }
        }
      }
    });

    lookupCitiesBtn.addEventListener("click", function(event){
      event.preventDefault();
      var valid = true;
      var httpRequest = new XMLHttpRequest();
      var input = document.querySelector("input").value;
      var url = "world.php?country="+input+"&context=cities";
      httpRequest.onreadystatechange = searchForCities;
      httpRequest.open('GET', url);
      httpRequest.send();

      if (!isValidInput(input.trim())) {
        valid = false;
        alert("Incorrect format for text. Only letters, parentheses and spaces allowed.");
      }
      
      function isValidInput(input) {
        var regex = /^([a-zA-Z\s-,\(\)])*$/;
        if(regex.test(input)){
          return true
        }
      }
      function searchForCities(){
        if(isValidInput(input)==true){
          if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
              var response = httpRequest.responseText;
              var result = document.getElementById("result");
              result.innerHTML = response;
            }
            else {
              alert('There was a problem with the request.');
            }
          }
        }
      }
    });
  }
