let model;
init();
function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
                ${createFormHtml()}
                <div class="myGrid">
                    ${createSquaresHtml()}
                </div>
            `;
}

function createSquaresHtml() {
    let html = '';
    for (let index = 0; index < 64; index++) {
        let textObject = model.textObjects.find(to => to.index == index);
        if (!textObject) {
            html += /*HTML*/`<div><button onclick="claim(${index})">fyll</button></div>`;
        } else {
            html += /*HTML*/`
                        <div style="color: ${textObject.foreColor}; background-color: ${textObject.backColor}">
                            ${textObject.text}
                        </div>`;
        }
    }
    return html;
}

function createFormHtml() {
    return /*HTML*/`
                <div class="myForm">
                    <div>Tekst:</div>
                    <div>
                        <input type="text"
                               oninput="model.inputs.text=this.value"
                               value="${model.inputs.text || ''}"
                               />
                    </div>
                    <div>Forgrunnsfarge:</div>
                    <div>${createColorSelect('model.inputs.foreColor')}</div>
                    <div>Bakgrunnsfarge:</div>
                    <div>${createColorSelect('model.inputs.backColor')}</div>
                </div>
            `;
}

function createColorSelect(modelField) {
    const selectedColor = eval(modelField);
    let optionsHtml = '';
    const noneSelected = selectedColor == null ? 'selected' : '';
    for (let color of model.colors) {
        const selected = color == selectedColor ? 'selected' : '';
        optionsHtml += /*HTML*/`
                    <option ${selected}>${color}</option>
                `;
    }
    return /*HTML*/`
                <select onchange="${modelField}=this.value">
                    <option ${noneSelected}></option>
                    ${optionsHtml}
                </select>
                `;
}

async function claim(index) {
    const inputs = model.inputs;
    if (inputs.foreColor == null
        || inputs.backColor == null
        || inputs.text == null
        || inputs.text.trim().length == 0
    ) return;
    const textObject = { ...inputs, index };
    const response = await axios.post('/textobjects', textObject);

    init();
}

async function init() {
    model = {
        inputs: {
            foreColor: null,
            backColor: null,
            text: null,
        },
        colors: ["black", "white", "gray", "silver", "maroon", "red", "purple", "fushsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua"],
    };
    const response = await axios.get('/textobjects');
    model.textObjects = response.data;
    updateView();
}