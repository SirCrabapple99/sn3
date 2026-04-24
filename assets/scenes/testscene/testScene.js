import { GameObject, Component, Scene } from 'classes';
import { obj } from './objects/testObj.js'

export const testScene = new Scene('test');
testScene.addObject(obj);