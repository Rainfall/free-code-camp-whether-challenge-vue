Vue.use(VueResource);

new Vue({
  el: '#app',
  data: {
    location: {
      name: 'unknown',
      lat: 0,
      lon: 0,
    },
    degree: null,
    degreeModes: ['C°', 'F°'],
    currentDegreeMode: 'C°',
    relatedImgUrl: 'https://images.unsplash.com/photo-1533612773272-7230cca4169e',
    weatherIcon: '',
  },
  methods: {
    
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.location.lat = position.coords.latitude;
          this.location.lon = position.coords.longitude;
          this.getMainInfo();
        });
      } else { 
        alert('Update your browser =) ')
      }
    },
    
    getMainInfo() {
      var self = this;
      self.$http.get('https://fcc-weather-api.glitch.me/api/current?lat='+self.location.lat+'&lon='+self.location.lon).then((response) => {
        console.log(response);
        self.location.name = response.body.name;
        self.degree = response.body.main.temp;
        self.relatedImgUrl = 'https://source.unsplash.com/featured/?'+response.body.weather[0].main;
        self.weatherIcon = response.body.weather[0].icon;
        
      });
    },
    
    changeMode() {
      let self = this;
      for (let mode of this.degreeModes) {
        if (mode != this.currentDegreeMode) {
          this.currentDegreeMode = mode;
          break;
        }
      }
    }
    
  },
  
  created: function() {
    this.getCurrentLocation();
  },
  
  filters: {
    toFahr(value, mode) {
      if (mode == 'F°') {
        var degree = value;
        degree = degree*9/5 + 32;
        return degree;
      } else {
        return value;
      }
    }
  }

})