import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response : '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi() //calling the callApi method
        .then(res => this.setState({ response: res.express })) //then setting the state to the api response message
        .catch(err => console.log(err)); //error handling
  }


  callApi = async () => { //this method interacts with the GET api route
    const response = await fetch('/api/hello');
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body
  };
//calls the POST express api route then saves the response in the state and displays a message to the user
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({post: this.state.post}),
    });
    const body = await response.text();

    this.setState({ responseToPost: body})
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.response} </p>
          <form onSubmit ={this.handleSubmit}> {/* uses the handle submit method for the form*/}
            <p>
              <strong> User in Server: </strong>
            </p>
            <input
              type="text"
              value = {this.state.post}
              onChange={e => this.setState({post: e.target.value})}
              />
            <button type="submit">Submit</button>
          </form>
          <p> {this.state.responseToPost} </p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
