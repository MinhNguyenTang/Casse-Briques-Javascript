var gameRefresh;
var balls = [];
var playfieldWidth, playfieldHeight;
var ballSize;
var curLevel;
var bricks = [];
var racket;

$(document).ready(init);

function init()
{
  addBall();
  gameRefresh = setInterval(drawBalls, 10);
  playfieldWidth = $('.playfield').width();
  playfieldHeight = $('.playfield').height();
  curLevel = 0;
  drawPlayfield();
  $(window).on('mousemove', drawRacket);
  racket = {width: $('.racket').width()};
}


function addBall()
{
  var idBall = createId();
  if (balls.length < 10)
  {
  $('.playfield').prepend('<div class="ball" data-id="' +idBall+ '"></div>');
  ballSize = $('.ball:first').width();
  balls.push  (
         {
            id: idBall,
            left: Math.random() * (playfieldWidth - ballSize),
            top: ($('.brickLine').length * 34) + ballSize,
            hSpeed: Math.random() > .5 ? 2 : -2,
            vSpeed : 2
         }
       );
   }
}


function createId()
{
  var code = "";
  for(var $compteur = 0; $compteur < 8; $compteur++)
  {
    code += String.fromCharCode(65 + Math.random() * 26);
  }
  return code;
}


function drawBalls()
{
  balls.forEach (function (e)
  {
    e.left += e.hSpeed;
    e.top += e.vSpeed;
       var nearBricks = bricks.filter(function (f)
       {
         return f.top + 34 > e.top;
       }) .filter (function (f) {
         return f.left <= e.left && f.left + brickWidth >= e.left + ballSize;
       });
    if (nearBricks.length > 0)
    {
      e.vSpeed = -e.vSpeed;
    }
    if (e.left < 0)
    {
      e.hSpeed = -e.hSpeed;
    }
    if (e.top < 0)
    {
      e.vSpeed = -e.vSpeed;
    }
    if (e.left > playfieldWidth)
    {
      e.hSpeed = -e.hSpeed;
    }
    if (e.top > playfieldHeight)
    {
      e.vSpeed = -e.vSpeed;
    }
    $('.ball[data-id="' + e.id +'"]')
         .css({
           left: e.left + 'px',
           top: e.top + 'px'
         });
  });
}


function drawPlayfield()
{
  levels[curLevel].forEach(function (e, i)
  {
    var line = $('<div class="brickLine"></div>');
    e.forEach (function (f, j)
    {
      bricks.push ({
        id: i + '-' + j,
        top: i * 34,
        left: j * 104
      });
      line.append('<div class="brick ' + f + 'Brick" data-id="' + i + '-' + j +'"></div>');
    });
    $('.playfield').preprend(line);
  });
  bricks.forEach(function (e, i)
  {
    $('.brick[data-id="' + e.id +'"]')
        .animate(
          {
            top: e.top + 'px'
          },
          500
        );
     }
   );
   bricks.forEach(function (e, i)
   {
     $('.brick[data-id="' + e.id +'"]')
          .animate(
            {
              left: e.left + 'px'
            },
            1000
          );
   });
 }


 function showCurrentLevel()
 {
   $('.lblCurrentLevel')
       .text('Niveau' + (curLevel + 1))
       .css('opacity', 1)
       .animate(
         {
           opacity: 0,
         },
         3000
       );
 }


 function drawRacket(e)
 {
   racket.left = Math.min(playfieldWidth - racket.width, Math.max(2, e.offsetX));
   $('.racket').css ('left', racket.left + 'px');
 }
