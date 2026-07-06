import type { GitCommit } from "./types";

export function createCommit(treeSha: string,
  parentSha: string[],
  message: string, 
  author: string ,
  timeStamp: number): GitCommit{
    return {
      type : "commit", 
      sha : "",
      treeSha: treeSha,
      parentSha : parentSha,
      message : message,
      author : author, 
      timestamp: timeStamp
    }
  }