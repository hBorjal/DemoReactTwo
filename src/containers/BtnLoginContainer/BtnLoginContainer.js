import  { useState } from 'react';
import { fetchIDM } from '../../actions/LoginActions';
import { useDispatch } from 'react-redux';
import ApiService from '../../services/ApiServices';


export default function BtnLoginContainer(props) {

    const dispatch = useDispatch();
	const [state, setState] = useState({
		loading: false
    });
    const [isError, setError]= useState(false);

    const getToken = async credentials => {
        setState({ loading: true })
		try {
            await ApiService.authUser(credentials).then(
                res => {

                    const data = {
                        ...credentials, 
                        token: res.access_token
                    }
                    dispatch(fetchIDM(data, props));
                    setState({ loading: false })
                }, error => {
                    props.login(() => {
                        props.history.push(`/`);
                    }, false);
                    setError(true);
                    setState({ loading: false });
                }
            );
		} catch (e) {
			setState({loading: false})
			throw e;
		}
    }
    return (props.children({submit: getToken, isLoading: state.loading, isError}));
}
