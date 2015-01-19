				
				delete Chat.display;  //deletion of provided functions
				delete Chat.fetch;
				delete Chat.send;
                      
				var display = function(words) //Function for displaying and updating items in unordered list
				{
					$('.messages').append( $('<li>').append(words) ); // jquery for appending an item into list of class messages
				}
				
				var fetch = function(func) // function to retrieve chat message data from host
				{
					$.ajax({   // ajax to get the data from chats url 
						type: 		"GET",
						url:  		"https://api.parse.com/1/classes/chats",
						success:    function(data) 
									{
										var temp = [1,2,3]; // temp array to contain incoming characters
										for(var i = 0; i < data.results.length; i++) // for loop to cycle data into array
										{
											temp[i] = data.results[i].text;
										}
										func(temp); // function callback with temp array data
									} 
					}); 
				}
				
				var send = function(textIn) // function that sents user input into chat 
				{
					var $_GET = {}; // Set up variable to gain access to $_GET array items
				
					var queryBits = window.location.search.split("&"); // grab the query portion of the url
				
					for (var i = 0; i < queryBits.length; i++) // traverse over the parts
					{
						var temp = queryBits[i].split("="); // for each query with a value split key and value
						$_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]); // at position of key, set value equal to query item value
					}
					
					var fullText = $_GET['username'] + ": " + textIn; //php grabbing ftw
					var textData =  // json variable containing text for chat
					{ 
						text: fullText
					};
					var sendData = JSON.stringify(textData); // convert items in json into one usable string
					
					$.ajax({ // ajax to send data to chat host
						type:		"POST",
						url:  		"https://api.parse.com/1/classes/chats",
						dataType: 	"json",
						data:		sendData	
					});
				}

//************************************************************************************************************

                Chat.guide.start(); //function call to start chat
				
				var printer = function(array) // function to control unordered list updates
				{
					$('.messages').empty(); //Jquery to remove an old line from the chat 
					for(var i  = 0; i < array.length; i++)
					{
						display(array[i]); // Replace items in messages element with new items	
					}

					setTimeout(fetch(printer), 3000); // recycle every 3 seconds
				}
				
				fetch(printer); // send the printer function to the fetch function to begin chat cycle
				
				$( document ).ready(function() //when page is ready send data from textbox to chat host
				{
					$(".send").click(function() // upon click execute send
					{
						var val = $('.draft').val(); // retrieve data from textbox
						send(val); //send data
					});
				});