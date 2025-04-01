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
    const ws = dag.readerWorkspace(minLength, maxLength, forbiddenWords);

    const env = dag
      .env()
      .withReaderWorkspaceInput("workspace", ws, "The workspace to use ")
      .withStringInput("url", url, "The URL to use for summarization");

    const summary = dag
      .llm()
      .withEnv(env)
      .withPrompt(
        `You are an experienced, adaptable technical writer whos is very responsive to feedback.
You have been given access to a workspace.

$url

You must use the provided workspaces check-content tool to verify your summary and respond to the corrections it issues. DO NOT STOP UNTIL THE SUMMARY PASSES THE CHECK-CONTENT TOOL.`,
      )
      .lastReply();

    return summary;
  }
}
