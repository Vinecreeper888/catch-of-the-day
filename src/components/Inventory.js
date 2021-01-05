import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import PropTypes from 'prop-types';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component{
    static propTypes = {
        fishes: PropTypes.object,
        updatedFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user});
            }
        }) 
    }

    authHandler = async authData => {
        //look up the current store in firebase
        const store = await base.fetch(this.props.storeId, {context: this});
        console.log(store);
        //claim it if thers no owner
        if(!store.owner) {
            //save it as our own
            await base.post(`${this.props.storeId}/owner`,{
                data: authData.user.uid
            })
        }
        //set the stat of the inventory comp to reflect
        //the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
        
    }
    authentiate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        console.log('Logging out!');
        await firebase.auth().signOut();
        this.setState({uid: null})

    };

    render() {

        const logout = <button onClick={this.logout}>Log Out</button>

        //check if they're logged in
        if(!this.state.uid) {
            return <Login authenticate={this.authentiate}/>
        }
        //check if they're not the owner
        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you are not the owner</p>
                    {logout}
                </div>
            );
        }

        //they must be the owner
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm 
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;