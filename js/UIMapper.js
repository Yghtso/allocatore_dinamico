document.getElementById("InitMemory").addEventListener("click", () => {

    let n_bytes_to_alloc = parseInt(document.getElementById("InitBytesInput").value);
    let success = Init(n_bytes_to_alloc);

    if (!success) {
        alert("La memoria massima di inizializzazione è 1024 Bytes");
    } else {

        displayHeap();
        resetInputs();

    }
});

document.getElementById("AllocateButton").addEventListener("click", () => {
    
    let n_bytes_to_alloc = document.getElementById("AllocBytesInput").value;
    let label = document.getElementById("AllocLabelInput").value;
    let success = Allocate(n_bytes_to_alloc, label);

    if (!success && AlreadyExistSameLabel(label) !== undefined) {
        alert("C'è già un blocco di memoria chiamato: " + label);
    } else if (!success && !AlreadyExistSameLabel(label)) {
        alert("Non ci sono blocchi disponibili per l'allocazione del blocco di memoria da " + n_bytes_to_alloc + " bytes");
    } else {

        displayHeap();
        resetInputs();

    }
});

document.getElementById("FreeButton").addEventListener("click", () => {

    let label = document.getElementById("FreeLabelInput").value;
    let success = Free(label);

    if (!success) {
        alert("Non ci sono blocchi di memoria allocati con quel nome");
    } else {

        displayHeap();
        resetInputs();

    }
});

document.getElementById("DefragButton").addEventListener("click", () => {

    Defrag();
    displayHeap();
    resetInputs();

});

function displayHeap() {

    const HeapRef = document.getElementById("Heap");

    while (HeapRef.firstChild) {

        HeapRef.removeChild(HeapRef.firstChild);

    }

    BlockMap.forEach(Block => {

        let Div = document.createElement("div");
        Div.style.height = (HeapRef.clientHeight * Block.size / HeapSize) + "px";
        Div.style.width = "100%";
        Div.style.backgroundColor = Block.color;
        Div.className = "Block";
        Div.textContent = `${Block.label} (SIZE ${Block.size})`;
        HeapRef.appendChild(Div);

    });
}

function resetInputs() {

    document.getElementById("InitBytesInput").value = "";
    document.getElementById("AllocBytesInput").value = "";
    document.getElementById("AllocLabelInput").value = "";
    document.getElementById("FreeLabelInput").value = "";

}
