javascript:PathFinding.js
class Node {
    constructor(parent = null, position = null) {
        this.parent = parent;
        this.position = position;
        this.g = 0;
        this.h = 0;
        this.f = 0;
    }

    isEqual(other) {
        return this.position.x === other.position.x && this.position.y === other.position.y;
    }
}

function astar(grid, start, end) {
    let openList = [];
    let closedList = [];
    let startNode = new Node(null, start);
    let endNode = new Node(null, end);

    openList.push(startNode);

    while (openList.length > 0) {
        let currentNode = openList[0];
        let currentIndex = 0;
        openList.forEach((item, index) => {
            if (item.f < currentNode.f) {
                currentNode = item;
                currentIndex = index;
            }
        });

        openList.splice(currentIndex, 1);
        closedList.push(currentNode);

        if (currentNode.isEqual(endNode)) {
            let path = [];
            let current = currentNode;
            while (current != null) {
                path.push(current.position);
                current = current.parent;
            }
            return path.reverse();
        }

        let children = [];
        for (let newPosition of [[0, -1], [0, 1], [-1, 0], [1, 0]]) { // Adjacent squares
            let nodePosition = {x: currentNode.position.x + newPosition[0], y: currentNode.position.y + newPosition[1]};
            if (nodePosition.x > (grid.length - 1) || nodePosition.x < 0 || nodePosition.y > (grid[0].length - 1) || nodePosition.y < 0) {
                continue;
            }
            if (grid[nodePosition.x][nodePosition.y] !== 0) {
                continue;
            }
            let newNode = new Node(currentNode, nodePosition);
            children.push(newNode);
        }

        for (let child of children) {
            if (closedList.find(closedChild => closedChild.isEqual(child))) {
                continue;
            }

            child.g = currentNode.g + 1;
            child.h = ((child.position.x - endNode.position.x) ** 2) + ((child.position.y - endNode.position.y) ** 2);
            child.f = child.g + child.h;

            if (openList.find(openNode => child.isEqual(openNode) && child.g > openNode.g)) {
                continue;
            }

            openList.push(child);
        }
    }

    return [];
}

// Example usage
const grid = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0]
];

const start = {x: 0, y: 0};
const end = {x: 4, y: 4};
const path = astar(grid, start, end);

console.log(path);

