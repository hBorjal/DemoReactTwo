import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Link} from "react-router-dom";
import { clearAllStates } from '../actions/LoginActions';
import { FlexboxGrid, Icon, Dropdown, Button } from 'rsuite';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import 'rsuite/dist/styles/rsuite-default.css';
import { IDMScreen } from '../reducers/index';


function NavMenu(props) {
	// debugger
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

	// eslint-disable-next-line react-hooks/exhaustive-deps
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
    });
	const onSubmit = (screen) => {
        props.history.push({
            pathname: screen,
        })
    };
	function handleToggle() {
		setExpand(!expand)
	}
	const headerStyles = {
		fontSize: 16,
		background: '#1361aa',
	};
	const iconStyles = {
		width: 56,
		height: 56,
		lineHeight: '56px',
		textAlign: 'center',
		background: 'transparent'
	};
	const styles = {
		width: '20rem',
	};

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

	return(
		<ProSidebar style={{ display: 'flex', flexDirection: 'column' }} collapsed={expand}>
			<SidebarHeader>
				<h3>Header</h3>
				{/* <Button onClick={handleToggle}>
					<Icon style={iconStyles} icon={expand ? 'angle-left' : 'angle-right'} />
				</Button> */}
			</SidebarHeader>
			<SidebarContent>
			<Menu iconShape="square">
				{
					data.map((item, index) => {
						return (
							item.items === undefined ? 
							<MenuItem onClick={() => onSubmit(item.ActionUrlParent)}>
								{item.ParentScreen}
							</MenuItem> :
							<SubMenu title={item.ParentScreen}>
								<SubItem items={item.items} {...props }/>
							</SubMenu>
						)
					})
				}
			</Menu>
			</SidebarContent>
			<SidebarFooter>
				<h2>footer</h2>
			</SidebarFooter>
		</ProSidebar>
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
						<MenuItem onClick={() => onSubmit(subItem.ActionUrl)}>
							{subItem.ScreenName}
						</MenuItem>
					) 
			}) 
			: <></>}
		</>
	);
}

export default withRouter(NavMenu);