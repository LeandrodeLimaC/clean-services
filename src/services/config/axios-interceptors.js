
import keycloak from '@/services/sso/keycloak.service';

export default {
    onRequest : async (config) => {
        await keycloak.AuthService.updateToken(5)
        config.headers = { Authorization: `Bearer ${keycloak.token}`};
        console.info(`[request] [${JSON.stringify(config)}]`);
        return config;
    }
}