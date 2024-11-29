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

    if (n_bytes_to_alloc < 0) {
        return success;
    }

    if (!sameLabelBlockAllocated) {

        for (let i = 0; i < BlockMap.length; i++) {

            let CurrentBlock = BlockMap[i];

            if (CurrentBlock.size >= n_bytes_to_alloc && !CurrentBlock.allocated) {

                let allocatedBlock = new Block(CurrentBlock.index, n_bytes_to_alloc, label, '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'), true);
                BlockMap.splice(i, 1, allocatedBlock);
                let remainingSize = CurrentBlock.size - n_bytes_to_alloc;

                if (remainingSize > 0) {

                    let remainingBlock = new Block(CurrentBlock.index + n_bytes_to_alloc, remainingSize, "FREE", "#dcdcdc", false);
                    BlockMap.splice(i + 1, 0, remainingBlock);

                }

                success = true;
                break;
            }
        }
    }

    return success;
}

function Free(label) {

    let success = false;

    for (let i = 0; i < BlockMap.length; i++) {

        let CurrentBlock = BlockMap[i];

        if (CurrentBlock.label === label && CurrentBlock.allocated) {

            BlockMap[i] = new Block(CurrentBlock.index, CurrentBlock.size, "FREE", "#dcdcdc", false);
            success = true;

        }
    }

    if (success) {

        for (let i = 0; i < BlockMap.length - 1; i++) {

            if (!BlockMap[i].allocated && !BlockMap[i + 1].allocated) {

                BlockMap[i].size += BlockMap[i + 1].size;
                BlockMap.splice(i + 1, 1);
                i--;

            }
        }
    }

    return success;
}

function Defrag() {

    let newBlockMap = [];
    let currentIndex = 0;

    BlockMap.forEach(block => {
        if (block.allocated) {

            if (block.index !== currentIndex) {

                newBlockMap.push(new Block(currentIndex, block.size, block.label, block.color, true));

            } else {

                newBlockMap.push(block);

            }

            currentIndex += block.size;
        }
    });

    let freeSize = HeapSize - currentIndex;

    if (freeSize > 0) {

        newBlockMap.push(new Block(currentIndex, freeSize, "FREE", "#dcdcdc", false));

    }

    BlockMap = newBlockMap;
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
