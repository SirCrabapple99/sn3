import { Component } from 'classes'; 
export class testScript extends Component {
    awake() {
        this.testProperty = 0.5;
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