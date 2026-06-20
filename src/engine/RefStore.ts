export class RefStore{
  private refs :Map<string, string>;
  private Head: string;
  private detached: boolean = false; 

  constructor(){
    this.refs = new Map<string, string>(); 
    this.Head = "main"; 
  }

  createBranch(name: string, sha: string ) : void{
    this.refs.set(name, sha);
  }
  updateBranch(name: string, sha: string) : void{
    this.refs.set(name, sha);
  }
  moveHead(branchName: string): void{
    this.Head = branchName; 
  }
  getHeadSha() : string | null{
    return this.refs.get(this.Head) ?? null;
  }
  getCurrentBranch(): string{
    return this.Head;
  }
}