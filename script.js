var main = function() {
	var socket;

	try {
		socket = new WebSocket('ws://54.201.54.209/');
		socket.onopen = function() {
			console.log('opened socket!');
		}

		socket.onmessage = function(msg) {
			console.log('received: ' + msg.data);
			addItem(msg.data, false);
		}

		socket.onclose = function() {
			console.log('closing socket');
		}
	} catch(exception) {
		console.error(exception);
	}

	$('form').submit(function(event) {
		var $input = $(event.target).find('input');
		var comment = $input.val();
		socket.send(comment);

		addItem(comment, true);
		$input.val("");
		return false;
	});

	function addItem(content, local) {
		if(content != "") {
			var html = $('<li>').text(content).addClass(local ? 'local' : 'remote');
			var items = $('#chat').children();
			console.log(items.length);
			if(items.length >= 10) {
				items.last().remove();
			}
			html.prependTo('#chat');
		}
	}

}

$(document).ready(main);