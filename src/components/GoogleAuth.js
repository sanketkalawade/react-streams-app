import React, { Component } from 'react';
import { connect } from 'react-redux';
import {signIn, signOut } from '../actions';

class GoogleAuth extends Component {
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'222213223147-3i9tgpgo05v210um57jktjc879n0bm1i.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = (isSignedIn) =>{
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }
    onSignInButtonClick = () =>{
        this.auth.signIn();
    }
    onSignOutButtonClick = () =>{
        this.auth.signOut();
    }

    renderAuthButton(){
        if (this.props.isSignedIn === null) {
            return <div>Dont know</div>
        } else if(this.props.isSignedIn){
            return(
                <button onClick={this.onSignOutButtonClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else{
            return (
                <button onClick={this.onSignInButtonClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign In
                </button>
            )
        }
    }

    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        )
    }
}
const mapStateToProps = state =>{    
    return{
        isSignedIn:state.auth.isSignedIn
    }
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);