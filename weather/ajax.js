function ajax_get (url,callback)
{
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange= function() 
	{   
	
		
		if(xmlhttp.readyState==4 &&  xmlhttp.status==200)
			
			{  
			    var s = xmlhttp.responseText;
				console.log('response text:' + s);
				
				s=s.replace("/**/callbackFunction(","");
				s=s.replace(")","");
				s=s.replace(")","");
				s=s.replace(";","");
					console.log('response text:' + s);
			
				try
				{
					
				//s= s.replace("/","\/");
					var data = JSON.parse(s);
					
				} 
				catch(err)
				{
					document.getElementById("weather").innerHTML="Wrong Input";

					console.log("the error is :"+err.message);
					
				}
				
				  callback(data);
			
			}
		
		
		
	}
	xmlhttp.open("GET",url,true);
		xmlhttp.send();
		
}
	
	



function callBackFunction(data)
{  


  //	a=a+ "<li> " + data.results.channel.item.title + " : "+data.results.channel.item.condition.temp+" </li>";
try {a = data.query.results.channel.item.title;
a= "<h2> "+ a+" </h2>" + "<div style = 'color : blue'> It Feels Like "+data.query.results.channel.item.condition.temp+"  &#176 F  </div>";
var forcast = data.query.results.channel.item.forecast;
a= a + "<h2> Forecast</h2> <table><tr>";
for (var i =0;i<forcast.length;i++)
{if (i%4 == 0)
	a= a +  "</tr> <tr>";
	
	a= a + " <td  style = 'width : 200px;'> <h4 style= 'color:blue'> "+ forcast[i].day +" "+ forcast[i].date+ "</h4>"
+"<p> high : "+ forcast[i].high  +" &#176 F </p> <p> low : "+ forcast[i].low  +" &#176 F</p> <p> "+ forcast[i].text +"</p> </td>";


}
a = a + "</tr> </table>";
document.getElementById("weather").innerHTML=a; }


catch (err) {
	console.log(err);
	document.getElementById("weather").innerHTML="Wrong Input";
}
	
}

 function search () {
	var city = document.getElementById("city").value;
	city = "" + city;
var uri = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+"')&format=json&callback=callbackFunction"

ajax_get (uri,callBackFunction);
var myVar = setInterval(ajax_get ,120000,uri,callBackFunction);
//ajax_get (uri,callBackResult);
}
