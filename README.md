# Nuxt 3 Company Chatbot

An AI-powered chatbot that answers questions about your company using OpenAI's GPT-4 and company-specific data.

## Features

- 🤖 AI-powered responses using GPT-4
- 💬 Real-time chat interface
- 🎨 Clean UI with Tailwind CSS
- 📊 Company data integration
- ⚡ Built with Nuxt 3

## Prerequisites

- Node.js 16.x or later
- OpenAI API key

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your OpenAI API key:
```bash
NUXT_OPENAI_API_KEY=your_api_key_here
```

> ⚠️ **Important**: Never commit your `.env` file or expose your API key publicly!

## Development

Start the development server:
```bash
npm run dev
```

## Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Configuration

### Company Data
Update the company information in `data/companyData.json` to customize the chatbot's knowledge base.

### Environment Variables
Required environment variables:
- `NUXT_OPENAI_API_KEY`: Your OpenAI API key

## License

MIT License