function distance(thing1, thing2) {
    var distX = Math.max(thing1.X, thing2.X) - Math.min(thing1.X, thing2.X);
    var distY = Math.max(thing1.Y, thing2.Y) - Math.min(thing1.Y, thing2.Y);
    var dist = Math.sqrt(distX * distX + distY * distY);
    return dist;
};

function killOneOff(targets, i, j) {
    if (targets[i].Age < targets[j].Age) {
        targets.splice(i, 1);
    }
    else {
        targets.splice(j, 1);
    }
};

function areMaleAndFemale(targets, i, j)
{
    return ((targets[i].Sex == "Male") && (targets[j].Sex == "Female") && (targets[j].LastMated < targets[j].Age - femaleTimeBetweenMatings))
        || ((targets[i].Sex == "Female") && (targets[j].Sex == "Male") && (targets[i].LastMated < targets[i].Age - femaleTimeBetweenMatings));
}

function canMate(targets, i, j) {
    return distance(targets[i], targets[j]) < 21
        && areMaleAndFemale(targets,i,j)
        && (i != j)
        && targets.length < maxAmount;
};

function createNewTarget(targets) {
    targets.push(
        new target(400 * Math.random() + 50, 400 * Math.random() + 50, 0, 0, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1,
        Math.random() * 2 - 1, Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 0.2 - 0.1,
        Math.random() * 2 - 1, Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 0.2 - 0.1));
};

function createNewTargetFromVals(targets, ca, cb, cc, cd, ra, rb, rc, rd) {
    targets.push(new target(400 * Math.random() + 50, 400 * Math.random() + 50, 0, 0, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, ca, cb, cc, cd, ra, rb, rc, rd))
};

function mateTargets(targets, i, j) {
    var ca = (targets[i].CentralG.A + targets[j].CentralG.A) / 2;
    var cb = (targets[i].CentralG.B + targets[j].CentralG.B) / 2;
    var cc = (targets[i].CentralG.C + targets[j].CentralG.C) / 2;
    var cd = (targets[i].CentralG.D + targets[j].CentralG.D) / 2;
    var ra = (targets[i].RadialG.A + targets[j].RadialG.A) / 2;
    var rb = (targets[i].RadialG.B + targets[j].RadialG.B) / 2;
    var rc = (targets[i].RadialG.C + targets[j].RadialG.C) / 2;
    var rd = (targets[i].RadialG.D + targets[j].RadialG.D) / 2;

    createNewTargetFromVals(targets, ca, cb, cc, cd, ra, rb, rc, rd);
}

function reverseOnHit(thing) {
    var futureThing = function () { };

    futureThing.X = thing.X + thing.Vx;
    futureThing.Y = thing.Y + thing.Vy;

    if ((thing.X > (canvas.width - 20) || thing.X < 20) && (distance(futureThing, new centreX(thing.Y)) > distance(thing, new centreX(thing.Y))))
        {
            thing.Vx = -thing.Vx;
            thing.X += thing.Vx;
            if (thing.Type == "target") { thing.Vx = thing.Vx * wallElasticity; }
        }
    if ((thing.Y > (canvas.height - 20) || thing.Y < 20) && (distance(futureThing, new centreY(thing.X)) > distance(thing, new centreY(thing.X))))
        {
            thing.Vy = -thing.Vy;
            thing.Y += thing.Vy;
            if (thing.Type == "target") { thing.Vy = thing.Vy * wallElasticity; }
        }
};

//implement: R = 2(N \cdot L)N - L where L is original vector, N is normal, R = new vector
function reverseOnCollision(thing, thing2) {
    var futureThing = function(){};

    futureThing.X = thing.X + thing.Vx;
    futureThing.Y = thing.Y + thing.Vy;
    futureThing.Vx = thing.Vx;
    futureThing.Vy = thing.Vy;

    if (distance(futureThing, thing2) < distance(thing, thing2)) {
        thing.Vx = -thing.Vx;

        thing.Vy = -thing.Vy;
    }

    thing.X = thing.X + thing.Vx;
    thing.Y = thing.Y + thing.Vy;
};

function standardMovement(thing) {
    reverseOnHit(thing);
    thing.X = thing.X + thing.Vx;
    thing.Y = thing.Y + thing.Vy;
};

function moveBullet(bullet) {
    standardMovement(bullet);
};

function moveTarget(target, bullet) {
    var dist = distance(target, bullet);

    var scalarX = Math.sqrt((bullet.X - target.X) * (bullet.X - target.X));
    var scalarY = Math.sqrt((bullet.Y - target.Y) * (bullet.Y - target.Y));

    target.Ax =
        (bullet.X - target.X) * target.CentralG.Result(dist) / Math.max(scalarX, scalarY)
        + (bullet.Y - target.Y) * target.RadialG.Result(dist) / Math.max(scalarX, scalarY);

    target.Ay =
        (bullet.Y - target.Y) * target.CentralG.Result(dist) / Math.max(scalarX, scalarY)
        + (target.X - bullet.X) * target.RadialG.Result(dist) / Math.max(scalarX, scalarY);//target.RadialG.Result(dist);

    target.Vx = (target.Ax < 0) ? Math.max(-2, target.Vx + target.Ax) : Math.min(2, target.Vx + target.Ax);
    target.Vy = (target.Ay < 0) ? Math.max(-2, target.Vy + target.Ay) : Math.min(2, target.Vy + target.Ay);
    standardMovement(target);
    target.Age++;
};