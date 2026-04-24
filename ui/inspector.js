import { Slider } from 'classes';

export function updateInspector(gameObject) {
    if (gameObject === null) {
    } else {
        createContainer('objTransforms');
        for (const comp of gameObject.components.values()) {
            createContainer(comp);
        }
    }
}

function createContainer(comp) {
    if (comp === 'objTransforms') {
        
    } else {
        
    }
}