import { UserManager, WebStorageStateStore } from "oidc-client";

export function UserManagerFactory(silent = false) {

    let redirectUri = 'http://localhost:3000/account/login-callback';
    if (silent) {
        redirectUri = 'http://localhost:3000/account/login-silent-callback';
    }

    return new UserManager({
        authority: 'https://sso.accelist.com/auth/realms/Dev',
        client_id: 'aspnet-training',
        redirect_uri: redirectUri,
        post_logout_redirect_uri: 'http://localhost:3000/account/login',
        revokeAccessTokenOnSignout: true,
        response_type: 'code', // <-- login pake PKCE, dan jangan pake implicit flow karena tidak secure
        scope: 'openid profile email customer-api',
        stateStore: new WebStorageStateStore({
            store: localStorage
        }),
        userStore: new WebStorageStateStore({ // <-- awas ke XSS
            store: localStorage
        }),
    });
}
