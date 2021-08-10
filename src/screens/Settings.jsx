import React from 'react';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import NavHeader from '../components/NavHeader';
import { Button, Panel, FlexboxGrid, Container, Content, Header } from 'rsuite';
import data from '../consts/dataTable';

function Settings(props) {
    // const bodyRows = (rowCount) => {
    //     var body = []
    //     for (let i = 0; i < rowCount.length; i++) {
    //         body.push({
    //             Id: rowCount[i].Id,
    //             descripcion: rowCount[i].descripcion
    //         })
    //     }
    //     // console.log(body)
    //     return body
    // }
    const exportPdf = () => {
        var doc = new jsPDF('landscape', 'pt', 'tabloid');
        var columns = [{
            title: 'No',
            dataKey: 'id'
        }, {
            title: 'No. Colli',
            dataKey: 'NoColli'
        }, {
            title: 'Weight (kg)',
            dataKey: 'Weight'
        }, {
            title: 'No. StarIps',
            dataKey: 'StarIps'
        }, {
            title: 'PO No.',
            dataKey: 'SAPPO'
        }, {
            title: 'Line',
            dataKey: 'NoItem'
        }, {
            title: 'Qty',
            dataKey: 'Qty'
        }, {
            title: 'UM',
            dataKey: 'UM'
        }, {
            title: 'Decription',
            dataKey: 'Descripcion'
        }, {
            title: 'Material Code',
            dataKey: 'MaterialCode'
        }, {
            title: 'Tariff Code',
            dataKey: 'TariffCode'
        }, {
            title: 'Country of Origin	',
            dataKey: 'Country'
        }, {
            title: 'USD Cost',
            dataKey: 'USDCost'
        }, {
            title: 'Total USD Cost',
            dataKey: 'TotalUSDCost'
        }];
        var columnsKit = [{
            header: 'Kit',
            dataKey: 'Id'
        }, {
            header: 'Description',
            dataKey: 'descripcion'
        }, {
            title: 'Quantity',
            dataKey: 'cantidad'
        }, {
            title: 'UM',
            dataKey: 'unit'
        }, {
            title: 'Cost per Unit',
            dataKey: 'costo'
        }, {
            title: 'Currency',
            dataKey: 'currency'
        }, {
            title: 'Country of Origin',
            dataKey: 'paisorigenName'
        }, {
            title: 'Total Cost',
            dataKey: 'costoTotal'
        }];
        var y = 0;
        var options = {
            startY: 200,
            // margin: {
            //     horizontal: 15,
            //     top: 190
            // },
            // bodyStyles: {
            //     valign: 'top'
            // },
            // columnStyles: {
            //     overflow: 'linebreak',
            //     fontSize: 12,
            //     tableWidth: 'auto',
            //     columnWidth: 'auto',
            // },
            // headStyles: {
            //     halign: 'center',
            //     text: {
            //         minCellWidth: 'wrap'
            //     }
            // },
            theme: 'grid',
            didDrawCell: function (row, data) {
                // debugger
                y = row.cursor.y + 23;
            }
        };
        var optionsKit = {
            startY: y,
            // margin: {
            //     horizontal: 15,
            //     top: 190
            // },
            // bodyStyles: {
            //     valign: 'top'
            // },
            // columnStyles: {
            //     overflow: 'linebreak',
            //     fontSize: 12,
            //     tableWidth: 'auto',
            //     columnWidth: 'auto',
            // },
            // headStyles: {
            //     halign: 'center',
            //     text: {
            //         minCellWidth: 'wrap'
            //     },
            //     fillColor : [51,162,255]
            // },
            theme: 'striped',
            didDrawCell: function (row, data) {
                y = row.cursor.y + 23;

            }
        };
        
        // var options = {
        //     startY: 20,
        //     columnStyles: { 
        //         0: { 
        //             halign: 'center',
        //             minCellHeight: '150',
        //         }, 
        //     },
        //     theme: 'grid',
        //     didDrawCell: function (data) {
        //         if (data.row.section === 'body') {
        //             if(data.column.dataKey === 'Kit') {
        //                 if(data.cell.raw.length > 0) {
        //                     doc.autoTable({
        //                         startY: data.cell.y + 2,
        //                         margin: { left: data.cell.x + 2 },
        //                         tableWidth: data.cell.width - 4,
        //                         styles: {
        //                             maxCellHeight: 5,
        //                         },
        //                         minCellHeight: '150',
        //                         columns: columnsKit,
        //                         body: bodyRows(data.cell.raw),
        //                     })
        //                 }
        //             }
        //         }
        //     },
        // };
        // debugger
        var oDataNew = [];
        for (var i = 0; i < data.length; i++) {
            var v = [];
            v[0] = data[i];
            if (i === 0) {
                y = 200;
                if (v[0].Kit.length === 0) {
                    oDataNew.push(v[0]);
                    if (i === data.length - 1) {
                        doc.autoTable(columns, oDataNew, options);
                    }
                } else {
                    doc.autoTable(columns, v, options);
                }
            } else {
                if (v[0].Kit.length === 0) {
                    oDataNew.push(v[0]);
                    if (i === data.length - 1) {
                        options.startY = y;
                        doc.autoTable(columns, oDataNew, options);
                    }
                } else {
                    oDataNew.push(v[0]);
                    if (oDataNew.length > 0 && v[0].Kit.length > 0) {
                        options.startY = y;
                        doc.autoTable(columns, oDataNew, options);
                        oDataNew = [];
                    } else {
                        options.startY = y;
                        doc.autoTable(columns, v, options);
                    }

                }
            }
            if (oDataNew.length > 0 && v[0].Kit.length > 0) {
                options.startY = y;
                doc.autoTable(columns, oDataNew, options);
                oDataNew = [];
            }

            if (v[0].Kit != null && v[0].Kit !== "") {
                var p = [];
                p = v[0].Kit;
                optionsKit.startY = y;
                doc.autoTable(columnsKit, p, optionsKit);
            }
        }

        doc.save('sampleTable.pdf')
    }
    return (
        <div>
         <Container>
            <Header>
                <NavHeader SelectedIndex={props.history.location.pathname} {...props}/>
            </Header>
            <Content>
            <FlexboxGrid style={{marginTop: '8%'}} justify="space-around">
                <Panel bordered header="Export pdf">
                    <Button color="violet" onClick={exportPdf} >
                        Click Me!!
                    </Button>
                </Panel>
            </FlexboxGrid>
            </Content>
         </Container>
        </div>
    )
}

export default Settings
