
import '../scss/styles.scss';
import app from './app';

app.init()
	.then(() => {
		return app.render();
	});


