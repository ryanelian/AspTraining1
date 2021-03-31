import { CustomerClient } from "../api/shop-api";
import { User } from 'oidc-client';

const BaseURL = 'http://localhost:58778';

export function FetchWithAuthFactory(bearerToken: string) {
    function fetchWithAuth(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
        if (!init) {
            init = {};
        }

        let initHeaders: HeadersInit = {};
        if (init.headers) {
            initHeaders = init.headers;
        }
        initHeaders['Authorization'] = 'Bearer ' + bearerToken;
        init.headers = initHeaders;

        return fetch(input, init);
    }

    return {
        fetch: fetchWithAuth
    }
}

export function CustomerClientWithAuth(user: User) {
    const fetch2 = FetchWithAuthFactory(user.access_token);
    return new CustomerClient(BaseURL, fetch2);
}
