$(document).ready(function() {
   getEnvironmentVersion("https://diversifier-i.test.pci.irdeto.com/diversifier/version", "#ipay");
   getEnvironmentVersion("https://diversifier.test.pci.irdeto.com/diversifier/version", "#tpay");
   getEnvironmentVersion("https://diversifier.stage.pci.irdeto.com/diversifier/version", "#spay");
   getEnvironmentVersion("https://diversifier.live.pci.irdeto.com/diversifier/version", "#lpay");
   getEnvironmentVersion("https://v.wallet.payu.ru/verifier/version", "#lrpay");
   getEnvironmentVersion("https://diversifier.dol.pci.irdeto.com/diversifier/version", "#dolcmgc");
});


 function getEnvironmentVersion(environmentURL, environmentID) {
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
 }