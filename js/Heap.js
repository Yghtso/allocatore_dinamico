let HeapSize;
let BlockMap = [];

const MaxHeapSize = 1024;

function Block(index, size, label, color, allocated) {
    this.index = index;
    this.size = size;
    this.label = label;
    this.color = color;
    this.allocated = allocated;
}

function Init(number_of_bytes) {
    
    if (number_of_bytes > MaxHeapSize) {
        return false;

    } else {
        HeapSize = number_of_bytes;
        BlockMap.length = 0;
        BlockMap.push(new Block(0, number_of_bytes, "FREE", "#dcdcdc", false));
        return true;
    }
}

function Allocate(number_of_bytes, label) {
    let n_bytes_to_alloc = parseInt(number_of_bytes);
    let success = false;
    let sameLabelBlock = AlreadyExistSameLabel(label);
    let sameLabelBlockAllocated = sameLabelBlock === undefined ? false : sameLabelBlock.allocated;
    
    if (!sameLabelBlockAllocated) {
        BlockMap.forEach(CurrentBlock => {
            if (CurrentBlock.size >= n_bytes_to_alloc && !(CurrentBlock.allocated)) {
                BlockMap.push(new Block(CurrentBlock.index, n_bytes_to_alloc, label, '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'), true));
    
                let remainingMemoryBlock = new Block(CurrentBlock.index + n_bytes_to_alloc, CurrentBlock.size - n_bytes_to_alloc, "FREE", "#dcdcdc", false);
                if (remainingMemoryBlock.size !== 0) {
                    BlockMap.push(remainingMemoryBlock);
                }
                
                const index = BlockMap.findIndex(Block => Block.index === CurrentBlock.index);
                if (index !== -1) {
                    BlockMap.splice(index, 1);
                }
                success = true;
                return;
            }
        });
    }

    return success;
}

function Free(label) {

    let success = false;

    BlockMap.forEach(CurrentBlock => {
        if(CurrentBlock.label === label && CurrentBlock.allocated) {

            let freedBlock = new Block(CurrentBlock.index, CurrentBlock.size, "FREE", "#dcdcdc", false);
            BlockMap.push(freedBlock);
            
            const index = BlockMap.findIndex(Block => Block.index === CurrentBlock.index);
            if (index !== -1) {
                BlockMap.splice(index, 1);
                success = true;
            }
        }
    });

    return success;
}

function Defrag() {

}

function AlreadyExistSameLabel(label) {
    let sameLabelBlock;

    BlockMap.forEach(Block => {
        if (Block.label === label) {
            sameLabelBlock = Block;
        }
    });

    return sameLabelBlock;
}