import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'    

    

const baseURL = 'http://localhost:3001/api/places/'

class App extends Component {
  constructor(){
    super()

    this.state = {
      state: "Colorado",
      city: "Denver",
      forecast:[
        {weekday: '',high: '', low:'',conditions:'',icon_url:''},
        {weekday: '',high: '', low:'',conditions:'',icon_url:''},
        {weekday: '',high: '', low:'',conditions:'',icon_url:''},
        {weekday: '',high: '', low:'',conditions:'',icon_url:''},
        {weekday: '',high: '', low:'',conditions:'',icon_url:''},
      ],
      recent: [{
        "id": 1,
        "state": "Colorado",
        "city": "Denver"
    },
    {
        "id": 2,
        "state": "Minnesota",
        "city": "Minneapolis"
    },
    {
        "id": 3,
        "state": "Utah",
        "city": "Salt Lake City"
    }]
    }
  
    this.getForecast = this.getForecast.bind(this)
    this.selectLocation = this.selectLocation.bind(this)
    this.postCity = this.postCity.bind(this)
    this.getCity = this.getCity.bind(this)
  }

  componentWillMount(){
      this.getCity()
  }
  getCity(){
      axios.get(baseURL).then(res => {
          let array = res.data
          array.reverse()
          let finalArray=array.splice(0,3)
          console.log("recent: ",finalArray) 
          this.setState({recent: finalArray})
          console.log(this.state)   
      })
  }

  selectLocation(){
    this.setState({
      state: this.refs.state.value,
      city: this.refs.city.value
    })
    this.getForecast()

  }

  getForecast(){
    console.log(this.state)
    axios.get(`http://api.wunderground.com/api/337a61b391cf917f/forecast10day/q/${this.state.state}/${this.state.city}.json`).then(res =>{
      
    console.log("newtest: ", res.data.forecast.simpleforecast.forecastday)
    let forecastArray = res.data.forecast.simpleforecast.forecastday;
      let slicedArray = forecastArray.slice(0,5) 
      let weekday='';
      let high='';
      let low='';
      let conditions='';
      let icon_url='';
      
      let forecastState = []
       

      for (let i=0;i<slicedArray.length;i++){
        weekday = forecastArray[i].date.weekday;
        high = forecastArray[i].high.fahrenheit;
        low = forecastArray[i].low.fahrenheit;
        conditions = forecastArray[i].conditions;
        icon_url = forecastArray[i].icon_url;

        forecastState.push({weekday,high,low,conditions,icon_url});
      }
      
      console.log(forecastState)
      this.setState({forecast: forecastState})
       console.log(this.state)
      //  this.postCity() /*I could not get this post method to work, but am able to get and post in postman
       this.getCity()
    })
  }

  postCity(){
    let newLocation = {
      state: this.refs.state,
      city: this.refs.city
    }
    axios.post(baseURL, newLocation).then(res =>{
              
          state: newLocation.state;
          city: newLocation.city
        
    })
  }


  render() {
    return (
      <div className="App">
        
        <p className="App-intro">
          Weather 
        </p>

        <input placeholder="Enter City" ref="city"/>
        <input placeholder="Enter State (ie Colorado)" ref="state"/>
        <button className = "getForecast" onClick={this.selectLocation}> Get Forecast </button>
        <div className="container"> <br></br><h1>5 Day Forecast</h1>
          <div className = "forecastContainer">
            <div className="day0">
              <div>{this.state.forecast[0].weekday} </div>
              <div>{this.state.forecast[0].conditions} </div>
              <div>High {this.state.forecast[0].high} </div>
              <div> Low {this.state.forecast[0].low}</div>
              <div> <img src={this.state.forecast[0].icon_url}/> </div>
            </div>
            <div className="day1">
             <div> {this.state.forecast[1].weekday} </div>
             <div>{this.state.forecast[1].conditions} </div> 
             <div>High {this.state.forecast[0].high} </div>
              <div> Low {this.state.forecast[0].low}</div>
              <div> <img src={this.state.forecast[0].icon_url}/> </div>
            </div>
            <div className="day2">
              <div>{this.state.forecast[2].weekday} </div>
              <div>{this.state.forecast[2].conditions}   </div>
              <div>High {this.state.forecast[2].high} </div>
              <div> Low {this.state.forecast[2].low}</div>
              <div> <img src={this.state.forecast[2].icon_url}/> </div>
            </div>
            <div className="day3">
              <div>{this.state.forecast[3].weekday} </div>
              <div>{this.state.forecast[3].conditions} </div> 
              <div>High {this.state.forecast[3].high} </div>
              <div> Low {this.state.forecast[3].low}</div>
              <div> <img src={this.state.forecast[3].icon_url}/> </div>
            </div>
            <div className="day4">
              <div>{this.state.forecast[4].weekday} </div>
              <div>{this.state.forecast[4].conditions} </div>
              <div>High {this.state.forecast[4].high} </div>
              <div> Low {this.state.forecast[4].low}</div>
              <div> <img src={this.state.forecast[4].icon_url}/> </div>
            </div>
          </div>
        </div>

        <div className="recent"> 
          <h1>Recent Searches</h1>
        <div> {this.state.recent[0].city}</div>
        <div> {this.state.recent[1].city}</div>
        <div> {this.state.recent[2].city}</div>
        </div>
          {console.log(this.state.recent)}
      </div>
    );
  }
}

export default App;
