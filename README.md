# strapi-plugin-indexnow

Zero-dependency **Strapi 5** lifecycle plugin that automatically dispatches [IndexNow](https://www.indexnow.org/) URL pings to Bing, Yandex, and Naver whenever a `Post`, `Project`, or custom collection entry is published.

## Installation (Strapi 5)

```bash
npm install strapi-plugin-indexnow
# or
pnpm add strapi-plugin-indexnow
```

Enable the plugin in `config/plugins.ts`:

```ts
export default ({ env }) => ({
  indexnow: {
    enabled: true,
    config: {
      host: env("INDEXNOW_HOST", "istiakahamed.com"),
      apiKey: env("INDEXNOW_API_KEY"),
    },
  },
});
```

Add `INDEXNOW_API_KEY` to your Strapi `.env` and place `<INDEXNOW_API_KEY>.txt` in your frontend `public/` folder.

## License

MIT — Istiak Ahamed (`istiakahamed.com`)
