import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IDMScreen } from '../reducers/index';
import { clearAllStates } from '../actions/LoginActions';
import { Navbar, Nav, Icon, Avatar, Dropdown } from 'rsuite';

function NavHeader(props) {
    const dispatch = useDispatch();
	const authScreen = useSelector(IDMScreen);
	const [selectedIndex, setSelectedIndex] = useState('');
	const [message, setMessage] = useState("Subiendo Archivo...");
    const [loader, setLoading] = useState(false);
	const [expand, setExpand ] = useState(false);
    useEffect(() => {
		setSelectedIndex(props.SelectedIndex);
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useLayoutEffect(() => {
        if (typeof refresh === 'object') {
            setLoading(true);
            setMessage('Redirigiendo...');
            setTimeout(() => {
                props.history.push({
                    pathname: '/',
                    state: 'MI DATA de Login',
                    result: () => {
                        dispatch(clearAllStates());
                    }
                })
            }, 2000);
        }
    }, [props.history, dispatch]);
    const style = {
        padding: '18px 20px',
        display: 'inline-block'
    }
    const formatter = (authScreen) => {
		var finalData = [];
		var parentScreen;
		var itemsArray = [];
		var data2 = authScreen.slice();
		for(let i = 0; i < authScreen.length; i++){
			for(let j = 0; j < data2.length; j++){
				if (authScreen[i].ParentScreen === data2[j].ParentScreen) {
					if (data2[j].ParentScreen !== "") {
						var itemsobj = {
							ScreenName: data2[j].ScreenName,
							ChildIcon: data2[j].Icon,
							Tooltip: data2[j].Tooltip,
							ActionUrl: data2[j].ActionUrl,
							ParentScreen: data2[j].ParentScreen
						}
						itemsArray.push(itemsobj)
						data2.splice(j, 1);
					}
				}
			}
			if (authScreen[i].ParentScreen === "") {
				parentScreen = {
					ParentScreen: authScreen[i].ScreenName,
					ParentIcon: authScreen[i].Icon,
					Tooltip: authScreen[i].Tooltip,
					ActionUrlParent: authScreen[i].ActionUrl
				}
			} else {
				parentScreen = {
					items: [],
					ParentScreen: authScreen[i].ParentScreen,
					ParentIcon: authScreen[i].ParentIcon,
					Tooltip: authScreen[i].ParentScreen
				}
			}
			finalData.push(parentScreen);
		}
		for(let i = 0; i < finalData.length; i++){
			for(let j = 0; j < itemsArray.length; j++){
				if (finalData[i].ParentScreen === itemsArray[j].ParentScreen) {
					finalData[i].items.push(itemsArray[j]);
				}
			}
		}
		var aData = Array.from(new Set(finalData.map(x => x.ParentScreen)))
			.map(i => {
				return {
					ParentScreen: i,
					items: finalData.find(x => x.ParentScreen === i).items,
					ParentIcon: finalData.find(x => x.ParentScreen === i).ParentIcon,
					Tooltip: finalData.find(x => x.ParentScreen === i).Tooltip,
					ActionUrlParent: finalData.find(x => x.ParentScreen === i).ActionUrlParent
				}
		});
		return aData;
	}
	const data = formatter(authScreen);
    const onSubmit = (screen) => {
        props.history.push({
            pathname: screen,
        })
    };
    return (
        <Navbar appearance='subtle'>
        {/* <Navbar.Header>
          <a href="#/home" style={style}>Logo</a>
        </Navbar.Header> */}
        <Navbar.Body>
          <Nav>
          {
              data.map((item, index) => {
                  return (
                        item.items === undefined ?
                        <Nav.Item onClick={() => onSubmit(item.ActionUrlParent)}>{item.ParentScreen}</Nav.Item> :
                        <Dropdown title={item.ParentScreen}>
                            <SubItem items={item.items} {...props }/>
                        </Dropdown>
                  );
              })
          }
          </Nav>
          <Nav pullRight>
            <Avatar size="lg" circle src='https://cotemardev.prod.apimanagement.us10.hana.ondemand.com/servimaCF/ServerImage/AuthService.svc/getImageUser/med/20005297/76432' />
            <Nav.Item icon={<Icon icon="cog" />} ></Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
}
const SubItem = (props) => {
	const onSubmit = (screen) => {
        props.history.push({
            pathname: screen,
        })
    };
	return(
		<>
			{props.items !== undefined ? 
				props.items.map((subItem, i) => {
					return (
						<Dropdown.Item onClick={() => onSubmit(subItem.ActionUrl)}>
							{subItem.ScreenName}
						</Dropdown.Item>
					) 
			}) 
			: <></>}
		</>
	);
}

export default NavHeader;