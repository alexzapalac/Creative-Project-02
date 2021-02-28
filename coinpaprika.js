
document.getElementById("cryptoSubmit").addEventListener("click", function(event) {
    event.preventDefault();

    const value = document.getElementById("cryptoInput").value;
    if (value === "")
      return;

    if(value === "Bitcoin"){
        value = "btc-bitcoin"
    }
    
    console.log(value);
    const url = "https://api.coinpaprika.com/v1/coins/" + value;
    fetch(url)
      .then(function(response) {
          //make sure request was successful
          if (response.status === -429){
              return {
                  text: "Error calling the API service: " + response.statusText
              }
          }
        return response.json();
      }).then(function(json) {
        let results = "";
        results += '<h2>Name: ' + json.name + "</h2>";
        
  
        results += "<p>"
  
        results += '<h2>' + "Symbol: " + json.symbol
        results += '<h2>' + "Rank: " + json.rank
        results += '<h2>' + "Description: " + json.description

        if(json.is_new){
            results += '<h2>' + json.name + " is new."
        }
        else{
            results += '<h2>' + json.name + " is not new."
        }

        
        results += "<p>"
        document.getElementById("cryptoResults").innerHTML = results;

    });
  
    const url2 = "https://api.coinpaprika.com/v1/coins/" + value + "/ohlcv/latest/";
    fetch(url2)
        .then(function(response) {
          //make sure request was successful
          if (response.status === -429){
            return {
                text: "Error calling the API service: " + response.statusText
            }
        }
            return response.json();
        }).then(function(json) {
            let latest = "";
              
            latest += "<h3>Today's numbers."
            latest += "<hr>"
            for (let i=0; i < 1; i++) {
                latest += "<h3>Open: $" + json[i].open
                latest += "<h3>Close: $" + json[i].close
                latest += "<h3>"
                latest += "<h3>High: $" + json[i].high
                latest += "<h3>Low: $" + json[i].low
 
           }
      
            latest += "<p>"
            document.getElementById("forecastResults").innerHTML = latest;
        
        });


        const url3 = "https://api.coinpaprika.com/v1/tickers/" + value
        fetch(url3)
            .then(function(response) {
              //make sure request was successful
              if (response.status === -429){
                return {
                    text: "Error calling the API service: " + response.statusText
                }
            }
                return response.json();
            }).then(function(json) {
                let tickers = "";
                tickers += "<h3>Notable Values."
                tickers += "<hr>"

                debugger

                tickers += "<h3>Circulating Supply: " + json.circulating_supply + " coins."
                tickers += "<h3>Max Supply: " + json.max_supply + " coins."
                tickers += "<h3>Beta Value: " + json.beta_value
          
                tickers += "<p>"
                document.getElementById("tickers").innerHTML = tickers;
            
            });

}); 