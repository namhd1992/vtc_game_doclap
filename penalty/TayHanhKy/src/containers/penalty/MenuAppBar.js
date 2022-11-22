import React from 'react'
import PropTypes from 'prop-types'
import Ultilities from '../../Ultilities/global'
import axios from 'axios'
import moment from 'moment'
import {
	getInfoUser
} from '../../modules/lucky'

import {
	setStatusServer
} from '../../modules/server'

import {
	changeTitle
} from '../../modules/global'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
	osVersion,
	osName,
	mobileModel
  } from "react-device-detect";
// import '../styles/menuAppbar.css'

class MenuAppBar extends React.Component {

	state = {
		auth: false,
		top: false,
		left: false,
		bottom: false,
		right: false,
		user: null,
	}

	logoutAction = () => {
		this.setState({ auth: false });
		localStorage.removeItem("user");
		window.location.replace(
			`https://graph.vtcmobile.vn/oauth/authorize?client_id=92d34808c813f4cd89578c92896651ca&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		);

		// window.location.replace(
		// 	`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=UH8DN779CWCMnCyeXGrm2BRqiTlJajUyZUEM0Kc&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		// );
	}

	componentDidMount() {
		var {dispatch}=this.props;
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		if (this.props.pathname === "/game") {
			this.props.changeTitle("Danh Sách Game");
		}
		if (this.props.pathname === "/auction") {
			this.props.changeTitle("Shop");
		}
		if (this.props.pathname === "/giftcode") {
			this.props.changeTitle("Giftcode");
		}
		if (this.props.pathname === "/lucky") {
			this.props.changeTitle("May Mắn");
		}
		if (localStorage.getItem("user") != null) {
			var now = moment(new Date()); //todays date
			var end = moment(user.expired); // another date
			var duration = moment.duration(end.diff(now));
			var millisecond = Math.floor(duration.asMilliseconds()) + user.expires_in*1000;
			if (millisecond > 0) {
				this.setState({
					auth: true,
					user: JSON.parse(localStorage.getItem("user")),
				});
			} else {
				this.logoutAction();
			}
		} else {
			this.setState({ auth: false });
			var code = Ultilities.parse_query_string("code", window.location.href);
			var fb_mess = Ultilities.parse_query_string("fbmessid", window.location.href);
			var currentPath=localStorage.getItem("currentPath");
			if (code != null) {
				const data={
					"lang": "vi",
					"osType": osName.toLocaleUpperCase().replace(' ',''),
					"deviceId": "00000000-0000-0000-0000-000000000000",
					"deviceName": mobileModel,
					"osVersion": osVersion,
					"appVersion": "1.0",
					// "requestId": 365603310,
					// "client_id": "SANBOX",
					"client_id": "PENALTY_WEB",
					"client_secret": "123456abcdef",
					"grant_type": "vtc:scoin_code",
					"scope": "profile games.catalog games.penalty games.bets wallet giftbox pay transaction content",
					"code": code,
					"code_verifier": ""
				}
				  
				var url = Ultilities.base_url() + "/thk_users/api/v1/account/oauthtoken";

				axios.post(url, data).then(function (response) {
					var user_save = response.data.data;
					user_save.expired = new Date();
					localStorage.setItem("user", JSON.stringify(user_save));
					_this.setState({ user: response.data.data });
					window.location.replace(`${window.location.protocol}//${window.location.host}${currentPath}`);
				}).catch(function (error) {
					if(error.response.data.code ===-403){
						window.location.replace(`${window.location.protocol}//${window.location.host}/error`);
					}
					_this.props.setStatusServer();
					localStorage.removeItem("user");
					localStorage.removeItem("userInfo");
					_this.setState({ auth: false });
				})
			}
		}
	}


	render() {
		// const { classes } = this.props;
		
		return (
			<div></div>
		);
	}
}

const mapStateToProps = state => ({
	data: state.profile.data,
	dataInfoUser:state.lucky.dataInfoUser,
	waiting: state.profile.waiting,
	title: state.global.title,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getInfoUser,
	changeTitle,
	setStatusServer
}, dispatch)

// MenuAppBar.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuAppBar));