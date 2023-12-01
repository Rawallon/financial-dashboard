# Financial Dashbord - Technical Challenge


This project is a financial dashboard that allows users to analyze balances, revenues, expenses, pending transactions, and transaction history. It provides an intuitive and user-friendly interface for effective financial monitoring.

## Demo

<a title="Deployed with Vercel" href="https://financial-dashboard-cyan.vercel.app/">
<img alt="Deployed with Vercel" src="https://img.shields.io/badge/Deployed%20with%20Vercel-%23000?style=plastic&logo=vercel&logoColor=white" width="200px" />
</a> 

## Introduction

The Financial Dashboard is a web application built using Next.js and TypeScript. It leverages various technologies and libraries to create a responsive and interactive dashboard for financial data analysis.

## Features

- **User Authentication:** Includes a secure login page and a protected dashboard accessible only after successful authentication.
- **Dynamic Filters:** Allows users to apply filters globally, dynamically updating the dashboard content based on the selected filters.
- **Summary Cards:** Displays summarized information on revenues, expenses, pending transactions, and total balance.
- **Interactive Charts:** Utilizes charts to visually represent transaction data. You can choose to display data in stacked bar charts and line charts.
- **Transaction Filtering:** Enables users to filter transactions based on dates, accounts, industries, and states.

## Getting Started

### Installation

Clone the repository:

```bash
git clone https://github.com/Rawallon/financial-dashboard/
```
Navigate to the project directory:

```bash
cd financial-dashboard
```
Install dependencies:

```bash
npm install
```
### Usage
Start the development server:

```bash
npm run dev
```
Open your browser and navigate to http://localhost:3000.

## Testing

The project includes partial test coverage as a demonstration of testing proficiency for this technical challenge. While not achieving full 100% coverage, specific parts have been tested to showcase an understanding of writing effective tests.

Given the nature of this technical challenge and its evaluative purpose for hiring, the focus has been on illustrating key testing concepts rather than aiming for comprehensive coverage.

To run the existing tests, you can use the following command:

```bash
npm run test
```

## Dependencies

The project relies on the following dependencies:

- `heroicons`: SVG icon library for React components.
- `chart.js`: Simple yet flexible JavaScript charting library.
- `cookie`: HTTP cookie library for browsers and Node.js.
- `jose`: JSON Object Signing and Encryption library.
- `jsonwebtoken`: JSON Web Token implementation.
- `next`: React framework for server-rendered applications.

## Development Dependencies

Development dependencies include tools and libraries used during development:

- [`daisyUi`](https://daisyui.com/): Tailwind CSS component library.
- [`tailwind`](https://tailwindcss.com/): Utility-first CSS framework.

### Code tidying

- `eslint`: ESLint linter for JavaScript and TypeScript.
- `prettier`: Opinionated code formatter.
- `@typescript-eslint/eslint-plugin`: ESLint plugin for TypeScript.
- `@testing-library/react`: React testing utilities for Jest.
- `jest`: JavaScript testing framework.
- `ghooks`: Git hooks manager.
- `postcss`: Tool for transforming styles with JavaScript plugins.
- `autoprefixer`: PostCSS plugin to parse CSS and add vendor prefixes.
- `lint-staged`: Run linters on pre-committed files.
