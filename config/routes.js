
export default {
    home: {
        path: '/',
        method: 'get',
        // handler: Home,
        label: 'home',
        action: (context, payload, done) => {
            context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: 'Home | flux-examples | routing' });
            done();
        }
    },
    about: {
        path: '/about',
        method: 'get',
        // handler: About,
        label: 'about',
        action: (context, payload, done) => {
            context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: 'About | flux-examples | routing' });
            done();
        }
    }
};
