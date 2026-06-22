import { storeBlob, get, storeTree, storeCommit } from "./engine/ObjectStore";
import { useEffect } from "react";
import { GitRepo } from "./engine/GitRepo";

function App() {
  useEffect(() => {
    async function test() {
      const blobSha = await storeBlob("hello world");
      const treeSha = await storeTree([
        { mode: "100644", name: "hello.txt", sha: blobSha },
      ]);
      const commitSha = await storeCommit(
        treeSha,
        [],
        "initial commit",
        "Aayush",
      );
      console.log("commit sha:", commitSha);
      console.log("commit object:", get(commitSha));
      const repo = new GitRepo();
      await repo.init();
      await repo.add("hello.txt", "hello world");
      await repo.commit("initial commit", "Aayush");
      await repo.add("hello.txt", "updated");
      await repo.commit("second commit", "Aayush");
      const commits = await repo.log();
      console.log(commits);
    }
    test();
  }, []);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
