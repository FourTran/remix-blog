# Welcome to Blog!

Remix-Blog is a blog template built using remix ,Vite , prisma, mongodb and TailwindCSS.  You can clone it and start your own blog in a few minutes. Check out the documentation below to get started.

If you face any issues or have any suggestions, please open an issue!

## Development

Once you've created the project you have to install the dependencies:

```shellscript
npm install
```

Configuration
make sure you change value in .env 

```shellscript
DATABASE_URL=
SESSION_SECRET=
```

Init database
```shellscript
npx prisma db push

npx prisma db seed

```


Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
