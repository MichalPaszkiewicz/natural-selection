function circle(ctx, x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.stroke();  
    ctx.fill();
}
var bullets = [];
var targets = [];

$(function() {

var ctx = document.getElementById('canvas').getContext('2d');
ctx.globalAlpha = 0.1;

var firstBullet = new bullet(100,100,Math.random() * 4 - 2,Math.random() * 4 - 2);



bullets.push(firstBullet);
createNewTarget(targets);

$("canvas").click(function(){
    createNewTarget(targets);
    });

function draw() {
    $(".counter").text(targets.length);

	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	for(var i = 0; i < bullets.length; i++){
        circle(ctx, bullets[i].X, bullets[i].Y, "red");
        moveBullet(bullets[i]);	
    }
    
    hop:
    for(var i = 0; i < targets.length; i++){
       for(var j = 0; j < targets.length; j++)
       {
            if((targets.length > 1) && (distance(targets[i], targets[j]) < 22) && (i != j)){ reverseOnCollision(targets[i], targets[j]); 
                if(distance(targets[i], targets[j]) < 14){
                    
                    killOneOff(targets, i, j);
                    break hop;
                }
            }
       }
       var colour = (targets[i].Sex == "Male") ? "green" : "pink";
       circle(ctx, targets[i].X, targets[i].Y, colour); 
	   moveTarget(targets[i], firstBullet);
	}
	
	dance:
	for(var i = 0; i < targets.length; i++){
	   if(distance(targets[i], firstBullet) < 20)
	   {
	        targets.splice(i,1);
	        break;
	   };
	   
	   for(var j = 0; j < targets.length; j++)
	   {	        
	        if(canMate(targets, i, j)){
	            mateTargets(targets, i, j);
	            targets[i].LastMated = targets[i].Age;
	            targets[j].LastMated = targets[j].Age;
	            break dance;
	        }
	   }
	}
};


draw();
var timer = setInterval(function() { draw(); if(ctx.globalAlpha < 1){ ctx.globalAlpha += 0.01; } }, 10);

var tableTimer = setInterval(function(){

    $('tbody').html("");
    	
    for(var i = 0; i < targets.length; i++)
    {
        $('tbody').append(
            '<tr><td>' + targets[i].CentralG.A.toFixed(2) + '</td>' +
            '<td>' + targets[i].CentralG.B.toFixed(2) + '</td>' +
            '<td>' + targets[i].CentralG.C.toFixed(2)+ '</td>' +
            '<td>' + targets[i].CentralG.D.toFixed(2) + '</td>' +
            '<td>' + targets[i].RadialG.A.toFixed(2) + '</td>' +
            '<td>' + targets[i].RadialG.B.toFixed(2) + '</td>' +
            '<td>' + targets[i].RadialG.C.toFixed(2) + '</td>' +
            '<td>' + targets[i].RadialG.D.toFixed(2) + '</td>' +
            '<td>' + targets[i].Age + '</td>' +
            '<td>' + targets[i].Sex + '</td></tr>'            
        );
    }
},3000);

var mutantInserter = setInterval(function(){createNewTarget(targets);}, 20000);

function stop()
{
    clearInterval(timer);
}

});