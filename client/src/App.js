import {Switch, Route} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {Container, Row} from "react-bootstrap";
import './App.css';
import Login from "./pages/login/login";
import AuthRouter from "./auth/authRouter";
import NotFound from "./pages/notfound/notfound";
import Register from "./pages/register/register";
import Home from "./pages/home/home";

library.add(far, fas);

function App() {
	return (
		<Container>
			<Row>
				<Switch>
					<Route exact path={["/", "/login"]} component={Login}/>
					<Route exact path="/register" component={Register}/>
					<AuthRouter exact path="/home" component={Home}/>
					<Route component={NotFound}/>
				</Switch>
			</Row>
		</Container>
	);
}

export default App;
