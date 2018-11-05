var main = function() {
	var socket;

	try {
		socket = io.connect('http://54.201.54.209/');
		socket.on('connect', function() {
			console.log('opened socket!');
		});

		socket.on('peer found', function(id) {
			$('#status-msg').fadeOut(function () {
				$('#main').fadeIn();
			});
		});

		socket.on('message', function(msg) {
			console.log('received: ' + msg);
			addItem(msg, false);
		});

		socket.on('peer lost', peerLost);

		socket.on('disconnect', function() {
			console.log('closing socket');
			peerLost();
		});
	} catch(exception) {
		console.error(exception);
	}

	function peerLost() {
		console.log('peer lost');
		$('#main').fadeOut(function () {
			$('#status-msg').fadeIn();
		});
		clearItems();
	}

	$('form').submit(function(event) {
		var $input = $(event.target).find('input');
		var comment = $input.val();
		if(comment != "") {
			socket.emit('message', comment);
		}

		addItem(comment, true);
		$input.val("");
		return false;
	});

	function addItem(content, local) {
		if(content != "") {
			var html = $('<li>').text(content).addClass(local ? 'local' : 'remote').hide();
			var items = $('#chat').children();
			console.log(items.length);
			if(items.length >= 10) {
				items.last().remove();
			}
			html.prependTo('#chat');
			html.slideDown('fast');
		}
	}

	function clearItems() {
		$('#chat').empty();
	}

}

$(document).ready(main);