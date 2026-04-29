import { UI } from 'classes';
const inspector = document.getElementById('inspector');

export function updateInspector(gameObject = null) {
    clearInspector();
    if (gameObject !== null) {
        createContainer('objTransforms');
        for (const comp of gameObject.components.values()) {
            createContainer(comp);
        }
    }
}

function clearInspector() {
    for (const comp of [...inspector.children]) {
        if (comp.id != 'inspectorResize') {
            inspector.removeChild(comp);
        }
    }
}

function createSlider(comp, pub, key) {
    // create the box that holds all the stuff
    const cont = document.createElement('div');
    // testScript_testProperty
    cont.id = comp.constructor.name + '_' + key;
    cont.className = 'compVar';

    // create slider
    const slider = document.createElement('input');
    slider.id = comp.constructor.name + '_' + key + '_input';
    slider.type = 'range';
    slider.className = 'compSlider';

    // set all the slider stuff up
    slider.step = comp.step;
    slider.min = comp.minMax[0];
    slider.max = comp.minMax[1];
    slider.value = comp.value;

    // label for the variable name
    const label = document.createElement('label');
    label.className = 'compLabel'
    label.for = comp.constructor.name + '_' + key + '_input';
    label.innerHTML = key + ':';

    // input/label for the slider value
    const label2 = document.createElement('input');
    label2.className = 'compTextBox'
    label2.for = comp.constructor.name + '_' + key + '_input';
    label2.value = comp.value;
    label2.style.minWidth = '20%'

    // update the displayed value
    slider.oninput = function() {
        label2.value = this.value;
    }
    
    // append it all
    cont.appendChild(label);
    cont.appendChild(slider);
    cont.appendChild(label2);

    return cont;
}

function createContainer(comp) {
    if (comp === 'objTransforms') {
        // create main component container
        const mainContainer = document.createElement('div');
        mainContainer.className = 'component';
        mainContainer.innerHTML = comp.constructor.name;
    } else {
        // create main component container
        const mainContainer = document.createElement('div');
        mainContainer.className = 'component';
        mainContainer.innerHTML = comp.constructor.name; 
        
        // create all the variables
        const compVars = [];
        for (const key in comp.pubVars) {
            const pub = comp.pubVars[key];
            switch(pub.constructor.name) {
                case 'Slider':
                    compVars.push(createSlider(comp.pubVars[key], pub, key));
                    break; 
                case 'TextInput':
                    console.log('no');
                    break;
                default:
                    console.log('no');
                    break;
            }
        }

        for (const el of compVars) {
            mainContainer.appendChild(el);
        }

        inspector.appendChild(mainContainer);
        console.log(comp)
    }
}