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


database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());

    //Create new row and define data values
    var newRow = $("<tr></tr>");
    var newTrain = $("<td></td>");
    $(newTrain).text(snapshot.val().name);
    var newDestination = $("<td></td>");
    $(newDestination).text(snapshot.val().destination);
    var newTime = $("<td></td>");
    $(newTime).text(snapshot.val().time);
    var newFrequency = $("<td></td>");
    $(newFrequency).text(snapshot.val().frequency);


    //Append to new row the data
    $(newRow).append(newTrain);
    $(newRow).append(newDestination);
    $(newRow).append(newTime);
    $(newRow).append(newFrequency);


    //Append the new row to the table
    $("#table").append(newRow);
})


//Function to clear out forms after user input
var clearFields = function(){
    $(".form-control").val("");
}
