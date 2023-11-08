import postcss from "lume/plugins/postcss.ts";
import lume from "lume/mod.ts";
// import toc from "https://deno.land/x/lume_markdown_plugins@v0.6.0/toc.ts";
// import title from "https://deno.land/x/lume_markdown_plugins@v0.6.0/title.ts";
// import image from "https://deno.land/x/lume_markdown_plugins@v0.6.0/image.ts";
// import footnotes from "https://deno.land/x/lume_markdown_plugins@v0.6.0/footnotes.ts";


const site = lume();
site.copy("img");
site.use(postcss())
site.copy("styles");

// site.use(toc());
// site.use(title());
// site.use(image());
// site.use(footnotes());


export default site;
