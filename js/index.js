
    
   
    


var drawGrid = function() {
    // Background grid
    let canvas, ctx;
    let particles, cols, rows, width, height, cw, ch;
    let mouse, oldmouse, delta;

    const init = () => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('resize', resize);
    resize();
    
    // mouse = { x: 0, y: 0 };
    oldmouse = {x: 0, y: 0 };
    delta = 0;

    var divisor;

    var findDivisor = () => {
        if (window.innerWidth <= 500 ) {
            divisor = 20;
        } else if (window.innerWidth <= 1200 ) {
            divisor = 35;
        } else if (window.innerWidth <= 1920 ) {
            divisor = 80;
        }else {
            divisor = 120;
        }
    }

    findDivisor();
    
    width = window.innerWidth;
    height = window.innerHeight;


    rows = width / divisor;
    cols = Math.round(rows / height * width );
    cw = width / (cols - 1);
    ch = height / (rows - 1);
    
    particles = [];
    for (let i = 0; i < cols * rows; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const ix = col * cw - width / 2;
        const iy = row * ch - height / 2;
        const x = ix;
        const y = iy;
        const vx = 0;
        const vy = 0;
        
        particles.push({ col, row, x, y, ix, iy, vx, vy });
    }
    };

    const animate = () => {
    update();
    draw();
    requestAnimationFrame(animate);
    };

    const update = () => {
    if (!mouse) return;
    
    delta *= 0.9;
    
    let dx, dy, dd;
    
    particles.forEach((p, index) => {
        dx = p.x - mouse.x;
        dy = p.y - mouse.y;
        dd = dx * dx + dy * dy;
        
        if (dd < 10000) {
        p.vx += dx * 0.00002 * delta;
        p.vy += dy * 0.00002 * delta;
        }
        
        p.vx *= 0.9;
        p.vy *= 0.9;
        
        dx = p.ix - p.x;
        dy = p.iy - p.y;
        dd = dx * dx + dy * dy;
        
        p.vx += dx * 0.01;
        p.vy += dy * 0.01;
        
        p.x += p.vx;
        p.y += p.vy;
    });
    };

    const draw = () => {
    var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, "#3a3a49");
    grd.addColorStop(1, "#030211");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    ctx.fillStyle = '#c61256';
    
    particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.75, 0, Math.PI * 1.75);
        ctx.fill();
    });
    
    ctx.restore();
    };

    const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    };

    const mousemove = (e) => {
    if (!mouse) {
        mouse = {};
        mouse.x = e.clientX - canvas.width * 0.5;
        mouse.y = e.clientY - canvas.height * 0.5;
        return;
    }
    
    oldmouse.x = mouse.x;
    oldmouse.y = mouse.y;
    
    mouse.x = e.clientX - canvas.width * 0.5;
    mouse.y = e.clientY - canvas.height * 0.5;
    
    let dx, dy, dd;
    
    dx = mouse.x - oldmouse.x;
    dy = mouse.y - oldmouse.y;
    dd = 20 * (dx * dx + dy * dy);
    
    delta += dd;
    if (delta > 1200) delta = 1200;
    };

    init();
    animate();
}


drawGrid();
window.addEventListener('resize', function(){
    setTimeout(drawGrid, 100);
});

const swup = new Swup();

var parallaxInit = function(){
var sceneElements = document.querySelectorAll('.parallax-container');
var parallaxScenes = [];
for (var i = 0; i < sceneElements.length; i++) {
    parallaxScenes.push(new Parallax(sceneElements[i]))
};
};

const scrollStuff = () => {
var leftArrow = $('.left-arrow');
var rightArrow = $('.right-arrow');

const scrollLeft = () => {
    var currentScrollPosition = $('.portfolio-slider').scrollLeft();
    var elementWidth = $('.card').outerWidth(true); 
    var newScrollPosition = currentScrollPosition - elementWidth;
    $('.portfolio-slider').stop().animate({
        scrollLeft: newScrollPosition
    }, 300);
}

const scrollRight = () => {
    var currentScrollPosition = $('.portfolio-slider').scrollLeft();
    var elementWidth = $('.card').outerWidth(true); 
    var newScrollPosition = currentScrollPosition + elementWidth;
    $('.portfolio-slider').stop().animate({
        scrollLeft: newScrollPosition
    }, 300);
}

leftArrow.on('click', scrollLeft);

rightArrow.on('click', scrollRight);
}

scrollStuff();

window.requestAnimationFrame(parallaxInit);

swup.on('contentReplaced', function(){
window.requestAnimationFrame(parallaxInit);

scrollStuff();
});