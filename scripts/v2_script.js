delete Chat.display;
delete Chat.fetch;
delete Chat.send;
      
var display = function(words) // place items in unordered list to be displayed
{
	$('.messages').append( $('<li>').append(words) );
}

var fetch = function(func) // ajax to grab chat messages from the host
{
	
	$.ajax({   
		type: 		"GET",
		url:  		"https://api.parse.com/1/classes/chats",
		success:    function(data) 
					{
						var temp = [1,2,3];
						for(var i = 0; i < data.results.length; i++)
						{
							temp[i] = data.results[i].text;
						}
						func(temp);
					} 
	}); 
}

var $_GET = {}; //$_GET variable

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () // A ridiculous method to find value of query string that 
	function decode(s) 													  //I found on stack overflow. FIND BETTER WAY >.<
{	
	{
		return decodeURIComponent(s.split("+").join(" "));
	}

	$_GET[decode(arguments[1])] = decode(arguments[2]);
});

var send = function(textIn) // function to send user generated text to host to be put into chat
{
	
	var fullText = $_GET['username'] + ": " + textIn; //php grabbing ftw
	var textData = 
	{ 
		text: fullText
	};
	var thing = "stuff";
	var sendData = JSON.stringify(textData);
	console.log(sendData);
	
	$.ajax({
		type:		"POST",
		url:  		"https://api.parse.com/1/classes/chats",
		dataType: 	"json",
		data:		sendData
		
	});
}

Chat.guide.start(); //starts connection

//var array1 = [2,4,6,5,1]; //test array
var stuff = function(array)
{
//console.log(array1);
	$('.messages').empty();  // make space in chat field
	for(var i  = 0; i < array.length; i++) // cycle through array produced by callback 
	{
		display(array[i]); //call server provided function
		
		//Jquery to retrieve messages element
		//Replace items in messages element with new items
	}
	//array1 = array; // testing
	//setTimeout(Chat.fetch(stuff), 3000);
	setTimeout(fetch(stuff), 3000); // 3 sec delay
}

//setTimeout(Chat.fetch(stuff), 3000);
//setTimeout(fetch(stuff), 3000);
fetch(stuff); // just a straight call of fetch without delay because that was a dumb idea 

$( document ).ready(function()  //when ready do function
{
	$(".send").click(function() // jquery to send perform action upon click
	{
		var val = $('.draft').val();  //save value from textbox to val
		//Chat.send(val); // use provided send function to send val to chat field
		send(val);
	});
});
			
            