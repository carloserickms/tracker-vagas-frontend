export interface CookiePayload {
    name: string;
    value: string;
    httpOnly?: boolean;
    secure?: boolean;
    path?: string;
    expires?: Date;
}