# Migrating SEO pages to NextJS

<img src="/img/sh-next.png"  alt="Spothero x Next as an image">

## Introduction
Recently the Drivers Acquisitions squad, the team that focuses on how we acquire new drivers at SpotHero, undertook the project of migrating our primary SEO pages over to Nextjs. This is the why, the how, and the results of this endeavor.

## The Why – History of Frontend at SpotHero
When SpotHero was in its infancy, our frontend was built off Django. Having everything as a monolith was beneficial for us in our early years, but as we grew this became less tenable.

We slowly migrated pages away from the monolith. At this point, the only things remaining within are 404 pages, account-settings, and a few others.

The repo `consumer-web` is our home for most of the consumer facing products. Here at SpotHero, we have both drivers and operators who are our users, drivers primarily leveraging `consumer-web`. This application encases SEO, Search, and Checkout. Each of these use cases has different needs. Last year while evaluating how to optimize our SEO, we decided to break out these pages into their own micro-frontend that leverages Nextjs. This migration would enable us to:

1. Allow for increased page speed and lighthouse scores from built-in next optimizations
2. Quickly experiment to best optimize page speed and lighthouse
3. Abstract Webpack code to lead to easier building

We needed to be conscious of not allowing downtime during this rollout and making it as seamless as possible for devs and users.

## The How – Lifting and Shifting our way to City pages
Once we decided to migrate to Nextjs the primary question still outstanding was – Do we want to leverage [Static Site Generation (SSG)](https://nextjs.org/docs/basic-features/static-file-serving), [Incremental Site Regeneration (ISR)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration), or [Server Side Rendering (SSR)](https://nextjs.org/docs/deployment) for our site rendering.

To enable us to hit our deadlines we opted to go with SSG. This would mean we needed to:

* Setup the pages in Nextjs
* Setup an AWS s3 website to serve the pages
* Setup AWS Cloudfront to route calls to [spothero.com](https://spothero.com) over to the Nextjs pages

## Building Pages in Nextjs
<img src="/img/patrick.png"  alt="Patrick star from spongebob is reactjs and buff majin buu from dragon ball is nextjs">

At the start of this, we opted to go with our [city pages](https://spothero.com/city/chicago-parking) first as there were minimal pages (when compared to destinations which had 22k + pages). This allowed us to have a bit more restrained scope. We would generate the city pages based on two core api calls – one to our /cities api to find all of the city data and one to our CMS ([Prismic](https://prismic.io/)) to get our created markup for the page. By using these two api calls, we could generate all props for these pages and pass the data down statically into the component that we had used previously in consumer-web.

The old component was built using Redux, but going in we had a design philosophy to break away from that wherever possible. To accomplish this refactoring was needed for these pages. Luckily we were able to pass most data down from the `getStaticProps` and if not leverage React Context API to pass the data around.

On these pages we opted to render the CMS content and spit out the pages, then follow up with the ability to search on the page. This allowed us to move quickly and start generating the pages in a few days. Once the foundation was laid, we worked on the search widget on the page. The search widget posed an interesting issue due to consumer-web being a single-page-app that would pass all the relevant data over to search to be leveraged. Search is driven by query parameters within the url, enabling us to turn the Search CTA into a button that would generate the needed search URL to be passed and allow the users to transition over to consumer-web none the wiser.

## Website configuration
As Nextjs would export raw html/js/css files we could serve them as a [static site with s3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html). Due to this we needed to bypass our monolith routing and serve it via [AWS Cloudformation](https://aws.amazon.com/cloudformation/). In short, we would create a rule for /city/* that would forward to our Nextjs pages. For example, if a city page for Chicago should exist, the path would be an html file in our AWS s3 bucket and AWS Cloudformation would route to that page. Alternatively, if we were to have Ann Arbor, MI as a city (we don’t currently), it would route to cf then default back to our 404 due to the page not existing.

## The Results
Once all the lifting was done, we had our city pages on prod! Wins included:

* NextJs Homepage migration leads to +15 page performance score boost
* Google considers 97% of our Mobile URLs as good urls (up from 0.7% in 2021!)
* SEO Improvements are helping us save an estimated $1M+ per year on acquisition costs

The dev team had this to say on the experience of working with Nextjs:

>The migration to next reminded me how great it is to just break things and get them working again without concern of breaking the whole site. I could test, iterate, and see results much faster after moving to this green space environment.
>\-Max Rashes

>Using Next has helped improve our developer experience immensely, and has allowed our team to focus more specifically on how best to build our application. Working within the Next ecosystem has also allowed us to greatly reduce our dependency on third-party packages like Redux and React-Router.
>\-Nathan Caraker

## Future State
Acquisitions Web went on to launch our homepage, /airport/\*, /destination/\*, and /category/\*

While we did launch with Static Site Generation, we found the need to migrate over to SSR due to the number of pages. Once we incorporated /destinations/* pages, it resulted in over an hour build time (due to the 22k pages and growing). While we did lower the scope of local and sandbox builds so they could be built within 10 minutes – build times were still really high so we opted to migrate over to a combination of Incremental Site Regeneration and Server Side Rendering to help and support this.

Conclusion
By integrating Nextjs to our SEO pages we have seen huge gains in rankings and crawl-ability. We as a dev team have been able to move quickly, fail fast, and iterate allowing us to deliver the best possible product to our customers. As a team we are looking forward to continuing our journey with Nextjs.