const tetris = document.querySelector("#tetris");
let tetrisData = [];
let stopDown = false;
const blockArr = [
    //블록 딕셔너리 색, 움직일 수 있는지 여부, 블록 모양
    ['red', true, [[1,1],[1,1]]],
    ['blue', true, [[0,2,0],[2,2,2]]],
    ['orange', true, [[3,3,0],[0,3,3]]],
    ['skyblue', true, [[0,4,4],[0,4,4]]],
    ['yellowgreen', true, [[5,5,5],[5,0,0]]],
    ['pink', true, [[6,6,6],[0,0,6]]],
    ['yellow', true, [[7,7,7,7]]],
]

const blockDict = {
    //블록 딕셔너리 색, 움직일 수 있는지 여부, 블록 모양
    0: ['white', false, []],
    1: ['red', true, [[1,1],[1,1]]],
    2: ['blue', true, [[0,1,0],[1,1,1]]],
    3: ['orange', true, [[1,1,0],[0,1,1]]],
    4: ['skyblue', true, [[0,1,1],[0,1,1]]],
    5: ['yellowgreen', true, [[1,1,1],[1,0,0]]],
    6: ['pink', true, [[1,1,1],[0,0,1]]],
    7: ['yellow', true, [[1,1,1,1]]],
    10: ['red', false, [[1,1],[1,1]]],
    20: ['blue', false, [[0,1,0],[1,1,1]]],
    30: ['orange', false, [[1,1,0],[0,1,1]]],
    40: ['skyblue', false, [[0,1,1],[0,1,1]]],
    50: ['yellowgreen', false, [[1,1,1],[1,0,0]]],
    60: ['pink', false, [[1,1,1],[0,0,1]]],
    70: ['yellow', false, [[1,1,1,1]]],
}

function createGrid(){ //20*10 칸 생성
    const fragment = document.createDocumentFragment();
    for(let i = 0; i<20; i++){
        const tr = document.createElement('tr');
        let arr = [];
        tetrisData.push(arr); //테트리스 데이터에 arr 내용을 넣음
        fragment.appendChild(tr);
        for(let j =0; j<10; j++){
            const td = document.createElement('td');
            tr.appendChild(td);
            arr.push(0);
        }
    }
    tetris.appendChild(fragment);
    console.log(tetrisData);
}

function drawScreen(){
    tetrisData.forEach(function(tr, i){
        tr.forEach(function (td, j){
            tetris.children[i].children[j].className = blockDict[td][0];  
        });
    });
}

function createBlock(){
    let block = blockArr[Math.floor(Math.random() * 7)][2];
    block.forEach(function(tr, i){
        tr.forEach(function(td, j){
            tetrisData[i][j+3] = td;
        });
    });
    console.log(tetrisData);
    drawScreen();
}

function blockDown(){
    stopDown = false;
    for(let i = tetrisData.length - 1; i>=0; i--){
        tetrisData[i].forEach(function(td, j){
            if(td > 0 && td<10){
                
                if(tetrisData[i+1] && !stopDown){
                    //td를 한 줄 아래로 보내버린다.
                    tetrisData[i+1][j] = td;
                    tetrisData[i][j] = 0; //지금 내 칸은 빈칸
                }
                else{
                    //테트리스 데이터 다음 줄이 없으면 빈 땅에 고정
                    stopDown = true;
                    tetrisData[i][j] = td*10;
                }
            }
        })
    }
    if(stopDown){
        createBlock();
    }
    drawScreen();
}

function keydownHandler(event){
    console.log(event);
    //사람이 꾹 누를 수도 있어서 keydown은 꾹 누르기를 고려할 경우에 사용
    //꾹 누를 필요성이 있는 애들만 keydown
    //keyup은 눌렀다 떼는 순간
    //keypress는 방향키 인식이 안된다고 함
    switch(event.code){
        case "ArrowRight":
            break;
        case "ArrowLeft":
            break;
        case "ArrowDown":
            break;
        
    }
}

function keyupHandler(event){
    switch(event.code){
        case "Space":
            break;
        case "ArrowUp":
            break;
    }
}

window.addEventListener('keyup', keyupHandler)
window.addEventListener('keydown', keydownHandler)
createGrid();
createBlock();
setInterval(blockDown, 100); //호출스택, 백그라운드, 테스크 큐의 조합
//백그라운드에서 시간을 재고 있음. 
//시간이 되면 테스크 큐로 갔다가 시간이 되면 호출스택으로 올라가 실행
