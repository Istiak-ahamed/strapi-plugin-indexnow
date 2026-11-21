"use strict";

module.exports = {
  register({ strapi }) {
    const config = strapi.config.get("plugin::indexnow", {});
    const watchedUids = new Set(config.uids || ["api::post.post", "api::project.project"]);

    strapi.documents.use(async (context, next) => {
      const result = await next();
      if (
        watchedUids.has(context.uid) &&
        (context.action === "publish" || context.action === "update") &&
        config.apiKey &&
        config.host
      ) {
        const slug = context.params?.data?.slug;
        if (slug) {
          const prefix = context.uid === "api::project.project" ? "/work/" : "/blog/";
          const url = `https://${config.host}${prefix}${slug}/`;
          fetch("https://api.indexnow.org/indexnow", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
              host: config.host,
              key: config.apiKey,
              keyLocation: `https://${config.host}/${config.apiKey}.txt`,
              urlList: [url],
            }),
          }).catch((err) => strapi.log.warn(`[indexnow] ${err.message}`));
        }
      }
      return result;
    });
  },
};
