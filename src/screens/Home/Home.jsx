import React, { useState } from 'react';
import { Button, Panel, FlexboxGrid, Uploader, Tag, TagGroup, Container, Content, Header } from 'rsuite';
import axios from 'axios';
import NavHeader from '../../components/NavHeader';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useTranslation } from "react-i18next";

function Home(props) {
	const { t, i18n } = useTranslation()

     const changeLanguageHandler = (lang) =>
     {
       i18n.changeLanguage(lang)
     }
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState('');
	const fileList = [
		{
		  name: 'a.png',
		  fileKey: 1,
		  url: 'https://cibstorage.blob.core.windows.net/files/a4 (8).pdf',
          other: [
              {
                  id: 1,
                  name: 'horacio',
                  lastName: 'borja'
              },{
                id: 2,
                name: 'horacio1',
                lastName: 'borja1'
            },{
                id: 3,
                name: 'horacio2',
                lastName: 'borja2'
            },
          ]
		},
		{
		  name: 'b.png',
		  fileKey: 2,
		  url: 'https://cibstorage.blob.core.windows.net/files/a4 (5).pdf',
          other: [
            {
                id: 3,
                name: 'horacio',
                lastName: 'borja'
            },{
              id: 4,
              name: 'horacio1',
              lastName: 'borja1'
          },{
              id: 5,
              name: 'horacio2',
              lastName: 'borja2'
          },
        ]
		}
	  ];
	async function handleUpload(e){
		const formData = new FormData();
		formData.append('files', e.blobFile);
		formData.append('Vesselid', 7410);
		formData.append('Filename', e.name);
		await insFile(formData);
	}
	function renderFiles(file, fileElement){
		return (
			<TagGroup>
				<Tag>File Name: {file.name}</Tag>
				<Tag>File URL: <a target="_blank" href={file.url}>{file.url}</a></Tag>
			</TagGroup>
		);
	}
	async function getToken(){
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
			setToken(res.data.access_token);
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
			setLoading(false);
			return response;
		})
		.catch(function (error) {
			setLoading(false);
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
			setLoading(false);
			return response;
		})
		.catch(function (error) {
			setLoading(false);
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
	const width = {
		width: '20%'
	}
	const data = {
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [
		  {
			label: '# of Votes11',
			data: [12, 22, 3, 5, 2, 3],
			backgroundColor: [
			  'rgba(255, 99, 132, 0.2)',
			  'rgba(54, 162, 235, 0.2)',
			  'rgba(255, 206, 86, 0.2)',
			  'rgba(75, 192, 192, 0.2)',
			  'rgba(153, 102, 255, 0.2)',
			  'rgba(255, 159, 64, 0.2)',
			],
			borderColor: [
			  'rgba(255, 99, 132, 1)',
			  'rgba(54, 162, 235, 1)',
			  'rgba(255, 206, 86, 1)',
			  'rgba(75, 192, 192, 1)',
			  'rgba(153, 102, 255, 1)',
			  'rgba(255, 159, 64, 1)',
			],
			borderWidth: 1,
		  },
		],
	};
	const options = {
		scales: {
		  yAxes: [
			{
			  ticks: {
				beginAtZero: true,
			  },
			},
		  ],
		},
	};
	const data1 = {
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [
		  {
			label: '# of Votes',
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
			  'rgba(255, 99, 132, 0.2)',
			  'rgba(54, 162, 235, 0.2)',
			  'rgba(255, 206, 86, 0.2)',
			  'rgba(75, 192, 192, 0.2)',
			  'rgba(153, 102, 255, 0.2)',
			  'rgba(255, 159, 64, 0.2)',
			],
			borderColor: [
			  'rgba(255, 99, 132, 1)',
			  'rgba(54, 162, 235, 1)',
			  'rgba(255, 206, 86, 1)',
			  'rgba(75, 192, 192, 1)',
			  'rgba(153, 102, 255, 1)',
			  'rgba(255, 159, 64, 1)',
			],
			borderWidth: 1,
		  },
		],
	};
	return (
		<div style={{display: 'flex'}}>
			<Container>
				<Header>
					<NavHeader SelectedIndex={props.history.location.pathname} {...props}/>
				</Header>
				<Content>
					<FlexboxGrid style={{marginTop: '8%'}} justify="space-around">
						<Panel bordered header="Dowloads and upload">
							<FlexboxGrid justify='space-around' align='top'>
								<Uploader defaultFileList={fileList} shouldUpload={handleUpload} renderFileInfo={renderFiles}>
									<Button loading={loading}>Upload via async check</Button>
								</Uploader>
							</FlexboxGrid>
						</Panel>
						<Panel style={width} bordered header="Insert Log UNUS (POST)">
							<Button color="violet" onClick={insApp}>
								Click Me!!
							</Button>
						</Panel>
						<Panel style={width} bordered header="Update Poreception (PUT)">
							<Button color="violet" onClick={uptPoreception}>
								Click Me!!
							</Button>
						</Panel>
						<Panel style={width} bordered header="Delete Discrepancy Proforma (DELETE)">
							<Button color="violet" onClick={delDiscrepancyProf}>
								Click Me!!
							</Button>
						</Panel>
						<Panel style={width} bordered header="Change Language">
							<Button onClick={() => changeLanguageHandler('es')}>
								Spanish
							</Button>
							<Button onClick={() => changeLanguageHandler('en')}>
								English
							</Button>
						</Panel>
					</FlexboxGrid>
					<FlexboxGrid align='middle' justify='space-around' >
						<div style={{width: '50%', padding: '2rem'}}>
							<h1>Vertical Bar Chart</h1>
							<Bar data={data} options={options} />
						</div>
						<div style={{width: '50%', padding: '2rem'}}>
							<h1 className='title'>Doughnut Chart</h1>
							<h1>{t('Welcome to React')}</h1>
							<Doughnut data={data} />
						</div>
					</FlexboxGrid>
				</Content>
			</Container>
		</div>
	);
}
export default Home;