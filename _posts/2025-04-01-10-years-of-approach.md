---
layout: post
permalink: /posts/10-years-of-approach
title: "10 Years of Building Approach for Android and iOS"
date: 2025-04-01T10:00:00+00:00
feature_image: /assets/posts/10-years-of-approach-header.png
tags: personal approach ios android

---

Exactly 10 years ago I published the first version of my first solo Android app, the 5 Pin Bowling Companion. A lot has changed over the years, and I continue to maintain it today. Multiple total rewrites, a Kotlin migration, and an iOS release, I'm going to talk a little about the journey this app has been through.

## Why 5-Pin Bowling?

I started working on the first version of the Bowling Companion (its original name!) in January 2015. I was in my 2nd year of university, and was going to have to start applying to co-op positions for that summer. I was looking for my niche, something that I could build that would be unique, that I had a need for, and that I would be passionate about building. I had been bowling most of my life at that point, and realized that there wasn't really a good option for 5-Pin Bowling scorekeepers on Android. Actually, I can't remember if there were any at all! So I set my sights on building the first.

## The 5-Pin Bowling Companion: The Java Era

### Version One: Functional, but Ugly

I built the first version of the app over the course of about a month. I focused primarily on the functionality -- things like data storage, score calculations, and statistics. Back then the Bowling Companion was written in Java, with XML, Views, and SQL. Every screen the app contained was a separate Activity, statistics were collected and calculated in an `AsyncTask` within the `StatsActivity`, and the UI was not quite fleshed out…

One thing that was good enough about this first version though? It helped me stand out among other co-op candidates, and I landed my first internship as an Android developer thanks to being one of the only ones with actual Android experience!

![v0.1 of the 5 Pin Bowling Companion, circa February 2015](/assets/posts/10-years-of-approach-android-v0.1.png)

<figcaption>v0.1 of the 5 Pin Bowling Companion, circa February 2015</figcaption>

### Version Two: More Functional, Less Ugly

Once I finished the first version, and had it functional, I made the most logical decision -- scrap it and rebuild it from scratch!

I figured at that point, I had learned so much in the past month, from what APIs were available, to how to better structure my code, that I had already built up so much technical debt, and the performance was likely so poor I could easily make major improvements. So I copied the existing code over to a new folder, and created a new Android template from scratch.

Since the app was mostly working the way I wanted it to at this point, I focused on the design. You can see there are some pretty significant changes in the look of the app from v0.1 to v0.2.

![v0.2 of the 5 Pin Bowling Companion, circa March 2015](/assets/posts/10-years-of-approach-android-v0.2.png)

<figcaption>v0.2 of the 5 Pin Bowling Companion, circa March 2015</figcaption>

### Version Three: The Initial Release

Once I had the app looking pretty well how I wanted to, trying out this new "Material" thing Google was toting, I decided that I had, once again, come so far in my learning, it was time to scrap it and start all over once again. This time around, I focused on performance, functionality, and code structure.

I referred to the past implementations a lot, but starting from scratch again allowed me to easily make the changes I needed to, without having to worry about compatibility with what I had already written. Much of the underlying code, like the database, remained the same, but the entire structure of the app changed. I moved from Activities to Fragments, and pulled a lot of the scoring logic out of the activities into utility functions.

This rewrite would eventually become the first version launched, on April 1st, 2015.

![v1.0 of the 5 Pin Bowling Companion, circa April 2015](/assets/posts/10-years-of-approach-android-v1.0.png)

<figcaption>v1.0 of the 5 Pin Bowling Companion, circa April 2015</figcaption>

### Early Lessons from the Early Days

1. **Kill your darlings**. I wanted to be proud of this, I wanted to share it with a community I was a part of, and I wanted to provide something useful. The first version of the app, while functional, was not a delight to use! Redesigning it on top of the existing code would probably have taken me much longer, and I might not have gotten that first version out for months, with a lot more technical debt.
2. **Think about your data model**. The biggest mistake I made in these early days was being far too restrictive with the SQL constraints and datatypes. It made refactors difficult, when I better understood how I should be formatting the data and defining relationships. Some features were impossible for a while until I restructured the database! Taking the time to think about your long-term data model, and leaving yourself some wiggle room in the future can be extremely useful, before you lock yourself into something that becomes impossible to build on top of.

## Rewriting in Kotlin

In February 2018, not too long after [Google announced](https://techcrunch.com/2019/05/07/kotlin-is-now-googles-preferred-language-for-android-app-development/) official support for Kotlin in Android Studio, I decided to rewrite the Bowling Companion in Kotlin. I experimented with the language a bit before diving in, and found that I really liked a lot of its early ergonomics especially when compared with Java. At this point I just recently graduated and was returning to working at Shopify on their native (at the time) Swift app, and I liked that Kotlin reminded me a lot of Swift.

The rewrite would end up taking me about 7 months, starting in February, with the first Kotlin version being released in September 2018. I don't fully remember the process, but I do remember that I did not do it component-by-component, instead opting to fully rewrite the app from scratch and convert it all at once. Probably not the best idea, especially since up until this point I had never written a single unit test for the app, but it was hardly the app's first rewrite! But the Bowling Companion has always first and foremost been a playground for me to explore in, and this was just another exploration.

In writing this blog post, I found the first couple commits, which I think are pretty comical -- [the first commit](https://github.com/autoreleasefool/approach/commit/b83a1d5d4f0d3b1dc794f8e94d0be3696acc8fee), a complete deletion of the entire Java source code, and [the second commit](https://github.com/autoreleasefool/approach/commit/ebaf0a33bf570fa0f0a6551d3a5350e9351f8ac3), a "Hello World!" Kotlin template. Then, in September, the [3.0.0 Release](https://github.com/autoreleasefool/approach/releases/tag/v3.0.0) of the Kotlin rewrite.

The months following that release I was plagued with crash reports from [BugSnag](https://www.bugsnag.com/). Mostly `IllegalStateException`s, but there was quite a variety. I chased those bugs down and fixed what I could. I don't have a ton of recollection of this time, I'm mostly just looking through [GitHub Issues](https://github.com/autoreleasefool/approach/issues?q=is:issue%20state:closed&page=12) to jog my memory.

![v3.0 of the 5 Pin Bowling Companion, circa September 2018](/assets/posts/10-years-of-approach-android-v3.0.png)

<figcaption>v3.0 of the 5 Pin Bowling Companion, circa September 2018</figcaption>

## Taking a Break

In 2020, I ended up mostly taking a break from working on the Bowling Companion. There were few, if any, bug reports or feature requests coming in, and I had picked up some other projects. I was mostly content with where the app was at. I had removed the ads and Google analytics, as I in my mind I didn't want there to be any burden to maintain it -- the app was completely free and detached, and therefore I offered it as-is. I would work on it when I wanted to, on my own terms.

The last version I ended up releasing of this iteration of the app was `3.2.0`, in August 2020, targetting SDK 28.

## Approach for iOS

In 2022, I started working on the first version of the Bowling Companion for iOS. Mostly I was looking for a new native iOS Swift project to work on, while I was working with React Native in my job. I had recently learned about [The Composable Architecture](https://github.com/pointfreeco/swift-composable-architecture), had some experience building with SwiftUI, and decided to go all in on both for this app.

With how old the Android app had become at this point, I knew I wanted to match its featureset, but I wouldn't be using its design for any inspiration. I relied on SwiftUI's default styling primarily, and built an all new UI for the app. This also gave me a chance to rethink the structure of the app from a UX perspective, moving some content to top-level tabs, but leaving the hierarchical nature of Bowlers > Leagues > Series > Games as the primary way users would interact with the app.

Overall, the Bowling Companion for iOS would take me just under a year to build. It wasn't until March of 2023 that I settled on the name "Approach", and the first version of the iOS app would release in September 2023.

![v1.0 of Approach for iOS, circa September 2023](/assets/posts/10-years-of-approach-ios-v1.0.png)

<figcaption>v1.0 of Approach for iOS, circa September 2023</figcaption>

## Jetpack Compose and building Approach for Android

During the process of building Approach for iOS, Google announced that they would be removing unsupported apps from the Play Store, and any app that wasn't targeting at least SDK 32 (_I think_) would become unavailable to new users. Of course, as mentioned above, the Bowling Companion only targeted SDK 28, and quite a bit had happened in the ~4 years since its release.

Some of the major hurdles I encountered when thinking about how to address this were:

- Kotlin, and especially Kotlin's Coroutines, had undergone a major version update with breaking changes
- Views were no longer the default recommended by Google, and Jetpack Compose was now preferred
- The Charts library I was using, [MPAndroidChart](https://github.com/PhilJay/MPAndroidChart) had not been updated in some time and was likely abandoned.

Once again, I would lean on my trusty tool, **the rewrite**. This would now be the SIXTH time I had written the Bowling Companion from scratch, leaning on years of lessons and inspiration, to create what I think is by and far the best version of the app that's ever existed.

This rewrite ended up taking just over a year to complete, and Approach for Android was first released in September 2024, with feature parity to the iOS app!

![v4.0 of Approach for Android, circa September 2024](/assets/posts/10-years-of-approach-android-v4.0.png)

<figcaption>v4.0 of Approach for Android, circa September 2024</figcaption>

## Current State of Affairs

As of writing (April 2025), Approach is two native apps, for iOS and Android. Features are generally built in parity, and released in unison!

The iOS app is built with [TCA](https://github.com/pointfreeco/swift-composable-architecture) and [SwiftUI](https://developer.apple.com/xcode/swiftui/). It supports iOS 17 and 18. There are 138 modules, including 36 feature modules, 15 repositories, 19 services, and 34 libraries.

The Android app is built with [Jetpack Compose](https://developer.android.com/compose), MVVM, and follows Google's recommended (as of 2025) layered architecture. It supports SDKs 26 and higher, and targets SDK 35. There are 92 modules, including 20 core modules, 36 feature modules, and 36 feature UI modules.

In total, in the [repository](https://github.com/autoreleasefool/approach) there have been 3,986 commits to `main`, averaging just over 1 commit per day! From a clean clone, [cloc](https://github.com/AlDanial/cloc) reports 65,526 lines of Swift across 902 files and 66,347 lines of Kotlin across 901 files. In total, it reports 161,776 lines of "code", but that includes SVGs, some generated localizations, and some template files.

![Approximate percentage of the codebase which is Swift vs Kotlin. Swift shows 49.9%, Kotlin is 49.3%, and "Other" is 0.8%](/assets/posts/10-years-of-approach-languages.png)

<figcaption>Approximate percentage of the codebase which is Swift vs Kotlin. Swift shows 49.9%, Kotlin is 49.3%, and "Other" is 0.8%</figcaption>

See you in another 10 years! Maybe I'll be talking about [Kotlin Multiplatform](https://android-developers.googleblog.com/2024/05/android-support-for-kotlin-multiplatform-to-share-business-logic-across-mobile-web-server-desktop.html), [Skip](https://skip.tools/), or something as of yet unreleased!
