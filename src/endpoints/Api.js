import axios from 'axios';

export async function getToken(){
    var url = process.env.REACT_APP_API_ULR_IDM+ "Authenticate";
    var obj = {
        "Username" : "hborjal",
        "Password" : "M3FNaWpab3ErR1U9",
        "Grant_type" : "password",
        "TypeCredential" : "0",
        "AppName" : "IDM",
        "AppNameSecurity" : "IDM"
    };
    const res = await axios.post(url,JSON.stringify(obj),{
            headers: {
                'Content-Type': 'application/json',
                'APIKey': '5RCnbMSL5GCq1j7S0JACd6UgSErV1qr4'
          }})
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    })
    if(res.status === 200) {
        return res.data;
    }else {
        alert(res)
    }
}

export async function getApp(nameApp){
    var token = await getToken();
    var url = process.env.REACT_APP_API_ULR_IDM+"Screens/GetScreenByNameApplication";
    const resp = await axios.get(url, {
        headers: {
            'Authorization' : 'Bearer ' + token.access_token,
            'Content-Type': 'application/json',
        },
        params: {
            NameApplication: 'CIB'
        }
    }).then(function (response) {
        return response;
    })
    .catch(function (error) {
        return error;
      });
    if(resp.status === 200) {
        var array = [];
        var obj = {};
        for (let i = 0; i < resp.data.length; i++) {
            obj = {
                ScreenId: resp.data[i].ScreenId.toString(),
                ScreenName: resp.data[i].ScreenName,
                Tooltip: resp.data[i].Tooltip,
                ActionUrl: resp.data[i].ActionUrl
            }
            array.push(obj);
        }
        return array;
    }else {
        alert(resp);
    }
}

export function Api(){
    
	async function getTokenCIB(){
		var url = process.env.REACT_APP_API_ULR_IDM + "Authenticate";
		var obj = {
			"Username" : "hborjal",
			"Password" : "M3FNaWpab3ErR1U9",
			"Grant_type" : "password",
			"TypeCredential" : "0",
			"AppName" : "CIB",
			"AppNameSecurity" : "CIB"
		};
		const res = await axios.post(url,JSON.stringify(obj),{
				headers: {
					'Content-Type': 'application/json',
			  }})
		.then(response => {
            return response;
        })
        .catch(error => {
            return error;
        })
		if(res.status === 200) {
			return res.data;
		}else {
			alert(res)
		}
	}
	
	async function uptPoreception(){
		var token = await getTokenCIB();
		var url = process.env.REACT_APP_API_ULR_IDM + "poreception";
		var obj = [{"Ebeln":"50469549","EstatusPedidoId":3}];
		const resp = await axios.put(url, JSON.stringify(obj),{
			headers: {
				'Authorization' : 'Bearer ' + token.access_token,
				'Content-Type': 'application/json',
			}
		}).then(function (response) {
			return response;
		})
		.catch(function (error) {
			return error;
		  });
		if(resp.status === 200) {
			alert('Successfully saved');
		}else {
			alert(resp);
		}
	}
	async function insFile(formData){
		var token = await getTokenCIB();
		var url = `${process.env.REACT_APP_API_ULR_CIB}vesselfile/InsUpdVesselFile`;
		const resp = await axios({
			method: "put",
			url: url,
			data: formData,
			headers: {
				'Authorization' : 'Bearer ' + token.access_token,
				"Content-Type": "multipart/form-data",
			},
		})
		.then(function (response) {
			console.log(response)
			return response;
		})
		.catch(function (error) {
			return error;
		  });
		if(resp.status === 200) {
			alert('Successfully saved');
		}else {
			alert(resp);
		}
	}
	async function delDiscrepancyProf(){
		var token = await getTokenCIB();
		var url = process.env.REACT_APP_API_ULR_IDM + "discrepancycommentsorder/4";
		const resp = await axios.delete(url, {
			headers: {
				'Authorization' : 'Bearer ' + token.access_token,
				'Content-Type': 'application/json',
			}
		}).then(function (response) {
			return response;
		})
		.catch(function (error) {
			return error;
		  });
		if(resp.status === 200) {
			alert('Record deleted');
		}else {
			alert(resp);
		}
	}
	async function insApp(){
		var token = await getToken();
		var url = process.env.REACT_APP_API_ULR_IDM + "Log/CreateLogUnusSync";
		var obj = {
			Application: "Demo React",
			Module: "Module One",
			Action: "Ninguna",
			RecordStatus: 0,
			ErrorCode: "",
			StackTrace: "",
			Message: "",
			Mis1: "",
			Mis2: ""
		}
		const resp = await axios.post(url, JSON.stringify(obj),{
			headers: {
				'Authorization' : 'Bearer ' + token.access_token,
				'Content-Type': 'application/json',
		  }})
		.then(response => {
			return response;
		})
		.catch(error => {
			return error;
		})
		if(resp.status === 200) {
			alert('Successfully saved');
		}else {
			alert(resp);
		}
	}
}