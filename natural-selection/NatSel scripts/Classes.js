function gaussian(a, b, c, d)
{
    this.A = a;
    this.B = b;
    this.C = c;
    this.D = d;
    this.Result = 
        function(x){
            var middleBit = - ((x - this.B)*(x - this.B))/(2 * this.C * this.C);
            return (this.A * Math.exp(middleBit) + this.D);    
        }
};

function bullet(x, y, vx, vy){
    this.X = x;
    this.Y = y;
    this.Vx = vx;
    this.Vy = vy;
    this.Type = "bullet";
};

function target(x, y, vx, vy, ax, ay, ca, cb, cc, cd, ra, rb, rc, rd){
    this.X = x;
    this.Y = y;
    this.Vx = vx;
    this.Vy = vy;
    this.Ax = ax;
    this.Ay = ay;
    this.LastMated = 0;
    this.Age = 0;
    this.CentralG = new gaussian(ca,cb,cc,cd);
    this.RadialG = new gaussian(ra,rb,rc,rd);
    this.Type = "target";
    this.Sex = Math.random() > 0.5 ? "Male" : "Female";
};

function centreX(y)
{
    this.X = canvas.width / 2;
    this.Y = y;
}

function centreY(x) {
    this.X = x;
    this.Y = canvas.height / 2;
}