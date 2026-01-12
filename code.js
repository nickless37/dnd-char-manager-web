

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

function createCharacter(name) {  //---создать основу 
    return {
        id: crypto.randomUUID(),
        name,
        cop: 0,
        sil: 0,
        gol: 0,
        pla: 0
    };
}

function createCharacterElement(item) {  //---дополнить
    const char = document.createElement("div");
    char.classList.add("accordion-item");
    char.dataset.id = item.id; 
  
    const header = document.createElement("h2");
    header.classList.add("accordion-header");
  
    const button = document.createElement("button");
    button.classList.add("accordion-button", "collapsed","charName",);
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", `#collapse-${item.id}`);
    button.textContent = item.name;
  
    header.appendChild(button);
  
    const bodyWrap = document.createElement("div");
    bodyWrap.id = `collapse-${item.id}`;
    bodyWrap.classList.add("accordion-collapse", "collapse");
  
    const body = document.createElement("div");
    body.classList.add("accordion-body");
  
    body.innerHTML = `
      Медные: <span class="cop"></span><br>
      Серебро: <span class="sil"></span><br>
      Золото: <span class="gol"></span><br>
      Платина: <span class="pla"></span>
      <br><br>
      <button class="btn btn-danger btn-sm">Удалить</button>
    `;
  
    bodyWrap.appendChild(body);
    char.appendChild(header);
    char.appendChild(bodyWrap);
  
    body.querySelector("button").onclick = () => {
      deleteCharacter(item.id);
    };
  
    updateCharacterView(item, char);
    return char;
  }

  function updateCharacterView(item, charElement) {  //---обновить
    const char = charElement || document.querySelector(`[data-id="${item.id}"]`);
    if (!char) return;
  
    char.querySelector(".cop").textContent = item.cop;
    char.querySelector(".sil").textContent = item.sil;
    char.querySelector(".gol").textContent = item.gol;
    char.querySelector(".pla").textContent = item.pla;
 }

 function deleteCharacter(id) {  //---удалить
    const index = items.findIndex(i => i.id === id);
    if (index === -1) return;
  
    items.splice(index, 1);
    saveToStorage();
  
    document.querySelector(`[data-id="${id}"]`)?.remove();

}

function init() {  //---рендеринг
    loadFromStorage();
    const container = document.getElementById("items");
    container.classList.add("accordion");
  
    for (const item of items) {
      container.appendChild(createCharacterElement(item));
    }
}





// _________________________________constants
const STORAGE_KEY = "characters";
const input = document.getElementById("newName");
const newNameBTN = document.getElementById("newNameBTN");
const items = [];

const delBTN = document.getElementById("delBTN")




newNameBTN.onclick = () => {
    const name = input.value.trim();
    if (!name) return;
  
    const item = createCharacter(name);
    items.push(item);
    saveToStorage();
  
    document
      .getElementById("items")
      .appendChild(createCharacterElement(item));
  
    input.value = "";
};


init();