import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight

} from 'react-native';
import * as const1 from '../constant1/const1'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SketchDraw from 'react-native-sketch-draw';
import Icon from "react-native-vector-icons/FontAwesome5"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
const SketchDrawConstants = SketchDraw.constants;
 
const tools = {};
 
tools[SketchDrawConstants.toolType.pen.id] = {
    id: SketchDrawConstants.toolType.pen.id,
    name: SketchDrawConstants.toolType.pen.name,
    nextId: SketchDrawConstants.toolType.eraser.id
};
tools[SketchDrawConstants.toolType.eraser.id] = {
    id: SketchDrawConstants.toolType.eraser.id,
    name: SketchDrawConstants.toolType.eraser.name,
    nextId: SketchDrawConstants.toolType.pen.id
};
 
export default class DrawBoard extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            color: '#05f',
            toolSelected: SketchDrawConstants.toolType.pen.id
        };
    }
 
    isEraserToolSelected() {
        return this.state.toolSelected === SketchDrawConstants.toolType.eraser.id;
    }
 
    toolChangeClick() {
        this.setState({toolSelected: tools[this.state.toolSelected].nextId});
    }
 
    getToolName() {
        return tools[this.state.toolSelected].name;
    }
 
    onSketchSave(saveEvent) {
        this.props.onSave && this.props.onSave(saveEvent);
    }
 
    render() {
        return (
            <View style={{flex: 550, flexDirection: 'column',backgroundColor:"#fff"}}>
                <SketchDraw style={{flex: 1, backgroundColor: '#fff'}}
                 ref="sketchRef"
                 
                selectedTool={this.state.toolSelected} 
                toolColor={'#000'} 
                // Yelow Example! you can changIT!
                onSaveSketch={this.onSketchSave.bind(this)}
                localSourceImagePath={this.props.localSourceImagePath}
                />
 <View style={{flexDirection:"row"}}>
 <View style={{height:190,width:70,flexDirection:"column",justifyContent:"space-between",backgroundColor:"#fff",padding:10}}>

                <TouchableOpacity style={{height:50,width:50,backgroundColor:const1.colortext,borderRadius:25,alignItems:"center",justifyContent:"center"}}>
                <EvilIcons name="pencil" style={{fontSize:30}}/></TouchableOpacity>
                <TouchableOpacity style={{height:50,width:50,backgroundColor:this.isEraserToolSelected() ? "#CCC" : const1.colortext ,borderRadius:25,alignItems:"center",justifyContent:"center"}} onPress={this.toolChangeClick.bind(this)}>
                <Icon name="eraser" style={{fontSize:18}}/></TouchableOpacity>
                <TouchableOpacity underlayColor={"#CCC"} style={{height:50,width:50 ,borderRadius:25,alignItems:"center",justifyContent:"center",backgroundColor:const1.colortext}} onPress={() => { this.refs.sketchRef.clearSketch() }}>
                <MaterialIcons name="autorenew" style={{fontSize:18}}/></TouchableOpacity>
                </View>
  
    </View>     
            </View>
        );
    }
}