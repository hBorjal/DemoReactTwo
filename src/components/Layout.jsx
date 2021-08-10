import React from 'react';
import { Container } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
export default function Layout(props){
	return (
	<div className="show-fake-browser sidebar-page">
		<Container>
			{props.children}
		</Container>
	</div>
	);
}