Chat.guide.start(); //starts connection 

var array1 = [2,4,6,5,1]; //test array
var stuff = function(array)
{
	$('.messages').empty(); // make space in chat field
	for(var i  = 0; i < array.length; i++) // cycle through array produced by callback 
	{
		Chat.display(array[i]); //call server provided function
	}
	array1 = array; // tesing
	setTimeout(Chat.fetch(stuff), 3000); // 3 sec delay
}

setTimeout(Chat.fetch(stuff), 3000); // initial 3 second delay - looks useless

$( document ).ready(function() //when ready do function
{
	$(".send").click(function() // jquery to send perform action upon click
	{
		var val = $('.draft').val(); //save value from textbox to val
		Chat.send(val); // use provided send function to send val to chat field
	});
});
			