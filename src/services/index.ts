import searchRoutes from "./search/routes";
import uploadRoutes from "./upload/routes";
import deleteRoutes from "./delete/routes";
import streamRoutes from "./stream/routes";
import queryRoutes from "./query/routes";
import userRoutes from "./users/routes";
import jobRoutes from "./jobs/routes";
import updateMetadata from "./metadata/routes";

export default [
    ...searchRoutes,
    ...uploadRoutes,
    ...deleteRoutes,
    ...streamRoutes,
    ...queryRoutes,
    ...userRoutes,
    ...jobRoutes,
    ...updateMetadata,
];