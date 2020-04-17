export class Notice{
    public text:string;
    public link:string;
    public linkName:string;

    constructor(text:string , link?:string , linkName?:string){
        this.text = text;
        this.link = link;
        this.linkName = linkName;
    }
}