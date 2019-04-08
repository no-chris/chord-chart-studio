import { connect } from 'react-redux';

import { toggleLeftBar, toggleRightBar} from '../_state/actions';
import { isLeftBarCollapsed, isRightBarCollapsed } from '../_state/selectors';

import App from '../_components/App';


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


