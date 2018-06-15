export class User {
    constructor(public email: string, public password: string, public firstName?: string, 
                public lastName?: string, public country?: string, public city?: string, 
                public postalCode?: string, public address?: string, public phoneNumber?: string,
                public image?: string) {}
}