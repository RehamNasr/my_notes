
//  node app
import home from "./my_notes/home"
import intro from "./my_notes/intro"
import drawer from"./my_notes/drawer"
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import React from "react"
const stack = createStackNavigator({
    splash: {
        screen: intro
    },
    home: {
        screen: home
    },
    drow:{
        screen:drawer
    }
},{
    headerMode:"none"
})

export default createAppContainer(stack)



