function init(){
    var canvas=document.getElementById('mycanvas');
    W=H=canvas.width=canvas.height=650;
    pen=canvas.getContext('2d');
    cs=30;
    game_over=false;
    score=5;

    //Create a image Object for food
    food_img=new Image();
    food_img.src="apple.png";

    trophy_img=new Image();
    trophy_img.src="trophy.jpg";

    food=getRandomFood();

    snake= {
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",

        createSnake:function(){
            for(var i=this.init_len;i>0;i--)
            {
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle=this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
            }
        },

        updateSnake:function(){
            //console.log("updating snake according to the direction property");
            //check if the snake has eaten the food,increase the length of snake and
            //generate new food object
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;

            if(headX==food.x && headY==food.y)
            {
                console.log("Food eaten");
                food=getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }
            

            var nextX,nextY;

            if(this.direction=="right"){
                nextX=headX+1;
                nextY=headY;
            }
            else if(this.direction=="left"){
                nextX=headX-1;
                nextY=headY;
            }
            else if(this.direction=="down"){
                nextX=headX;
                nextY=headY + 1;
            }
            else{
                nextX=headX;
                nextY=headY - 1;
            }

            this.cells.unshift({x:nextX,y:nextY});

            /* Logic that prevents snake from going out*/
            var last_x=Math.round(W/cs);
            var last_y=Math.round(H/cs);

            if(this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
                game_over=true;
            }
        }
    };
    snake.createSnake();
    //Add a event Listener on the document object
    function keyPressed(e){
        //conditional Statements
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else{
            snake.direction="up";
        }
        console.log(snake.direction);
    }

    document.addEventListener('keydown',keyPressed);
}

function draw(){
    //console.log("In Draw");

    //erase the old frame
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle=food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(trophy_img,18,18,cs,cs);

    pen.fillStyle="blue";
    pen.font="20px Roboto"
    pen.fillText(score,28,40);
}

function update(){
    snake.updateSnake();

}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);

    var food={
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}


function gameloop(){
    if(game_over==true){
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();


}

init();

var f=setInterval(gameloop,100);