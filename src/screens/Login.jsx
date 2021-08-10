import React, { useState, useRef } from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import PropTypes from 'prop-types';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import axios from 'axios';
import { Form, FormGroup, FormControl, Toggle, Button, Schema } from 'rsuite';
import BtnLoginContainer from '../containers/BtnLoginContainer/BtnLoginContainer';

import Auth from '../config/auth';

export function Login(props){
    const [val, setVal] = useState(undefined);
    const [check, setCheck] = useState(false);
    const formRef = useRef();
    const handleVal = (e) => setVal(e)
    const handleChecked = (e) => setCheck(e);
    const handleSubmite = async (e, authLogin) => {
        authLogin({
            "Username" : val.username,
            "Password" : "M3FNaWpab3ErR1U9",
            "Grant_type" : "password",
            "TypeCredential" : check ? 1 : 0,
            "AppName" : "IDM",
            "AppNameSecurity" : "IDM"
        })
    }
    const { StringType } = Schema.Types;
    const model = Schema.Model({
        username: StringType().isRequired('This field is required.'),
        password: StringType().isRequired('This field is required.')
    });
    return (
        <div style={{flexDirection: 'row', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
            {/* <div style={{width: '50%'}}>
                <Carousel autoPlay={true} showStatus={false} showArrows={false} infiniteLoop={true} showIndicators={false} showThumbs={false}>
                    <div>
                        <img alt="" src="https://serverimagesync.blob.core.windows.net/logos/General/Carrusel1.jpg"/>
                    </div>
                    <div>
                        <img alt="" src="https://serverimagesync.blob.core.windows.net/logos/General/Carrusel2.jpg"/>
                    </div>
                    <div>
                        <img alt="" src="https://serverimagesync.blob.core.windows.net/logos/General/Carrusel3.jpg"/>
                    </div>
                </Carousel>
            </div> */}
            <div style={{paddingTop: '15rem'}}>
                <div>
                    <img alt="" style={{width: '25rem'}} src="https://serverimagesync.blob.core.windows.net/logos/General/LogoCotemarHorizontalAzul.png"/>  
                </div>
                <div style={{paddingTop: '4rem'}}>
                    <Auth>
                        {(params) => {
                            return <BtnLoginContainer history={props.history} login={params.logIn}>
                                {
                                    (auth) => {
                                        return(
                                            <Form fluid model={model} onChange={handleVal} onSubmit={(e) => handleSubmite(e, auth.submit)} ref={formRef}>
                                                <FormGroup >
                                                    <FormControl name="username" placeholder="User Name" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControl name="password" type="password" placeholder="Password" />
                                                </FormGroup>
                                                <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                                                    <Toggle checked={check} onChange={handleChecked} checkedChildren="Active Directory" unCheckedChildren="Classic" />
                                                    <Button appearance="primary" type="submit">{auth.isLoading ? 'CARGANDO...' : 'ENTRAR'}</Button>
                                                </div>
                                            </Form>
                                        )
                                    }
                                }
                            </BtnLoginContainer>
                        }}
                    </Auth>
                </div>
            </div>
        </div>
    );
}