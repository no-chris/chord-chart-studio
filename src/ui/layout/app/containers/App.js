import { connect } from 'react-redux';

import { toggleLeftBar, toggleRightBar} from '../actions';
import { isLeftBarCollapsed, isRightBarCollapsed } from '../selectors';

import App from '../components/App';


export default connect(
	state => ({
		isLeftBarCollapsed: isLeftBarCollapsed(state),
		isRightBarCollapsed: isRightBarCollapsed(state),
	}),

	{
		toggleLeftBar,
		toggleRightBar,
	}

)(App);


