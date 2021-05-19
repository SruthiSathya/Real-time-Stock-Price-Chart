                var RESULT = { 'Stock': 'Closing Price Value'}
                
                function getSymbol(){  
                    var stock_symbol=document.getElementById("fname").value;  
                    myFunction(stock_symbol) 
                }  

                function myFunction(stock_symbol) {
                    setInterval(() => {updateStock(stock_symbol)}, 5000);
                }

                function updateStock(stock_symbol)
                {
                    url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+stock_symbol+"&interval=1min&apikey=KOE7PMEOOPD18BYD"
                    stockChartYValuesFunction = [];
                    
                    fetch(url)
                            .then(function(resp){
                                    return resp.json();
                            })
                            .then(function(data){
                                   // console.log(data)
                                   stockChartYValuesFunction.push(data["Time Series (1min)"][  Object.keys(data["Time Series (1min)"])[0] ]["4. close"]);
                                
                                    var stock_val = parseFloat(stockChartYValuesFunction[0])

                                    RESULT[String(stock_symbol)] = stock_val
                                    
                                    //console.log(RESULT)
                                    
                                    var arr = [];
                                    for (var key in RESULT) {
                                        if (RESULT.hasOwnProperty(key)) {
                                            arr.push( [ key, RESULT[key] ] );
                                        }
                                    }
                                    //console.log(arr);
                                    drawMultSeries(arr) 
                                        }
                            )};          
                                google.charts.load('current', {packages: ['corechart', 'bar']});
                                google.charts.setOnLoadCallback(drawMultSeries);
                                
                                function drawMultSeries(arr) {

                                    var data = google.visualization.arrayToDataTable(arr);
                                    var options = {
                                        title: 'Real Time Stock Price Chart',
                                        chartArea: {width: '50%'},
                                        hAxis: {
                                        title: 'Closing Price',
                                        minValue: 0
                                        },
                                        vAxis: {
                                        title: 'Stock Symbol'
                                        }
                                    };

                                    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
                                    chart.draw(data, options);
                                    }
            