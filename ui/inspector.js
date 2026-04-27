import { UI } from 'classes';
const inspector = document.getElementById('inspector');

export function updateInspector(gameObject) {
    if (gameObject === null) {
    } else {
        clearInspector();
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
    label.for = comp.constructor.name + '_' + key + '_input';
    label.innerHTML = key + ':';

    // label for the slider value
    const label2 = document.createElement('label');
    label2.for = comp.constructor.name + '_' + key + '_input';
    label2.innerHTML = comp.value;
    // make sure 1 is the same length as 0.1 so the slider doesn't randomly move
    label2.style.width = comp.step.toString().length + 'ch'

    // update the displayed value
    slider.oninput = function() {
        label2.innerHTML = this.value;
    }
    
    // append it all
    cont.appendChild(label);
    cont.appendChild(slider);
    cont.appendChild(label2);

    return cont;
}

function createContainer(comp) {
    if (comp === 'objTransforms') {
        
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