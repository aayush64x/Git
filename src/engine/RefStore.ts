export class RefStore{
  private refs :Map<string, string>;
  private Head: string;
  private detached: boolean = false; 

  constructor(){
    this.refs = new Map<string, string>(); 
    this.Head = "main"; 
  }

  createBranch(name: string, sha: string ) : void{

  }
  updateBranch(name: string, sha: string) : void{

  }
  moveHead(branchName: string): void{
    this.Head = branchName; 
  }
  getHeadSha() : string{
    return "";
  }
  getCurrentBranch(): string{
    return this.Head;
  }
}