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
        BlockMap.length = 0;
        BlockMap.push(new Block(0, number_of_bytes, "FREE", "gray"));
        return true;
    }
}

function Allocate(number_of_bytes, label) {
    let success = false;

    BlockMap.forEach(CurrentBlock => {
        if (CurrentBlock.size >= number_of_bytes) {
            BlockMap.push(new Block(CurrentBlock.index, number_of_bytes, label, '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')));

            let remainingMemoryBlock = new Block(CurrentBlock.index + number_of_bytes, CurrentBlock.size - number_of_bytes, "FREE", "gray");
            if (remainingMemoryBlock.size !== 0) {
                BlockMap.push(remainingMemoryBlock);
            }
            
            const index = BlockMap.findIndex(obj => obj.index === CurrentBlock.index);
            if (index !== -1) {
                BlockMap.splice(index, 1);
            }
            success = true;
        }
    });
    
    return success;
}

function Free() {

}

function Defrag() {

}