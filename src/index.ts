import { dag, object, func } from "@dagger.io/dagger";

@object()
export class TechSummarizerAgent {
  @func()
  async summarize(url: string): Promise<string> {
    const workspace = dag.readerWorkspace(300, 500, ["ai", "cloud"]);

    let llm = dag
      .llm()
      .withReaderWorkspace(workspace)
      .withPromptVar("url", url)
      .withPrompt(
        `You are an experienced technical writer who understands writing for a non-technical audience.
You have been given access to a workspace. Summarize the provided content for a non-technical audience using the get-content tool. Use only the tools (get-content and check-content) provided by the workspace.

<url>
$url
</url>

You must use the provided workspaces check-content tool to verify your summary. DO NOT STOP UNTIL THE SUMMARY PASSES THE CHECK-CONTENT TOOL.
`,
      );

    let _ = llm.readerWorkspace();
    return llm.lastReply();
  }
}
