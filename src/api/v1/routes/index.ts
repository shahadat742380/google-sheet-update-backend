import { Hono } from "hono";

// import auth routes
import sign_up from "./auth/sign_up";

const v1_api_route = new Hono();

// auth routes
v1_api_route.route("/auth", sign_up);

export default v1_api_route;
