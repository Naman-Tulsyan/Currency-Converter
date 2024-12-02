let option_boxes = document.querySelectorAll("#countries");
let btn = document.querySelector(".btn");

const update_flag = (element) => {
    let country_code = countryList[element.value];
    let newSrc = `https://flagsapi.com/${country_code}/flat/64.png`;
    element.parentElement.querySelector("img").setAttribute("src", newSrc);
}

option_boxes.forEach(option_box => {
    for (const key in countryList) {
        if (Object.prototype.hasOwnProperty.call(countryList, key)) {
            const element = countryList[key];
            const new_option = document.createElement("option");
            new_option.setAttribute("value", key);
            new_option.innerText = element;
            option_box.appendChild(new_option);
        }
    }

    option_box.addEventListener("change", (event)=>{
        update_flag(event.target);
    })
});

btn.addEventListener("click", async ()=>{
    let amount = document.querySelector(".amount input").value;
    let from_country = document.querySelector(".select_from").value;
    let to_country = document.querySelector(".select_to").value;
    if (amount === "" || amount <= 0) {
        amount = 1;
        document.querySelector(".amount input").value = 1;
    }

    const URL = `https://api.fxratesapi.com/latest`;
    let response = await fetch(URL);
    const resp = await response.json();
    let value = (resp.rates[to_country] / resp.rates[from_country])*amount;
    document.querySelector(".result").innerText = `${amount} ${from_country} = ${value} ${to_country}`;
})


