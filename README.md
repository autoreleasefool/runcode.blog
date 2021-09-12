# Run; Code; Run Code;

My personal blog.

## Configuration

### Writing new posts

Create a new file underneath the directory `_posts` formatted `YYYY-MM-DD-title.md`.

The front matter of the file should be provided as follows:

```
---
layout: post
permalink: /post/<preferred, unique permalink>
title: "<Title of the Post>"
date: 2020-01-01 00:00:00 +0000
feature_image: /assets/posts/<permalink>/<image>
category: <featured>
tags: <space separated tag slugs>
---
```

The contents of the post are standard Markdown.

### Adding tags

Tags can be created in `_data/tags.yml`

Tags can be configured as follows:

```
- name: Tag Name
  slug: tag-slug
  has_image: true | false
  description: >-
    Description of the tag.
```

Additionally, a file should be created at `tags/tag-slug.html` with the following content:

```
---
layout: tag
tag: tag-slug
permalink: /tags/tag-slug
---
```

### Other

The URL and author details are configurable through `_config.yml`.

## Attribution

All emojis designed by [OpenMoji](https://openmoji.org/) – the open-source emoji and icon project. License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/#)
