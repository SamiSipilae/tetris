var c = document.getElementById("screen");
var ctx = c.getContext("2d");
var piece_x = 4;
var piece_y = 0;
var piece_rotation = 0;
var blocksize = 20;
var time = 0;
var interval = 10;
var game_over = 0;
var score = 0;
var piece_type = 0;
var colors = ["#00FFFF", "#FFFF00", "#9A00FF", "#00FF00", "#FF0000", "#0000FF", "#FFAA00"];
var playingfield = [
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
var pieces = [
[
[[0, 0, 0, 0],
 [1, 1, 1, 1],
 [0, 0, 0, 0],
 [0, 0, 0, 0]],
[[0, 0, 1, 0],
 [0, 0, 1, 0],
 [0, 0, 1, 0],
 [0, 0, 1, 0]],
[[0, 0, 0, 0],
 [0, 0, 0, 0],
 [1, 1, 1, 1],
 [0, 0, 0, 0]],
[[0, 1, 0, 0],
 [0, 1, 0, 0],
 [0, 1, 0, 0],
 [0, 1, 0, 0]],
],
 [
[[0, 2, 2, 0],
 [0, 2, 2, 0],
 [0, 0, 0, 0],
 [0, 0, 0, 0]],
],
 [
[[0, 3, 0],
 [3, 3, 3],
 [0, 0, 0]],
[[0, 3, 0],
 [0, 3, 3],
 [0, 3, 0]],
[[0, 0, 0],
 [3, 3, 3],
 [0, 3, 0]],
[[0, 3, 0],
 [3, 3, 0],
 [0, 3, 0]],
],
 [
[[0, 4, 4],
 [4, 4, 0],
 [0, 0, 0]],
[[0, 4, 0],
 [0, 4, 4],
 [0, 0, 4]],
[[0, 0, 0],
 [0, 4, 4],
 [4, 4, 0]],
[[4, 0, 0],
 [4, 4, 0],
 [0, 4, 0]],
],
 [
[[5, 5, 0],
 [0, 5, 5],
 [0, 0, 0]],
[[0, 0, 5],
 [0, 5, 5],
 [0, 5, 0]],
[[0, 0, 0],
 [5, 5, 0],
 [0, 5, 5]],
[[0, 5, 0],
 [5, 5, 0],
 [5, 0, 0]],
],
 [
[[6, 0, 0],
 [6, 6, 6],
 [0, 0, 0]],
[[0, 6, 6],
 [0, 6, 0],
 [0, 6, 0]],
[[0, 0, 0],
 [6, 6, 6],
 [0, 0, 6]],
[[0, 6, 0],
 [0, 6, 0],
 [6, 6, 0]],
],
 [
[[0, 0, 7],
 [7, 7, 7],
 [0, 0, 0]],
[[0, 7, 0],
 [0, 7, 0],
 [0, 7, 7]],
[[0, 0, 0],
 [7, 7, 7],
 [7, 0, 0]],
[[7, 7, 0],
 [0, 7, 0],
 [0, 7, 0]],
]

];



document.addEventListener('DOMContentLoaded', domloaded, false);

function domloaded()
{
	window.setInterval(function()
	{
		main_loop();
	}, 50);
}

function main_loop()
{
	if (game_over == 0)
	{
		if (time >= interval)
		{
			time = 0;
			update_field();
		}
		ctx.clearRect(0, 0, c.width, c.height);
		check_field();
		draw_playingfield();
		document.getElementById("score").innerHTML = score;
		time += 1;
	}
	else
	{
		ctx.fillStyle = "black";
		ctx.font = "20px Georgia";
		ctx.fillText("Game Over!", 5, 50);
	}
}

function draw_playingfield()
{
	for (var i = 0, len = playingfield.length; i < len; i++)
	{
		for (var j = 0, len2 = playingfield[i].length; j < len2; j++)
		{
			if (playingfield[i][j] != 0)
			{
				ctx.fillStyle = colors[playingfield[i][j]-1];
				ctx.fillRect(j * blocksize + j+1, i * blocksize + i, blocksize, blocksize);
			}
		}
	}
	for (var i = 0, len = pieces[piece_type][piece_rotation].length; i < len; i++)
	{
		for (var j = 0, len2 = pieces[piece_type][piece_rotation][i].length; j < len2; j++)
		{
			if (pieces[piece_type][piece_rotation][i][j] != 0)
			{
				ctx.fillStyle = colors[piece_type];
				ctx.fillRect((piece_x + j) * blocksize + j+1 + piece_x, (piece_y + i) * blocksize + i + piece_y, blocksize, blocksize);
			}
		}
	}
}

function keypress(event)
{
	var stop = 0;
	var move = 0;
	var key = event.keyCode;
	if (key == 37) // left
	{
		for (var i = 0, len = pieces[piece_type][piece_rotation].length; i < len; i++)
		{
			for (var j = 0, len2 = pieces[piece_type][piece_rotation][i].length; j < len2; j++)
			{
				if (pieces[piece_type][piece_rotation][i][j] != 0)
				{
					if (playingfield[piece_y + i][piece_x + j - 1] != 0)
					{
						stop = 1;
					}
					if (piece_x + j - 1 < 0)
					{
						stop = 1;
					}
				}
			}
		}
		if (stop == 0)
		{
			piece_x -= 1;
		}
	}
	if (key == 39) // right
	{
		for (var i = 0, len = pieces[piece_type][piece_rotation].length; i < len; i++)
		{
			for (var j = 0, len2 = pieces[piece_type][piece_rotation][i].length; j < len2; j++)
			{
				if (pieces[piece_type][piece_rotation][i][j] != 0)
				{
					if (playingfield[piece_y + i][piece_x + j + 1] != 0)
					{
						stop = 1;
					}
					if (piece_x + j + 1 > playingfield[1].length)
					{
						stop = 1;
					}
				}
			}
		}
		if (stop == 0)
		{
			piece_x += 1;
		}
	}
	if (key == 38) // up
	{
		var tmp_rotation = 0;
		if (piece_rotation + 1 >= pieces[piece_type].length)
		{
			tmp_rotation = 0;
		}
		else
		{
			tmp_rotation = piece_rotation + 1;
		}
		for (var i = 0, len = pieces[piece_type][tmp_rotation].length; i < len; i++)
		{
			for (var j = 0, len2 = pieces[piece_type][tmp_rotation][i].length; j < len2; j++)
			{
				if (pieces[piece_type][tmp_rotation][i][j] != 0)
				{
					if (playingfield[piece_y + i][piece_x + j] != 0)
					{
						stop = 1;
					}
					if (piece_x + j > playingfield[1].length)
					{
						stop = 1;
					}
					if (piece_x + j < 0)
					{
						stop = 1;
					}
				}
			}
		}
		if (stop == 0)
		{
			piece_rotation = tmp_rotation;
		}
	}
	if (key == 40) // down
	{
		
		for (var y = piece_y, distance = playingfield.length; y < distance; y++)
		{
			for (var i = 0, len = pieces[piece_type][piece_rotation].length; i < len; i++)
			{
				for (var j = 0, len2 = pieces[piece_type][piece_rotation][i].length; j < len2; j++)
				{
					if (pieces[piece_type][piece_rotation][i][j] != 0)
					{
						if (y + i + 2 > playingfield.length)
						{
							stop = 1;
						}
						else if (playingfield[y + i + 1][piece_x + j] != 0)
						{
							stop = 1;
						}

					}
				}	
			}
			if (stop == 1)
			{
				piece_y = y;
				break;
			}
		}
	}
}

function update_field()
{
	var stop = 0;
	for (var i = 0, len = pieces[piece_type][piece_rotation].length; i < len; i++)
	{
		for (var j = 0, len2 = pieces[piece_type][piece_rotation][i].length; j < len2; j++)
		{
			if (pieces[piece_type][piece_rotation][i][j] != 0)
			{
				if (piece_y + i + 2 > playingfield.length)
				{
					stop = 1;
				}
				else if (playingfield[piece_y + i + 1][piece_x + j] != 0)
				{
					stop = 1;
				}
			}
		}
	}
	if (stop == 1)
	{
		if (piece_y == 0)
		{
			game_over = 1;
		}
		for (var i = 0, len = pieces[piece_type][piece_rotation].length; i < len; i++)
		{
			for (var j = 0, len2 = pieces[piece_type][piece_rotation][i].length; j < len2; j++)
			{
				if (pieces[piece_type][piece_rotation][i][j] != 0)
				{
					playingfield[piece_y + i][piece_x + j] = pieces[piece_type][piece_rotation][i][j];
				}
			}
		}
		new_block();
	}
	else
	{
		piece_y += 1;
	}
}

function check_field()
{
	var score_multiplier = 0;
	for (var i = 0, len = playingfield.length; i < len; i++)
	{
		var counter = 0;
		for (var j = 0, len2 = playingfield[i].length; j < len2; j++)
		{
			if (playingfield[i][j] != 0)
			{
				counter += 1;
			}
		}
		if (counter == playingfield[1].length)
		{
			score_multiplier += 1;
			if (interval > 1)
			{
				interval -= 0.2;
			}
			for (l = 0; l < playingfield[i].length; l++)
			{
				playingfield[i][l] = 0;
			}
			for (var line = i; line > 0; line--)
			{
				playingfield[line] = playingfield[line - 1].slice();
			}
		}
	}
	score += 10*score_multiplier;
}

function new_block()
{
		piece_y = 0;
		piece_type = Math.floor((Math.random() * pieces.length));
		piece_x = 4;
		piece_rotation = 0;
}