import React from 'react';
import { Route } from 'react-router-dom'
import '../../styles/main.css';
import MenuAppBar from '../penalty/MenuAppBar';
import Home_Web from '../penalty/web/home'
// import SanQua_Web from '../penalty/web/sanqua'
import DuaTop_Web from '../penalty/web/game/duatop'
import GiatHuVang_Web from '../penalty/web/game/giathuvang'
import LoaiTrucTiep_Web from '../penalty/web/game/loaitructiep'
import Home_Mobile from '../penalty/mobile/home'
import DuaTop_Android from '../penalty/mobile/game/android/duatop'
import GiatHuVang_Android from '../penalty/mobile/game/android/giathuvang'
import LoaiTrucTiep_Android from '../penalty/mobile/game/android/loaitructiep'

import DuaTop_IOS from '../penalty/mobile/game/ios/duatop'
import GiatHuVang_IOS from '../penalty/mobile/game/ios/giathuvang'
import LoaiTrucTiep_IOS from '../penalty/mobile/game/ios/loaitructiep'

import Login from '../login/login'
import Login_Failed from '../login_failed/login'

// import SanQua_Mobile_Android from '../penalty/mobile/android/sanqua'
// import DuaTop_Mobile_Android from '../penalty/mobile/android/duatop'

// import SanQua_Mobile_IOS from '../penalty/mobile/ios/sanqua'
// import DuaTop_Mobile_IOS from '../penalty/mobile/ios/duatop'
import {
	isAndroid,
	isIOS,
	isMobile
  } from "react-device-detect";
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			main: null,
			backgroundColor:'#fff',
			horizontal:false,
		};
	}

	componentWillMount(){
		var width=window.screen.width, height=window.screen.height;
		var x=Math.sqrt(width*width + height*height);
		if(x>800){
			this.setState({horizontal:false})
		}else{
			this.setState({horizontal:true})
		}
	}

	render() {
		const {horizontal}=this.state;
		return (
			<div style={{ backgroundColor: this.state.backgroundColor }}>
				{/* <div style={{maxWidth:"1200px", margin:"auto", background: this.state.backgroundColor }}> */}
				<Route exact path="/login" component={Login} />
				<Route exact path="/error" component={Login_Failed} />
				{(isMobile)?(<div>
					{(isAndroid)?(<div><MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
						data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
					<main ref={(c) => this.main = c}>
						<Route exact path="/" component={Home_Mobile} />
						<Route exact path="/duatop" component={DuaTop_Android} />
						<Route exact path="/giathuvang" component={GiatHuVang_Android} />
						<Route exact path="/loaitructiep" component={LoaiTrucTiep_Android} />
					</main></div>):(<div>
						<MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
						data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
					<main ref={(c) => this.main = c}>
					<Route exact path="/" component={Home_Mobile} />
						<Route exact path="/duatop" component={DuaTop_IOS} />
						<Route exact path="/giathuvang" component={GiatHuVang_IOS} />
						<Route exact path="/loaitructiep" component={LoaiTrucTiep_IOS} />
					</main></div>)}
					
				</div>):(<div>
					<MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
						data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
					<main ref={(c) => this.main = c}>
						<Route exact path="/" component={Home_Web} />
						{/* <Route exact path="/sanqua" component={SanQua_Web} /> */}
						<Route exact path="/duatop" component={DuaTop_Web} />
						<Route exact path="/giathuvang" component={GiatHuVang_Web} />
						<Route exact path="/loaitructiep" component={LoaiTrucTiep_Web} />
					</main>
				</div>)}
				
			</div>
		)
	}
}


export default App;


// return (
// 	<div style={{ backgroundColor: this.state.backgroundColor }}>
// 		{/* <div style={{maxWidth:"1200px", margin:"auto", background: this.state.backgroundColor }}> */}
// 		{(isMobile)?(<div>
// 			{(isAndroid)?(<div><MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
// 				data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
// 			<main ref={(c) => this.main = c}>
// 				<Route exact path="/" component={Home_Mobile} />
// 				<Route exact path="/sanqua" component={SanQua_Mobile_Android} />
// 				<Route exact path="/duatop" component={DuaTop_Mobile_Android} />
// 			</main></div>):(<div>
// 				{(horizontal)?(<div>
// 				<MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
// 				data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
// 			<main ref={(c) => this.main = c}>
// 				<Route exact path="/" component={Home_Mobile} />
// 				<Route exact path="/sanqua" component={SanQua_Mobile_IOS} />
// 				<Route exact path="/duatop" component={DuaTop_Mobile_IOS} />
// 			</main></div>):(<div>
// 				<MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
// 				data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
// 			<main ref={(c) => this.main = c}>
// 				<Route exact path="/" component={Home_Mobile} />
// 				<Route exact path="/sanqua" component={SanQua_Mobile_IOS_Vertical} />
// 				<Route exact path="/duatop" component={DuaTop_Mobile_IOS_Vertical} />
// 			</main></div>)}
// 			</div>
// 				 )}
			
// 		</div>):(<div>
// 			<MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
// 				data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
// 			<main ref={(c) => this.main = c}>
// 				<Route exact path="/" component={Home_Web} />
// 				<Route exact path="/sanqua" component={SanQua_Web} />
// 				<Route exact path="/duatop" component={DuaTop_Web} />
// 			</main>
// 		</div>)}
		
// 	</div>
// )