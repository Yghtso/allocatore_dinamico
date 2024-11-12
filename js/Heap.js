let Heap;
let HeapSize;
let BlockMap = [];

const MaxHeapSize = 1024;

function Block(index, size, label, color) {
    this.index = index;
    this.size = size;
    this.label = label;
    this.color = color;
}

function Init(number_of_bytes) {
    
    if (number_of_bytes > MaxHeapSize) {
        return false;

    } else {
        HeapSize = number_of_bytes;
        BlockMap.push(new Block(0, number_of_bytes, "FREE", "gray"));
        return true;
    }
}

function Allocate() {

}

function Free() {

}

function Defrag() {

}