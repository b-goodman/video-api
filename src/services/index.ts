import searchRoutes from "./search/routes";
import uploadRoutes from "./upload/routes";
import deleteRoutes from "./delete/routes";
import streamRoutes from "./stream/routes";
import queryRoutes from "./query/routes";
import userRoutes from "./users/routes";

export default [
    ...searchRoutes,
    ...uploadRoutes,
    ...deleteRoutes,
    ...streamRoutes,
    ...queryRoutes,
    ...userRoutes,
];