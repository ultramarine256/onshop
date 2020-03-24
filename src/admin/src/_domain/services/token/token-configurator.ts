export class TokenConfigurator {
  /// fields

  public setToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }

  public getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }
}

const STORAGE_KEYS = {
  TOKEN: 'app_token_key'
};
