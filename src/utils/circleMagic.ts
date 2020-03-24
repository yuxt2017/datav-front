// tslint:disable
class Circle {
    constructor(height: any, width: any, settings: any, ctx: any) {
        this.width = width;
        this.height = height;
        this.settings = settings;
        this.ctx = ctx;
        this.pos = {};
        this.pos.x = Math.random() * this.width;
        this.pos.y = height + Math.random() * 100;
        this.alpha = 0.1 + Math.random() * settings.clearOffset;
        this.scale = 0.1 + Math.random() * 0.3;
        this.speed = Math.random();
    };
    height: any;
    width: any;
    settings: any;
    ctx: any;
    pos: any;
    alpha: any;
    scale: any;
    speed: any;
    color: any;
    init() {
        this.pos.x = Math.random() * this.width;
        this.pos.y = this.height + Math.random() * 100;
        this.alpha = 0.1 + Math.random() * this.settings.clearOffset;
        this.scale = 0.1 + Math.random() * 0.3;
        this.speed = Math.random();
        if (this.settings.color == 'random') {
            this.color = randomColor();
        }
        else {
            this.color = this.settings.color;
        }
    }

    draw() {
        if (this.alpha <= 0) {
            this.init();
        }
        this.pos.y -= this.speed;
        this.alpha -= 0.0005;
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.scale * this.settings.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    };
}

export default (options: any) => {
    let width: number,
        height: any,
        largeContainer: { style: { height: string }; append: (arg0: HTMLCanvasElement) => void },
        canvas: any,
        ctx: { clearRect: (arg0: number, arg1: number, arg2: number, arg3: string | number) => void; beginPath: () => void; arc: (arg0: any, arg1: any, arg2: number, arg3: number, arg4: number, arg5: boolean) => void; fillStyle: any; fill: () => void; closePath: () => void },
        target,
        animateHeader = true
    let circles: any = []
    let settings = Object.assign(
        {
            elem: '.header',
            color: 'rgba(255,255,255,.4)',
            radius: 20,
            densety: 0.3,
            clearOffset: 0.2
        },
        options
    )
    initContainer()
    addListeners()
    function initContainer() {
        width = window.innerWidth
        height = window.innerHeight
        target = { x: 0, y: height }
        largeContainer = document.querySelector(settings.elem)
        largeContainer.style.height = height + 'px'
        initCanvas()
        var canvas: any = document.getElementById('canvas')
        canvas.width = width
        canvas.height = height
        ctx = canvas.getContext('2d')
        for (let x = 0; x < width * settings.densety; x++) {
            let c: any = new Circle(height, width, settings, ctx);
            c.init();
            circles.push(c)
        }
        animate()
    }
    function initCanvas() {
        let canvasElement = document.createElement('canvas')
        canvasElement.id = 'canvas'
        largeContainer.append(canvasElement)
    }
    function addListeners() {
        window.addEventListener('scroll', scrollCheck)
        window.addEventListener('resize', resize)
    }
    function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false
        else animateHeader = true
    }
    function resize() {
        width = window.innerWidth
        height = window.innerHeight
        largeContainer.style.height = height + 'px'
        canvas.width = width
        canvas.height = height
    }
    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height)
            for (let i in circles) {
                circles[i].draw()
            }
        }
        requestAnimationFrame(animate)
    }
}

function randomColor() {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    let alpha = Math.random().toPrecision(2)
    let rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`
    return rgba
}
