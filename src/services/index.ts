import searchRoutes from "./search/routes";
import uploadRoutes from "./upload/routes";
import deleteRoutes from "./delete/routes";
import serveRoutes from "./serve/routes";

export default [
    ...searchRoutes,
    ...uploadRoutes,
    ...deleteRoutes,
    ...serveRoutes
];