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
    relatedImgUrl: 'https://images.unsplash.com/photo-1533612773272-7230cca4169e'
  },
  methods: {
    
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.location.lat = position.coords.latitude;
          this.location.lon = position.coords.longitude;
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
      });
    }
    
  },
  
  created: function() {
    this.getCurrentLocation();
    this.getMainInfo();
  },
  
  updated: function() {
    this.getMainInfo();
  }
})