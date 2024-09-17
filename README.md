# Today I Learned - AI-Powered Learning Assistant

Today I Learned is an AI-powered learning support tool that helps you record daily discoveries, interact with AI, and track your learning progress.

## Features

- Ask AI: Interact with an AI assistant to get answers on any topic.
- Automatic Learning Summary: Summarize and organize your learnings from AI interactions.
- Learning Dashboard: Visualize your daily learning progress and growth.
- User Authentication: Secure sign-in with Google.

## Technology Stack

- [Next.js](https://nextjs.org/): React framework for building the frontend and API routes.
- [Firebase](https://firebase.google.com/): Authentication and Firestore database.
- [OpenAI](https://openai.com/): AI-powered chat functionality.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for styling.
- [Chart.js](https://www.chartjs.org/): Creating interactive charts for the dashboard.

## Getting Started

1. Clone the repository:

```
git clone https://github.com/yourusername/today-i-learned.git cd today-i-learned
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id OPENAI_API_KEY=your_openai_api_key
```

4. Run the development server:

```
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

<a href="https://www.buymeacoffee.com/kromiii" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
