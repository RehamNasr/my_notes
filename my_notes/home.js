
import React, { createRef } from "react";
import {
    Text,
    ImageBackground,
    View,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList,
    StatusBar,
    ScrollView

} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import * as const1 from '../constant1/const1'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Dialog from "react-native-dialog"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import ActionSheet from "react-native-actions-sheet"
import { Icon } from "react-native-vector-icons/icon"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            showmodaladd: false,
            contain: [],
            titleinput: "",
            noteinput: "",
            setVisible: false,
            inputsearch: "",
            showsearch: false,
            containsearch: [],
            objupdate: {
                Title: "",
                note: "",
                show: false,
                date: "19 may"
            },
            index: ""
            , found: true,

            showedit: false,
            checkdelet: false,
            favarr: [],
            favshow: false,
            action: createRef()
        }
    }


    addnote() {
        let list = this.state.contain
        let obj = {
            Title: this.state.titleinput,
            note: this.state.noteinput,
            show: false,
            date: "19 may"
        }
        list.push(obj)
        this.setState({ contain: list, titleinput: "", noteinput: "", showmodaladd: false })
    }


    delete(index) {
        let list = this.state.contain
        list.splice(index, 1)
        this.setState({ contain: list })
    }


    search(newvalue) {
        let list = this.state.contain
        let found = this.state.found
        for (var i = 0; i < list.length; i++) {

            if (list[i].Title.toLowerCase().includes(newvalue.toLowerCase()) && newvalue.length != 0) {
                list[i].show = true
                found = true
            } else {
                list[i].show = false
                found = false
            }
        }
        this.setState({ contain: list, found: found })
    }

    update() {
        let list = this.state.contain
        let objup = this.state.objupdate
        let index = this.state.index
        list[index] = objup
        this.setState({ contain: list })
    }


    addfav(index) {
        let list = this.state.contain
        let fav = this.state.favarr
        fav.push(list[index])
        this.setState({ favarr: fav })
    }
    render() {
        return (
            <>
                <StatusBar backgroundColor={"#F8F6F9"} />
                <View
                    style={{ flex: 1, backgroundColor: "#fff" }}>

                    <View style={{
                        height: 60,
                        width: "100%",
                        paddingTop: 7,

                        flexDirection: "row",
                        backgroundColor: "#F8F6F9"
                    }}>
                        <TouchableOpacity style={{
                            height: 50, width: 50,
                            alignItems: "center", justifyContent: "center"
                        }}>
                            <AntDesign name="bars"
                                style={{ fontSize: 30 }}

                            />
                        </TouchableOpacity>
                        <View style={{ height: 50, width: 150, flexDirection: "row" }}>
                            <View style={{
                                width: 100,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{ fontSize: 17 }}>All notes</Text>
                            </View>
                            <TouchableOpacity style={{ height: 50, width: 20, alignItems: "center", justifyContent: "center" }}>

                                <AntDesign name="caretdown"
                                    style={{ fontSize: 14 }}

                                />
                            </TouchableOpacity>
                        </View>
                        {this.state.contain.length != 0 ?
                            <View style={{ alignItems: "flex-end", width: 160 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity style={{ height: 50, width: 60, alignItems: "center", justifyContent: "center" }}
                                        onPress={() => {
                                            this.setState({ showsearch: true })
                                        }}
                                    >
                                        <AntDesign name="search1" style={{ fontSize: 18 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ height: 50, width: 60, alignItems: "center", justifyContent: "center" }}>
                                        <AntDesign name="appstore-o" style={{ fontSize: 19 }} />
                                    </TouchableOpacity>
                                </View></View> : null}
                    </View>
                    <ScrollView>
                    {
                        this.state.contain.length == 0 ?
                            <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}>
                                <Image source={require("../imag/1.png")}
                                    style={{
                                        height: 200,
                                        width: 200,
                                        marginTop: 150
                                    }}
                                ></Image>
                                <Text style={{ marginTop: 25, fontSize: 20, fontWeight: "bold" }}>You don't have any notes</Text>
                                <Text style={{ marginTop: 20, width: 220, textAlign: "center", color: "#aaa" }}
                                    numberOfLines={2}
                                >Add a new note on the button down bellow</Text>
                            </View> :
                            <View style={{ flex: 1, padding: 20, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                                {
                                    this.state.contain.map((item, index) => (<>
                                        <TouchableOpacity
                                            onLongPress={() => {
                                                this.setState({ setVisible: true })
                                            }}
                                            style={{ width: 150, backgroundColor: const1.colortext, borderRadius: 20, marginTop: 20 }}>
                                            <View style={{ width: "100%", padding: 20 }}>
                                                <Text style={{ color: "#fff" }}>{item.Title}</Text>
                                                <Text style={{ color: "#fff" }}>{item.note}</Text>
                                            </View>
                                            <Text style={{ textAlign: "right", padding: 10,color: "#fff"  }}>{item.date}</Text>
                                        </TouchableOpacity>

                                        <Dialog.Container visible={this.state.setVisible}

                                        >
                                            <View style={{
                                                flexDirection: "column", height: 220,
                                                marginTop: -30,
                                            }}>
                                                <TouchableOpacity style={{ height: 40, width: "100%" }}>

                                                    <Dialog.Button
                                                        style={{ width: 70, marginLeft: -220 }}
                                                        label='Edit'
                                                        color={const1.colortext}
                                                        onPress={() => {
                                                            this.setState({ index: index, objupdate: this.state.contain[index], showedit: true })

                                                        }}
                                                    ></Dialog.Button>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ height: 40, width: "100%" }}>
                                                    <Dialog.Button
                                                        style={{ width: 70, marginLeft: -200 }}
                                                        color={const1.colortext}
                                                        label="Archive" onPress={() => {
                                                            this.setState({ setVisible: false })
                                                        }} />
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ height: 40, width: "100%" }}>
                                                    <Dialog.Button
                                                        style={{ width: 70, marginLeft: -200 }}
                                                        color={const1.colortext}
                                                        label="Favorite"
                                                        onPress={() => {
                                                            this.addfav(index)
                                                            this.setState({setVisible: false})
                                                        }} />
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ height: 40, width: "100%" }}>
                                                    <Dialog.Button
                                                        style={{ width: 70, marginLeft: -200 }}
                                                        color={const1.colortext}
                                                        label="Delete" onPress={() => {
                                                            this.setState({ checkdelet: true })
                                                           
                                                        }} />
                                                    <Dialog.Container visible={this.state.checkdelet}>
                                                        <Dialog.Title>Delete</Dialog.Title>
                                                        <Dialog.Description>
                                                            Do you want to delete this note?
                                                        </Dialog.Description>
                                                        <Dialog.Button label="Cancel"
                                                            color={const1.colortext}
                                                            onPress={() => {
                                                                this.setState({ checkdelet: false })
                                                            }} />
                                                        <Dialog.Button label="Delete"
                                                            color={const1.colortext}
                                                            onPress={() => {
                                                                this.delete(index)
                                                                this.setState({setVisible:false})
                                                            }} />
                                                    </Dialog.Container>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ height: 40, width: "100%" }}>
                                                    <Dialog.Button
                                                        style={{ width: 70, marginLeft: -200 }}
                                                        color={const1.colortext}
                                                        label="Share" onPress={() => {
                                                            this.setState({ favshow: true })
                                                        }} />
                                                </TouchableOpacity>
                                            </View>
                                        </Dialog.Container>
                                    </>)
                                    )}
                            </View>
                    }
</ScrollView>

                    <TouchableOpacity style={{
                        height: 60, width: 60, backgroundColor: const1.colortext
                        , alignItems: "center", justifyContent: "center", borderRadius: 35
                        , marginRight:20,marginBottom:-60, alignSelf: "flex-end"
                    }}
                        onPress={() => {
                            this.setState({ showmodaladd: true })
                        }}
                    >
                        <FontAwesome name="edit"
                            style={{ fontSize: 25, color: "#fff" }}

                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        height: 60, width: 60, backgroundColor: const1.colortext
                        , alignItems: "center", justifyContent: "center", borderRadius: 35
                        ,marginLeft:20,marginBottom:15
                    }}
                        onPress={() => {
                            this.props.navigation.navigate("drow")
                        }}
                    >
                        <FontAwesome5 name="pen-alt"
                            style={{ fontSize: 21, color: "#fff" }}

                        />
                    </TouchableOpacity>





                    {/* add */}
                    <Modal visible={this.state.showmodaladd}
                        onRequestClose={() => {
                            this.setState({ showmodaladd: false })
                        }}

                    >
                        <View style={{ flex: 1 }}>
                            <View style={{
                                height: 60,
                                width: "100%",
                                backgroundColor: "#fff",
                                justifyContent: "space-between",
                                flexDirection: "row"
                            }}>
                                <TouchableOpacity style={{
                                    height: 60,
                                    width: 70,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                    onPress={() => {
                                        this.state.action.current?.setModalVisible();
                                        // this.setState({ showmodaladd: false })
                                    }}
                                >
                                    <AntDesign
                                        name="close"
                                        style={{ fontSize: 20 }}
                                    ></AntDesign>
                                    <ActionSheet ref={this.state.action}>
                                        <View style={{ height: 450 }}>
                                            <View style={{
                                                height: 200,
                                                width: "100%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginTop: 2,

                                            }}>
                                                <Image source={require("../imag/back.png")}
                                                    style={{ height: 160, width: 300 }}
                                                ></Image>
                                            </View>
                                            <View style={{
                                                height: 90,
                                                width: "100%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginTop: 2,
                                                justifyContent: "space-between"
                                            }}>
                                                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Leaving Without saving?</Text>
                                                <Text style={{ width: 210, textAlign: "center", marginTop: 20 }}
                                                    numberOfLines={3}
                                                >
                                                    In order to save your changes before leaving,tap save on the top bar.</Text>
                                            </View>
                                            <TouchableOpacity style={{
                                                height: 45,
                                                width: "80%",
                                                alignSelf: "center",
                                                backgroundColor: const1.colortext,
                                                borderRadius: 50,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginTop: 50
                                            }}
                                                onPress={() => {
                                                    this.setState({ showmodaladd: false })
                                                }}

                                            >
                                                <Text style={{ color: "#fff" }}>Discard changes</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                height: 80,
                                                width: "100%",
                                                borderRadius: 50,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginTop: 2
                                            }}
                                                onPress={() => {
                                                    this.state.action.current?.setModalVisible()
                                                }}
                                            >
                                                <Text style={{ fontWeight: "bold", fontSize: 20, color: const1.colortext, }}>Go back</Text>
                                            </TouchableOpacity></View>
                                    </ActionSheet>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    height: 40,
                                    width: 70, alignSelf: "center",

                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                              onAccessibilityAction={false}
                                    onPress={() => {
                                        
                                        this.addnote()
                                    }}
                                >
                                    <Text
                                        style={{ color: const1.colortext, fontSize: 18 }}>
                                        save</Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={{
                                    height: 50,
                                    width: "90%",
                                    alignSelf: "center",
                                    fontSize: 22,
                                    fontWeight: "bold",
                                    letterSpacing: 1.5,
                                    colortext:"#fff"
                                }}
                                placeholder="title"
                                value={this.state.titleinput}
                                onChangeText={(newvalue) => {
                                    this.setState({ titleinput: newvalue })
                                }}
                                numberOfLines={1}
                            >

                            </TextInput>
                            <TextInput
                                style={{

                                    width: "90%",
                                    alignSelf: "center",
                                    fontSize: 17
                                }}
                                placeholder="Note"
                                value={this.state.noteinput}
                                onChangeText={(newvalue) => {
                                    this.setState({ noteinput: newvalue })
                                }}
                            >

                            </TextInput>

                        </View>
                    </Modal>

                    {/* search */}
                    <Modal visible={this.state.showsearch}
                        onRequestClose={() => {
                            this.setState({ showsearch: false })
                        }}

                    >
                        <View style={{ flex: 1, backgroundColor: "#fff" }}>
                            <View style={{
                                height: 50,

                                flexDirection: "row",
                                backgroundColor: "#F8F6F9"
                            }}>
                                <TouchableOpacity
                                    style={{
                                        width: 50,
                                        alignItems: "center",
                                        justifyContent: "center",

                                    }}
                                    onPress={() => {
                                        this.setState({ showsearch: false, containsearch: [] })

                                    }}
                                >
                                    <Entypo
                                        name="chevron-thin-left"
                                        style={{ fontSize: 18 }}
                                    />
                                </TouchableOpacity>
                                <TextInput
                                    style={{ width: 200, marginLeft: 20 }}
                                    placeholder="Pesquisar notas"
                                    value={this.state.inputsearch}
                                    onChangeText={(newvalue) => {
                                        this.setState({ inputsearch: newvalue })
                                        this.search(newvalue)
                                    }}
                                ></TextInput>
                            </View>
                            <View style={{ flex: 1 }}>
                                {

                                    this.state.found ?
                                        this.state.contain.map((item, index) => (<>
                                            <View style={{ flex: 1, padding: 20, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                                                {item.show ?
                                                    <TouchableOpacity
                                                        onLongPress={() => {
                                                            this.setState({ setVisible: true })
                                                        }}
                                                        style={{ width: 150, backgroundColor: const1.colortext, borderRadius: 20, marginTop: 20 }}>
                                                        <View style={{ width: "100%", padding: 20 }}>
                                                            <Text style={{ color: "#fff" }}>{item.Title}</Text>
                                                            <Text style={{ color: "#fff" }}>{item.note}</Text>
                                                        </View>
                                                        <Text style={{ textAlign: "right", padding: 10 }}>{item.date}</Text>
                                                    </TouchableOpacity> : null}
                                            </View>
                                        </>
                                        ))


                                        :
                                        this.state.inputsearch.length != 0 ?
                                            (<View style={{
                                                flex: 1,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                <MaterialIcons
                                                    name="search-off"
                                                    style={{ fontSize: 100 }}
                                                />
                                                <Text style={{ fontWeight: "bold", fontSize: 20 }}>No note found</Text>
                                                <Text
                                                    style={{ textAlign: "center", width: 130 }}
                                                >Experimente usar outra palavra-chave ou buscar por outra eiqueta.</Text>
                                            </View>) : null
                                }
                            </View>
                        </View>
                    </Modal>

                    {/* edit */}
                    <Modal visible={this.state.showedit}
                        onRequestClose={() => {
                            this.setState({ showedit: false })
                        }}

                    >
                        <View style={{ flex: 1 }}>
                            <View style={{ height: 50, flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
                                <TouchableOpacity style={{ width: 50, alignItems: "center", justifyContent: "center" }}>
                                    <Entypo
                                        name="chevron-thin-left"
                                        style={{ fontSize: 18 }}
                                    />
                                </TouchableOpacity>
                                <View style={{ width: 120, flexDirection: "row" }}>
                                    <TouchableOpacity style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
                                        onPress={() => {
                                            this.update()
                                            this.setState({ showedit: false,setVisible:false })
                                        }

                                        }


                                    >
                                        <Text style={{ fontSize: 16, color: const1.colortext }}>Edit</Text>




                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                        <AntDesign name="bars"
                                            style={{ fontSize: 20 }}

                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TextInput
                                style={{
                                    height: 50,
                                    width: "90%",
                                    alignSelf: "center",
                                    fontSize: 22,
                                    fontWeight: "bold",
                                    letterSpacing: 1.5,
                                }}
                                placeholder="Title"
                                value={this.state.objupdate.Title}
                                onChangeText={(newvalue) => {
                                    let obj = this.state.objupdate
                                    obj.Title = newvalue
                                    this.setState({ objupdate: obj })
                                }}
                                numberOfLines={1}
                            >

                            </TextInput>
                            <TextInput
                                style={{

                                    width: "90%",
                                    alignSelf: "center",
                                    fontSize: 17
                                }}
                                placeholder="Note"
                                value={this.state.objupdate.note}
                                onChangeText={(newvalue) => {
                                    let objupdate = this.state.objupdate
                                    objupdate.note = newvalue
                                    this.setState({ objupdate: objupdate })
                                }}
                            >

                            </TextInput>
                        </View>

                    </Modal>

{/* fav */}

                    <Modal visible={this.state.favshow}
                    onRequestClose={()=>{
                        this.setState({favshow:false})
                    }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: "row", height: 50 ,backgroundColor:"#F8F6F9"}}>
                                <TouchableOpacity style={{
                                    height: 50, width: 50,
                                    alignItems: "center", justifyContent: "center"
                                }}
                                onPress={()=>{
                                    this.setState({favshow:false})
                                }}
                                >
                                    <Entypo name="chevron-thin-left"
                                        style={{ fontSize: 18 }}

                                    />
                                </TouchableOpacity>
                                <View style={{ height: 50, width: 150, flexDirection: "row" }}>
                                    <View style={{
                                        width: 120,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{ fontSize: 17 }}>Favorite notes</Text>
                                    </View>
                                    <TouchableOpacity style={{ height: 50, width: 20, alignItems: "center", justifyContent: "center" }}>

                                        <AntDesign name="caretdown"
                                            style={{ fontSize: 14 }}

                                        />
                                    </TouchableOpacity>
                                </View>
                                {this.state.contain.length != 0 ?
                                    <View style={{ alignItems: "flex-end", width: 160 }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <TouchableOpacity style={{ height: 50, width: 60, alignItems: "center", justifyContent: "center" }}
                                                onPress={() => {
                                                    this.setState({ showsearch: true })
                                                }}
                                            >
                                                <AntDesign name="search1" style={{ fontSize: 18 }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ height: 50, width: 60, alignItems: "center", justifyContent: "center" }}>
                                                <AntDesign name="appstore-o" style={{ fontSize: 19 }} />
                                            </TouchableOpacity>
                                        </View></View> : null}
                            </View>



                            <View style={{ flex: 1, padding: 20 }}>
                                {this.state.favarr.map((item, index) => (<>
                                    <TouchableOpacity
                                        onLongPress={() => {
                                            this.setState({ setVisible: true })
                                        }}
                                        style={{ width: 150, backgroundColor: const1.colortext, borderRadius: 20, marginTop: 20 }}>
                                        <View style={{ width: "100%", padding: 20 }}>
                                            <Text style={{ color: "#fff" }}>{item.Title}</Text>
                                            <Text style={{ color: "#fff" }}>{item.note}</Text>
                                        </View>
                                        <Text style={{ textAlign: "right", padding: 10 }}>{item.date}</Text>
                                    </TouchableOpacity>
                                </>))}


                            </View>
                        </View>
                    </Modal>
                </View >
            </>)
    }
}





