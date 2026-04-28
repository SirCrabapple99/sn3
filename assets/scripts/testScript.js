import { Component, UI } from 'classes'; 
export class testScript extends Component {
    awake() {
        this.pubVars.testProperty = new UI.Slider({
            value: 0.5,
            step: 0.1,
        });
        this.pubVars.testProperty2 = new UI.Slider({
            value: 3,
            step: 1,
            minMax: [-2, 5],
        });
    }

    start() {
        // console.log('successfully ran testScript.start()');
    }

    update() {
       
    }

    onEnable() {
        console.log('testObj enabled')
    }

    onDisable() {
        console.log('testObj disabled')
    }
}