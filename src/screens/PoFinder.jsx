import React, { useState } from 'react';
import { Button, Panel, Input, FlexboxGrid, Table, Container} from 'rsuite';
import axios from 'axios';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import NavMenu from '../components/NavMenu';
import { useSelector } from 'react-redux'

function PoFinder(props) {
	const authData = useSelector(state => state.Auth);
	console.log(authData)
    const [nameApp, setnameApp] = useState('');
	const [screen, setScreen] = useState([]);
	const [loading, setLoading] = useState(false);
    const { Column, HeaderCell, Cell } = Table;

    function createHeaders(keys) {
		var result = [];
		for (var i = 0; i < keys.length; i += 1) {
		  result.push({
			id: keys[i],
			name: keys[i],
			prompt: keys[i],
			width: 65,
			align: "center",
			padding: 0
		  });
		}
		return result;
	}

    async function getToken(){
		var url = process.env.REACT_APP_API_ULR_IDM+ "/Authenticate";
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

    async function getApp(){
		setLoading(true);
		var token = await getToken();
		var url = process.env.REACT_APP_API_ULR_IDM+"/Screens/GetScreenByNameApplication";
		const resp = await axios.get(url, {
			headers: {
				'Authorization' : 'Bearer ' + token.access_token,
				'Content-Type': 'application/json',
			},
			params: {
				NameApplication: nameApp
			}
		}).then(function (response) {
			setLoading(false);
			return response;
		})
		.catch(function (error) {
			setLoading(false);
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
			setScreen(array)
			return array;
		}else {
			alert(resp);
		}
	}
    function donwloadXsls(){
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const ws = XLSX.utils.json_to_sheet(screen);
        const wb = { Sheets: { data: ws }, SheetNames: ["screen"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, 'Demo' + fileExtension);
    }
    function donwloadPDF(){
		var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
		var header = createHeaders(['ActionUrl', 'ScreenId', 'ScreenName', 'Tooltip']);
		// var anotherHeader = ['ActionUrl', 'ScreenId', 'ScreenName', 'Tooltip'];
		doc.table(1, 1, screen, header, { headerBackgroundColor: '#aaadee'});
		doc.addPage("a6", "l");
		doc.text("Do you like that?", 20, 20);
		doc.save("a4.pdf");
	}
    const width = {
		width: '20%'
	}
    return (
        <div style={{display: 'flex'}}>
			<NavMenu SelectedIndex={props.history.location.pathname} />
			<Container>
				<FlexboxGrid style={{marginTop: '8%'}} justify="space-around">
					<Panel style={width} bordered header="Get Screens by App Name">
						<Input type='text' value={nameApp} onChange={(e) => setnameApp(e)} size="md" placeholder="Name application"/>
						<Button style={{marginTop: '4.5%'}} color="violet" onClick={getApp}>
							Click Me!!
						</Button>
					</Panel>
					<Panel bordered header="Dowloads and upload">
						<Button color="green" onClick={donwloadXsls}>Download xls</Button>
						<Button color="red" onClick={donwloadPDF}>Download pdf</Button>
					</Panel>
				</FlexboxGrid>
				<Table id="tableScreen" loading={loading} height={400} data={screen}>
					<Column width={70} align="center" fixed>
						<HeaderCell>Id</HeaderCell>
						<Cell dataKey="ScreenId" />
					</Column>
					<Column width={200} align="center">
						<HeaderCell>Screen Name</HeaderCell>
						<Cell dataKey="ScreenName" />
					</Column>
					<Column width={200} align="center">
						<HeaderCell>Tooltip</HeaderCell>
						<Cell dataKey="Tooltip" />
					</Column>
					<Column width={200} align="center">
						<HeaderCell>Action Url</HeaderCell>
						<Cell dataKey="ActionUrl" />
					</Column>
				</Table>
			</Container>
        </div>
    )
}

export default PoFinder
