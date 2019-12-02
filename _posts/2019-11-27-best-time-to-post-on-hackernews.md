---
layout: "post"
title: "Best time to post on HackerNews"
date: "2019-11-27 15:46:53 +0300"
category: fullstack
name:
description: Collect data over API and analyse it to find correlation between post time and it's score
tech_stack: Python, Pandas
status: Work in progress
permalink: best-time-to-post-on-hackernews/
---
<!-- more -->
### TL;DR
Not yet found

### Notes
#### For the past few months there were 875 cases of simultaneous posts
Found 875 duplicating timestamps among stories (NB: not all items which includes comments) for the period of 29.08–23.11. Max 3 story per second. E.g. these three on the 3rd of September at 15:01:29 UTC (note those IDs): [20867121](https://news.ycombinator.com/item?id=20867121), [20867122](https://news.ycombinator.com/item?id=20867122), [20867123](https://news.ycombinator.com/item?id=20867123)

#### It would take 117 hours (4.9 days) to get IDs of 81300 stories posted between August and December (assuming 2 requests per second)
All objects on HackerNews have continuous numbering:
> Stories, comments, jobs, Ask HNs and even polls are just items. They're identified by their ids, which are unique integers, and live under /v0/item/<id>, — HackerNews API docs

At the moment of writing 849451 items have been posted since 29th of August (IDs between 21682006 and 20832555). Among those only 81300 are stories (HN's term for post). To find out which you could use [HackerNews API](https://github.com/HackerNews/API) and **fetch every of 849451 items** and check if it's a story for **117 hours** (assuming 2 requests per second). Or **periodically fetch** endpoint which [dumps IDs of **last 500 stories**](https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty) (it would take **38 minutes** to find these IDs by going backwards from [last item](https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty), in my case `21682006 - 21677389 = 4617` items to check)

Back in the end of August I've set a script that gets those 500 IDs every two hours and saves new ones.


### Plan
- load data
  - automate data fetch
- prepare data
- show
  - number of items between posts
  - possible time of fetching IDs of every 500 (from number of items between first and last stories)
- find correlation

### Dataset
Will publish all I got when finish
