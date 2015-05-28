
import BaseStore from 'fluxible/addons/BaseStore';
import routesConfig from '../../../config/routes';

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);

        this.currentPageName = null;
        this.currentPage = null;
        this.pages = routesConfig;
        this.currentRoute = null;
        this.pageTitle = '';
    }

    handlePageTitle(data) {
        this.pageTitle = data.pageTitle;
    }

    _handleNavigate (route) {

     var pageName = route.get('name');
     var page = this.pages[pageName];
     if (pageName === this.getCurrentPageName()) {
         return;
     }

     this.currentPageName = pageName;
     this.currentPage = page;
     this.currentRoute = route;

     this.emitChange();
   }
    getCurrentPageName() {
        return this.currentPageName;
    }
    getPageTitle() {
        return this.pageTitle;
    }
    getCurrentRoute() {
        return this.currentRoute;
    }
    dehydrate() {
        return {
            currentPageName: this.currentPageName,
            currentPage: this.currentPage,
            pages: this.pages,
            pageTitle: this.pageTitle,
            currentRoute: this.currentRoute
        };
    }
    rehydrate(state) {
        this.currentPageName = state.currentPageName;
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.pageTitle = state.pageTitle;
        this.currentRoute = state.currentRoute;
    }

    getState () {
     return {
         currentPageName: this.currentPageName,
         currentPage: this.currentPage,
         pages: this.pages,
         pageTitle: this.pageTitle,
         currentRoute: this.currentRoute
     };
 }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'UPDATE_PAGE_TITLE': 'handlePageTitle',
    'NAVIGATE_SUCCESS': '_handleNavigate'
};

export default ApplicationStore;
