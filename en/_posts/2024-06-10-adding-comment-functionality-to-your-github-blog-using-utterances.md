---
layout: post
title: "Adding Comment Functionality to Your GitHub Blog Using Utterances"
subtitle: "How to manage blog comments using GitHub Issues"
date: 2024-06-10 19:00:00 +0900
last_modified_at: 2024-06-10 19:00:00 +0900
categories: ["tutorial"]
tags: ["github", "blog"]
lang: en
---

In a GitHub blog, managing comments can be challenging without a backend server. While there are various solutions to provide comment functionality, each has its pros and cons.
This article introduces Utterances, an elegant solution for managing comments using GitHub Issues. In this tutorial, we will explain how to add Utterances to a GitHub blog using Jekyll.

### What is Utterances?

Utterances is a lightweight comment widget based on GitHub Issues. It allows you to write comments using GitHub Issues.

### Advantages of Utterances

1. **Simple Setup**: Easily integrates with any static site generator.
2. **GitHub Integration**: Utilizes GitHub's existing issue tracking and notification system.
3. **Free and Open Source**: It is free and customizable as needed.
4. **Markdown Support**: Comments support GitHub-flavored Markdown.
5. **Spam Prevention**: Users must log in with GitHub, reducing spam.

### Disadvantages of Utterances

1. **GitHub Account Required**: Commenters must have a GitHub account.
2. **Public Repository**: Utterances only works with public repositories.
3. **Mixed Issues**: Comments and project issues may mix if not managed properly.

### Step-by-Step Guide to Adding Utterances

#### Step 1: Create a GitHub Repository

First, you need a GitHub repository to store the comments. You can use an existing repository or create a new one dedicated to comments.

1. Log in to [GitHub](https://github.com){:target="_blank"}.
2. Click the "New" button to create a new repository.
3. Name the repository, such as `blog-comments`.
4. Set the repository to public.
5. Click "Create repository".

#### Step 2: Configure Utterances

1. Visit the [Utterances website](https://utteranc.es/).
2. Scroll down to the configuration section.

{% include image.html src="/assets/img/utterances_configuration.png" alt="alt text" width="500" %}

3. Enter the repository you created for comments.
4. Select the issue term format.

{% include image.html src="/assets/img/post_comment_example.png" alt="alt text" width="500" %}
{% include image.html src="/assets/img/comment_issue_example.png" alt="alt text" width="700" caption="Example of an issue created when a comment is posted" %}

5. Choose a theme that matches your blog.
6. Copy the provided script.

{% include image.html src="/assets/img/utterances_setting.png" alt="alt text" width="500" %}

#### Step 3: Add Utterances to Your Jekyll Blog

1. Open your Jekyll blog project.
2. Navigate to the `_layouts` directory and open `post.html` (or the layout file you use for posts).
3. Paste the Utterances script where you want the comments to appear.

{% include image.html src="/assets/img/layout_file_example.png" alt="alt text" width="500" caption="Example of a layout file" %}