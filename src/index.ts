import { dag, object, func } from "@dagger.io/dagger";

@object()
export class TechSummarizerAgent {
  /**
   * Summarize the content of the provided URL.
   */
  @func()
  async summarize(
    url: string,
    minLength: number = 100,
    maxLength: number = 200,
    forbiddenWords: string[] = [],
  ): Promise<string> {
    const workspace = dag.readerWorkspace(minLength, maxLength, forbiddenWords);

    let llm = dag
      .llm()
      .withReaderWorkspace(workspace)
      .withPromptVar("url", url)
      .withPrompt(
        `You are an experienced, adaptable technical writer whos is very responsive to feedback.
You have been given access to a workspace. Summarize the provided content using the get-content tool. Use only the tools (get-content and check-content) provided by the workspace.

<url>
$url
</url>

You must use the provided workspaces check-content tool to verify your summary and respond to the corrections it issues. DO NOT STOP UNTIL THE SUMMARY PASSES THE CHECK-CONTENT TOOL.
`,
      );

    let _ = llm.readerWorkspace();

    return llm.lastReply();
  }
}
