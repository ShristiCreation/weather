let lat,lon 
  if('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition( async position => {
    
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    // console.log(lat,lon);
    document.getElementById('latitude').textContent=lat.toFixed(2);
    document.getElementById('longitude').textContent=lon.toFixed(2);
  // console.log(position); 
  const api_url=`weatherUrl/lat=${lat}&lon=${lon}`;
  const response = await fetch(api_url);
  const json = await response.json();
  console.log(json);

  const data = {lat, lon };
  const options ={
    method:'POST',
    headers: {
   'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
 const db_response = await fetch('/api',options);
 const db_json = await db_response.json();
 console.log(db_json);
  });
  

 } else {
  console.log('geolocation not available');
 }



  