export class Comment {
    content: string;
    username: string;
    grade: number;
    tag: string;
    publishDate?: Date;
    bookId?: string;
    commentId?: string;

    constructor(content: string, username: string, grade: number, tag: string, publishDate?: Date, bookId?: string, 
                commentId?: string) {
        this.content = content;
        this.username = username;
        this.grade = grade;
        this.tag = tag;
        this.publishDate = publishDate;
        this.bookId = bookId;
        this.commentId = commentId;
    }
}