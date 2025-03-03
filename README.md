# Infinite Post Feed

This is a NextJS app router app displaying a post feed with infinite loading.
I've used [Convex](https://convex.dev/) as the backend. New posts can be triggered from the command line.
For state management, I'm using Redux with Redux Toolkit and RTK Query.
UI components are generated with [shadcn/ui](https://ui.shadcn.com/) and styled with Tailwind CSS.

## Main features

- The first page of the feed and single posts are first rendered on the server for good SEO and to display them as soon as possible.
- I avoided double fetching by hydrating the Redux store with the posts from the server.
- The app notifies the use when a new post arrives, adds it to the feed and highlights it with a short animation.
- The app has almost perfect Lighthouse scores.
- The UI is made accessible by using semantic HTML and proper roles.
- UI components are documented using Storybook. The Storybook a11y plugin helps to catch accessibility issues.
- Unit tests are written using Vitest and @testing-library.
- The app is linted using ESLint.
- Production bundle size is minimal, thanks to NextJS splitting the code based on routes.

## Running the app

### Getting started

Run `npm install` to install the dependencies.

### Development

Run `npm run dev` to start the Convex server and the NextJS development server.
Run `npm run storybook` to start the Storybook server.

### Production

Run `npm run build` to build the app for production.
Run `npm run start` to start the NextJS server.

## Triggering new posts

To trigger a new post run `npm run generate-post`.

## Testing

Run `npm run test` to run the Vitest tests.
Run `npm run lint` to run ESLint.
