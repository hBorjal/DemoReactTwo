import React, { useState, useRef } from 'react';
import { Button, Panel, FlexboxGrid, Table, Whisper, Tooltip, Form, FormGroup, FormControl, Container, Header } from 'rsuite';
import axios from 'axios';
import NavMenu from '../components/NavMenu';
import NavHeader from '../components/NavHeader';

const Reports = (props) => {
    const [data, setData] = useState([]);
    const [val, setVal] = useState(undefined);
    const [search, setSearch] = useState(undefined);

    const formRef = useRef();
    const handleVal = (e) => setVal(e);
    const handleSearch = e => setSearch(e);
    const handleSubmite = async (e) => {
        if(e) {
            const data = `
            <root>
            <StatementName>
            <storedProcedureName action="EXECUTE">
            <table>st_InsUpdEmpresa</table>
                <EmpresaId type="INTEGER">${val.EmpresaId}</EmpresaId>
                <CodigoEmpresa type="STRING">${val.CodigoEmpresa}</CodigoEmpresa>
                <ClaveEmpresa type="STRING">${val.ClaveEmpresa}</ClaveEmpresa>
                <PrefijoFuncion type="STRING">${val.Prefijo}</PrefijoFuncion>
                <Nombre type="STRING">${val.Nombre}</Nombre>
                <Telefono type="STRING">${val.Telefono}</Telefono>
                <RFC type="STRING">${val.RFC}</RFC>
                <CURP type="STRING">${val.Curp}</CURP>
                <CalleYNum type="STRING">${val.CalleYNum}</CalleYNum>
                <Numero type="STRING">${val.Numero}</Numero>
                <Colonia type="STRING">${val.Colonia}</Colonia>
                <CodigoPostal type="STRING">${val.CodigoPostal}</CodigoPostal>
            </storedProcedureName >
            </StatementName>
            </root>`
            await insToCPI(data);
            // formRef.current._reactInternals.child.stateNode.reset();
            // formRef.current.state.formValue = null
        }
    }

    const handleSubSearch = async (e)=>{
        const data = `
		<root>
        <StatementName>
        <storedProcedureName action="EXECUTE">
        <table>st_paginadorEmpresa</table>
        <InitialRow type="INTEGER">0</InitialRow>
        <RowsRetrieve type="INTEGER">10</RowsRetrieve>
        <Nombre type="STRING">${search.Nombre}</Nombre>
        <ClaveEmpresa type="STRING"></ClaveEmpresa>
        <SortColumn type="STRING">Nombre</SortColumn>
        <SortOrder type="STRING">ASC</SortOrder>
        </storedProcedureName >
        </StatementName>
        </root>`
        await paginationCPI(data);
    }

    // const { StringType, NumberType } = Schema.Types;
    // const model = Schema.Model({
    //     username: StringType().isRequired('This field is required.'),
    //     password: StringType().isRequired('This field is required.')
    // });

    const { Column, HeaderCell, Cell } = Table;

    // async function getTokenXCsrf(){
	// 	var url = 'https://cotemardev.prod.apimanagement.us10.hana.ondemand.com/cpi2/demoaseinser/sp';
	// 	const data = `
	// 	<root>
	// 		<StatementName>
	// 		<storedProcedureName action="EXECUTE">
	// 		<table>demoSP</table>
	// 		</storedProcedureName>
	// 		</StatementName>
	// 	</root>`
	// 	const resp = await axios.post(url,data,{
    //         headers: {
	// 			'Authorization': 'Basic ' + btoa('S0021819150:..@Valir10'),
    //             'Content-Type': 'application/xml',
	// 			// 'APIKey': '5RCnbMSL5GCq1j7S0JACd6UgSErV1qr4'
    //         }
    //       }).then(function (response) {
	// 		return response;
	// 	})
	// 	.catch(function (error) {
	// 		return error;
	// 	  });
	// 	console.log(resp);
	// }
    async function insToCPI(data){
        var url = 'https://cotemardev.prod.apimanagement.us10.hana.ondemand.com/cpi2/demoaseinser/sp';
		const resp = await axios.post(url,data,{
            headers: {
				'Authorization': 'Basic ' + btoa('S0021819150:..@Valir10'),
                'Content-Type': 'application/xml',
				'APIKey': '5RCnbMSL5GCq1j7S0JACd6UgSErV1qr4'
            }
        })
        .then(function (response) {
			return response.data.root.StatementName_response.response_1.row.Mensaje;
		})
		.catch(function (error) {
			return error;
		});
		alert(resp);
    }
    async function DeleteRegister(){
        var url = 'https://cotemardev.prod.apimanagement.us10.hana.ondemand.com/cpi2/demoaseinser/sp';
		const data = `
		<root>
        <StatementName>
        <storedProcedureName action="EXECUTE">
        <table>st_DelEmpresa</table>
        <EmpresaId type="INTEGER">2</EmpresaId>
        </storedProcedureName >
        </StatementName>
        </root>`
		const resp = await axios.post(url,data,{
            headers: {
				'Authorization': 'Basic ' + btoa('S0021819150:..@Valir10'),
                'Content-Type': 'application/xml',
				'APIKey': '5RCnbMSL5GCq1j7S0JACd6UgSErV1qr4'
            }
        })
        .then(function (response) {
			return response.data.root.StatementName_response;
		})
		.catch(function (error) {
			return error;
		});
        console.log(resp)
    }
    async function paginationCPI(data){
        var url = 'https://cotemardev.prod.apimanagement.us10.hana.ondemand.com/cpi2/demoaseinser/sp';
		const resp = await axios.post(url,data,{
            headers: {
				'Authorization': 'Basic ' + btoa('S0021819150:..@Valir10'),
                'Content-Type': 'application/xml',
				'APIKey': '5RCnbMSL5GCq1j7S0JACd6UgSErV1qr4'
            }
        })
        .then(function (response) {
			return response.data.root.StatementName_response.response_1.row;
		})
		.catch(function (error) {
			return error;
		});
        setData(resp.length === undefined ? [resp] : resp);
        console.log(resp)
    }
    // const styles = {
    //     width: 300,
    //     marginBottom: 10
    // };
    
    const styleInput = {
        width: '10rem',
        marginBottom: '1rem',
        marginRight: '1rem'
    }

    return (
        <div style={{display: 'flex'}}>
            {/* <NavMenu SelectedIndex={props.history.location.pathname}/> */}
            <Container>
                <Header>
					<NavHeader SelectedIndex={props.history.location.pathname} {...props}/>
				</Header>
                <FlexboxGrid justify="space-around">
                    <Panel bordered header="Delete register">
                        <Button onClick={DeleteRegister}>Delete</Button>
                    </Panel>
                    <Panel bordered header="Get by name">
                        <Form onChange={handleSearch} onSubmit={handleSubSearch} ref={formRef}>
                            <FormGroup>
                                <FormControl name='Nombre' placeholder='Search...'/>
                            </FormGroup>
                            <Button type='submit'>Searh</Button>
                        </Form>
                    </Panel>
                    <Panel bordered header="Insert to DB for CPI">
                        <Form onChange={handleVal} onSubmit={handleSubmite} ref={formRef}>
                            <FormGroup >
                                <Whisper trigger="focus" speaker={<Tooltip>Required</Tooltip>}>
                                    <FormControl style={styleInput} name="EmpresaId" type='number' placeholder="EmpresaId" />
                                </Whisper>
                                <FormControl style={styleInput} name="Nombre" placeholder="Nombre" />
                                <FormControl style={styleInput} name="Prefijo" placeholder="Prefijo Funcion" />
                                <FormControl style={styleInput} name="Numero" placeholder="Numero" />
                            </FormGroup>
                            <FormGroup>
                                <FormControl style={styleInput} name="RFC" placeholder="RFC" />
                                <FormControl style={styleInput} name="Curp" placeholder="Curp" />
                                <FormControl style={styleInput} name="CalleYNum" placeholder="Calle y Num" />
                                <FormControl style={styleInput} name="ClaveEmpresa" placeholder="Clave Empresa" />
                            </FormGroup>
                            <FormGroup>
                                <FormControl style={styleInput} name="CodigoEmpresa" placeholder="Codigo Empresa" />
                                <FormControl style={styleInput} name="CodigoPostal" placeholder="Codigo Postal" />
                                <FormControl style={styleInput} name="Colonia" placeholder="Colonia" />
                                <FormControl style={styleInput} name="Telefono" placeholder="Telefono" />
                            </FormGroup>
                            <Button appearance="primary" type="submit">Insert</Button>
                        </Form>
                    </Panel>
                </FlexboxGrid>
                    <Table height={400} data={data}>
                        <Column width={80} align="center" fixed>
                            <HeaderCell>EmpresaId</HeaderCell>
                            <Cell dataKey="EmpresaId" />
                        </Column>
                        <Column width={80} align="center">
                            <HeaderCell>Nombre</HeaderCell>
                            <Cell dataKey="Nombre" />
                        </Column>
                        <Column width={80} align="center">
                            <HeaderCell>Numero</HeaderCell>
                            <Cell dataKey="Numero" />
                        </Column>
                        <Column width={80} align="center">
                            <HeaderCell>Prefijo Funcion</HeaderCell>
                            <Cell dataKey="PrefijoFuncion" />
                        </Column>
                        <Column width={80} align="center">
                            <HeaderCell>RFC</HeaderCell>
                            <Cell dataKey="RFC" />
                        </Column>
                        <Column width={80} align="center">
                            <HeaderCell>CURP</HeaderCell>
                            <Cell dataKey="CURP" />
                        </Column>
                        <Column width={80} align="center">
                            <HeaderCell>Calle Y Num</HeaderCell>
                            <Cell dataKey="CalleYNum" />
                        </Column>
                        <Column width={80} align="center">
                            <HeaderCell>Clave Empresa</HeaderCell>
                            <Cell dataKey="ClaveEmpresa" />
                        </Column>
                        <Column width={80} align="center">
                            <HeaderCell>Codigo Empresa</HeaderCell>
                            <Cell dataKey="CodigoEmpresa" />
                        </Column>
                        <Column width={80} align="center">
                            <HeaderCell>Codigo Postal</HeaderCell>
                            <Cell dataKey="CodigoPostal" />
                        </Column>
                        <Column width={80} align="center">
                            <HeaderCell>Colonia</HeaderCell>
                            <Cell dataKey="Colonia" />
                        </Column>
                        <Column width={80} align="center">
                            <HeaderCell>Telefono</HeaderCell>
                            <Cell dataKey="Telefono" />
                        </Column>
                    </Table>
            </Container>
        </div>
    )
}
export default Reports