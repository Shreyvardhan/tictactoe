function playFriend() {
	var currentPlayer = 0; //0 for P1, 1 for P2;
	var validMove = 1; //0 for  invalid, 1 for valid
	var p1_score = 0;
	var p2_score = 0;
	var size = 3;

	var rowElement = $("div.play table tr");
	var colElement = $(rowElement).eq(0).children();

	function assignValToCells() {
		var c = 1;
		for (var i=0; i<rowElement.length; i++) {
			for (var j=0; j<colElement.length; j++) {
				$(rowElement).eq(i).children().eq(j).attr("id", c);
				c++;
			}
		}
	}

	function loadAnswers() {
		winningCombos.push([1,2,3]);
		winningCombos.push([4,5,6]);
		winningCombos.push([7,8,9]);
		winningCombos.push([1,4,7]);
		winningCombos.push([2,5,8]);
		winningCombos.push([3,6,9]);
		winningCombos.push([1,5,9]);
		winningCombos.push([3,5,7]);
	}

	function checkForWin() {
		tie = false;
		var win = false;
		var playerSelections = new Array();
		if (currentPlayer == 0) {
			playerSelections = p1Selections;
		} else {
			playerSelections = p2Selections;
		}
		if (playerSelections.length >= size) {
			playerSelections.sort();
			loop1:	
				for (var i=0; i<winningCombos.length;i++) {
					var miniArray = winningCombos[i];
					var count = 0;
			loop2:
					for (var j=0; j<miniArray.length; j++) {
						if (($.inArray(miniArray[j].toString(), playerSelections)) >= 0) {
							count++;
						}
					}
					if (count == 3) {
						win = true;
						tie = false;
						break loop1;
					} else if ((p1Selections.length >=5) || (p2Selections.length>=5)) {
						win = true;
						tie = true;
					}
				}
				// if ((p1Selections.length >=5) || (p2Selections.length>=5)) {
				// 	win = true;
				// 	tie = true;
				// }	
		} else {
			win = false;
			// win = false;
			// if ((p1Selections.length >=5) || (p2Selections.length>=5)) {
			// 	win = true;
			// 	tie = true;
			// } else {
			// 	win = false;
			// }
		}
		// alert(win);
		return win;
	}

	function isValid(n) {
		for (var i=0; i < p1Selections.length; i++) {
			if ((n == p1Selections[i]) || (n==p2Selections[i])) {
				validMove = 0;
				break;
			} 
			validMove = 1;
		}
		return validMove;
	}

	function addSelection(n) {
		if ((currentPlayer == 0) && (validMove == 1)) {
			p1Selections.push(n);
		} else if ((currentPlayer == 1) && (validMove == 1)) {
			p2Selections.push(n);
		}
		else {
			alert("invalid move");
		}
	}

	function changeMove() {
		if (currentPlayer == 0) {
			currentPlayer++;
		} else {
			currentPlayer--;
		}
	}

	function reset() {
		var currentPlayer = 0;
		var validMove = 0; 
		p1Selections = [];
		p2Selections = [];
		$("table tr td svg").css("visibility", "hidden");
		$("div.notif").animate({
			opacity: 0
		}, 500);
		$("div.notif").css("display", "none");
	}

	function showWinner() {
		var text;
		if (tie == true) {
			text = "It's a tie!";
		} else {
			if (currentPlayer == 0) {
				text = "Player 1 wins!";
			} else {
				text = "Player 2 wins!"
			}
		}
		$("div.notif h1").text(text);
		$("div.notif").css("display", "block");
		$("div.notif").animate({
			opacity: 1
		}, 500);
	}

	function initGame() {
		winningCombos = new Array();
		p1Selections = new Array();
		p2Selections = new Array();
		loadAnswers();
		assignValToCells();
	}

	function addMark(thisObj) {
		if (currentPlayer == 0) {
			thisObj.find("svg.x").css("visibility", "visible");
		} else if (currentPlayer == 1) {
			thisObj.find("svg.o").css("visibility", "visible");
		}
	}

	$("table tr td").click(function() {
		var cellNum = $(this).attr("id");
		if (isValid(cellNum)) {
			addMark($(this));
			addSelection(cellNum);
			if (checkForWin()) {
				showWinner();
				setTimeout(reset, 3000);
			} else {
				changeMove();
			}
		}
		else {
			alert("invalid move");
		}
	})

	initGame();
}