const dataStructureArray = Array.from(document.querySelectorAll(".data-structure"));
const algorithmArray = Array.from(document.querySelectorAll(".algorithm"));
const mainContainer = document.querySelector('.main-container');
const tableContentContainer = document.querySelector(".table-contents-container");
const illustrationContainer = document.querySelector('.illustration-container');
const codeContainer = document.querySelector('.code-container');
const burgerButton = document.querySelector('.burger');
const brand = document.querySelector('.brand');
const buttonNav = Array.from(document.querySelectorAll('.dropdown-container'));
const algorithmUL = document.querySelector('.ul-algo');
const dataStructureUL = document.querySelector('.ul-ds');
const tutorialCounter = document.querySelector('.tutorial-counter');
const tutorialContainer = document.querySelector('.tutorial');
const tutorialHeader = document.querySelector('.tutorial-header');
const tutorialIntro = document.querySelector('.tutorial-intro');
const tutorialParagraph = document.querySelector('.tutorial-paragraph');
const buttonNext = document.querySelector('.btn-next');
const buttonPrevious = document.querySelector('.btn-previous');
const buttonSkip = document.querySelector('.btn-skip');

const dataStructureObject = [
    {
        name: "Linked List",
        description:
            "In computer science, a linked list is a linear collection of data elements, in which linear order is not given by their physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a group of nodes which together represent a sequence. Under the simplest form, each node is composed of data and a reference (in other words, a link) to the next node in the sequence. This structure allows for efficient insertion or removal of elements from any position in the sequence during iteration. More complex variants add additional links, allowing efficient insertion or removal from arbitrary element references. A drawback of linked lists is that access time is linear (and difficult to pipeline). Faster access, such as random access, is not feasible. Arrays have better cache locality as compared to linked lists.",
        operation: ['Insert', 'Search', 'Delete', 'Traverse', 'Complexity']
    },
    {
        name: "Queue",
        description: "In computer science, a queue is a particular kind of abstract data type or collection in which the entities in the collection are kept in order and the principle (or only) operations on the collection are the addition of entities to the rear terminal position, known as enqueue, and removal of entities from the front terminal position, known as dequeue. This makes the queue a First-In-First-Out (FIFO) data structure. In a FIFO data structure, the first element added to the queue will be the first one to be removed. This is equivalent to the requirement that once a new element is added, all elements that were added before have to be removed before the new element can be removed. Often a peek or front operation is also entered, returning the value of the front element without dequeuing it. A queue is an example of a linear data structure, or more abstractly a sequential collection.",
        operation: ['Enqueue', 'Dequeue', 'Peek', 'isEmpty-isFull', 'Complexity']
    },
    {
        name: "Stack",
        description: "In computer science, a stack is an abstract data type that serves as a collection of elements, with two principal operations: <br>• Push (adds a element to the collection ) and <br>• Pop (removes the most recently added element that was not yet remove). <br>The order in which elements come off a stack gives rise to its alternative name, LIFO (last in, first out). Additionally, a peek operation may give access to the top without modifying the stack. The name stack for this type of structure comes from the analogy to a set of physical items stacked on top of each other, which makes it easy to take an item off the top of the stack, while getting to an item deeper in the stack may require taking off multiple other items first.",
        operation: ['Push', 'Pop', 'Peek', 'isEmpty-isFull', 'Complexity']
    },
    {
        name: "Hash Table",
        description: "In computing, a hash table (hash map) is a data structure which implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.",
        operation: ['Insert', 'Collisions', 'Delete', 'Find', 'Complexity']
    },
    {
        name: "Heap",
        description: "In computer science, a heap is a specialized tree-based data structure that satisfies the heap property described below. <br>• In a min heap, if P is a parent node of C, then the key (the value) of P is less than or equal to the key of C. <br>• In a max heap, the key of P is greater than or equal to the key of C.",
        operation: ['Insert', 'Delete', 'Complexity']
    }
];

//This is the defaul values for the Algorithms and maybe changed later
var START_NODE_ROW = 0;
var START_NODE_COL = 0;
var FINISH_NODE_ROW = 3;
var FINISH_NODE_COL = 3;
var isReset = true;
var isRunning = false;
var isSorted = false;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    dropdownActive();
    burgerActive();
    tutorialButtonsEventListener();
    brand.addEventListener('click', () => {
        tutorialContainer.classList.remove('transparent');
    });
    dataStructureArray.forEach((data) => {
        data.addEventListener('click', getNameDataStructure);
    })
    algorithmArray.forEach(algorithm => {
        algorithm.addEventListener('click', setContainerAlgorithm);
    })
}

//Display based on the selected algorithm - Path finding or Sorting
function setContainerAlgorithm(event) {
    clearScreen();
    if (!codeContainer.classList.contains('hide')) {
        codeContainer.classList.add('hide');
        tableContentContainer.classList.add('background-color');
        tableContentContainer.style.setProperty('flex', '0.1');
    }

    algorithmUL.classList.remove('visible');
    dataStructureUL.classList.remove('visible');
    if (event.target.classList.contains('path-finding')) {
        getInitialGrid(event.target.innerHTML);
    } else if (event.target.classList.contains('sort')) {
        getInitialArraysForSort(event.target.innerHTML);
    }
}

function getInitialArraysForSort(algorithm) {
    isSorted = false;
    addRunButton(displayInitialArray(algorithm), algorithm);
}

function addRunButton(initialArray, algorithm) {
    var operation = document.querySelector('.operation');
    var runBtn = document.createElement('li');
    runBtn.classList.add('btn', 'btn-slide');
    runBtn.innerHTML = `Visualize`;
    operation.appendChild(runBtn);
    tableContentContainer.appendChild(operation);

    runBtn.addEventListener('click', () => {
        if (!isRunning && !isSorted) {
            runBtnEventListener(initialArray, algorithm);
        }
    });
}

function runBtnEventListener(initialArray, algorithm) {
    isRunning = true;
    tableContentContainer.classList.remove('burger-active');
    if (algorithm == 'Bubble Sort') {
        bubbleSort(initialArray);
    } else if (algorithm == 'Merge Sort') {
        mergeSort(initialArray);
    }
}

function addGenerateArrayButton(algorithm) {
    var operation = document.createElement('ul');
    var generateArrayButton = document.createElement('li');
    generateArrayButton.classList.add('btn', 'btn-slide');
    generateArrayButton.innerHTML = `Generate New Array`;
    operation.classList.add('operation');
    operation.appendChild(generateArrayButton);
    tableContentContainer.appendChild(operation);

    generateArrayButton.addEventListener('click', () => {
        if (!isRunning) {
            isSorted = false;
            var initialArray = displayInitialArray(algorithm);
            addRunButton(initialArray, algorithm);
        }
    })
}

function displayInitialArray(algorithm) {
    var introText = document.createElement('h4');
    var sortContainer = document.createElement('div');
    const arrayContainer = document.createElement('div');
    const initialArray = [];

    clearScreen();
    addGenerateArrayButton(algorithm);
    addIntroTextSorting(introText, algorithm);

    if (document.body.clientWidth < 768) {
        for (let i = 0; i < 90; i++) {
            initialArray.push(randomIntFromInterval(5, 450));
        }
    } else {
        for (let i = 0; i < 200; i++) {
            initialArray.push(randomIntFromInterval(5, 450));
        }
    }

    initialArray.forEach((barValue, index) => {
        var displayedBar = document.createElement('div');
        displayedBar.classList.add('array-bar', `bar-${barValue}`);
        displayedBar.style.height = `${barValue}px`;
        displayedBar.setAttribute('id', `bar-${index + 1}`);
        arrayContainer.appendChild(displayedBar);
    })
    tableContentContainer.classList.remove('burger-active');
    arrayContainer.classList.add('array-container');
    sortContainer.classList.add('sort-container');
    introText.classList.add('sort-intro');
    sortContainer.appendChild(arrayContainer);
    sortContainer.appendChild(introText);
    illustrationContainer.appendChild(sortContainer);

    return initialArray;
}

function addIntroTextSorting(introText, algorithm) {
    switch (algorithm) {
        case 'Bubble Sort':
            introText.innerHTML = `Bubble Sort is a simple sort algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.`;
            break;
        case 'Merge Sort':
            introText.innerHTML = `In computer science, merge sort (also commonly spelled mergesort) is an efficient, general-purpose, comparison-based sorting algorithm.`
            break;
    }
}

function bubbleSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        setTimeout(() => {
            for (let j = 0; j < array.length - 1; j++) {
                var barA = document.querySelector(`#bar-${j + 1}`); //selec #bar-[j+1] because #bar-index starts with 1 while j stats with 0
                var barB = document.querySelector(`#bar-${j + 2}`);

                if (array[j] > array[j + 1]) {
                    var temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    barA.style.height = `${array[j]}px`;
                    barB.style.height = `${array[j + 1]}px`;
                }
            }
        }, i * 50);
        if (i == array.length - 2) {
            isRunning = false;
            isSorted = true;
        }
    }
}

function mergeSort(initialArray) {
    const animations = getMergeSortAnimations(initialArray);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? 'red' : 'turquoise';
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * 5);
        } else {
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, i * 5);
        }
        if (i == animations.length - 1) {
            isRunning = false;
            isSorted = true;
        }
    }
}

//This function just past the auxiliaryArray along with the animations array to the "real" merge sort function
function getMergeSortAnimations(initialArray) {
    const animations = [];
    if (initialArray.length <= 1) return initialArray;
    const auxiliaryArray = initialArray.slice();
    mergeSortHelper(initialArray, 0, initialArray.length - 1, auxiliaryArray, animations);
    return animations;
}

//The auxiliaryArray to keep track of where the elements are in the mainArray. It is the one that is splitted into smaller arrays
function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once to change their color to red.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second time to revert their color back to the original.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    //The below 2 loops will push the remaining elements into the arrays in case the array is not divided equally (one with 2 and one with 3 elements,...)
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/************************************************* Path Finding Algorithm ******************************************************************/
//Node object for the Algorithm
function createNode(col, row) {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        isWall: false,
        isWeighted: false,
        heuristics: 0,            //This is for A* alrogithm: f(n) = g(n) + h(n) with f = combinedHeuristics, g = distance from the start node, h = heuristics
        combinedHeuristics: 0,
        neighbors: []             //All the neighbors for the current node
    }
}

//Create the grid of nodes for the algorithm. The grid will be: grid[row][col] with default 20 rows and 50 cols
function getInitialGrid(algorithm) {
    const grid = [];
    var table = document.createElement('table');
    var gridContainer = document.createElement('tbody');
    var buttonContainer = document.createElement('ul');
    var boardContainer = document.createElement('div');
    var introText = document.createElement('h4');
    gridContainer.classList.add('gridContainer');
    boardContainer.classList.add('boardContainer');
    buttonContainer.classList.add('operation');

    var defaultRow = 20;
    var defaultCol = 50;

    if (document.body.clientWidth <= 320) {
        defaultCol = 17;
        defaultRow = 10;
    } else if (document.body.clientWidth <= 375) {
        defaultCol = 20;
        defaultRow = 10;
    } else if (document.body.clientWidth <= 430) {
        defaultCol = 23;
        defaultRow = 10;
    } else if (document.body.clientWidth <= 780) {
        defaultCol = 40;
        defaultRow = 20;
    }

    for (let row = 0; row < defaultRow; row++) {
        const currentRow = [];
        var tableRow = document.createElement('tr');
        tableRow.setAttribute("id", `row-${row}`);
        for (let col = 0; col < defaultCol; col++) {
            var currentNode = createNode(col, row);
            currentRow.push(createNode(col, row));
            var node = document.createElement('td');
            node.setAttribute("id", `node-${row}-${col}`);
            if (currentNode.col == START_NODE_COL && currentNode.row == START_NODE_ROW) {
                node.classList.add('node-start');
                node.isStart = true;
            } else if (currentNode.col == FINISH_NODE_COL && currentNode.row == FINISH_NODE_ROW) {
                node.classList.add('node-finish');
                node.isFinish = true;
            }
            node.setAttribute("ondragover", "allowDrop(event)");
            node.setAttribute("ondrop", "drop(event)");
            node.classList.add('node');
            tableRow.appendChild(node);
        }
        gridContainer.appendChild(tableRow);
        grid.push(currentRow);
    }
    const guide = addGuide();
    table.appendChild(gridContainer);
    boardContainer.appendChild(introText);
    boardContainer.appendChild(table);
    boardContainer.appendChild(guide);
    illustrationContainer.appendChild(boardContainer);
    //displayBurgerButton();

    handleChoosenAlgorithm(algorithm, grid, buttonContainer, introText, defaultCol);
}

function handleChoosenAlgorithm(algorithm, grid, buttonContainer, introText, defaultCol) {
    const nodesArray = getAllNodes(grid);
    const visualizeButton = addVisualizeButton(buttonContainer, algorithm);

    preparePathFindingAlgorithmGeneral(introText, algorithm, nodesArray, buttonContainer, grid, defaultCol);

    if (algorithm == 'Dijkstra') {
        preparePathFindingAlgorithmWeighted(buttonContainer, nodesArray, grid, defaultCol);
        visualizeButtonDijkstra(grid, visualizeButton);
    } else if (algorithm == 'Breadth-first search') {  //BFS is just Dijkstra's algorithm with all edges weight = 1, but for this visualizer, all 1 => no differences
        visualizeButtonDijkstra(grid, visualizeButton);
    } else if (algorithm == 'A*') {
        preparePathFindingAlgorithmWeighted(buttonContainer, nodesArray, grid, defaultCol);
        visualizeButtonAstart(grid, visualizeButton);
    } else if (algorithm == 'Depth-first search') {
        visualizeButtonDFS(grid, visualizeButton);
    }
}

function preparePathFindingAlgorithmWeighted(buttonContainer, nodesArray, grid, defaultCol) {
    addRandomWeightButton(buttonContainer);
    getNodesForWeight(nodesArray);
    randomWeightCreate(grid, defaultCol);
}

function preparePathFindingAlgorithmGeneral(introText, algorithm, nodesArray, buttonContainer, grid, defaultCol) {
    dragNodes();
    getNodesForWalls(nodesArray);
    addRestartButton(buttonContainer);
    addRandomWallButton(buttonContainer);
    randomWallCreate(grid, defaultCol);
    addIntroTextPathFinding(introText, algorithm);
    restartButton(grid);
}

function addGuide() {
    var guide = document.createElement('ul');
    guide.classList.add('guide');
    guide.innerHTML =
        `<li>
            <div class="start-guide"></div><span class="guide-text">Start Node</span>
        </li>
        <li>
            <div class="finish-guide"></div><span class="guide-text">Finish Node</span>
        </li>
        <li>
            <div class="wall-guide"></div><span class="guide-text">Wall Node</span>

        </li>
        <li>
            <div class="weight-guide"></div><span class="guide-text">Weight Node</span>
        </li>
        <li>
            <div class="shortest-guide"></div><span class="guide-text">Shortest Path Node</span>
        </li>
        <li>
            <div class="visited-guide"></div><span class="guide-text">Visited Node</span>
        </li>`
    return guide;
}

//Set the introduction text for the selected algorithms
function addIntroTextPathFinding(introText, algorithm) {
    switch (algorithm) {
        case 'Dijkstra':
            introText.innerHTML = `Dijkstra's algorithm is weighted and guarantees the shortest path`;
            break;
        case 'Breadth-first search':
            introText.innerHTML = `Breadth-first search is unweighted and guarantees the shortest path`;
            break;
        case 'A*':
            introText.innerHTML = `A* is weighted and guarantees the shortest path`;
            break;
        case 'Depth-first search':
            introText.innerHTML = `Depth-first search is unweighted and does not guarantees the shortest path`;
            break;
    }
}

//Get all the nodes for adding the walls
function getNodesForWalls(nodesArray) {
    nodesArray.forEach(node => {
        var nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        nodeElement.addEventListener('click', () => {
            createWall(nodeElement, node);
        })
    })
}

//Create wall function with left click
function createWall(nodeElement, node) {
    if (!nodeElement.classList.contains('node-start')
        && !nodeElement.classList.contains('node-finish')
        && !nodeElement.classList.contains('weight')
        && !isRunning && isReset) {
        nodeElement.classList.toggle('wall');
        node.isWall = !node.isWall;
    }
}

//Get all the nodes for adding the weights
function getNodesForWeight(nodesArray) {
    nodesArray.forEach(node => {
        var nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        nodeElement.addEventListener('contextmenu', () => {
            createWeight(nodeElement, node, event);
        })
    })
}

//Add weight function with right click
function createWeight(nodeElement, node, event) {
    event.preventDefault();
    if (event.button == 2) {
        if (!nodeElement.classList.contains('node-start')
            && !nodeElement.classList.contains('node-finish')
            && !nodeElement.classList.contains('wall')
            && !isRunning && isReset) {
            nodeElement.classList.toggle('weight');
            node.isWeighted = !node.isWeighted;
        }
    }
}

//Allow to drag the Start and Finish nodes to new locations
function dragNodes() {
    var nodeStart = document.getElementsByClassName('node-start')[0];
    var nodeFinish = document.getElementsByClassName('node-finish')[0];
    nodeStart.setAttribute("draggable", "true");
    nodeStart.setAttribute("ondragstart", "drag(event)");
    nodeFinish.setAttribute("draggable", "true");
    nodeFinish.setAttribute("ondragstart", "drag(event)");
}

function allowDrop(node) {
    node.preventDefault();
}

function drop(node) {
    node.preventDefault();
    var src = node.dataTransfer.getData('src');
    var srcNode = document.getElementById(`${src}`);

    //Cannot drop on a wall or weight node, also cannot drop on start node if dragging finish node and vice versa 
    if (srcNode.classList.contains('node-finish')
        && !node.target.classList.contains('wall')
        && !node.target.classList.contains('node-start')
        && !node.target.classList.contains('weight')) {
        srcNode.classList.remove('node-finish');
        node.target.classList.add('node-finish');
        srcNode.removeAttribute("draggable");
        srcNode.removeAttribute("ondragstart");
    } else if (srcNode.classList.contains('node-start')
        && !node.target.classList.contains('wall')
        && !node.target.classList.contains('node-finish')
        && !node.target.classList.contains('weight')) {
        srcNode.classList.remove('node-start');
        node.target.classList.add('node-start');
        srcNode.removeAttribute("draggable");
        srcNode.removeAttribute("ondragstart");
    }

    node.target.setAttribute("draggable", "true");
    node.target.setAttribute("ondragstart", "drag(event)");
}

function drag(node) {
    node.dataTransfer.setData('src', node.target.id);
}

//Restart the grid to the begining state
function restartButtonEventListener(arrayNodes) {
    for (let i = 0; i < arrayNodes.length; i++) {
        setTimeout(() => {
            const node = arrayNodes[i];
            const visitedNode = document.getElementById(`node-${node.row}-${node.col}`);
            visitedNode.classList.remove('wall');
            visitedNode.classList.remove('weight');
            visitedNode.classList.remove('node-visited');
            visitedNode.classList.remove('node-shortest-path');
            visitedNode.classList.remove('node-start-animation');
            visitedNode.classList.remove('node-finish-animation');
            if (i == (arrayNodes.length - 1)) {
                isRunning = false;
                isReset = true;
            }
        }, 2 * i);
    }

    arrayNodes.forEach(node => {
        node.isWall = false;
        node.isStart = false;
        node.isFinish = false;
        node.isVisited = false;
        node.isWeighted = false;
        node.previousNode = null;
        node.distance = Infinity;
        node.heuristics = 0;
        node.combinedHeuristics = 0;
        node.neighbor = []
    })
}

//Add the Restart button to screen
function addRestartButton(buttonContainer) {
    var restartButton = document.createElement('li');
    restartButton.classList.add('btn', 'btn-slide', 'restart-btn');
    restartButton.innerHTML = `Clear Board`;
    buttonContainer.appendChild(restartButton);
    tableContentContainer.appendChild(buttonContainer);
}

//Add Random button to creating walls
function addRandomWallButton(buttonContainer) {
    var randomWallButton = document.createElement('li');
    randomWallButton.classList.add('btn', 'btn-slide', 'random-btn-wall');
    randomWallButton.innerHTML = `Random Wall`;
    buttonContainer.appendChild(randomWallButton);
    tableContentContainer.appendChild(buttonContainer);
}

//Add Random button to adding weight
function addRandomWeightButton(buttonContainer) {
    var randomWeightButton = document.createElement('li');
    randomWeightButton.classList.add('btn', 'btn-slide', 'random-btn-weight');
    randomWeightButton.innerHTML = `Random Weight`;
    buttonContainer.appendChild(randomWeightButton);
    tableContentContainer.appendChild(buttonContainer);
}

//Add Visualize button for the Algorithm
function addVisualizeButton(buttonContainer, algorithm) {
    var visualizeButton = document.createElement('li');
    visualizeButton.classList.add('btn', 'btn-slide');
    visualizeButton.innerHTML = `Visualize ${algorithm}`;
    buttonContainer.appendChild(visualizeButton);
    tableContentContainer.appendChild(buttonContainer);
    return visualizeButton;
}

//Depth-first search algorithm visualize button 
function visualizeButtonDFS(grid, visualizeButton) {
    visualizeButton.addEventListener('click', () => {
        tableContentContainer.classList.remove('burger-active');
        if (!isRunning) {
            isReset = false;
            isRunning = true;
            const startNode = getStartNodes(grid);
            const finishNode = getFinishNode(grid);
            const visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            animatePath(visitedNodesInOrder, nodesInShortestPathOrder);
        }
    })
}

//A* algorithm visualize button
function visualizeButtonAstart(grid, visualizeButton) {
    visualizeButton.addEventListener('click', () => {
        tableContentContainer.classList.remove('burger-active');
        if (!isRunning) {
            isReset = false;
            isRunning = true;
            const startNode = getStartNodes(grid);
            const finishNode = getFinishNode(grid);
            const visitedNodesInOrder = aStart(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            animatePath(visitedNodesInOrder, nodesInShortestPathOrder);
        }
    })
}

//BFS and Dijkstra's algorithm visualize button
function visualizeButtonDijkstra(grid, visualizeButton) {
    visualizeButton.addEventListener('click', () => {
        tableContentContainer.classList.remove('burger-active');
        if (!isRunning) {
            isReset = false;
            isRunning = true;
            const startNode = getStartNodes(grid);
            const finishNode = getFinishNode(grid);
            const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            animatePath(visitedNodesInOrder, nodesInShortestPathOrder);
        }
    });
}

//Restart button
function restartButton(grid) {
    const restartButton = document.querySelector('.restart-btn');
    restartButton.addEventListener('click', () => {
        tableContentContainer.classList.remove('burger-active');
        if (!isRunning) {
            restartButtonEventListener(getAllNodes(grid));
            dragNodes();
        }
    })
}

function randomWallCreate(grid, defaultCol) {
    const randomWallsButton = document.querySelector('.random-btn-wall');
    randomWallsButton.addEventListener('click', () => {
        tableContentContainer.classList.remove('burger-active');
        createRandomWallsAndWeight(event, grid, defaultCol);
    })
}

function randomWeightCreate(grid, defaultCol) {
    const randomWeightButton = document.querySelector('.random-btn-weight');
    randomWeightButton.addEventListener('click', () => {
        tableContentContainer.classList.remove('burger-active');
        createRandomWallsAndWeight(event, grid, defaultCol);
    })
}

//Create random walls and weight based on the button clicked. There will be a total of total nodes / 3 number of walls/weight
function createRandomWallsAndWeight(event, grid, defaultCol) {
    if (event.target.classList.contains('random-btn-wall')) {
        var target = 'wall';
    } else {
        var target = 'weight';
    }

    if (!isRunning && isReset) {
        var nodesArray = getAllNodes(grid);
        var totalNumberOfNodes = Math.floor(nodesArray.length / 3);
        while (totalNumberOfNodes > 0) {
            random = randomNumber(nodesArray.length);

            var row = Math.floor(random / defaultCol);
            var col = random % defaultCol;
            var node = document.getElementById(`node-${row}-${col}`);

            if (!node.classList.contains('node-start')
                && !node.classList.contains('node-finish')
                && !node.classList.contains('weight')
                && !node.classList.contains('wall')) {
                if (target == 'wall') {
                    node.classList.add(`${target}`);
                    grid[row][col].isWall = true;
                } else if (target == 'weight') {
                    node.classList.add(`${target}`);
                    grid[row][col].isWeighted = true;
                }
            }
            totalNumberOfNodes--;
        }
    }
}

//Random function to pick a random node on the grid for auto generating walls/weight
function randomNumber(length) {
    return Math.floor(Math.random() * length);
}

//Get the start node after dragging
function getStartNodes(grid) {
    var getNodeStart = document.getElementsByClassName('node-start')[0];
    var nodeStartCoorinate = getNodeStart.id.slice(5).split('-');
    START_NODE_COL = nodeStartCoorinate[1];
    START_NODE_ROW = nodeStartCoorinate[0];
    var startNode = grid[START_NODE_ROW][START_NODE_COL];
    grid[START_NODE_ROW][START_NODE_COL].isStart = true;
    getNodeStart.removeAttribute("draggable");
    getNodeStart.removeAttribute("ondragstart");
    return startNode;
}

//Get the finish node after dragging
function getFinishNode(grid) {
    var getNodeFinish = document.getElementsByClassName('node-finish')[0];
    var nodeFinishCoorinate = getNodeFinish.id.slice(5).split('-');
    FINISH_NODE_COL = nodeFinishCoorinate[1];
    FINISH_NODE_ROW = nodeFinishCoorinate[0];
    var finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    grid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = true;
    getNodeFinish.removeAttribute("draggable");
    getNodeFinish.removeAttribute("ondragstart");
    return finishNode;
}

//Animation for Dijkstra's algorithm -  visited nodes in order
function animatePath(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            const visitedNode = document.getElementById(`node-${node.row}-${node.col}`);
            visitedNode.classList.add('node-visited');
        }, 10 * i);
    }
}

//Animation for Dijkstra's algorithm -  shortest path
function animateShortestPath(nodesInShortestPathOrder) {
    //Return if the length = 1. This means there is no path to the finish node
    if (nodesInShortestPathOrder.length == 1) {
        isRunning = false;
        return;
    }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            const shortestPathdNode = document.getElementById(`node-${node.row}-${node.col}`);
            shortestPathdNode.classList.remove('node-visited');
            shortestPathdNode.classList.add('node-shortest-path');
            if (i == nodesInShortestPathOrder.length - 1) {
                isRunning = false;
            }
        }, 50 * i);
    }
}

/*
    Depth-first search:
    Start at the startNode and push it to the stack. While the stack is not empty, pop the last element from the stack and if it is the finishNode, return.
    If the current node is not visited, mark it as visited and push its neighbors to the stack. Then repeat the process until the finish node is found.
*/
function depthFirstSearch(grid, startNode, finishNode) {
    var stack = [];
    var visitedNode = [];
    startNode.distance = 0;
    stack.push(startNode);
    getAllNeighbors(grid);
    while (!!stack.length) {
        var currentNode = stack.pop();
        visitedNode.push(currentNode);
        if (currentNode == finishNode) {
            return visitedNode;
        }
        if (!currentNode.isVisited && !currentNode.isWall) {
            currentNode.isVisited = true;
            var neighbors = currentNode.neighbors;
            for (let i = 0; i < neighbors.length; i++) {
                if (neighbors[i].isVisited == false) {
                    neighbors[i].distance = currentNode.distance + 1;
                    neighbors[i].previousNode = currentNode;
                }
                stack.push(neighbors[i]);
            }
        }
    }
    return visitedNode;
}

/* 
    A* algorithm:
    There are 2 sets, closeSet for the already finished nodes and openSet for the nodes that are not yet finished and is valuating.
    Start at the startNode with distance = 0, we loop through the openSet to find the nodes that have the closet distance to the finishNode 
        using the formula f(n) = g(n) + h(n) where g(n) is the closet distance from the startNode to that node and h(n) is the node's heuristics value.
    Then remove the closetNode from the openSet and evaluate the neighbors of the closetNode to calculate 
        the distance from the startNode to the neighbors node (update the distance if it is closer than the current distance/push this to the openSet if not )
    Repeat this process until find the finishNode 
*/
function aStart(grid, startNode, finishNode) {
    var openSet = [] //array of nodes to evaluate
    var closeSet = [] //array of finished nodes
    openSet.push(startNode);
    startNode.distance = 0;

    getAllNeighbors(grid);
    while (!!openSet.length) {
        var closestNode = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].combinedHeuristics < openSet[closestNode].combinedHeuristics) {
                closestNode = i;
            }
        }
        var currentNode = openSet[closestNode];
        closeSet.push(currentNode);
        if (currentNode == finishNode) return closeSet;
        removeNodeFromArray(openSet, currentNode);
        updateDistanceNeighbors(closeSet, openSet, currentNode, finishNode);
    }
    return closeSet;
}

function updateDistanceNeighbors(closeSet, openSet, currentNode, finishNode) {
    var neighbors = currentNode.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        if (!closeSet.includes(neighbor) && !neighbor.isWall) {
            var tempDistance = 0;
            var newPath = false;
            if (!neighbor.isWeighted) {
                tempDistance = currentNode.distance + 1;
            } else if (neighbor.isWeighted) {
                tempDistance = currentNode.distance + 10;
            }

            if (openSet.includes(neighbor)) {
                if (tempDistance < neighbor.distance) {
                    neighbor.distance = tempDistance;
                    newPath = true;
                }
            } else {
                neighbor.distance = tempDistance;
                openSet.push(neighbor);
                newPath = true;
            }

            if (newPath) {
                neighbor.heuristics = getHeuristics(neighbor, finishNode);
                neighbor.combinedHeuristics = neighbor.distance + neighbor.heuristics;
                neighbor.previousNode = currentNode;
            }
        }
    }
}

//Get the Heuristics for the nodes using the Manhattan distance
function getHeuristics(nodeA, nodeB) {
    var heuristics = Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
    return heuristics;
}

function removeNodeFromArray(array, node) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] == node) {
            array.splice(i, 1);
        }
    }
}

/*
    Dijkstra's algorithm:
    Start at the startNode with its distance = 0. 
    Sort the unvisitedNodes array based on distance to get closet nodes - the first time it will be the startNode (distance = 0) 
        with its unvisited neighbor nodes (up, down, left and right nodes), then update their previous node with current closet node, their distance = previous node's distance + 1 and set status to visited for the closet node
    Then sort the unvisitedNodes array with first element (startNode for the 1st time) removed (visited already) and repeat the process until reach the finishNode. 
*/
function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    getAllNeighbors(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        closestNode.isVisited = true;
        if (closestNode.isWall) continue;
        if (closestNode === finishNode && closestNode.previousNode == null) {
            closestNode.isVisited = false;
            return visitedNodesInOrder;
        }
        if (closestNode.distance == Infinity) return visitedNodesInOrder;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateDistanceUnvisitedNeighbors(closestNode);
    }
}

//Update the distance of the unvisited nodes (closet node's distance + 1) and set its previous node = closet node
function updateDistanceUnvisitedNeighbors(node) {
    const unvisitedNeighbors = node.neighbors.filter(neighbor => !neighbor.isVisited);
    for (const neighbor of unvisitedNeighbors) {
        if (neighbor.isWeighted) {
            if (neighbor.distance != Infinity) {
                if (node.distance + 10 < neighbor.distance) {
                    neighbor.distance = neighbor.distance - 10 + node.distance;
                    neighbor.previousNode = node;
                }
            } else if (neighbor.distance == Infinity) {
                neighbor.distance = node.distance + 10;
                neighbor.previousNode = node;
            }
        } else {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
        }
    }
}

//Get all the neighbors of the nodes
function getAllNeighbors(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            addNeighbors(grid[i][j], grid);
        }
    }
}

//Get ALL the neighbor nodes (up, down, left, and right nodes)
function addNeighbors(node, grid) {
    const { col, row } = node;
    if (row > 0) node.neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) node.neighbors.push(grid[row + 1][col]);
    if (col > 0) node.neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) node.neighbors.push(grid[row][col + 1]);
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort(customsort);
}

//Sort the nodes base on distance, if distances are the same then the finish nodes have higher priority
function customsort(nodeA, nodeB) {
    if (nodeA.distance != nodeB.distance) return nodeA.distance - nodeB.distance;
    else if (nodeA.distance == nodeB.distance) return nodeB.isFinish - nodeA.isFinish;
}

//Get all the nodes into one single array
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

/************************************************* Data Structure ******************************************************************/
//Get the Data Strucuture name
function getNameDataStructure(event) {
    if (codeContainer.classList.contains('hide')) {
        tableContentContainer.style.setProperty('flex', '0.2');
        codeContainer.classList.remove('hide');
        dataStructureUL.classList.remove('visible');
        const foundDataStructure = dataStructureObject.find((obj) => obj.name == event.target.innerHTML);
        getInformation(foundDataStructure);
        tableContentContainer.classList.add('background-color');
    } else {
        tableContentContainer.style.setProperty('flex', '0.2');
        dataStructureUL.classList.remove('visible');
        const foundDataStructure = dataStructureObject.find((obj) => obj.name === event.target.innerHTML);
        getInformation(foundDataStructure);
        tableContentContainer.classList.add('background-color');
    }
}

//Display the table of contens for the selected data object
function getInformation(dataObject) {
    clearScreen();
    //displayBurgerButton();
    displayTitleTableContainer(dataObject);
    displayTableContent(dataObject);
}

//Display the name (title) of the selected data object in the table of contents
function displayTitleTableContainer(dataObject) {
    var dataTitle = document.createElement("div");
    dataTitle.innerHTML = dataObject.name;
    dataTitle.classList.add("title");
    tableContentContainer.appendChild(dataTitle);

    dataTitle.addEventListener('click', () => {
        clearScreen();
        displayTitleTableContainer(dataObject);
        displayIntro(dataObject);
        displayTableContent(dataObject);
        tableContentContainer.classList.remove('burger-active');
    })
}

//Display the operations table and event listener when user click on them
function displayTableContent(dataObject) {
    var dataOperationArray = [];
    var dataOperationUL = document.createElement('ul');
    dataObject.operation.forEach((_data, index) => {
        dataOperationArray[index] = document.createElement('li');
        dataOperationArray[index].innerHTML = dataObject.operation[index];
        dataOperationUL.appendChild(dataOperationArray[index]);
    })
    dataOperationUL.classList.add('operation');
    tableContentContainer.appendChild(dataOperationUL);

    displayOperation(dataObject, dataOperationArray);

    if (!illustrationContainer.hasChildNodes()) {
        displayIntro(dataObject);
    }
}

//Operations of the selected data object
function displayOperation(dataObject, dataOperationArray) {
    if (dataObject.name == 'Linked List') {
        dataOperationArray.forEach(data => {
            data.addEventListener('click', () => {
                tableContentContainer.classList.remove('burger-active');
                data.classList.remove('toggle-choose');
                switch (data.innerHTML) {
                    //Linked List insert
                    case 'Insert':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var linkedListInsertIllustration = document.createElement('div');
                        linkedListInsertIllustration.innerHTML =
                            `<div class="head-null-insert">
                                <h3>If head = null (Nothing on the list yet)</h3>
                                <div class="linklist-illu-intro-container">
                                    <div class="cell-container">
                                        <div class="cell">37</div>
                                        <div class="cell"><i
                                                class="fas fa-long-arrow-alt-right icon appear-pointer-linked-list"></i></div>
                                        </div>
                                        <div class="cell-container">
                                            <div class="cell null"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="normal-insert">
                                    <h3>Else (Normal insertion)</h3>
                                    <div class="linklist-illu-intro-container">
                                        <div class="cell-container">
                                            <div class="cell">99</div>
                                            <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                                        </div>
                                        <div class="cell-container">
                                            <div class="cell">37</div>
                                            <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                                        </div>
                                        <div class="cell-container">
                                            <div class="cell tobe-inserted-cell">27</div>
                                            <div class="cell added-cell">27
                                            </div>
                                            <div class="cell new-cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                                            <div class="cell null remove-move-right"></div>
                                        </div>
                                    </div>
                                </div>`
                        linkedListInsertIllustration.classList.add('linkList-insert-illu');
                        illustrationContainer.appendChild(linkedListInsertIllustration);

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Linked List search
                    case 'Search':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var linkedListSearchIllustration = document.createElement('div');
                        linkedListSearchIllustration.innerHTML =
                            `<h3>Search for value 37 in the Linked List</h3>
                                <div class="linklist-illu-intro-container">
                                    <div class="cell-container">
                                        <div class="cell search-cell">12</div>
                                        <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                                    </div>
                                    <div class="cell-container">
                                        <div class="cell search-cell">99</div>
                                        <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                                    </div>
                                    <div class="cell-container">
                                        <div class="cell search-cell">37</div>
                                        <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                                    </div>
                                    <div class="cell-container">
                                        <div class="cell null"></div>
                                    </div>
                                </div>
                            <h3 class="text-result-medium">Return true as 37 is in the Linked List</h3>`
                        linkedListSearchIllustration.classList.add('flex-container');
                        illustrationContainer.appendChild(linkedListSearchIllustration);

                        const searchCells = Array.from(document.querySelectorAll('.search-cell'));
                        searchCells.forEach((cell, index) => {
                            cell.style.animation = `lightUp 2s ease ${index + 1.5}s `
                        })

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Linked List Delete
                    case 'Delete':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var linkedListDeleteIllustration = document.createElement('div');
                        linkedListDeleteIllustration.innerHTML =
                            `<h3>Delete 37 from the Linked List</h3>
                                <div class="linklist-illu-intro-container">
                                    <div class="cell-container">
                                        <div class="cell delete-cell">99</div>
                                        <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                                    </div>
                                    <div class="cell-container tobe-deleted">
                                        <div class="cell delete-cell">37</div>
                                        <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                                    </div>
                                    <div class="cell-container remove-move-left">
                                        <div class="cell">27</div>
                                        <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                                    </div>
                                    <div class="cell-container">
                                        <div class="cell null remove-move-left-2"></div>
                                    </div>
                                </div>
                            <h3 class="text-result-slow">37 is deleted in the Linked List</h3>`
                        linkedListDeleteIllustration.classList.add('normal-insert');
                        illustrationContainer.appendChild(linkedListDeleteIllustration);

                        const deleteCells = Array.from(document.querySelectorAll('.delete-cell'));
                        deleteCells.forEach((cell, index) => {
                            cell.style.animation = `lightUp 2s ease ${index + 2.4}s `
                        })

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Linked List Traverse
                    case 'Traverse':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var linkedListTraverseIllustration = document.createElement('div');
                        linkedListTraverseIllustration.innerHTML =
                            `<h3>Traverse through the Linked List</h3>
                            <div class="linklist-illu-intro-container">
                                <div class="cell-container">
                                    <div class="cell traverse-cell">12</div>
                                    <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                                </div>
                                <div class="cell-container">
                                    <div class="cell traverse-cell">99</div>
                                    <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                                </div>
                                <div class="cell-container">
                                    <div class="cell traverse-cell">37</div>
                                    <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                                </div>
                                <div class="cell-container">
                                    <div class="cell null"></div>
                                </div>
                            </div>`
                        linkedListTraverseIllustration.classList.add('normal-insert');
                        illustrationContainer.appendChild(linkedListTraverseIllustration);

                        const traverseCells = Array.from(document.querySelectorAll('.traverse-cell'));
                        traverseCells.forEach((cell, index) => {
                            cell.style.animation = `lightUp 2s ease ${index + 1.5}s `
                        })

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Linked List Complexity table
                    case 'Complexity':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var complexityTable = document.createElement('table');
                        complexityTable.innerHTML =
                            `<thead>
                            <tr class="table-row">
                                <th scope="col">Access</th>
                                <th scope="col">Insert</th>
                                <th scope="col">Search</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr class="table-row">
                                    <td>O(n)</td>
                                    <td>O(1)</td>
                                    <td>O(n)</td>
                                    <td>O(n)</td>
                                </tr>
                            </tbody>`
                        addComplexityTable(complexityTable);
                        break;
                }
            })
        })
    } else if (dataObject.name == 'Queue') {
        dataOperationArray.forEach(data => {
            data.addEventListener('click', () => {
                tableContentContainer.classList.remove('burger-active');
                data.classList.remove('toggle-choose');
                switch (data.innerHTML) {
                    //Queue Enqueue
                    case 'Enqueue':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var queueEnqueueIllustration = document.createElement('div');
                        queueEnqueueIllustration.innerHTML =
                            `<div class="linklist-illu-intro-container">
                                <div class="cell-container">
                                    <div class="cell tobe-inserted-queue">9<i
                                            class="fas fa-long-arrow-alt-right icon disappear"></i></div>
                                </div>
                                <div class="cell-container queue-illu-intro-container">
                                    <div class="cell inserted-queue">9
                                        <i class="fas fa-arrow-down icon-down appear-fast">
                                            <span class="null text-left text">Rear</span>
                                        </i>
                                    </div>
                                    <div class="cell">26
                                        <i class="fas fa-arrow-down icon-down disappear">
                                            <span class="null text-left text">Rear</span>
                                        </i>
                                    </div>
                                    <div class="cell">7</div>
                                    <div class="cell">5<i class="fas fa-long-arrow-alt-right icon"></i></div>
                                </div>
                            </div>
                            <h3 class="text-result-medium">9 is added to the rear of the Queue</h3>`
                        queueEnqueueIllustration.classList.add('flex-container');
                        illustrationContainer.appendChild(queueEnqueueIllustration);

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Queue Dequeue
                    case 'Dequeue':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var queueDequeueIllustration = document.createElement('div');
                        queueDequeueIllustration.innerHTML =
                            `<div class="linklist-illu-intro-container queue">
                                <div class="cell-container queue-illu-intro-container queue">
                                    <div class="cell">9</div>
                                    <div class="cell">1</div>
                                    <div class="cell">26</div>
                                    <div class="cell">7
                                        <i class="fas fa-long-arrow-alt-right icon text-result-medium"></i>
                                        <i class="fas fa-arrow-down icon-down appear-fast"><span class="null text text-right">Front</span></i>
                                    </div>
                                    <div class="cell tobe-deleted">5
                                        <i class="fas fa-long-arrow-alt-right icon disappear"></i>
                                        <i class="fas fa-arrow-down icon-down disappear"><span class="null text text-right">Front</span></i>
                                    </div>
                                </div>
                            </div>
                            <h3 class="text-result-medium">5 is removed from the front of the Queue</h3>`
                        queueDequeueIllustration.classList.add("flex-container");
                        illustrationContainer.appendChild(queueDequeueIllustration);

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Queue Peek
                    case 'Peek':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var queuePeekIllustration = document.createElement('div');
                        queuePeekIllustration.innerHTML =
                            `<div class="linklist-illu-intro-container">
                                <div class="cell-container queue-illu-intro-container">
                                    <div class="cell">9</div>
                                    <div class="cell">1</div>
                                    <div class="cell">26</div>
                                    <div class="cell">7</div>
                                    <div class="cell found-fast">5
                                        <i class="fas fa-long-arrow-alt-right icon"></i>
                                        <i class="fas fa-arrow-down icon-down text-result-fast"><span class="null text text-right">Front</span></i>
                                    </div>
                                </div>
                            </div>
                            <h3 class="text-result-medium">5 is return as the value at the front of the Queue</h3>`
                        queuePeekIllustration.classList.add('flex-container');
                        illustrationContainer.appendChild(queuePeekIllustration);

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Queue check if it is empty or full
                    case 'isEmpty-isFull':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var isEmptyIsNull = document.createElement('div');
                        isEmptyIsNull.innerHTML =
                            `<div class="head-null-insert">
                                <h3>Is Empty</h3>
                                <h4 class="text-result-fast">Return false as the Queue is not empty</h4>
                                <div class="linklist-illu-intro-container">
                                    <div class="linklist-illu-intro-container">
                                        <div class="cell-container queue-illu-intro-container">
                                            <div class="cell transparent">1</div>
                                            <div class="cell transparent">26</div>
                                            <div class="cell">7
                                                <i class="fas fa-arrow-down icon-down"><span class="null text-left text">Rear</span></i>
                                            </div>
                                            <div class="cell">5
                                                <i class="fas fa-long-arrow-alt-right icon"></i>
                                                <i class="fas fa-arrow-down icon-down"><span class="null text text-right">Front</span></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="normal-insert">
                                <h3>Is Full</h3>
                                <h4 class="text-result-fast">Return true as the Queue is full</h4>
                                <div class="linklist-illu-intro-container">
                                    <div class="linklist-illu-intro-container">
                                        <div class="cell-container queue-illu-intro-container">
                                            <div class="cell">1
                                                <i class="fas fa-arrow-down icon-down"><span class="null text-left text">Rear</span></i>
                                            </div>
                                            <div class="cell">26</div>
                                            <div class="cell">7</div>
                                            <div class="cell">5
                                                <i class="fas fa-long-arrow-alt-right icon"></i>
                                                <i class="fas fa-arrow-down icon-down"><span class="null text text-right">Front</span></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                        isEmptyIsNull.classList.add('linkList-insert-illu');
                        illustrationContainer.appendChild(isEmptyIsNull)

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Queue complexity table
                    case 'Complexity':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var complexityTable = document.createElement('table');
                        complexityTable.innerHTML =
                            `<thead>
                                <tr class="table-row">
                                    <th scope="col">Enqueue</th>
                                    <th scope="col">Dequeue</th>
                                    <th scope="col">Peek</th>
                                    <th scope="col">isEmpty<br>isFull</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-row">
                                    <td>O(1)</td>
                                    <td>O(1)</td>
                                    <td>O(1)</td>
                                    <td>O(1)</td>
                                </tr>
                            </tbody>`

                        addComplexityTable(complexityTable);
                        break;
                }
            })
        })
    } else if (dataObject.name == 'Stack') {
        dataOperationArray.forEach(data => {
            data.addEventListener('click', () => {
                tableContentContainer.classList.remove('burger-active');
                data.classList.remove('toggle-choose');
                switch (data.innerHTML) {
                    //Stack Push
                    case 'Push':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var stackPushIllustration = document.createElement('div');
                        stackPushIllustration.innerHTML =
                            `<div class="stack-illu-container cell-container-col">
                                <div class="cell tobe-inserted-stack">1
                                    <i class="fas fa-arrow-left icon-left text-result-medium">
                                        <span class="null text">Top</span>
                                    </i>
                                </div>
                                <div class="cell">26
                                    <i class="fas fa-arrow-left icon-left tobe-deleted">
                                        <span class="null text">Top</span>
                                    </i>
                                </div>
                                <div class="cell">7</div>
                            </div>
                            <h3 class="text-result-medium">1 is added to the top of the Stack</h3>`
                        stackPushIllustration.classList.add('flex-container');
                        illustrationContainer.appendChild(stackPushIllustration);

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Stack Pop
                    case 'Pop':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var stackPopIllustration = document.createElement('div');
                        stackPopIllustration.innerHTML =
                            `<div class="stack-illu-container cell-container-col">
                                <div class="cell tobe-removed-stack">1
                                    <i class="fas fa-arrow-left icon-left disappear">
                                        <span class="null text">Top</span>
                                    </i>
                                </div>
                                <div class="cell">26
                                    <i class="fas fa-arrow-left icon-left appear">
                                        <span class="null text">Top</span>
                                    </i>
                                </div>
                                <div class="cell">7</div>
                            </div>
                            <h3 class="text-result-medium">1 is removed from the top of the Stack</h3>`
                        stackPopIllustration.classList.add('flex-container');
                        illustrationContainer.appendChild(stackPopIllustration);

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Stack Peek
                    case 'Peek':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var stackPeekIllustration = document.createElement('div');
                        stackPeekIllustration.innerHTML =
                            `<div class="stack-illu-intro-container">
                            <div class="cell-container-col stack-illu-container">
                                <div class="cell found-fast">1
                                    <i class="fas fa-arrow-left icon-left appear-fast">
                                        <span class="null text">Top</span>
                                    </i>
                                </div>
                                <div class="cell">26</div>
                                <div class="cell">7</div>
                                <div class="cell">9</div>
                            </div>
                            <h3 class="text-result-fast">1 is return as the value at the top of the Stack</h3>`
                        stackPeekIllustration.classList.add('flex-container');
                        illustrationContainer.appendChild(stackPeekIllustration);

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Stack check if it is empty or full
                    case 'isEmpty-isFull':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var stackIsEmptyIsFull = document.createElement('div');
                        stackIsEmptyIsFull.innerHTML =
                            `<div class="head-null-insert">
                                <h3>Is Empty</h3>
                                <h4 class="text-result-fast">Return false as the Stack is not empty</h4>
                                <div class="stack-illu-intro-container">
                                    <div class="cell-container-col stack-illu-container">
                                        <div class="cell">1
                                            <i class="fas fa-arrow-left icon-left">
                                                <span class="null text">Top</span>
                                            </i>
                                        </div>
                                        <div class="cell">26</div>
                                        <div class="cell">7</div>
                                        <div class="cell">9</div>
                                    </div>
                                </div>
                            </div>
                            <div class="normal-insert">
                                <h3>Is Full</h3>
                                <h4 class="text-result-fast">Return true as the Stack is full</h4>
                                <div class="stack-illu-intro-container">
                                    <div class="cell-container-col stack-illu-container">
                                        <div class="cell">1
                                            <i class="fas fa-arrow-left icon-left">
                                                <span class="null text">Top</span>
                                            </i>
                                        </div>
                                        <div class="cell">26</div>
                                        <div class="cell">7</div>
                                        <div class="cell">9</div>
                                    </div>
                                </div>
                            </div>`
                        stackIsEmptyIsFull.classList.add('linkList-insert-illu');
                        illustrationContainer.appendChild(stackIsEmptyIsFull);

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Stack Complexity table
                    case 'Complexity':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var complexityTable = document.createElement('table');
                        complexityTable.innerHTML =
                            `<thead>
                                <tr class="table-row">
                                    <th scope="col">Push</th>
                                    <th scope="col">Pop</th>
                                    <th scope="col">Peek</th>
                                    <th scope="col">isEmpty<br>isFull</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-row">
                                    <td>O(1)</td>
                                    <td>O(1)</td>
                                    <td>O(1)</td>
                                    <td>O(1)</td>
                                </tr>
                            </tbody>`

                        addComplexityTable(complexityTable);
                        break;
                }
            })
        })
    } else if (dataObject.name == 'Hash Table') {
        dataOperationArray.forEach(data => {
            data.addEventListener('click', () => {
                tableContentContainer.classList.remove('burger-active');
                data.classList.remove('toggle-choose');
                switch (data.innerHTML) {
                    //Hash Table Insert
                    case 'Insert':
                        clearEverythingForOperationDisplay(data, dataOperationArray);
                        hashTableIllustration(data.innerHTML);
                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Hash Table Collisions
                    case 'Collisions':
                        clearEverythingForOperationDisplay(data, dataOperationArray);
                        hashTableIllustration(data.innerHTML);
                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Hash Table Delete
                    case 'Delete':
                        clearEverythingForOperationDisplay(data, dataOperationArray);
                        hashTableIllustration(data.innerHTML);
                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Hash Table Find
                    case 'Find':
                        clearEverythingForOperationDisplay(data, dataOperationArray);
                        hashTableIllustration(data.innerHTML);
                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    //Hash Tabble Complexity table
                    case 'Complexity':
                        clearEverythingForOperationDisplay(data, dataOperationArray);

                        var complexityTable = document.createElement('table');
                        complexityTable.innerHTML =
                            `<thead>
                                <tr class="table-row">
                                    <th scope="col">Insert</th>
                                    <th scope="col">Delete</th>
                                    <th scope="col">Find</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-row">
                                    <td>O(1)</td>
                                    <td>O(1)</td>
                                    <td>O(1)</td>
                                </tr>
                            </tbody>`

                        addComplexityTable(complexityTable);
                        break;
                }
            })
        })
    } else if (dataObject.name == 'Heap') {
        dataOperationArray.forEach(data => {
            data.addEventListener('click', () => {
                tableContentContainer.classList.remove('burger-active');
                data.classList.remove('toggle-choose');
                switch (data.innerHTML) {
                    case 'Insert':
                        clearEverythingForOperationDisplay(data, dataOperationArray);
                        heapIllustraion(data.innerHTML);

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    case 'Delete':
                        clearEverythingForOperationDisplay(data, dataOperationArray);
                        heapIllustraion(data.innerHTML);

                        addCodeImage(codeContainer, data.innerHTML, dataObject.name);
                        break;
                    case 'Complexity':
                        clearEverythingForOperationDisplay(data, dataOperationArray);
                        var complexityTable = document.createElement('table');
                        complexityTable.innerHTML =
                            `<thead>
                                <tr class="table-row">
                                    <th scope="col">Insert</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-row">
                                    <td>O(log n)</td>
                                    <td>O(log n)</td>
                                </tr>
                            </tbody>`

                        addComplexityTable(complexityTable);
                        break;
                }
            })
        })
    }
}

function heapIllustraion(operation) {
    var keyOne = 0;
    var keyTwo = 0;
    var keyThree = 3;
    if (operation == 'Insert') {
        keyOne = 2;
        keyTwo = 1;
    } else {
        keyOne = 1;
        keyTwo = 3;
        keyThree = 2;
    }

    var heapContainer = document.createElement('div');
    heapContainer.innerHTML =
        `<h3>Heap</h3>
        <div class="heap-container>
            <div class="heap-container">
                <div class="heap-row">
                    <div class="heap-node replace-root">${keyOne}</div>
                </div>
                <div class="heap-row">
                    <div class="heap-node line-right-2">4</div>
                    <div class="heap-node line-left-2 replace-node light-up">${keyThree}</div>
                </div>
                <div class="heap-row">
                    <div class="heap-node line-right">17</div>
                    <div class="heap-node line-left">19</div>
                    <div class="heap-node line-right">36</div>
                    <div class="heap-node line-left new-node">${keyTwo}</div>
                </div>
            </div>
        </div>
        <h3 class="text-result-slow heap-result"></h3>`
    heapContainer.classList.add('flex-container');
    illustrationContainer.appendChild(heapContainer);

    if (operation == 'Insert') {
        heapInsertIllustraion();
    } else if (operation == 'Delete') {
        heapDeleteIllustraion();
    }
}

function heapDeleteIllustraion() {
    var heapDeleteRoot = document.querySelector('.replace-root');
    var heapRoot = document.querySelector('.new-node');
    var heapNode = document.querySelector('.replace-node');
    var textResult = document.querySelector('.heap-result');

    setTimeout(() => {
        heapDeleteRoot.innerHTML = '3';
        heapRoot.style.animation = `disappear 1s forwards`;
        setTimeout(() => {
            heapDeleteRoot.innerHTML = `2`;
            heapNode.innerHTML = `3`;
        }, 2500);
    }, 2500);
    textResult.innerHTML = `1 is deleted from the heap`;
}

function heapInsertIllustraion() {
    var heapInsertNewNode = document.querySelector('.new-node');
    var heapInsertReplaceNode = document.querySelector('.replace-node');
    var heapInsertReplaceRoot = document.querySelector('.replace-root');
    var textResult = document.querySelector('.heap-result');

    setTimeout(() => {
        heapInsertNewNode.innerHTML = '3';
        heapInsertReplaceNode.innerHTML = '1';
        setTimeout(() => {
            heapInsertReplaceRoot.innerHTML = '1';
            heapInsertReplaceNode.innerHTML = '2';
        }, 2500);
    }, 2500);
    textResult.innerHTML = `1 is added to the heap`;
}

/* To display Hash table Insert, Collisions and Delete because they are the same.
   However, in the case Insert, the keys are hashed perfectly with no collisons (0, 1, 2).
   In the case Collisions, the keys are hashed to the same value (0, 2, 2).*/
function hashTableIllustration(operation) {
    var key = 0;
    if (operation == 'Collisions') key = 2;
    else key = 1;
    var hashTableInsert = document.createElement('div');
    hashTableInsert.innerHTML =
        `<div class="head-null-insert">
            <div class="grid">
                <div class="grid-col">
                    <div class="text-header-hash-table">Keys</div>
                    <div class="flex-container-col">
                        <div class="hash-table-cell hash-tobe-inserted">"Animeme"
                            <i class="fas fa-long-arrow-alt-right icon-right icon-right-1"></i>
                        </div>
                        <div class="hash-table-cell hash-tobe-inserted">"Weibubu"
                            <i class="fas fa-long-arrow-alt-right icon-right icon-right-1"></i>
                        </div>
                        <div class="hash-table-cell hash-tobe-inserted">"Indianani"
                            <i class="fas fa-long-arrow-alt-right icon-right icon-right-1"></i>
                        </div>
                    </div>
                </div>
                <div class="grid-col">
                    <div class="text-header-hash-table">Hash Function</div>
                    <div class="flex-container-col hash-function">
                        <div class="hash-table-cell"></div>
                        <div class="hash-table-cell"></div>
                        <div class="hash-table-cell"></div>
                    </div>
                </div>
                <div class="grid-col">
                    <div class="text-header-hash-table">Hash Code</div>
                    <div class="flex-container-col">
                        <div class="hash-table-cell hashed-key">0</div>
                        <div class="hash-table-cell hashed-key">2</div>
                        <div class="hash-table-cell hashed-key collisions">${key}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="normal-insert">
            <table>
                <tbody>
                    <tr class="hash-table-bucket">
                        <td>0</td>
                        <td class="hash-key-inserted">Animeme</td>
                    </tr>
                    <tr class="hash-table-bucket">
                        <td>1</td>
                        <td class="hash-key-inserted-2 collisions">Indianani</td>
                    </tr>
                    <tr class="hash-table-bucket">
                        <td>2</td>
                        <td class="hash-key-inserted">Weibubu</td>
                    </tr>
                </tbody>
            </table>
        </div>`
    hashTableInsert.classList.add('linkList-insert-illu')
    illustrationContainer.appendChild(hashTableInsert);

    //Text bold for the collisions
    if (key == 2) {
        var collisions = Array.from(document.querySelectorAll('.collisions'));
        collisions.forEach(collision => {
            collision.classList.add('text-bold');
        })
    }

    if (operation == 'Collisions' || operation == 'Insert') {
        hashTableCommonAnimation();
        hashTableInsertAndCollisionIllustrationAnimation();
    } else if (operation == 'Delete') {
        hashTableCommonAnimation();
        hashTableDeleteAnimation();
    } else {
        hashTableCommonAnimation();
        hashTableFindAnimation();
    }
}

//Hash Table common animation (the keys move right and the display of the hashed key)
function hashTableCommonAnimation() {
    var hashKeyToBeInsert = Array.from(document.querySelectorAll('.hash-tobe-inserted'));
    hashKeyToBeInsert.forEach((key, index) => {
        key.style.animation = `moveRight-2-queue 1s forwards ${index + 2}s`
    })

    var keyHashed = Array.from(document.querySelectorAll('.hashed-key'));
    keyHashed.forEach((key, index) => {
        key.style.animation = `appear 0.5s forwards ${index + 2}s`
    })
}

//Hash Table Delete animation
function hashTableDeleteAnimation() {
    var hashKeyInserted = Array.from(document.querySelectorAll('.hash-key-inserted'));
    hashKeyInserted.forEach(key => {
        key.classList.add('hash-tobe-deleted');
        key.classList.remove('hash-key-inserted');
    })

    var tobeDeletedHash = Array.from(document.querySelectorAll('.hash-tobe-deleted'));
    tobeDeletedHash.forEach((key, index) => {
        key.style.animation = `disappear 0.5s forwards ${index + 2}s`
    })

    var hashKeyInserted2 = document.querySelector('.hash-key-inserted-2');
    hashKeyInserted2.classList.remove('hash-key-inserted-2');
    hashKeyInserted2.style.animation = `disappear 0.5s forwards 4s`
}

//Hash Table Insert and Collisions animation
function hashTableInsertAndCollisionIllustrationAnimation() {
    var hashKeyInserted = Array.from(document.querySelectorAll('.hash-key-inserted'));
    hashKeyInserted.forEach((key, index) => {
        key.style.animation = `appear 0.5s forwards ${index + 2}s`
    })

    var hashKeyInserted2 = document.querySelector('.hash-key-inserted-2');
    hashKeyInserted2.style.animation = `appear 0.5s forwards 4s`;
}

//Hash Table Find animation
function hashTableFindAnimation() {
    var hashKeyInserted = Array.from(document.querySelectorAll('.hash-key-inserted'));
    hashKeyInserted.forEach((key, index) => {
        key.classList.remove('hash-key-inserted');
        key.style.animation = `found-hash 1s ease-in-out ${index + 2}s`
    })
    var hashKeyInserted2 = document.querySelector('.hash-key-inserted-2');
    hashKeyInserted2.classList.remove('hash-key-inserted-2');
    hashKeyInserted2.style.animation = `found-hash 1s ease-in-out 4s`
}

//TODO: replay button for the data structure algorithm
// function replayButton(dataObject, dataOperationArray) {
//     var replayButton = document.createElement('span');
//     replayButton.innerHTML = `<i class="fas fa-redo"></i>`
//     replayButton.classList.add('redo-icon');
//     illustrationContainer.appendChild(replayButton);

//     replayButton.addEventListener('click', () => {
//         displayOperation(dataObject, dataOperationArray)
//     })
// }

//Add the complexity table for the selected data object
function addComplexityTable(complexityTable) {
    complexityTable.classList.add('complexityTable');
    complexityTable.style.animation = 'appear 1s ease forwards 0.5s'
    illustrationContainer.appendChild(complexityTable);
}

/*Clear everything on the screen and also the animation for the selected operation in the table of contents before displaying the new opertion*/
function clearEverythingForOperationDisplay(data, dataOperationArray) {
    removeChooseToggleOperation(dataOperationArray);
    data.classList.add('toggle-choose');
    clearCode();
    clearIllutratrion();
}

//Add the code images
function addCodeImage(container, operation, dataStructure) {
    var codeImageContainer = document.createElement('div');
    codeImageContainer.classList.add('code-image-container');
    var urlImageName = dataStructure.replace(' ', '_');
    codeImageContainer.style.setProperty('--img', `url(image/${urlImageName}_${operation}.png)`);
    container.appendChild(codeImageContainer);
}

/*In the table of contents, when selecting an operation, there will be a animation for the selected one. 
  This function will remove that animation before displaying the animation for the new selected operation */
function removeChooseToggleOperation(dataOperationArray) {
    dataOperationArray.forEach(data => {
        data.classList.remove('toggle-choose');
    })
}

//Display the object when the user first choose it
function displayIntro(dataObject) {
    switch (dataObject.name) {
        //Linked list intro
        case 'Linked List':
            var linkedListContainerIllustrationInrto = document.createElement('div');
            linkedListContainerIllustrationInrto.innerHTML =
                `<h3 class="header">Linked List</h3>
                    <div class="linklist-illu-intro-container">
                    <div class="cell-container">
                        <div class="cell">12</div>
                        <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                    </div>
                    <div class="cell-container">
                        <div class="cell">99</div>
                        <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                    </div>
                    <div class="cell-container">
                        <div class="cell">37</div>
                        <div class="cell"><i class="fas fa-long-arrow-alt-right icon"></i></div>
                    </div>
                    <div class="cell-container">
                        <div class="cell null"></div>
                    </div>
                </div>`
            introTextAndIllustrationDisplay(dataObject, linkedListContainerIllustrationInrto);
            break;
        //Queue intro
        case 'Queue':
            var queueContainerIllustrationIntro = document.createElement('div');
            queueContainerIllustrationIntro.innerHTML =
                `<h3 class="header">Queue</h3>
                <div class="linklist-illu-intro-container">
                    <div class="cell-container">
                        <div class="cell">9<i class="fas fa-long-arrow-alt-right icon"></i></div>
                    </div>
                    <div class="cell-container queue-illu-intro-container">
                        <div class="cell">1
                            <i class="fas fa-arrow-down icon-down"><span class="null text-left text">Rear</span></i>
                        </div>
                        <div class="cell">26</div>
                        <div class="cell">7</div>
                        <div class="cell">5
                            <i class="fas fa-long-arrow-alt-right icon"></i>
                            <i class="fas fa-arrow-down icon-down"><span class="null text text-right">Front</span></i>
                        </div>
                    </div>
                </div>`
            introTextAndIllustrationDisplay(dataObject, queueContainerIllustrationIntro);
            break;
        //Stack intro
        case 'Stack':
            var stackContainerIllustrationIntro = document.createElement('div');
            stackContainerIllustrationIntro.innerHTML =
                `<h3 class="header">Stack</h3>
                <div class="stack-illu-intro-container">
                    <i class="fas fa-reply icon-rotate"></i>
                    <div class="cell-container-col stack-illu-container">
                        <div class="cell">1
                            <i class="fas fa-arrow-left icon-left">
                                <span class="null text">Top</span>
                            </i>
                        </div>
                        <div class="cell">26</div>
                        <div class="cell">7</div>
                        <div class="cell">9</div>
                    </div>
                </div>`
            introTextAndIllustrationDisplay(dataObject, stackContainerIllustrationIntro);
            break;
        //Hash Table intro
        case 'Hash Table':
            var hashTableContainerIllustrationIntro = document.createElement('div');
            hashTableContainerIllustrationIntro.innerHTML =
                `<div class="head-null-insert">
                    <div class="grid">
                        <div class="grid-col">
                            <div class="text-header-hash-table">Keys</div>
                            <div class="flex-container-col">
                                <div class="hash-table-cell">"Animeme"
                                    <i class="fas fa-long-arrow-alt-right icon-right icon-right-1"></i>
                                </div>
                                <div class="hash-table-cell">"Weibubu"
                                    <i class="fas fa-long-arrow-alt-right icon-right icon-right-1"></i>
                                </div>
                                <div class="hash-table-cell">"Indianani"
                                    <i class="fas fa-long-arrow-alt-right icon-right icon-right-1"></i>
                                </div>
                            </div>
                        </div>
                        <div class="grid-col">
                            <div class="text-header-hash-table">Hash Function</div>
                            <div class="flex-container-col hash-function">
                                <div class="hash-table-cell">
                                    <i class="fas fa-long-arrow-alt-right icon-right icon-right-2"></i>
                                </div>
                                <div class="hash-table-cell">
                                    <i class="fas fa-long-arrow-alt-right icon-right icon-right-2"></i>
                                </div>
                                <div class="hash-table-cell">
                                    <i class="fas fa-long-arrow-alt-right icon-right icon-right-2"></i>
                                </div>
                            </div>
                        </div>
                        <div class="grid-col">
                            <div class="text-header-hash-table">Hash Code</div>
                            <div class="flex-container-col">
                                <div class="hash-table-cell">0</div>
                                <div class="hash-table-cell">2</div>
                                <div class="hash-table-cell">1</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="normal-insert">
                    <table>
                        <tbody>
                            <tr class="hash-table-bucket">
                                <td>0</td>
                                <td>Animeme</td>
                            </tr>
                            <tr class="hash-table-bucket">
                                <td>1</td>
                                <td>Indianani</td>
                            </tr>
                            <tr class="hash-table-bucket">
                                <td>2</td>
                                <td>Weibubu</td>
                            </tr>
                        </tbody>
                    </table>
                </div>`
            hashTableContainerIllustrationIntro.classList.add('linkList-insert-illu');
            illustrationContainer.appendChild(hashTableContainerIllustrationIntro);

            var textIntro = document.createElement('div');
            textIntro.innerHTML = dataObject.description;
            textIntro.classList.add('code')
            codeContainer.appendChild(textIntro);
            break;
        //Heap intro
        case 'Heap':
            var heapContainerIllustrationIntro = document.createElement('div');
            heapContainerIllustrationIntro.innerHTML =
                `<h3>Heap</h3>
                <div class="heap-container">
                    <div class="heap-row">
                        <div class="heap-node ">1</div>
                    </div>
                    <div class="heap-row">
                        <div class="heap-node line-right-2">2</div>
                        <div class="heap-node line-left-2">3</div>
                    </div>
                    <div class="heap-row">
                        <div class="heap-node line-right">17</div>
                        <div class="heap-node line-left">19</div>
                        <div class="heap-node line-right">36</div>
                        <div class="heap-node line-left">7</div>
                    </div>
                </div>`
            introTextAndIllustrationDisplay(dataObject, heapContainerIllustrationIntro);
            break;
    }
}
//TODO: burger button only appears after select algorithm/data structure
// function displayBurgerButton() {
//     burgerButton.style.setProperty('display', 'flex');
// }

//Display the Intro text and illustration of the selected data object
function introTextAndIllustrationDisplay(dataObject, introDiv) {
    introDiv.classList.add('flex-container');
    illustrationContainer.appendChild(introDiv);
    var textIntro = document.createElement('div');
    textIntro.innerHTML = dataObject.description;
    textIntro.classList.add('code')
    codeContainer.appendChild(textIntro);
}

//The burger button to display table of contents for mobile display
function burgerActive() {
    burgerButton.addEventListener('click', () => {
        tableContentContainer.classList.toggle('burger-active');
    })
}

//Display dropdown menus
function dropdownActive() {
    buttonNav.forEach(button => {
        button.addEventListener('click', () => {
            var target = event.target.innerHTML;
            var newTarget = target.replace(`<i class="arrow down"></i>`, "");
            if (newTarget == 'Algorithm') {
                algorithmUL.classList.toggle('visible');
                dataStructureUL.classList.remove('visible');
            } else if (newTarget == "Data Structure") {
                dataStructureUL.classList.toggle('visible');
                algorithmUL.classList.remove('visible');
            }
        })
    })
}

function tutorialButtonsEventListener() {
    var counter = 1;

    buttonSkip.addEventListener('click', () => {
        counter = 1;
        tutorialDisplay(counter);
        tutorialContainer.classList.add('transparent');
    })

    buttonNext.addEventListener('click', () => {
        counter++;
        buttonNext.innerHTML = 'Next';
        if (counter == 7) {
            buttonNext.innerHTML = 'Finish';
        }
        if (counter == 8) {
            tutorialContainer.classList.add('transparent');
            counter = 1;
        }
        tutorialCounter.innerHTML = `${counter}/7`;
        tutorialDisplay(counter);
    })

    buttonPrevious.addEventListener('click', () => {
        counter--;
        if (counter == 0) counter = 1;
        tutorialCounter.innerHTML = `${counter}/7`;
        tutorialDisplay(counter);
    })
}

function tutorialDisplay(counter) {
    tutorialCounter.innerHTML = `${counter}/7`;
    if (counter == 1) {
        tutorialHeader.innerHTML = `Welcome to Algorithm and Data Structure!`;
        tutorialIntro.innerHTML = `This guide will walk you through all the features of this application.`;
        tutorialParagraph.innerHTML =
            `If you want to dive right in, you can press the "Skip tutorial" button, or you can click "Next" to continue. 
            <br>
            Please note that this is designed for desktop, viewing in mobile is not recommended!`;
    } else if (counter == 2) {
        tutorialHeader.innerHTML = `What is this?`;
        tutorialIntro.innerHTML = `This application will help to visualize various algorithms and data structures in action, and more!`;
        tutorialParagraph.innerHTML =
            `For the Algorithms, they are built on a 2D grid, where 90 degree turns have a "cost" of 1 and moving from one node to another also have a "cost" of 1 (they cannot go diagonally).
            <br><br>
            For the Data Structure, each data structure will have its own illustrations based on the selected operation.`
    } else if (counter == 3) {
        tutorialHeader.innerHTML = `Picking an Algorithm or Data Structure`;
        tutorialIntro.innerHTML = `Choose your Algorithm or Data Structure from the dropdown menu above.`;
        tutorialParagraph.innerHTML =
            `For the Algorithm, please note that some of them are <i><b>unweighted</b></i> while others are <i><b>weighted</b></i>. An <i><b>unweighted</b></i> algorithm does not take weight nodes into account, whereas <i><b>weighted</b></i> ones do.
            Additionally, not all algorithm guarantees the shortest path!`;
    } else if (counter == 4) {
        tutorialHeader.innerHTML = `Adding walls and weights`;
        tutorialIntro.innerHTML =
            `"Left" click on the grid to create a wall and "Right" click to create a weight node.`;
        tutorialParagraph.innerHTML = `Nodes cannot pass through a wall while passing throught a weight node will "cost" more. A weight node will have the "cost" of 10.`;
    } else if (counter == 5) {
        tutorialHeader.innerHTML = `Dragging Nodes`;
        tutorialIntro.innerHTML = `Click on the start node or finish node then drag them to the new locations.`;
        tutorialParagraph.innerHTML = `Nodes can be dragged to the new locations to see the shortest path between the new nodes. Just put them anywhere you want!`;
    } else if (counter == 6) {
        tutorialHeader.innerHTML = `Visualize and more`;
        tutorialIntro.innerHTML = `Use the navbar on the top, table of contents or burger button on your left to visualize and do other stuffs`;
        tutorialParagraph.innerHTML =
            `For the Algorithms, you can clear the grid, or generate a random wall/weight grid with the "Random Wall" or "Random Weight" button or just combine them!
        For the Data Structure, pick an operation of your choice and see it in action!`;
    } else if (counter == 7) {
        tutorialHeader.innerHTML = `Enjoy!`;
        tutorialIntro.innerHTML = `Hope you will have as much fun as I do playing around with this.`;
        tutorialParagraph.innerHTML = `If you want to access this tutorial again, click on the "Data Structure and Algorithm" on the top left corner.`;
    }
}

//Clear functions. There are clear all on screen, or clear only one of the containers
function clearScreen() {
    while (tableContentContainer.hasChildNodes()) {
        tableContentContainer.removeChild(tableContentContainer.firstChild);
    }
    while (illustrationContainer.hasChildNodes()) {
        illustrationContainer.removeChild(illustrationContainer.firstChild);
    }
    while (codeContainer.hasChildNodes()) {
        codeContainer.removeChild(codeContainer.firstChild);
    }
}

function clearIllutratrion() {
    while (illustrationContainer.hasChildNodes()) {
        illustrationContainer.removeChild(illustrationContainer.firstChild);
    }
}

function clearCode() {
    while (codeContainer.hasChildNodes()) {
        codeContainer.removeChild(codeContainer.firstChild);
    }
}
