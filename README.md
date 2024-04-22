## Project Information

The Nutrition Nexus is a project by Alana Walters, Jaidyn Holt, and Hailey Pham for COP3530 Data Structures and Algorithms, April 2024. The program is a web-based [next.js](https://nextjs.org/) program bootstrapped with ['create-next-app'](https://github.com/vercel/next.js/tree/canary/packages/create-next-app),  written in javascript, javascript XML (the React extension to javascript allowing HTML), and CSS. This project uses ['next/font'](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## About

Nutrition Nexus finds the most compatible recipes for a person or multiple people according to their preferences, diets, and allergies!
It is often difficult to find food that is within the restrictions of a certain diet, especially if you are trying to eat or cook with other people. People also have different levels of dietary restriction to account for. This program aims to help with this!

The project supports the creation and editing of multiple profiles, each with a custom name and food preferences associated as well as diet and health options which can be individually custom rated on a scale from 0 to 5 depending on the user’s degree of strictness. For example, if the user rates peanut-free as 5, they are strictly peanut free, suggesting a severe peanut allergy.
The program uses the [Edamam Recipe Search API](https://developer.edamam.com/edamam-recipe-api) for the recipe database. Upon generating results, the API handles fetching recipes from its database that meet all the profiles’ food preferences. A rating is calculated for each of these recipes according to the combined profiles’ diet and health rankings. For example, if the first profile specified peanut-free as 5 and the recipe is not peanut-free, 5 is deducted from the recipe’s rating. In addition, the user can specify whether more or less calories and ingredients should be given weight, and this will also affect the recipes’ ratings.
Finally, heapsort and mergesort are applied to sort the recipes by their rating, and the sorted recipes are displayed in this order, by most compatible recipes for all profiles.


## Getting Started

First, run the development server (note you may need to install [Node.js](https://nodejs.org/en) first):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/home](http://localhost:3000/home) with your browser to see the program.


## Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
