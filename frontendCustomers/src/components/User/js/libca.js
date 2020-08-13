//WEB201404009- Nang cap Thu vien chung chi so
//BaoTD - 14/09/2016
// CAPICOM constants 
/*
var CAPICOM_STORE_OPEN_READ_ONLY = 0;
var CAPICOM_CURRENT_USER_STORE = 2;
var CAPICOM_CERTIFICATE_FIND_SHA1_HASH = 0;
var CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY = 6;
var CAPICOM_CERTIFICATE_FIND_TIME_VALID = 9;
var CAPICOM_CERTIFICATE_FIND_KEY_USAGE = 12;
var CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE = 0x00000080;
var CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
var CAPICOM_INFO_SUBJECT_SIMPLE_NAME = 0;
var CAPICOM_ENCODE_BASE64 = 0;
var CAPICOM_E_CANCELLED = -2138568446;
var CERT_KEY_SPEC_PROP_ID = 6;
var CAPICOM_EKU_CLIENT_AUTH = 2;
var CAPICOM_CERTIFICATE_FIND_EXTENSION = 6;
var CAPICOM_VERIFY_SIGNATURE_AND_CERTIFICATE = 1;
*/
var PLUGIN_PATH;
var hSession = "";
var process = false;
var result = true;
var Base64 = require('./base64.js').Base64;

/*
function IsCAPICOMInstalled() {
	if (typeof (oCAPICOM) == "object") {
		if ((oCAPICOM.object != null)) {
			// We found CAPICOM!
			return true;
		}
	}
}
*/
function initPlugin(path) {
	//eval("\x76\x61\x72\x20\x78\x20\x3D\x20\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65\x28\x27\x62\x6F\x64\x79\x27\x29\x5B\x30\x5D\x3B");	
	//PLUGIN_PATH = path +'/setup/ACBSignPlugin.exe';
	PLUGIN_PATH = 'https://online.acb.com.vn/news/images/ACBSignPlugin.rar';
	return;
}
//Check plugin da dc cai dat chua??
function checkInstallPlugin()
{
	try 
	{
		if (hSession == "")
		{
			var xmlhttp;
			var response = "";
			if (window.XMLHttpRequest)
			{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else
			{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function()
			{
				if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
					response=xmlhttp.responseText;
					process = false;
					if (response != "")
					{
						hSession = response;
						//alert("Init Successful");
						return hSession;
					}
				}
			}
			xmlhttp.open("POST","https://127.0.0.1:14409/getSession",false);
			xmlhttp.send();		
		}
	}
	catch (e)
	{
		//alert("Error: " + e.description);
	}
}
function getError(errorCode) {
	switch (errorCode) {
		case '100100' :
			alert('Không có chứng thư số được chọn\n\nNo certificate has been selected');
			break;
		case '100101' :
			alert('Lỗi Plugin\n\nPlugin error');
			break;
		case '100102' :
			alert('Chứng thư số không hợp lệ\n\nCertificate is invalid');
			break;
		case '100103' :
			alert('Session không hợp lệ\n\Session is invalid');
			break;
		case '100104' :
			alert('Chứng thư số hết hạn\n\nCertificate is expired');
			break;
		case '100200' :
			alert('Dữ liệu lỗi\n\nError data');
			break;
		case '100201' :
			alert('Không tìm thấy chứng thư số\n\nCannot find your certificate');
			break;
		case '100202' :
			alert('Chứng thư số không hợp lệ\n\nCertificate is invalid');
			break;
		case '100203' :
			alert('Lỗi xảy ra trong quá trình ký\n\nAn error occurred while signing');
			break;
		case '100204' :
			alert('Lỗi tràn bộ nhớ\n\nOverloading');
			break;
		case '100205' :
			alert('Session không hợp lệ\n\Session is invalid');
			break;
		case '100300' :
			alert('Chữ ký không đúng định dạng\n\nYour signing have invalid format');
			break;
		case '100301' :
			alert('Lỗi phân tích chứng thư số\n\nAn error occurred while analysing certificate');
			break;
		case '100302' :
			alert('Chữ ký không hợp lệ\n\nYour signing is invalid');
			break;
		case '100303' :
			alert('Session không hợp lệ\n\Session is invalid');
			break;
		default:
			alert('Lỗi không xác định\n\nAn Error occurred');
			break;
	}
}
function init(myform) {
	/*
	// Bo loc tim kiem chung chi so
	var FilteredCertificates = FilterCertificates();

	// Neu chi co mot chung chi so duoc tim thay thi hien len
	if (FilteredCertificates.Count == 1) {
		//window.alert("vo 1");
		myform.Certificate.value = FilteredCertificates.Item(1).GetInfo(
				CAPICOM_INFO_SUBJECT_SIMPLE_NAME);
		myform.Certificate.hash = FilteredCertificates.Item(1).Thumbprint;
		myform.Thumprint.value = FilteredCertificates.Item(1).Thumbprint;
	} else {
		//window.alert("vo 2");
		myform.Certificate.value = "";
		myform.Certificate.hash = "";
		myform.Thumprint.value = "";
	}
	FilteredCertificates = null;
	*/
	
	try
	{
		checkInstallPlugin(); 
		var RegCert;
		if (window.XMLHttpRequest)
		{
			RegCert = new XMLHttpRequest;
		}
		else
		{
			RegCert = new ActiveXObject("Microsoft.XMLHTTP");
		}
		RegCert.onreadystatechange = function() {
			if (RegCert.readyState == 4 && RegCert.status == 200)
			{
				var certRawData = RegCert.responseText;
				//alert(certRawData);
				if (certRawData == "")
				{
					var ReqLastErr;	
					if (window.XMLHttpRequest)
					{// code for IE7+, Firefox, Chrome, Opera, Safari
					  ReqLastErr=new XMLHttpRequest();
					}
					else
					{// code for IE6, IE5
					  ReqLastErr=new ActiveXObject("Microsoft.XMLHTTP");
					}
					ReqLastErr.onreadystatechange=function()
					{		
						if (ReqLastErr.readyState==4 && ReqLastErr.status==200)
						{
							process = false;
							//alert("Step in");
							getError(ReqLastErr.responseText);
						}
					}
					ReqLastErr.open("POST","https://127.0.0.1:14409/getLastErr",true);
					ReqLastErr.send();
					document.getElementById('Certificate').value = "";
					document.getElementById('Thumprint').value = "";
					document.getElementById('Certificate').hash = "";
				}
				else
				{
					//get CN
					var ReqCN;	
					if (window.XMLHttpRequest)
					{// code for IE7+, Firefox, Chrome, Opera, Safari
						ReqCN=new XMLHttpRequest();
					}
					else
					{// code for IE6, IE5
						ReqCN=new ActiveXObject("Microsoft.XMLHTTP");
					}
					ReqCN.onreadystatechange=function()
					{		
						if (ReqCN.readyState==4 && ReqCN.status==200)
						{
							document.getElementById('Certificate').value = ReqCN.responseText;
							getThumprint();
							process = false;
						}
					}
					ReqCN.open("POST","https://127.0.0.1:14409/getCertCN",false);
					ReqCN.send();
				}
			}else process = true;
		}
		RegCert.open("POST", "https://127.0.0.1:14409/getCertificate", false);
		RegCert.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		RegCert.send("sessionID=" + hSession);
	}
	catch (e)
	{
		//alert("Error: " + e.description);
	}
}
/*
function FilterCertificates() {
	// Khoi tao cac doi tuong CAPICOM
	var MyStore = new ActiveXObject("CAPICOM.Store");
	var FilteredCertificates = new ActiveXObject("CAPICOM.Certificates");

	// Mo store luu tru chung chi so cua user
	try {
		MyStore.Open(CAPICOM_CURRENT_USER_STORE, "My",
				CAPICOM_STORE_OPEN_READ_ONLY);
	} catch (e) {
		if (e.number != CAPICOM_E_CANCELLED) {
			alert("Co loi khi mo cert-store!!!");
			return false;
		}
	}

	// Tim kiem chung chi so dung de de ky:
	//   * Tim kiem theo thuoc tinh chi ra
	//	* Dieu kien can la phai co Private key tuong ung
	//   * Thoi gian phai hop le
	//MyStore.Certificates.Find(CAPICOM_CERTIFICATE_FIND_KEY_USAGE,CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE).Find(CAPICOM_CERTIFICATE_FIND_TIME_VALID).Find(CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,CERT_KEY_SPEC_PROP_ID);
	var FilteredCertificates = MyStore.Certificates.Find(
			CAPICOM_CERTIFICATE_FIND_EXTENSION, CAPICOM_EKU_CLIENT_AUTH).Find(
			CAPICOM_CERTIFICATE_FIND_TIME_VALID).Find(
			CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY, CERT_KEY_SPEC_PROP_ID);

	return FilteredCertificates;

	MyStore = null;
	FilteredCertificates = null;
}

function FindCertificateByHash(szThumbprint) {
	var MyStore = new ActiveXObject("CAPICOM.Store");
	try {
		MyStore.Open(CAPICOM_CURRENT_USER_STORE, "My",
				CAPICOM_STORE_OPEN_READ_ONLY);
	} catch (e) {
		if (e.number != CAPICOM_E_CANCELLED) {
			alert("An error occurred while opening your personal certificate store, aborting");
			return false;
		}
	}

	var FilteredCertificates = MyStore.Certificates.Find(
			CAPICOM_CERTIFICATE_FIND_SHA1_HASH, szThumbprint);
	return FilteredCertificates.Item(1);

	MyStore = null;
	FilteredCertificates = null;
}
*/
function getThumprint() {
	try
	{
		//get thumprint
		var ReqThumprint;	
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  ReqThumprint=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  ReqThumprint=new ActiveXObject("Microsoft.XMLHTTP");
		}
		ReqThumprint.onreadystatechange=function()
		{		
			if (ReqThumprint.readyState==4 && ReqThumprint.status==200)
			{
				document.getElementById('Thumprint').value=ReqThumprint.responseText;
				document.getElementById('Certificate').hash=document.getElementById('Thumprint').value;
				process = false;
			}
		}
		ReqThumprint.open("POST","https://127.0.0.1:14409/getThumprint",false);
		ReqThumprint.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ReqThumprint.send("sessionID=" + hSession);
	}
	catch(e)
	{
		//alert("Error: " + e.description);
	}
}
/*
function btnSelectCertificate_OnClick(myform) {
	var FilteredCertificates = FilterCertificates();
	if (FilteredCertificates.Count >= 1) {

		try {

			var SelectedCertificate = FilteredCertificates.Select();
			myform.Certificate.value = SelectedCertificate.Item(1).GetInfo(
					CAPICOM_INFO_SUBJECT_SIMPLE_NAME);
			myform.Certificate.hash = SelectedCertificate.Item(1).Thumbprint;
			myform.Certificate.value = SelectedCertificate.Item(1).Export(
					CAPICOM_ENCODE_BASE64);
			myform.Thumprint.value = SelectedCertificate.Item(1).Thumbprint;

		} catch (e) {
			myform.Certificate.value = "";
			myform.Certificate.hash = "";
		}
	} else {
		alert("You have no valid certificates to select from certificate store");
	}

	SelectedCertificate = null;
	FilteredCertificates = null;  
}
*/
function btnSelectCertificate_OnClick_new() {
	//alert("kq hSession 0: "+ hSession);
	try
	{
		if (hSession == "")
		{
			var text ="Quý khách cần cài đặt \"Thư viện ACBSignPlugin\" trước khi xác nhận giao dịch." +
						"\nVui lòng nhấp chọn \"OK\" để tải thư viện và thực hiện cài đặt." +
						"\nĐể được hướng dẫn, Quý khách vui lòng liên hệ Contact Center 24/7 theo số: 1900 54 54 86 - (08) 38 247 247" +
						"\n\n--------------------------------" +
						"\n\nYou need to install \"ACBSignPlugin library\" before confirm the transactions." +
						"\nPlease click \"OK\" and install the library." +
						"\nFor instructions, please call the Contact Center 24/7: 1900 54 54 86 - (08) 38 247 247";
				
			var x = confirm(text);
			if ( x == true) 
			{
				window.open(PLUGIN_PATH, 'acbPlugin');
			}
			//return;
		}
		if(process == true)
			return;
		var ReqCert;	
		//alert(process);
		//alert("kq hSession: "+ hSession);
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  ReqCert=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  ReqCert=new ActiveXObject("Microsoft.XMLHTTP");
		}
		ReqCert.onreadystatechange=function()
		{	
			if (ReqCert.readyState==4 && ReqCert.status==200)
			{
				var certRawData = ReqCert.responseText;
				// check info of certificate
				//alert("kq certRawData 0: "+ certRawData);
				if(certRawData == "")
				{
					//get infomation error
					var ReqLastErr;	
					if (window.XMLHttpRequest)
					{// code for IE7+, Firefox, Chrome, Opera, Safari
					  ReqLastErr=new XMLHttpRequest();
					}
					else
					{// code for IE6, IE5
					  ReqLastErr=new ActiveXObject("Microsoft.XMLHTTP");
					}
					ReqLastErr.onreadystatechange=function()
					{		
						if (ReqLastErr.readyState==4 && ReqLastErr.status==200)
						{
							process = false;
							//alert("Cannot get Certificates");
							//alert("Error code = " + ReqLastErr.responseText);
							getError(ReqLastErr.responseText);
						}
					}
					ReqLastErr.open("POST","https://127.0.0.1:14409/getLastErr",true);
					ReqLastErr.send();
				}
				else 
				{
					document.getElementById('Certificate').value = certRawData;
					getThumprint();
					process = false;
					/*
					//get CN
					var ReqCN;	
					if (window.XMLHttpRequest)
					{// code for IE7+, Firefox, Chrome, Opera, Safari
					  ReqCN=new XMLHttpRequest();
					}
					else
					{// code for IE6, IE5
					  ReqCN=new ActiveXObject("Microsoft.XMLHTTP");
					}
					ReqCN.onreadystatechange=function()
					{		
						if (ReqCN.readyState==4 && ReqCN.status==200) 
						{
							//document.getElementById('Certificate').value = ReqCN.responseText;
							getThumprint();
							process = false;
						}
					}
					ReqCN.open("POST","https://127.0.0.1:14409/getCertCN",false);
					ReqCN.send();
					*/
				}
			}else process = true;
		}
		ReqCert.open("POST","https://127.0.0.1:14409/getCertificate",false);
		ReqCert.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ReqCert.send("sessionID=" + hSession);
	}
	catch (e)
	{
		//alert("Error: " + e.description);
	}
} 
function btnSelectCertificate(myform) {
	/*
	btnSelectCertificate_OnClick(myform);
	var SignedData = new ActiveXObject("CAPICOM.SignedData");
	var Signer = new ActiveXObject("CAPICOM.Signer");
	var TimeAttribute = new ActiveXObject("CAPICOM.Attribute");
	if (myform.Certificate.hash != "")
		return true;
	else
		return false;
	
	*/
	try
	{
		checkInstallPlugin();
		if (hSession == "")
		{
			var xmlhttp;
			var response = "";
			if (window.XMLHttpRequest)
			{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else
			{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function()
			{
				if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
					response=xmlhttp.responseText;
					process = false;
					if (response != "")
					{
						hSession = response;
						//alert("Init Successful");
						return;
					}
				}
			}
			xmlhttp.open("POST","https://127.0.0.1:14409/getSession",true);
			xmlhttp.send();		
		}
		btnSelectCertificate_OnClick_new();
		if (process == true)
			return;
		if (document.getElementById("Certificate").hash != "")
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	catch (e)
	{
		alert("Error: " + e.description);
	}
}

function btnSignedData_OnClick(myform) {
	/*
	btnSelectCertificate_OnClick(myform);
	var SignedData = new ActiveXObject("CAPICOM.SignedData");
	var Signer = new ActiveXObject("CAPICOM.Signer");
	var TimeAttribute = new ActiveXObject("CAPICOM.Attribute");
	//alert(myform.Certificate.hash);
	if (myform.Certificate.hash != "") {

		SignedData.Content = myform.PlainText.value;
		try {
			// dat chung chi dung de ky
			Signer.Certificate = FindCertificateByHash(myform.Certificate.hash);

			// dat thoi gian ky
			var Today = new Date(86400000);
			//var Today = "Sat Apr 26 11:06:32 UTC+0700 2003";
			TimeAttribute.Name = CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME;
			TimeAttribute.Value = Today.getVarDate();
			//alert(TimeAttribute.Value);
			Today = null;
			Signer.AuthenticatedAttributes.Add(TimeAttribute);
			// Ky
			var szSignature = SignedData.Sign(Signer, true,
					CAPICOM_ENCODE_BASE64);
			myform.Signature.value = szSignature;
			//alert(myform.Signature.value );
			return true;
		} catch (e) {
			if (e.number != CAPICOM_E_CANCELLED) {
				alert("Error: " + e.description);
				return false;
			}
		}
	} else {
		alert("No Certificate has been selected.");
		return false;
	}
}
	*/

	try 
	{
		checkInstallPlugin();
		//alert("process 0: " + process);
		//alert("hSession 1: " + hSession);
		btnSelectCertificate_OnClick_new();
		//alert("process 1: " + process);
		if(process == true)
			return;
		if (document.getElementById('Certificate').hash != "")
		{
			var plainText = document.getElementById('PlainText').value;
			if (plainText == "")
			{
				alert ("Vui long nhap van ban de ky");
				return;
			}
			plainText = Base64.encode(plainText);
			var xmlhttp;	
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp.onreadystatechange=function() 
			{
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
				{
					document.getElementById('Signature').value = xmlhttp.responseText;
					if(document.getElementById('Signature').value == "")
					{
						//get infomation error
						var ReqLastErr;	
						if (window.XMLHttpRequest)
						{// code for IE7+, Firefox, Chrome, Opera, Safari
						  ReqLastErr=new XMLHttpRequest();
						}
						else
						{// code for IE6, IE5
						  ReqLastErr=new ActiveXObject("Microsoft.XMLHTTP");
						}
						ReqLastErr.onreadystatechange=function()
						{		
							if (ReqLastErr.readyState==4 && ReqLastErr.status==200)
							{
								process = false;
								//alert("Error code = " +ReqLastErr.responseText);
								getError(ReqLastErr.responseText);
								
							}
						}
						ReqLastErr.open("POST","https://127.0.0.1:14409/getLastErr",true);
						ReqLastErr.send();
					}else 
						process = false;
				}else 
					process = true; 
			}
			xmlhttp.open("POST","https://127.0.0.1:14409/Sign",false);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send("sessionID=" + hSession + "&inData=" + plainText);
			return verifySignature();
		}
	}
	catch (e)
	{
		//alert("Error: " + e.description);
	}
}
function verifySignature()
{
	try 
	{
		if(process == true)
			return;
		var plainText = document.getElementById('PlainText').value;
		var signature = document.getElementById('Signature').value;
		if (signature == "")
		{
			alert("Vui long nhap chu ky");
			return;
		}
		plainText = Base64.encode(plainText);
		var xmlhttp;	
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				var verifySign = xmlhttp.responseText;
				//alert("verifySign : " + verifySign);
				if (verifySign == "")
				{
					//get infomation error
					var ReqLastErr;	
					if (window.XMLHttpRequest)
					{// code for IE7+, Firefox, Chrome, Opera, Safari
						ReqLastErr=new XMLHttpRequest();
					}
					else
					{// code for IE6, IE5
						ReqLastErr=new ActiveXObject("Microsoft.XMLHTTP");
					}
					ReqLastErr.onreadystatechange=function()
					{		
						if (ReqLastErr.readyState==4 && ReqLastErr.status==200)
						{
							process = false;
							result = false;
							//alert("Error code = " +ReqLastErr.responseText);
							getError(ReqLastErr.responseText);
						}
					}
					ReqLastErr.open("POST","https://127.0.0.1:14409/getLastErr",true);
					ReqLastErr.send();
				}else 
					process = false;
					result = true;
			}
			else 
			{
				process = true;
				result = false;
			}
	    }
		xmlhttp.open("POST","https://127.0.0.1:14409/Verify",false);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("sessionID=" + hSession + "&signature=" + signature + "&inData=" + plainText);
		return result;
	}
	catch (e)
	{
		//alert("Error: " + e.description);
	}
}
//Truong hop ky 1 luc nhieu giao dich
function btnSignedMultiData_OnClick(myform) {
	try 
	{
		checkInstallPlugin();
		document.getElementById('SessionCA').value = hSession;
		btnSelectCertificate_OnClick_new();
		if(process == true)
			return;
		if (document.getElementById('Certificate').hash != "")
		{
			var plainText = document.getElementById('PlainText').value;
			if (plainText == "")
			{
				alert ("Vui long nhap van ban de ky");
				return;
			}
			plainText = Base64.encode(plainText);
			var xmlhttp;	
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp.onreadystatechange=function() 
			{
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
				{
					document.getElementById('Signature').value = xmlhttp.responseText;
					if(document.getElementById('Signature').value == "")
					{
						//get infomation error
						var ReqLastErr;	
						if (window.XMLHttpRequest)
						{// code for IE7+, Firefox, Chrome, Opera, Safari
						  ReqLastErr=new XMLHttpRequest();
						}
						else
						{// code for IE6, IE5
						  ReqLastErr=new ActiveXObject("Microsoft.XMLHTTP");
						}
						ReqLastErr.onreadystatechange=function()
						{		
							if (ReqLastErr.readyState==4 && ReqLastErr.status==200)
							{
								process = false;
								//alert("Error code = " +ReqLastErr.responseText);
								getError(ReqLastErr.responseText);
								
							}
						}
						ReqLastErr.open("POST","https://127.0.0.1:14409/getLastErr",true);
						ReqLastErr.send();
					}else 
						process = false;
				}else 
					process = true; 
			}
			xmlhttp.open("POST","https://127.0.0.1:14409/Sign",false);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send("sessionID=" + hSession + "&inData=" + plainText);
			return verifySignature();
		}
	}
	catch (e)
	{
		//alert("Error: " + e.description);
	}
}
function Sign_Data(SHA1_HASH, data)
{
    	
	try
	{
		hSession = document.getElementById('SessionCA').value;
		if(process == true)
			return;
		if (SHA1_HASH != "")
		{
			if (data == "")
			{
				alert ("Vui long nhap van ban de ky");
				return;
			}
			data = Base64.encode(data);
			var xmlhttp;	
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp.onreadystatechange=function() 
			{
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
				{
					document.getElementById('Signature').value = xmlhttp.responseText;
					if(document.getElementById('Signature').value == "")
					{
						//get infomation error
						var ReqLastErr;	
						if (window.XMLHttpRequest)
						{// code for IE7+, Firefox, Chrome, Opera, Safari
						  ReqLastErr=new XMLHttpRequest();
						}
						else
						{// code for IE6, IE5
						  ReqLastErr=new ActiveXObject("Microsoft.XMLHTTP");
						}
						ReqLastErr.onreadystatechange=function()
						{		
							if (ReqLastErr.readyState==4 && ReqLastErr.status==200)
							{
								process = false;
								//alert("Error code = " +ReqLastErr.responseText);
								getError(ReqLastErr.responseText);
								
							}
						}
						ReqLastErr.open("POST","https://127.0.0.1:14409/getLastErr",true);
						ReqLastErr.send();
					}else 
						process = false;
				}else 
					process = true; 
			}
			xmlhttp.open("POST","https://127.0.0.1:14409/Sign",false);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send("sessionID=" + hSession + "&inData=" + data);
			return verifySignData();	
		}
	}
	catch (e)
	{
		//alert("Error: " + e.description);
	}
}
function verifySignData()
{
	try 
	{
		if(process == true)
			return;
		var plainText = document.getElementById('PlainText').value;
		var signature = document.getElementById('Signature').value;
		if (signature == "")
		{
			alert("Vui long nhap chu ky");
			return;
		}
		plainText = Base64.encode(plainText);
		var xmlhttp;	
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				var verifySign = xmlhttp.responseText;
				//alert("verifySign : " + verifySign);
				if (verifySign == "")
				{
					//get infomation error
					var ReqLastErr;	
					if (window.XMLHttpRequest)
					{// code for IE7+, Firefox, Chrome, Opera, Safari
						ReqLastErr=new XMLHttpRequest();
					}
					else
					{// code for IE6, IE5
						ReqLastErr=new ActiveXObject("Microsoft.XMLHTTP");
					}
					ReqLastErr.onreadystatechange=function()
					{		
						if (ReqLastErr.readyState==4 && ReqLastErr.status==200)
						{
							process = false;
							result = false;
							getError(ReqLastErr.responseText);
						}
					}
					ReqLastErr.open("POST","https://127.0.0.1:14409/getLastErr",true);
					ReqLastErr.send();
				}else 
					process = false;
					result = signature;
			}
			else 
			{
				process = true;
				result = false;
			}
	    }
		xmlhttp.open("POST","https://127.0.0.1:14409/Verify",false);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("sessionID=" + hSession + "&signature=" + signature + "&inData=" + plainText);
		return result;
	}
	catch (e)
	{
		//alert("Error: " + e.description);
	}
}