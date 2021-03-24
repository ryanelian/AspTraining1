import { UserManager, WebStorageStateStore } from "oidc-client";

export function UserManagerFactory(){
    return new UserManager({
        authority: 'https://sso.accelist.com/auth/realms/Dev',
        client_id: 'aspnet-training',
        redirect_uri: 'http://localhost:3000/login-callback',
        post_logout_redirect_uri: "http://localhost:3000/logout-callback",
        response_type: "code",
        scope: "openid profile email",
        revokeAccessTokenOnSignout: true,
        stateStore: new WebStorageStateStore({
            store: window.localStorage
        })
    });
}
