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
    }
  }
})