//alert("CHECK");
var button = document.getElementById("btn");
var button2 = document.getElementById("btn2");
var button3 = document.getElementById("btn3");
var data = document.getElementById("search");
var optionIndex = 0;
var temp;
var name;
button.addEventListener("click", find);
data.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
      alert(key);
      find();
    }
});

function find() {
  name = data.value || "";
  optionIndex = 0;
  //alert("CHECK");
  //alert(name);
  //data.innerHTML = "Player Name is " + name;
  var BigParserAccountEmail = "sagardsaxena@gmail.com"//"2019padusuma@tjhsst.edu"
  var BigParserAccountPassword = "Tq7y-JnJt-HoNM-SL9R"//"SLta-AtKn-GZ7A-AnCtR"
  var endpoint = "https://www.bigparser.com/APIServices/api/common/login"
  var options = JSON.stringify({
        "emailId": BigParserAccountEmail,
        "password": BigParserAccountPassword,
        "loggedIn": true
   })

   $.ajax({
    url: endpoint,
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: options,
    success: function(data){
        endpoint = "https://www.bigparser.com/APIServices/api/query/table?endIndex=50&startIndex=0"
        options = JSON.stringify({
            "gridId": "5903df82198457548d1379b1",
            "selectColumnsStoreName": [],
            "keywords": [name],
            "rowCount": 50,
            "tags": [],
            "viewId": null,
            "sortKeys": []
        })

        headers = {
            'authId':data.authId,
            'Accept':'application/json',
            'Content-Type':'application/json'
        }

        $.ajax({
            url: endpoint,
            headers: headers,
            method: 'POST',
            dataType: 'json',
            data: options,
            success: function(data){
              temp = data;
              //var PlayerName = /*console.log('succes: '+ */data.rows[0].data[0];//);
              if(data.rows == null) alert("Error, Person Not Found");
              else{
                //number of people found
                var results = getSize(data, false);
                alert(results + " results found")
                process(data.rows[0]);
                button2.addEventListener("click", function(){
                  if(optionIndex < results) optionIndex++;
                  process(data.rows[optionIndex])
                });
                button3.addEventListener("click", function(){
                  if(optionIndex > 0) optionIndex--;
                  process(data.rows[optionIndex])
                });
                
              }
            }
        });
    }
    });
    
}

function process(row){
  //console.log(row);
  //number of descriptions per person
  var param = getSize(row, true);
  //console.log(param);
  //set image       
  if(row.data[param-1] != null)
    document.getElementById("image").src = row.data[param-1];
  else
    document.getElementById("image").src = "http://www.birthdaydirect.com/popup_image.php?pID=16068";
  //set descriptions              
  var count = 0;
  for(i = 0; i < param-1; i++){
    var gridValue = row.data[i];
    if(gridValue != null && gridValue != "null" && (i != 1 && i!=3 && i!= 4 && i!= 5)){
      count++;
      document.getElementById("" + count).innerHTML = gridValue;
    }
  }
}

function getSize(row, bool){
  var count = 0;
  if(bool){
    while(row.data[count] != null)
      count++;
  }else{
    while(row.rows[count] != null)
      count++;
  }
  return count;
}



///////////////End Changed Code