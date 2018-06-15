export class Post {
    title: string;
    content: string;
    username: string;
    userId?: string;
    postId?: string;

    constructor(title: string, content: string, username: string, postId?: string, userId?: string) {
        this.title = title;
        this.content = content;
        this.username = username;
        this.userId = userId;
        this.postId = postId;        
    }
}