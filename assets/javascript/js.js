//Firebase Initialization
var config = {
    apiKey: "###",  //removed API Key
    authDomain: "homework-7-1d926.firebaseapp.com",
    databaseURL: "https://homework-7-1d926.firebaseio.com",
    projectId: "homework-7-1d926",
    storageBucket: "homework-7-1d926.appspot.com",
    messagingSenderId: "518437898400"
  };

  firebase.initializeApp(config);
  var database = firebase.database();



//Global declaration of variables
var trainName="";
var destination="";
var trainTime="";
var frequency="";
var time;


//On-Click event for the submit button
$(".btn-primary").on("click", function(event){
    event.preventDefault();

    //User inputs
    trainName = $("#name").val().trim();
    destination = $("#destination").val().trim();
    trainTime =  $("#time").val().trim();
    frequency =  $("#frequency").val().trim();

    //Local temporary newTrain object
    var newTrainObj = {
        name: trainName,
        destination: destination,
        time: trainTime,
        frequency: frequency
    }

    //Upload train data to firebase
    database.ref().push(newTrainObj);
    clearFields();
});

//Snapshot event of when data is added to firebase
database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());

    //Create new row and define data values
    var newRow = $("<tr>");
    var newTrain = $("<td>");
    $(newTrain).text(snapshot.val().name);
    var newDestination = $("<td>");
    $(newDestination).text(snapshot.val().destination);
    var newTime = snapshot.val().time;
    var newFrequency = parseInt(snapshot.val().frequency);

   //Converting the times and doing the math
   newTime = moment(snapshot.val().time, "HH:mm").format("X");
   console.log(newTime);

   newTime =  moment(newTime, "X").subtract(1,'years');
   var timeDifference = moment().diff(newTime, 'minutes');
   console.log(timeDifference);
   
   var timeLeft = timeDifference%newFrequency;
   var minutesAway = newFrequency - timeLeft;
   var nextTrain = moment().add(minutesAway, 'minutes');
   nextTrain = moment(nextTrain).format('hh:mm a');
   console.log(nextTrain);



    //Append to new row the data
    $(newRow).append(newTrain);
    $(newRow).append(newDestination);
    $(newRow).append($("<td>").text(newFrequency));
    $(newRow).append($("<td>").text(nextTrain));
    $(newRow).append($("<td>").text(minutesAway));



    //Append the new row to the table
    $("#table").append(newRow);
})


//Function to clear out forms after user input
var clearFields = function(){
    $(".form-control").val("");
}

//Displays Current Time to update every second

var currentTime = function(){
    time = moment().format('MMMM Do YYYY, h:mm:ss a');
$("#text").text("Current Train Schedule"+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+time);
}

setInterval(currentTime, 1000);