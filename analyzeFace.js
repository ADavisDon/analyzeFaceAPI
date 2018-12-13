document.getElementById("analyzeImage").addEventListener("click", processImage);

function processImage() {
    var sourceImage = document.getElementById("imageURL").value;
    	document.querySelector("#image").src = sourceImage;

    var apiBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
	var keySub = document.getElementById("enterKey").value

    var imageAttr = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender"
    };

    var queryString = Object.keys(imageAttr).map((key) => {
    	return encodeURIComponent(key) + '=' + encodeURIComponent(imageAttr[key])
    }).join('&');

    var url = apiBase + '?' + queryString;

    var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Ocp-Apim-Subscription-Key', keySub);

    var initObject = {
        method: 'POST',
        body: '{"url": ' + '"' + sourceImage + '"}',
        headers: myHeaders,
        mode: 'cors'
    }

    var request = new Request(url, initObject);

    if (keySub.length == 32) {
    fetch(request).then(function(response){
        if(response.ok){
            return response.json();
        }
        else{
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function(response){
   		document.getElementById("attr").innerHTML = "Gender: " + response[0].faceAttributes.gender + "<br>Age: " + response[0].faceAttributes.age;
    }).catch(function(err){
		alert(err);
		document.getElementById("attr").innerHTML = "";
	})
	}
	else {
		alert("Please enter a valid API key first.");
	}
};
