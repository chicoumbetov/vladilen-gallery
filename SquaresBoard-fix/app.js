// UTILS
const getRandomElement = arr => arr[Math.floor(Math.random()*arr.length)]
const getRandomNumber = (inRange, outRange) => Math.floor(Math.random()*(outRange-inRange))+inRange

let docCSSSelectors = {}
for (let selector of document.styleSheets[1].cssRules)
    docCSSSelectors[selector.selectorText] = selector

const getClientHeightPX = () => document.body.clientHeight
const getClientWidthPX = () => document.body.clientWidth

/* SQUARES BOARD */
class squaresBoard {
    constructor([inputSquareSize, inputHeightPoints, InputWidthPoints] = [10,30,20], cssSelectorBoard = '.board', inputCSSSelectorSquare = '.square'){
        this.boardDOM = document.querySelector(cssSelectorBoard)
        this.cssSelectorSquare = inputCSSSelectorSquare
        
        this.buildBoard([inputSquareSize, inputHeightPoints, InputWidthPoints])

        this.borders = true
        this.colors = ['red','orange','orangered','purple', 'yellow', 'lime', 'cyan', 'blue']
    }

    buildBoard = ([inputSquareSize, inputHeightPoints, InputWidthPoints] = [20,40,20]) => {
        this.boardDOM.innerHTML=""

        this.squareSizePX = inputSquareSize
        this.heightPoints = inputHeightPoints
        this.widthPoints = InputWidthPoints
        
        docCSSSelectors[this.cssSelectorSquare].style.height=`${this.squareSizePX}px`;
        docCSSSelectors[this.cssSelectorSquare].style.width=`${this.squareSizePX}px`;

        this.boardDOM.style.height=`${this.heightPoints * this.squareSizePX}px`;
        this.boardDOM.style.width=`${this.widthPoints * this.squareSizePX}px`;

        for (let x=0; x<this.heightPoints*this.widthPoints; x++){
            const square = document.createElement('div')
            square.classList.add('square')
            this.boardDOM.append(square)
            square.addEventListener('mouseover', event => this.activationSquare(event.target))
            square.addEventListener('mouseleave', event => this.deactivationSquare(event.target))
        }

        this.matrixSquares = document.querySelectorAll(this.cssSelectorSquare)
    }

        
    toogleBordersBoard = (off = this.borders) => {
        this.borders = !this.borders
        this.borders
            ? this.boardDOM.classList.add('borders')
            : this.boardDOM.classList.remove('borders')
    }

    //DYMANIC
    activationSquare = (square, color=getRandomElement(this.colors), brithness=[20,80]) => {
        square.style.transitionDuration="0s"
        square.style.zIndex=100
        square.style.background=color
        square.style.borderColor=color
        square.style.boxShadow=`0 0 20px 0 ${color}`
        square.style.filter=`brightness(${Math.floor(Math.random()*brithness[0])+brithness[1]}%)`
    }

    deactivationSquare = square => {
        square.style.transitionDuration=".9s"
        square.style.borderColor="transparent"
        square.style.background="transparent"
        square.style.boxShadow="none"
        square.style.filter=`brightness(100%)`
    }
    flashSquare = (square, delay) => {
        this.activationSquare(square)
        setTimeout(() => this.deactivationSquare(square), delay)
    }
}

class Rocket{
    constructor(inputBoard){
        this.board = inputBoard

        this.x = getRandomNumber(1, this.board.heightPoints)
        this.y = getRandomNumber(1, this.board.widthPoints)

        this.currentSignX = getRandomNumber(0,1)
        this.currentSignY = getRandomNumber(0,1)
        
        this.fly = false
        this.minDelay = 17 // 17
        this.maxDelay = 34 // 34
        this.delay = getRandomNumber(this.minDelay,this.maxDelay)

        this.color = getRandomElement(['red', 'orange', 'lime'])
    }

    speed = delay => {
        delay < this.minDelay
            ? this.delay = this.minDelay
            : delay > this.maxDelay
                ? this.delay = this.maxDelay
                : this.delay = delay
    }

    boost = () => this.speed(getRandomNumber(this.delay-5,this.delay+5))
    
    getSquareFromCoords = (x,y) => this.board.matrixSquares[(y-1)*this.board.widthPoints+x-1]

    fireCoords = (x, y) => this.board.flashSquare(this.getSquareFromCoords(x, y), this.delay)

    moving = (startX, finalX, startY, finalY) => {
        const deltaXs = finalX-startX, deltaYs = finalY-startY
        
        if(Math.abs(deltaXs)>1 || Math.abs(deltaYs)>1){
            let deltaX, deltaY
            deltaXs < 0 ? deltaX = -1 : deltaXs > 0 ? deltaX = 1 : deltaX = 0
            deltaYs < 0 ? deltaY = -1 : deltaYs > 0 ? deltaY = 1 : deltaY = 0
            
            this.fireCoords(startX+deltaX, startY+deltaY)
            setTimeout(() => this.moving(startX+deltaX, finalX, startY+deltaY, finalY), this.delay)
        } else {
            this.flying()
        }
    }

    calcFunc = (coord, znak, k, k2) => (znak ? k2*coord+k : k2*coord-k)

    flying = () => {
        if(this.fly){                     
            //coordination
            this.kX = getRandomNumber(1,4)
            this.kY = getRandomNumber(1,4)
            this.k2X = getRandomNumber(1,2)
            this.k2Y = getRandomNumber(1,2)

            let startX = this.x
            let startY = this.y
            let finalX = this.calcFunc(this.x, this.currentSignX, this.kX, this.k2X)
            let finalY = this.calcFunc(this.y, this.currentSignY, this.kY, this.k2Y)

            //reflection
            if (finalX > this.board.widthPoints ){
                startX == this.board.widthPoints ? this.x = this.board.widthPoints-1 : this.x = this.board.widthPoints
                this.currentSignX = !this.currentSignX
                this.boost()
            } else if (finalX <= 0 ){
                startX == 1 ? this.x = 2 : this.x = 1
                this.currentSignX = !this.currentSignX
                this.boost()
            } else {
                this.x = finalX      
            }
            if (finalY > this.board.heightPoints ){
                startY == this.board.heightPoints ? this.y = this.board.heightPoints-1 : this.y = this.board.heightPoints
                this.currentSignY = !this.currentSignY
                this.boost()
            } else if (finalY <= 0 ){
                startY == 1 ? this.y = 2 : this.y = 1
                this.currentSignY = !this.currentSignY
                this.boost()
            } else {
                this.y = finalY 
            }
            
            console.log(this.x, this.y)
            //motion
            this.fireCoords(startX, startY, this.color)
            setTimeout(() => this.moving(startX, this.x, startY, this.y), this.delay)
        } else {
            for (let dx=-1;dx<2;dx++)
                for (let dy=-1;dy<2;dy++)
                    this.fireCoords(this.x+dx, this.y+dy)
        }
    }
    toogleFlying = () => {
        this.fly = !this.fly
        this.flying()
    }
}

class App {
    constructor([inputSquareSize, inputHeightPoints, InputWidthPoints] = [20,40,20]){
        this.mountBoard(null, [inputSquareSize, inputHeightPoints, InputWidthPoints])

        this.theme = 'dark'
        document.querySelector('.theme-btn').addEventListener('click', () => this.toogleTheme())

        //Разобраться с неадекватной работой при смене размера
        this.fullSize = false
        document.querySelector('.fullsize-btn').addEventListener('click', () => this.toogleFullsize())
        document.addEventListener('keyup', (event) => {
            event.preventDefault()
            event.code === 'Escape' ? this.toogleFullsize() : null
        })

        this.bordersBtn = document.querySelector('.borders-btn')
        this.bordersBtn.addEventListener('click', () => this.toogleBordersBoard())

        document.querySelector('.resize-btn').addEventListener('click', () => this.resize())
        this.resizerInputs = document.querySelector('.resize-inputs').querySelectorAll('input')

        this.colorpickers = document.querySelector('.colorpicker').querySelectorAll('button')
        this.colorPalette = []
        for (let colorpicker of this.colorpickers){
            colorpicker.style.backgroundColor ? this.colorPalette.push(colorpicker.style.backgroundColor) : null
            colorpicker.addEventListener('click', event => this.colorPick(event.target))
        }

        this.colorCircleBtn = document.querySelector('.circle-btn')
        this.colorCircle = false
        this.colorCircleInterval = null
        this.colorCircleBtn.addEventListener('click', () => this.toogleColorCircle())
        this.colorCircleInput = document.querySelector("#color-circle-delay")
            
        // this.brushBtn = document.querySelector('.brush-btn')
        // this.brush = true
        // this.brushBtn.addEventListener('click', () => this.toogleBrush())

        // this.bombGunBtn = document.querySelector('.bombgun-btn')
        // this.bombGun = false
        // this.bombGunBtn.addEventListener('click', () => this.toogleBombGun())

        this.fireShowBtn = document.querySelector('.fireshow-btn')
        this.fireShowInterval = null
        this.fireShow = false
        this.fireShowBtn.addEventListener('click', () => this.toogleFireShow())
        
        this.rocketBtn = document.querySelector('.rocket-btn')
        this.rocketBtn.addEventListener('click', () => this.toogleRocketPlay())
    }
    mountBoard = (board, inputSizesBoard) => {
        if (board)
            this.board = board
        else {
            this.currentSizesBoard = this.normalizeSizes(inputSizesBoard, document.querySelector('.control').offsetWidth)
            this.board = new squaresBoard(this.currentSizesBoard)
        }
    }
    normalizeSizes([inputSquareSize, inputHeightPoints, InputWidthPoints], offsetX=0){
        let squareSizePX = Number(inputSquareSize)
        inputSquareSize > 100 ? squareSizePX = 100 : inputSquareSize < 5 ? squareSizePX = 5 : null

        let heightPoints = inputHeightPoints * squareSizePX > getClientHeightPX() ? Math.floor(getClientHeightPX()/squareSizePX) : inputHeightPoints < 2 ? 2 : Number(inputHeightPoints)
        let widthPoints = InputWidthPoints * squareSizePX > getClientWidthPX()-offsetX ? Math.floor((getClientWidthPX()-offsetX)/squareSizePX) : InputWidthPoints < 2 ? 2 : Number(InputWidthPoints)
        
        return [squareSizePX, heightPoints, widthPoints]
    }
    /* UTILS */
    activateBtn = btn => btn.classList.add('active-btn')
    deActivateBtn = btn => btn.classList.remove('active-btn')
    
    /* CONFIG */
    toogleTheme = () => {       
        if(this.theme == 'dark'){
            docCSSSelectors['body'].style.background="#fff"
            docCSSSelectors['button'].style.color="#111"
            this.theme = 'light'
        } else {
            docCSSSelectors['body'].style.background="#111"
            docCSSSelectors['button'].style.color="#fff"
            this.theme = 'dark'
        }
    }

    toogleFullsize = () => {
        this.fullSize = !this.fullSize
        if(this.fullSize){
            document.querySelector('.control').style.display="none"
            this.board.buildBoard(this.normalizeSizes([this.board.squareSizePX, getClientHeightPX(), getClientWidthPX()]))
        } else {
            document.querySelector('.control').style.display="block"
            this.board.buildBoard(this.currentSizesBoard)
        }
    }

    toogleBordersBoard = () => {
        this.board.borders ? this.deActivateBtn(this.bordersBtn) : this.activateBtn(this.bordersBtn)
        this.board.toogleBordersBoard()
    }

    resize = () => {
        if (this.resizerInputs[0].value && this.resizerInputs[1].value && this.resizerInputs[2].value){
            this.currentSizesBoard = this.normalizeSizes([this.resizerInputs[0].value,this.resizerInputs[1].value,this.resizerInputs[2].value], document.querySelector('.control').offsetWidth)
            this.board.buildBoard(this.currentSizesBoard)
        }
    }

    colorPick = colorpicker => {
        for (let colorPicker of this.colorpickers)
            this.deActivateBtn(colorPicker)

        if (colorpicker !== this.colorCircleBtn){
            this.toogleColorCircle(true)
            colorpicker.style.backgroundColor ? this.board.colors = [colorpicker.style.backgroundColor] : this.board.colors = this.colorPalette
        }
        this.activateBtn(colorpicker)
    }

    toogleColorCircle = (off = this.colorCircle) => {
        this.colorCircle = !off
        if(!this.colorCircle){
            clearInterval(this.colorCircleInterval)
            this.colorCircleInput.removeEventListener('change', this.colorCirclePick)
        } else {
            this.colorCirclePick()
            this.colorCircleInput.addEventListener('change', this.colorCirclePick)
        }
        
    }

    colorCirclePick = () => {
        if (this.colorCircleInterval)
            clearInterval(this.colorCircleInterval)
        this.board.colors = [getRandomElement(this.colorPalette)]
        this.colorCircleInterval = setInterval(() => this.board.colors = [getRandomElement(this.colorPalette)],  this.colorCircleInput.value)
    }
    
    /* MANUAL DRAW */
    // toogleBrush = () => {
    //     this.brush = !this.brush
    //     if(!this.brush)
    //         this.deActivateBtn(this.brushBtn)
    //     else{
    //         this.bombGun ? this.toogleBombGun() : null
    //         this.activateBtn(this.brushBtn)
    //     }
            
    // }

    // toogleBombGun = () => {
    //     this.bombGun = !this.bombGun
    //     if(!this.bombGun)
    //         this.deActivateBtn(this.bombGunBtn)
    //     else{
    //         this.brush ? this.toogleBrush() : null
    //         this.activateBtn(this.bombGunBtn)
    //     }
            
    // }

    /* FIRESHOW */ 
    fireRandomSquare = () => this.board.flashSquare(getRandomElement(this.board.matrixSquares), 500)
          
    startFireShow = (func, delay) => {
        this.fireShowInterval = setInterval(func, delay)
        this.activateBtn(this.fireShowBtn)
    }
    
    stopFireShow = () => {
        clearInterval(this.fireShowInterval)
        this.deActivateBtn(this.fireShowBtn)
    }
    
    toogleFireShow = () => {
        this.fireShow = !this.fireShow
        this.fireShow
            ? this.startFireShow(() => this.fireRandomSquare(), 17)
            : this.stopFireShow()
    }

    /* ROCKET */
    asmRocket () {
        this.rocket = new Rocket(this.board)
        this.rocket.toogleFlying()
    }
    deAsmRocket () {
        this.rocket.toogleFlying()
        delete this.rocket
    }
    toogleRocketPlay = () => {
        if(this.rocket){
            this.deAsmRocket ()
            this.deActivateBtn(this.rocketBtn)
        } else {
            this.asmRocket()
            this.activateBtn(this.rocketBtn)
        }    
    }
}

const myApp = new App()