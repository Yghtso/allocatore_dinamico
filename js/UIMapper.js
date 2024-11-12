const HeapRef = document.getElementById("Heap");

document.getElementById("InitMemory").addEventListener("click", () => {
    let n_bytes_to_alloc = document.getElementById("InitBytesInput").value;

    let success = Init(n_bytes_to_alloc);

    if (!success) {
        alert("La memoria massima di inizializzazione è 1024 Bytes");
    } else {
        displayHeap();
    }
});

document.getElementById("AllocateButton").addEventListener("click", () => Allocate());
document.getElementById("FreeButton").addEventListener("click", () => Free());
document.getElementById("DefragButton").addEventListener("click", () => Defrag());

function displayHeap() {

    HeapRef.innerHTML ="";
    console.log(BlockMap.length);
    BlockMap.forEach(Block => {
        let BlockDiv = document.createElement("div");

        HeapRef.appendChild(BlockDiv);
    });
}