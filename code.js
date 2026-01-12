

// _________________________________functions
function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
  
    const parsed = JSON.parse(raw);
  
    items.length = 0;
    items.push(...parsed);
}

function createCharacter(name) {
    return {
      name: name,
      cop: 0,
      sil: 0,
      gol: 0,
      pla: 0
    };
}

function deleteCharacter(name){
    const ok = confirm(`Удалить персонажа "${name}"?`);
    if (!ok) return;

    const index = items.findIndex(item => item.name === name);
    if (index === -1) return;
    
    items.splice(index, 1);
    saveToStorage();
    render();  
}

function render() {
    const container = document.getElementById("items");
    container.innerHTML = "";
    container.classList.add("accordion")
  
    for (const item of items) {
        // блоки персонажа
        const char = document.createElement("div")
        char.classList.add("accordion-item")
        const nametag = document.createElement("div");
        nametag.classList.add( "mt-1","pb-2")
        const coins = document.createElement("div");
        coins.classList.add("border", "mt-3", "mb-3","me-3")
        const AcButton = document.createElement("button"); 
        AcButton.classList.add("accordion-button")

        // имя
        const name =document.createElement("span");

        name.textContent = 
            `${item.name}:`
        name.classList.add("width-80","accordion-header")

        // монеты
        const copper =document.createElement("span");
        const silver =document.createElement("span");
        const gold =document.createElement("span");
        const platinum =document.createElement("span");
        const copperText =document.createElement("span");
        const silverText =document.createElement("span");
        const goldText =document.createElement("span");
        const platinumText =document.createElement("span");

        copperText.textContent = `Медные монеты:` 
        copper.textContent = `${item.cop}`
        copper.classList.add("ms-3","border") 

        silverText.textContent = `Серебреные монеты:`   
        silver.textContent = `${item.sil}`
        silver.classList.add("ms-3","border")

        goldText.textContent = `Золотые монеты:` 
        gold.textContent = `${item.gol}`
        gold.classList.add("ms-3","border")

        platinumText.textContent = `Платиновые монеты:` 
        platinum.textContent = `${item.pla}`   
        platinum.classList.add("ms-3","border") 
    
        // кнопка Удалить
        const delBtn = document.createElement("button");
        delBtn.textContent = "Удалить";
    
        delBtn.onclick = () => {
          deleteCharacter(item.name);
        };
        delBtn.classList.add("btn", "btn-danger", "btn-sm", "position-absolute", "end-0", "end-5");  //добавить классы
    
        // собираем всё вместе
        nametag.appendChild(delBtn);
        
        nametag.appendChild(name);
        
        // row.appendChild(text);

        coins.appendChild(copperText);
        coins.appendChild(copper);
        coins.appendChild(document.createElement("br"));
        coins.appendChild(silverText);
        coins.appendChild(silver);
        coins.appendChild(document.createElement("br"));
        coins.appendChild(goldText);
        coins.appendChild(gold);
        coins.appendChild(document.createElement("br"));
        coins.appendChild(platinumText);
        coins.appendChild(platinum);
        char.appendChild(nametag);
        char.appendChild(coins);

        container.appendChild(char);
      }
}

// _________________________________constants
const STORAGE_KEY = "characters";
const input = document.getElementById("newName");
const newNameBTN = document.getElementById("newNameBTN");
const items = [];
    loadFromStorage();
    render();
const delBTN = document.getElementById("delBTN")




newNameBTN.onclick = () => {
    const name = input.value.trim();
    if (name === "") return;
  
    items.push(createCharacter(name));
    saveToStorage();
  
    input.value = "";
    render();
};

// delBTN.onclick=>{
//     const name = input.value.trim();
//     items.
// }