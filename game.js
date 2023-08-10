const game = document.getElementById('game')
game.height = 500
game.width = 900
const ctx = game.getContext('2d')

var splash = document.getElementById('splash')
var over = document.getElementById('over')
var over_text = document.getElementById('over-text')

var p1 = document.getElementById('p1')
var p2 = document.getElementById('p2')

var isPlay = false
var isTimer = false
var startTimer = 3

var p1name, p2name;

var startTimerInterval
var drawBackgroundInterval

const bg_image = new Image();
bg_image.src = "./bg.png"
const people_image = new Image();
people_image.src = "./people.png"

var tapPower = 5;

const player = {
    w: 50,
    h: 250
}

ropeCenterPos = game.width/2

document.addEventListener('keypress', controller)

// startTime()

function checkName() {
    if(!p1.value || !p2.value) {
        alert('Nama pemain 1 dan 2 tidak boleh kosong')
    } else {
        p1name = p1.value
        p2name = p2.value
        isTimer=true
        startGame()
    }
}

function startTime()
{
    isTimer = true
    setTimeout(startGame, 1500)
}

function homeDisplayShow()
{
    splash.style.display = 'flex'
    game.style.display = 'none'
    over.style.display = 'none'
}

function gameDisplayShow()
{
    splash.style.display = 'none'
    game.style.display = 'block'
    over.style.display = 'none'
}

function overDisplayShow()
{
    splash.style.display = 'none'
    game.style.display = 'none'
    over.style.display = 'grid'
}

function startGame()
{
    gameDisplayShow()
    if(isTimer) {
        startTimerInterval = setInterval(checkTimer, 1000)
    } else {
        drawBackgroundInterval = setInterval(drawGame, 1)
    }
}

function checkTimer()
{
    drawBackground()
    drawTimer(startTimer)
    if(startTimer <= 0) {
        isTimer = false
        isPlay = true
        startTimer = 3
        clearInterval(startTimerInterval)
        startGame()
    } else {
        startTimer--
    }
}

function drawGame()
{
    drawBackground()
}

function drawBackground()
{
    drawRect(0, 0, game.width, game.height, 0, '#75C2F6', 'transparent')
    drawRect(0, game.height/2, game.width, game.height, 0, '#8EAC50', 'transparent')
    
    drawImage(bg_image, 0, -100, game.width, game.height)
    // drawLine(game    .width/2, game.height, game.width/2, game.height/1.3, 3, 'white')
    // drawLine(game.width/8*3, game.height, game.width/8*3, game.height/8*5, 3, 'white')
    // drawLine(game.width/8*5, game.height, game.width/8*5, game.height/8*5, 3, 'white')
    drawPlayer()
    drawIdentity()
}

function drawTimer(time)
{
    drawText(time, game.width/2, game.height/2, 0, 'black', 'transparent', 'center', '50pt sans-serif')
}

function drawPlayer()
{
    // drawLine(ropeCenterPos, game.height*5/8, ropeCenterPos-400, game.height*5/8 , 4, '#4C4B16')
    // drawLine(ropeCenterPos, game.height*5/8, ropeCenterPos+400, game.height*5/8 , 4, '#4C4B16')
    
    // drawRect(ropeCenterPos-100-(player.w/2), game.height*1/2-20, player.w, player.h, 0, '#C70039', 'transparent')
    // drawRect(ropeCenterPos-250-(player.w/2), game.height*1/2-20, player.w, player.h, 0, '#C70039', 'transparent')
    
    // drawRect(ropeCenterPos+100-(player.w/2), game.height*1/2-20, player.w, player.h, 0, '#4E4FEB', 'transparent')
    // drawRect(ropeCenterPos+250-(player.w/2), game.height*1/2-20, player.w, player.h, 0, '#4E4FEB', 'transparent')
    
    const ph = people_image.width*game.width/people_image.width
    drawImage(people_image, ropeCenterPos-game.width/2, 200, game.width, ph)
    // drawLine(ropeCenterPos, game.height*5/8-5, ropeCenterPos, game.height*5/8+5 , 4, '#4C4B16')
}

function drawIdentity()
{
    drawRect(0, game.height-50, game.width, 50, 0, 'white', 'transparent')
    drawText(p1name, game.width/2-200, game.height-20, 0, 'red', 'transparent', 'center')
    drawText(p2name, game.width/2+200, game.height-20, 0, 'red', 'transparent', 'center')
    drawLine(game.width/2, game.height, game.width/2, game.height-50, 2, 'black')
}

function drawText(text, x, y, lw, fcolor, bcolor, align = 'center',fstyle = '24pt sans-serif')
{
    ctx.beginPath()
    ctx.font = fstyle
    ctx.fillStyle = fcolor
    ctx.strokeStyle = bcolor
    ctx.textAlign = align
    ctx.fillText(text, x, y)
    ctx.strokeText(text, x, y)
    ctx.closePath()
}

function drawLine(xs, ys, xe, ye, lw, color)
{
    ctx.beginPath()
    ctx.moveTo(xs, ys)
    ctx.lineTo(xe, ye)
    ctx.lineWidth = lw
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.closePath()
}

function drawRect(x, y, w, h, lw, fcolor, bcolor)
{
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.lineWidth = lw
    ctx.strokeStyle = bcolor
    ctx.fillStyle = fcolor
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}

function drawRound(x, y, r, sAngle, eAngle, lw, fcolor, bcolor)
{
    ctx.beginPath()
    ctx.arc(x, y, r, sAngle, eAngle)
    ctx.lineWidth = lw
    ctx.fillStyle(fcolor)
    ctx.strokeStyle(bcolor)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}

function drawImage(image, x, y, w, h)
{
    ctx.beginPath()
    ctx.drawImage(image, x, y, w, image.height*w/image.width)
    ctx.closePath()
}

function controller(e)
{
    if(isPlay) {
        if(e.code == 'KeyW') ropeCenterPos -= tapPower
        if(e.code == 'KeyF') ropeCenterPos -= tapPower
        if(e.code == 'KeyJ') ropeCenterPos += tapPower
        if(e.code == 'KeyP') ropeCenterPos += tapPower
        checkIsEnd()
    }
}

function checkIsEnd()
{
    if(ropeCenterPos < (game.width/2)-110 || ropeCenterPos > (game.width/2)+110) {
        var winner = ( ropeCenterPos < (game.width/2)-110 ? p1name : p2name)
        isPlay = false
        clearInterval(drawBackgroundInterval)
        gameOver(winner)

    }
}

function gameOver(name)
{
    overDisplayShow()
    over_text.textContent = name+' berhasil menang'
}

function exitGame(type)
{
    ropeCenterPos = game.width/2
    if(type != 'restart') {
        p1name = ''
        p2name = ''
        p1.value = ''
        p2.value = ''
        homeDisplayShow()
    } else {
        isTimer = true
        startGame()
    }
    drawGame()
}