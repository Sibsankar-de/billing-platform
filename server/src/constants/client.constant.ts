import { env } from "../configs/env";

const FRONTEND_URL = env.CLIENT_URL;

export const clientPages = {
  BASE_URL: FRONTEND_URL,
  PROFILE_PAGE: `${FRONTEND_URL}/profile`,
  getStoreInvitatonPage: (invitationToken: string) =>
    `${FRONTEND_URL}/store-invitation?token=${invitationToken}`,
};
