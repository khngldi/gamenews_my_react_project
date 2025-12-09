import { HomePage } from "../pages/HomePage";
import { NewsPage } from "../pages/NewsPage";
import {CategoriesPage} from "../pages/CategoriesPage";
import { KhngldiPage } from "../pages/KhngldiPage";
import { AboutPage } from "../pages/AboutPage";
import { ContactsPage } from "../pages/ContactsPage";
import { RulesPage } from "../pages/RulesPage";
import { PrivacyPage } from "../pages/PrivacyPage";
import { CategoryNewsPage } from "../pages/CategoryNewsPage";

import {
    HOME_PAGE_ROUTE,
    NEWS_PAGE_ROUTE,
    CATEGORIES_PAGE_ROUTE,
    KHNGLDI_PAGE_ROUTE,
    ABOUT_PAGE_ROUTE,
    CONTACTS_PAGE_ROUTE,
    RULES_PAGE_ROUTE,
    PRIVACY_PAGE_ROUTE,
    CATEGORY_NEWS_PAGE_ROUTE,
} from "./consts";

export const routes = [
    { path: HOME_PAGE_ROUTE, element: HomePage },
    { path: NEWS_PAGE_ROUTE, element: NewsPage },
    { path: CATEGORIES_PAGE_ROUTE, element: CategoriesPage },
    { path: KHNGLDI_PAGE_ROUTE, element: KhngldiPage },
    { path: ABOUT_PAGE_ROUTE, element: AboutPage },
    { path: CONTACTS_PAGE_ROUTE, element: ContactsPage },
    { path: RULES_PAGE_ROUTE, element: RulesPage },
    { path: PRIVACY_PAGE_ROUTE, element: PrivacyPage },
    { path: CATEGORY_NEWS_PAGE_ROUTE, element: CategoryNewsPage },
];
