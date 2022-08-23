import GlobalConfig from './config';

export interface CasdoorSdkConfig {
  serverUrl: string; // your Casdoor server URL, e.g., "https://door.casbin.com" for the official demo site
  clientId: string; // the Client ID of your Casdoor application, e.g., "014ae4bd048734ca2dea"
  appName: string; // the name of your Casdoor application, e.g., "app-casnode"
  organizationName: string; // the name of the Casdoor organization connected with your Casdoor application, e.g., "casbin"
  redirectPath?: string; // the path of the redirect URL for your Casdoor application, will be "/callback" if not provided
}

// reference: https://github.com/casdoor/casdoor-go-sdk/blob/90fcd5646ec63d733472c5e7ce526f3447f99f1f/auth/jwt.go#L19-L32
export interface Account {
  organization: string;
  username: string;
  type: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  affiliation: string;
  tag: string;
  language: string;
  score: number;
  isAdmin: boolean;
  accessToken: string;
}


class CasdoorSdk {
  private config: CasdoorSdkConfig;

  constructor(config: CasdoorSdkConfig) {
    this.config = config;
    if (config.redirectPath === undefined || config.redirectPath === null) {
      this.config.redirectPath = '/callback';
    }
  }

  public getSignupUrl=(
    redirectUrl: string = GlobalConfig.getFrontendURL(),
    enablePassword: boolean = true
  ): string =>{
    if (enablePassword) {
      localStorage.setItem("signinUrl", this.getSigninUrl(redirectUrl));
      return `${this.config.serverUrl.trim()}/signup/${this.config.appName}`;
    } else {

      const redirectUri = `${redirectUrl}${this.config.redirectPath}`;
      const scope = 'read';
      const state = this.config.appName;
      return `${this.config.serverUrl.trim()}/signup/oauth/authorize?client_id=${
        this.config.clientId
      }&response_type=token&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${scope}&state=${state}`;
    }
  }

  public getSigninUrl=(redirectUrl: string = GlobalConfig.getFrontendURL()): string =>{
    const redirectUri = `${redirectUrl}${this.config.redirectPath}`;
    const scope = 'read';
    const state = this.config.appName;
    return `${this.config.serverUrl.trim()}/login/oauth/authorize?client_id=${
      this.config.clientId
    }&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}&state=${state}`;
  }

  public getUserProfileUrl=(userName: string, account: Account): string =>{
    let param = '';
    if (account !== undefined && account !== null) {
      param = `?access_token=${account.accessToken}`;
    }
    return `${this.config.serverUrl.trim()}/users/${
      this.config.organizationName
    }/${userName}${param}`;
  }

  public getMyProfileUrl=(account: Account): string=>{
    let param = '';
    if (account !== undefined && account !== null) {
      param = `?access_token=${account.accessToken}`;
    }
    return `${this.config.serverUrl.trim()}/account${param}`;
  }

  public signin=(
    redirectUrl: string = GlobalConfig.getFrontendURL(),
    serverUrl: string = this.config.serverUrl
  ): Promise<Response> =>{
    const params = new URLSearchParams(redirectUrl);
    return fetch(
      `${serverUrl}/api/signin?code=${params.get('code')}&state=${params.get(
        'state'
      )}`,
      {
        method: 'POST',
        credentials: 'include'
      }
    ).then((res) => res.json());
  }
}

const sdkConfig: CasdoorSdkConfig = {
  serverUrl: GlobalConfig.getAuthorizationURL(),
  clientId: '82737aac8ec89315c220',
  appName: 'application_dbks',
  organizationName: 'organization_dbks',
  redirectPath: '/callback'
};

const authorization: CasdoorSdk = new CasdoorSdk(sdkConfig);

export default authorization;
