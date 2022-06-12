import * as React from "react"
import {
    Text,
    ImageBackground,
    View,
    Image,
    StatusBar
} from "react-native"
export default class intro extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        setTimeout(() => {
this.props.navigation.navigate("home")
        }, 10000
        );
    }
    render() {
        return (
            <>
            <StatusBar backgroundColor={"#fff"}></StatusBar>
                <View style={{
                    backgroundColor: "#fff",
                    alignItems: "center",
                    flex: 1
                    // justifyContent: "center",
                }}>
                    <Image source={require("../imag/3.png")}
                        style={{
                            height: 200,
                            width: 250,
                            marginTop: 150
                        }}
                    ></Image>
                    <Text style={{ marginTop: 270, fontSize: 20 }}>from
                        <Text style={{ fontWeight: "bold" }}> MobApps</Text>
                    </Text>
                </View>
            </>)
    }
}
