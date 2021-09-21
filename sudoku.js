var arr1 = new Array();
			for(i=0;i<9;i++)
			{
				arr1[i] = new Array();

			}
var arr = new Array();
for(i=0;i<9;i++)
			{
				arr[i]=new Array();
			}


function start()
 		{
 			var n = document.getElementById("level").value,i,j;
			for(i=0;i<9;i++)
			{
				
				for(j=0;j<9;j++)
					arr[i][j]=0;
			}
			arr[0][0]=Math.floor(Math.random() * (9)) + 1;
			arr[1][4]=Math.floor(Math.random() * (9)) + 1;
			arr[2][7]=Math.floor(Math.random() * (9)) + 1;
			arr[3][1]=Math.floor(Math.random() * (9)) + 1;
			arr[4][3]=Math.floor(Math.random() * (9)) + 1;
			arr[5][8]=Math.floor(Math.random() * (9)) + 1;
			arr[6][2]=Math.floor(Math.random() * (9)) + 1;
			arr[7][5]=Math.floor(Math.random() * (9)) + 1;
			arr[8][6]=Math.floor(Math.random() * (9)) + 1;
			if(sudoku()) printPuzzle(n);
		}
function sudoku()
			{
				var i,j,val;
				var rowCol = vacantLocation();
				i=rowCol[0];
				j=rowCol[1];
				if(i==-1)
					return true;
				for(val=1;val<10;val++)
				{
					if(checkRow(i,val)&&checkCol(j,val)&&checkBlock(i,j,val))
					{
						arr[i][j]=val;
						if(sudoku())
							return true;
						arr[i][j]=0;
					}
				}
				return false;
			}
function vacantLocation(){
var rowCol=new Array();
rowCol[0]=-1;
rowCol[1]=-1;
for(var i=0;i<9;i++){
	for(var j=0;j<9;j++){
		if(arr[i][j]==0){
			rowCol[0]=i;
			rowCol[1]=j;
		}
	}
}
return rowCol;
}
function checkRow(i,val){
var j;
for(j=0;j<9;j++)
{
	if(arr[i][j]==val)
		return false;
}
return true;
}
function checkCol(j,val){
var i;
for(i=0;i<9;i++)
{
	if(arr[i][j]==val)
		return false;
}
return true;
}
function checkBlock(i,j,val){
var browStart = i-(i%3);
var bcolStart = j-(j%3);
for(i=0;i<3;i++)
{
	for(j=0;j<3;j++)
	{
		if(arr[i+browStart][j+bcolStart]==val)
			return false;
	}
}
return true;
}
function printAns(text,arr2){
var i,j;
text+="<table class = 'w3-container' style='margin-left:400px;margin-right:400px'>";
for(i=0;i<9;i++)
{
	text+="<tr>"
	for(j=0;j<9;j++)
	{
		if((j+1)%3==0)
			text+="<td style='padding-bottom:4px;border-right:4px solid black;background-color:white'>";
		else
			text+="<td style='padding-bottom:4px;background-color:white'>";
		if(arr1[i][j]!=0)
			text+="<br><input type='number' name='value' style='border:none;border-color:transparent;text-align:center;font-size:120%;color:green;font-weight:bold' value='"+arr2[i][j]+"' min='1' max='9' readonly><br></td>";
		else
			text+="<br><input type='number' name='value' style='border:none;border-color:transparent;text-align:center;font-size:120%;color:blue' value='"+arr2[i][j]+"' min='1' max='9' readonly><br></td>";
	}
	text+="</tr>";	
}
text+="</table>";
document.getElementById("Game").innerHTML=text;	
}
function printPuzzle(n){
var i,j,val,text;
text = "<form class='w3-container' style='margin-left:400px;margin-right:400px'><table>";
for(i=0;i<9;i++){
text+="<tr>";
for(j=0;j<9;j++){
	if((j+1)%3==0)
		text+="<td style='border-right:4px solid black;background-color:white'>&nbsp;&nbsp;";
	else
		text+="<td style='background-color:white'>&nbsp;&nbsp;";
	val=Math.floor(Math.random()*n);
	if(val==0)
	{
		text+="<input type='number' name='value' style='border:none;border-color:transparent;text-align:center;font-size:120%;color:green;font-weight:bold' value='"+arr[i][j]+"' min='1' max='9' readonly></td>";
		arr1[i][j]=arr[i][j];
	}
	else
	{	
		arr1[i][j]=0;
		text+="<input type='number' name='value' style='border:none;border-color:transparent;text-align:center;padding-left:2px;font-size:120%;color:red' min='1' max='9'></td>";
	}
}
text+="</tr>";
}
text+="</table><br><br><br>&nbsp;&nbsp;&nbsp;<button type='button' align-items: center; onclick='check(this.form);' class='btn btn-danger btn-lg'>Submit</button>&nbsp;&nbsp;<button type='button' align-items:center onclick='quit();' class='btn btn-danger btn-lg'>Give Up</button></form>";
document.getElementById("Game").innerHTML=text;
show();
showHeading("Time Elapsed: ")
}
function showHeading(text){
	document.getElementById("timeLabel").innerHTML = text;
}
function quit()
{
	stop();
	showHeading("Total Time  &nbsp;&nbsp;&nbsp;&nbsp;")
	var text = "<p style='font-size:150%;color:black'>Solution :</p><br>";
	printAns(text,arr);
}
function check(form){
stop();
showHeading("Total Time  &nbsp;&nbsp;&nbsp;&nbsp;")
var text = "<p style='font-size:150%;color:green'>Correct Answer!!</p><br>";
var elements = form.getElementsByTagName("input")
var len=elements.length;
var i,j;
for(k=0;k<len;k++)
{
	i=Math.floor(k/9);
	j=k - 9*i;
	if(elements[k].value.length==0)
		arr1[i][j]=0;
	else
		arr1[i][j]=elements[k];
}
if(!checkSudoku())
text = "<p style='font-size:150%;color:black'>Incorrect Answer!! <br> Correct Answer:</p><br>";
printAns(text,arr);
}
function checkSudoku(){
for(var i=0;i<9;i++){
	for(var j=0;j<9;j++){
		var val=arr1[i][j];
		if( (!checkRow(i,val)) || (!checkCol(j,val)) || (!checkBlock(i,j,val)) || val==0 ) return false;
	}
}
return true;
}
var	swclass = function() {
var	start = 0, lapTime	= 0;	
var	now	= function() {
	return (new Date()).getTime(); 
}; 
this.startTimer = function() {
	start	= start ? start : now();
};
this.stop = function() {		
	lapTime	= start ? lapTime + now() - start : lapTime;
	start	= 0; 
};
this.time = function() {
	return lapTime + (start ? now() - start : 0); 
};
};
var x = new swclass();
var $time;
var timer;
function pad(num, size) {
	var str = "0000" + num;
	return str.substr(str.length - size);
}
function formatTime(time) {
var h = m = s = 0;
var newTime = '';
h = Math.floor( time / (60 * 60 * 1000) );
time = time % (60 * 60 * 1000);
m = Math.floor( time / (60 * 1000) );
time = time % (60 * 1000);
s = Math.floor( time / 1000 );
newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) ;
return newTime;
}
function show() {
	$time = document.getElementById('time');
	update();
	startTimer();
}
function update() {
	$time.innerHTML = formatTime(x.time());
}
function startTimer() { 
	x.startTimer();
	timer = setInterval("update()", 1);	
}
function stop() { 
	x.stop();
	clearInterval(timer);
}