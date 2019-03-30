import appFactory from './core/app';
import registerPlugins from './plugins/registerPlugins';

const app = appFactory();

registerPlugins(app);

export default app;
