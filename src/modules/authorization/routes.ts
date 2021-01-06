import { APIContext } from "core/types";
import Users from "./Users";

import * as loginPage from "./pages/login";

export default {
  "/login": {
    GET: () => ({ ...loginPage, type: "amp" }),
    POST: async (
      { input: { email, password }, rid },
      { cookies, users }: APIContext & { users: Users }
    ) => {
      const user = await users.login({ email, password });
      const token = cookies["amp-access"];
      if (token) users.saveToken(user.id, token);
      return { user };
    },
  },
  "/access": {
    GET: async ({ rid }, { users }: APIContext & { users: Users }) => {
      const user = await users.byToken(rid);
      if (user) return { user, authorized: true };
      return { authorized: false };
    },
  },
  "/ping": {
    POST: (params) => {
      return { message: "OK" };
    },
  },
};