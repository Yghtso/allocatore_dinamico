document.getElementById("InitMemory").addEventListener("click", () => {
    let n_bytes_to_alloc = parseInt(document.getElementById("InitBytesInput").value);

    let success = Init(n_bytes_to_alloc);

    if (!success) {
        alert("La memoria massima di inizializzazione è 1024 Bytes");
    } else {
        //displayHeap();
        console.log(BlockMap);
    }
});

document.getElementById("AllocateButton").addEventListener("click", () => {
    let n_bytes_to_alloc = document.getElementById("AllocBytesInput").value;
    let label = document.getElementById("AllocLabelInput").value;

    let success = Allocate(n_bytes_to_alloc, label);

    if (!success && AlreadyExistSameLabel(label) !== undefined) {
        alert("Cè gia un blocco di memoria chiamato : " + label);
    } else if (!success && !AlreadyExistSameLabel(label)) {
        alert("Non ci sono blocchi disponibili per l allocazione del blocco di memoria da " + n_bytes_to_alloc + " bytes");
    } else {
        //displayHeap();
        console.log(BlockMap);
    }

});

document.getElementById("FreeButton").addEventListener("click", () => {
    
    let label = document.getElementById("FreeLabelInput").value;

    let success = Free(label);

    if (!success) {
        alert("Non ci sono blocchi di memoria allocati con quel nome");
    } else {
        //displayHeap();
        console.log(BlockMap);
    }

});

document.getElementById("DefragButton").addEventListener("click", () => Defrag());

function displayHeap() {

    const HeapRef = document.getElementById("Heap");
    while (HeapRef.firstChild) {
        HeapRef.removeChild(HeapRef.firstChild);
    }

    BlockMap.forEach(Block => {
        let Div = document.createElement("div");
        Div.style.height = (HeapRef.clientHeight * Block.size / HeapSize) + "px";
        Div.style.display = "flex";
        Div.style.justifyContent = "center";
        Div.style.alignItems = "center";

        let BlockDiv = document.createElement("div");
        BlockDiv.style.backgroundColor = Block.color;
        BlockDiv.textContent = Block.label + "   (  SIZE  " + Block.size + ")";

        BlockDiv.id = "Block";

        Div.appendChild(BlockDiv);
        HeapRef.appendChild(Div);
    });
}

window.addEventListener('resize', displayHeap);