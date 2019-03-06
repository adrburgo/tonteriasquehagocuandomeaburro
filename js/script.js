document.addEventListener("DOMContentLoaded", main);

// VARIABLES
const canvas = document.getElementById('canvasprueba');
const ctx = canvas.getContext("2d");

var cwid;
var chei;

const fps = 60;
const interval_time = 1000/fps;

let point_datta = new Object;

const n_points = 6; 

function main()
{

  setcwidhei();

  set_point_datta();

  setInterval(function(){ do_the_canvas(); }, interval_time);

  console.log(point_datta);

}

function set_point_datta()
{
  for (let i = 0; i < 6; i++) {

  point_datta = Object.assign(point_datta,{[`v${i}`]:get_datta_obj(), });
  }
}

function setcwidhei()
{
  cwid = canvas.clientWidth;
  chei = canvas.clientHeight;
}

function do_the_canvas()
{
  console.log("do_the_canvas");
  //clear canvas
  clear_canvas();

  //write canvas
  write_canvas();

}

function write_canvas()
{
  for (let v in point_datta)
  {
    do_the_point(v);

    do_move_event(v);
  }
}

function clear_canvas()
{
  ctx.clearRect(0, 0, cwid, chei);
}

function get_datta_obj()
{
  let pos = rtrnewpos();

  let move = get_new_move_data(pos.xpos,pos.ypos)

  return Object.assign(pos,move);
}

function get_new_move_data(x,y)
{
  var tox = get_valid_num(x, cwid);
  var toy = get_valid_num(y, chei);

  let tof = getRandomInt(50,100);
  return {
    tox,
    toy,
    tof
  }
}

const get_valid_num = (pos, max) => {
  var topos;
  if (pos > 60 && pos < max - 60)
  {
    topos = pos + getRandomInt(-40,40);
  } else if (pos > 60)
  {
    topos = pos + getRandomInt(-40,0);
  } else if (pos < max - 60)
  {
    topos = pos + getRandomInt(0,40);
  }
  return topos;
}

function rtrnewpos()
{
  var x = getRandomInt(50,chei - 50);
  var y = getRandomInt(50,cwid - 50);
  return {
    xpos:x,
    ypos:y
  }
}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min)) + min;
}

function do_the_point(v)
{
  let point = point_datta[v];
  draw_circle(point.xpos,point.ypos, 5);

}

function do_move_event(v)
{
  let point = point_datta[v];
  pointf = point.tof;
  if (point.tox > point.xpos)
  {
    point.xpos += 10/pointf;
  } else if (point.tox < point.xpos) {
    point.xpos -= 10/pointf;
  } else {point_datta[v].tox = get_valid_num(point.xpos, cwei)}

  if (point.toy > point.ypos)
  {
    point.ypos += 10/pointf;
  } else if (point.toy < point.ypos) {
    point.ypos -= 10/pointf;
  } else {point_datta[v].toy = get_valid_num(point.ypos, chei)}

}

function drawrect()
{
ctx.beginPath();
ctx.rect(20, 20, 150, 100);
ctx.fillStyle = "red";
ctx.fill();
}

function drawcircle()
{
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.fillStyle = "red";
ctx.fill();
}

function draw_circle(x,y,r = 20)
{
  ctx.beginPath();
  ctx.arc(y, x, r, 0, 2 * Math.PI);
  ctx.fillStyle = "#000";
  ctx.fill();
}