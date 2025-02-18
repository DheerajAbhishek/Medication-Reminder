console.log("in Js")
let confirmb = document.querySelector("#confirm")
let hr = document.querySelector("#hr")
function slots() {

    let nslots = document.querySelector("#slots").value;
    if (nslots > 4) {
        alert("Max slots allowed are 4")
    }
    else {
        for (let i = 1; i <= nslots; i++) {

            let slots = document.createElement("input");
            let label = document.createElement("label")
            slots.type = "time"
            slots.id = `slot${i}`
            slots.name = `slot${i}`
            label.htmlFor = `slot${i}`
            label.innerText = `Time for slot ${i}`
            hr.insertAdjacentElement("beforebegin", label)
            hr.insertAdjacentElement("beforebegin", slots)
        }
        console.log(nslots)
    }
}
confirmb.addEventListener("click", slots);