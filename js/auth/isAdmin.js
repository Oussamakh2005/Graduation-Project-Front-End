import { authorized } from "./authorized.js";
import { config } from "../utils/config.js";

authorized(`${config.API_URL}/api/user/admin`);