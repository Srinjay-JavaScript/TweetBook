//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyA_xZNvaKvNelThZ-zM7nRjaV6MMOUpETU",
      authDomain: "tweetbook-b81e6.firebaseapp.com",
      databaseURL: "https://tweetbook-b81e6.firebaseio.com",
      projectId: "tweetbook-b81e6",
      storageBucket: "tweetbook-b81e6.appspot.com",
      messagingSenderId: "942255417476",
      appId: "1:942255417476:web:37fef613c8f79d8d173ad1"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var rn = localStorage.getItem("roomname");
    var un = localStorage.getItem("user_name");
function getData() { firebase.database().ref("/"+rn).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(message_data);
         name = message_data['name'];
         message = message_data['message'];
         like_count = message_data['like'];
         html_name = "<h4>" + name + "<img class='user_tick' src='tick.png'> </h4>";
         html_message = "<h4 class='message_h4'>" + message + "</h4>";
         html_button = "<button class='btn btn-warning' id='" +  firebase_message_id + "' value='" + like_count + "' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: " + like_count + "</span></button><hr>";
         row = html_name + html_message + html_button;
         console.log(row);
         document.getElementById("output").innerHTML += row;


      } });  }); }
getData();


function send(){
     firebase.database().ref(rn).push({
           name: un,
           message: document.getElementById("message").value,
           like: 0
     }) 
      document.getElementById("message").innerHTML = "";
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("roomname");
      window.location = "index.html";
    }
    function check(){
      if (sessionStorage.getItem("user_name") == null){
        window.location = "index.html";
      }
    }
function updateLike(button_id){
      console.log("I am inside update function")
btn_value = document.getElementById(button_id).value;
updated_like_count = Number(btn_value) + 1;

firebase.database().ref(rn).child(button_id).update({
     like: updated_like_count
});
}