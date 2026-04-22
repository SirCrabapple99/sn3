import { GameObject, Component } from 'classes';
import { testScript } from 'scripts/testScript.js';

export const obj = new GameObject(testScript);
obj.addComponent(testScript);