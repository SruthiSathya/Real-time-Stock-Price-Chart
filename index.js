                var RESULT = {}
                
                function getSymbol(){  
                    var stock_symbol=document.getElementById("fname").value;  
                    setInterval(() => {updateStock(stock_symbol)}, 5000);
                }  

                function updateStock(stock_symbol) 
                {
                   url = "https://cloud.iexapis.com/stable/stock/"+stock_symbol+"/intraday-prices?token=sk_0ee1843b5d13482388927e848ff8b787&chartLast=20"
      
                  stock_values = [];
                    fetch(url)
                            .then(function(resp){
                                    return resp.json();
                            })
                           .then(
                            function (data)
                            {
                                    
                                    idx_array = Object.keys(data)
                                    console.log(   data[  [idx_array.length - 1]    ]["close"] );
                                    var stock_val = data[  [idx_array.length - 1]    ]["close"]
                                    RESULT[String(stock_symbol)] = stock_val
                                    var arr = [ ['Stock', 'Closing Price Value']  ];
                                    for (var key in RESULT) {
                                        if (RESULT.hasOwnProperty(key)) {
                                            arr.push( [ key, RESULT[key] ] );
                                        }
                                    }
                                    console.log(arr);
                                    drawMultSeries(arr) 
                                        }
                                    
                           )};        
                                google.charts.load('current', {packages: ['corechart', 'bar']});
                                google.charts.setOnLoadCallback(drawMultSeries);
                                
                                function drawMultSeries(arr) {
                                    var data = google.visualization.arrayToDataTable(arr);
                                    var options = {title: 'Real Time Stock Price Chart', chartArea: {width: '50%'},
                                        hAxis: {
                                        title: 'Closing Price (in USD)',
                                        minValue: 0
                                        },
                                        vAxis: {title: 'Stock Symbol'}
                                    };

                                    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
                                    chart.draw(data, options);
                                    }                 