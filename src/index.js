import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

    //one way to initialize State object with constructor
    // constructor(props){
    //     super(props); //constructor call overwrite React Class
    //     this.state = { lat: null, errorMessage: '' };
    // }

    //second way to initialize state without constructor
    state = { lat: null, currentTime: new Date().toLocaleTimeString(), errorMessage: '' };

    componentDidMount(){
        setInterval(() => {
            const newDate = new Date().toLocaleTimeString()
            this.setState({currentTime: newDate})
        }, 1000);
        
        window.navigator.geolocation.getCurrentPosition(
            //remeber set state updates STATE and rerenders
            (position) => this.setState({lat: position.coords.latitude}),
            (err) => this.setState({errorMessage: err.message})
        );
        
    }

    //Helper Function
    renderContent = () => {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }
        
        if (!this.state.errorMessage && this.state.lat) {
            //using a prop to send state to seasondisplya component
            return <SeasonDisplay lat={this.state.lat} currentTime={this.state.currentTime}/>
        }

        return <Spinner message="Please accept the location request!" />
    }
    
    render () {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);