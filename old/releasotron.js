$(document).ready(function() {
   getEnvironmentVersion("https://repose-i.test.pci.irdeto.com/verifier/version", "#ipay");
  // getEnvironmentVersion("https://diversifier.test.pci.irdeto.com/diversifier/version", "#tpay");
  // getEnvironmentVersion("https://diversifier.stage.pci.irdeto.com/diversifier/version", "#spay");
  // getEnvironmentVersion("https://diversifier.live.pci.irdeto.com/diversifier/version", "#lpay");
  // getEnvironmentVersion("https://v.wallet.payu.ru/verifier/version", "#lrpay");
  // getEnvironmentVersion("https://diversifier.dol.pci.irdeto.com/diversifier/version", "#dolcmgc");
});


 /*function getEnvironmentVersion(environmentURL, environmentID) {
	 $.ajax({
	      url: environmentURL,
	      data: {
	         format: 'json'
	      },
	      crossDomain: true,
	      error: function() {
	         console.log("Nope")
	      },
	      dataType: 'json',
	      success: function(data) {
	         $(environmentID).html(data.version);
	      },
	      type: 'GET'
	   });	
 } */

 // Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
	xhr.open(method, url);
	xhr.withCredentials = true;
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function getEnvironmentVersion(environmentURL, environmentID) {
	var xhr = createCORSRequest('GET', environmentURL);
	xhr.send();

  	xhr.onload = function() {
	$(environmentID).html(xhr.responseText);
    //var text = xhr.responseText;
    //var title = getTitle(text);
    //alert('Response from CORS request to ' + url + ': ' + title);
  };
}

