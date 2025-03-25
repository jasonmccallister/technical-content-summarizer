# Technical Content Summarizer 🤖

**Take any URL and get a summary of the content on the page, in non-technical terms.**

## Overview

This is an AI Agent to summarize technical content from a URL into non-technical terms.

Built with [Dagger](https://dagger.io), the open platform for agentic software and uses the Dagger TypeScript SDK.

> Note: I found the best results are achieved when using the Gemini integration but your mileage may vary.

## Demo

https://github.com/user-attachments/assets/c7b8d869-f0d5-4423-9a91-fa5fe978d591

## Features

- **Summarize Content**: Take any URL and get a summary of the content on the page.
- **Maximum and Minimum Length**: Set the minimum and maximum length of the summary.
- **Forbidden Words**: Set a list of forbidden words that should not be included in the summary.

## What makes this an AI Agent?

The LLM is given a reader workspace that has two functions: `getContent` and `checkContent`. The `getContent` function is used to extract the content from the source code and the `checkContent` function is used to verify the minimum length maximum length, and the use of any forbidden words. The AI Agent is given a URL and told to use only the tools in the workspace its given to summarize the content in non-technical terms and verify using the `checkContent` function. It will not stop until the content passes the `checkContent` function.

## Installation

Install [Dagger](https://docs.dagger.io/install)

$ Clone the repo and enter into Dagger Shell:
```shell
git clone git@github.com:jasonmccallister/technical-content-summarizer.git
```
```shell
cd technical-content-summarizer
```
```shell
cp .env.example .env
# make sure you have the correct values in .env
```
```shell
dagger
```

⋈ Run summarize function:
```shell
summarize https://news.microsoft.com/source/features/innovation/microsofts-majorana-1-chip-carves-new-path-for-quantum-computing/ --min-length 400 --max-length 900
```

⋈ Check out the summary.

*note: Increase verbosity to 2 or 3 and/or view in Dagger Cloud for best results*

#### Fun to try:
- Try different URLs and changing the min and max length to see how the AI Agent behaves.
- Use this for writing meta descriptions for SEO purposes.
