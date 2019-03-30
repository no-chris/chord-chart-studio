import appLayout from './ui/layouts/app/plugin';

// Registration order matters!

export default function registerPlugins(app) {
	app.registerPlugin(appLayout);
}
