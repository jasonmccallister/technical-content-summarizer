import * as cheerio from "cheerio";
import { object, func } from "@dagger.io/dagger";

@object()
export class ReaderWorkspace {
  private minLength: number;
  private maxLength: number;
  private forbiddenWords: string[];
  private plainTextContent: string;

  constructor(minLength: number, maxLength: number, forbiddenWords: string[]) {
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.forbiddenWords = forbiddenWords;
  }

  /**
   * Get the content of the url and return it as plain text without any HTML.
   */
  @func()
  async getContent(url: string): Promise<string> {
    if (this.plainTextContent) {
      return this.plainTextContent;
    }

    let html = (await fetch(url)).text();
    let $ = cheerio.load(await html);

    $("script, source, style, head, img, svg, a, form, link, iframe").remove();
    $("*").removeClass();
    $("*").each((_, el) => {
      if (el.type === "tag" || el.type === "script" || el.type === "style") {
        for (const attr of Object.keys(el.attribs || {})) {
          if (attr.startsWith("data-")) {
            $(el).removeAttr(attr);
          }
        }
      }
    });

    const content = $("body").text().replace(/\s+/g, " ");
    this.plainTextContent = content;

    return content;
  }

  /**
   * Check the content of the workspace against the forbidden words list and the length limit. Returns false if the content is invalid with a reason.
   */
  @func()
  checkContent(content: string): string {
    if (!content || content.length === 0) {
      return "The content provided is empty";
    }

    if (content.length > this.maxLength || content.length < this.minLength) {
      return `The content provided is too long or too short. It should be between ${this.minLength} and ${this.maxLength} characters long`;
    }

    if (this.forbiddenWords.some((word) => content.includes(word))) {
      return `The content provided contains forbidden words {${this.forbiddenWords.join(", ")}}`;
    }

    return "Passed!";
  }
}
