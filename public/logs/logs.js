getData();
          async function getData(){
              const response = await fetch('/api');
              const data = await response.json();
              for(item of data){
                  const root = document.createElement('div');
                //   const mood = document.createElement('div');
                  const geo = document.createElement('div');
                  const date = document.createElement('div');
                  
                //   mood.textContent= 'mood:' ${item.mood};
                  geo.textContent=  `${item.lat}°, ${item.lon}°`;
                  const dateString = new Date(item.timestamp).toLocaleString();
                  date.textContent= dateString;
                 

                  root.append( geo, date);
                  document.body.append(root);
              }
              console.log(data);
          }