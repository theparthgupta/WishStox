# WishStox MVP - 2-Day Stock Analysis Platform

A rapid MVP implementation of WishStox combining stock data, technical indicators, and news sentiment analysis built in 2 days.

## 🚀 Features

### ✅ Current MVP Features (Day 1-2)
- **Stock Analysis**: Real-time stock quotes and analysis
- **Technical Indicators**: Simple Moving Average (SMA) crossover signals
- **News Sentiment**: AI-powered sentiment analysis of recent news
- **Combined Recommendations**: Smart buy/sell/hold signals
- **Responsive UI**: Works on desktop and mobile
- **Real-time Data**: Live stock prices and news updates

### 🔮 Coming Soon
- Portfolio tracking and management
- Advanced technical indicators (RSI, MACD, Bollinger Bands)
- Price alerts and notifications
- Social media sentiment analysis
- Risk assessment tools
- Paper trading simulation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **APIs**: 
  - Finnhub (stock data & news)
  - Alpha Vantage (historical data)
- **Deployment**: Vercel (frontend), Railway/Render (if needed)

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- Free API keys from:
  - [Finnhub](https://finnhub.io/register) - 60 calls/minute free
  - [Alpha Vantage](https://www.alphavantage.co/support/#api-key) - 25 calls/day free

## 🚀 Quick Start (5 minutes)

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd wishstox
npm install
```

### 2. Environment Setup
```bash
# Copy the environment template
cp .env.example .env.local

# Edit .env.local with your API keys
nano .env.local
```

Required environment variables:
```env
NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_api_key_here
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📱 How to Use

1. **Access the Dashboard**: Navigate to `/dashboard`
2. **Enter Stock Symbol**: Type any US stock symbol (e.g., AAPL, TSLA, MSFT)
3. **Get Analysis**: Click "Analyze Stock" to get:
   - Current price and change
   - Technical buy/sell/hold signal
   - News sentiment analysis
   - Final AI recommendation
   - Recent news headlines

## 🏗️ Project Structure

```
wishstox/
├── app/
│   ├── api/stock-analysis/     # Stock analysis API endpoint
│   ├── dashboard/              # Main analysis dashboard
│   └── main/                   # Original main dashboard
├── components/
│   ├── stock-analyzer.tsx      # Main stock analysis component
│   └── ui/                     # Reusable UI components
└── lib/                        # Utility functions
```

## 🔧 API Endpoints

### POST /api/stock-analysis
Analyzes a stock symbol and returns comprehensive analysis.

**Request:**
```json
{
  "symbol": "AAPL"
}
```

**Response:**
```json
{
  "symbol": "AAPL",
  "currentPrice": 150.25,
  "change": 2.15,
  "changePercent": 1.45,
  "technicalSignal": {
    "signal": "BUY",
    "strength": "STRONG",
    "reason": "5-day SMA is above 20-day SMA with upward momentum"
  },
  "sentiment": {
    "score": 0.25,
    "label": "POSITIVE",
    "newsCount": 5
  },
  "finalRecommendation": "STRONG BUY",
  "explanation": "Based on technical analysis and positive news sentiment..."
}
```

## 💡 Algorithm Logic

### Technical Analysis
- **5-day SMA vs 20-day SMA**: Classic crossover strategy
- **BUY Signal**: 5-day SMA > 20-day SMA + price above 5-day SMA
- **SELL Signal**: 5-day SMA < 20-day SMA + price below 5-day SMA
- **Signal Strength**: Based on the percentage difference between SMAs

### Sentiment Analysis
- **News Collection**: Last 7 days of company news
- **Keyword Analysis**: Positive/negative word counting
- **Scoring**: Normalized sentiment score (-1 to +1)

### Final Recommendation
- **STRONG BUY**: Strong technical BUY + Positive sentiment
- **BUY**: Technical BUY signal (regardless of sentiment)
- **HOLD**: Mixed or weak signals
- **SELL**: Technical SELL signal
- **STRONG SELL**: Strong technical SELL + Negative sentiment

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Manual Deployment
1. Build the project: `npm run build`
2. Upload `/.next` folder to your hosting provider
3. Set environment variables
4. Start with: `npm start`

## 📊 API Rate Limits & Costs

### Free Tier Limits
- **Finnhub**: 60 calls/minute (sufficient for MVP)
- **Alpha Vantage**: 25 calls/day (limiting factor)

### Recommendations
- For production: Upgrade Alpha Vantage to premium ($25/month for 500 calls/day)
- Implement caching to reduce API calls
- Consider alternative data providers for scaling

## 🔄 MVP Development Timeline

### Day 1 (Backend & Core Logic)
- ✅ API integration (Finnhub, Alpha Vantage)
- ✅ Technical analysis logic (SMA crossover)
- ✅ News sentiment analysis
- ✅ Combined recommendation engine
- ✅ REST API endpoint

### Day 2 (Frontend & Polish)
- ✅ React components for stock analysis
- ✅ Responsive UI with Tailwind CSS
- ✅ Error handling and loading states
- ✅ Integration testing
- ✅ Deployment preparation

## 🐛 Known Limitations (MVP)

- **Data Limits**: Alpha Vantage free tier limits historical data calls
- **Simple Sentiment**: Basic keyword-based sentiment (not ML-based)
- **No Persistence**: Analysis results aren't saved
- **Single Stock**: Analyze one stock at a time
- **US Markets Only**: Currently supports US stocks only

## 🎯 Next Steps (Post-MVP)

1. **Week 1**: Add portfolio tracking and watchlist
2. **Week 2**: Implement advanced technical indicators
3. **Week 3**: Add price alerts and notifications
4. **Week 4**: Integrate ML-based sentiment analysis
5. **Month 2**: Add options analysis and risk metrics

## 🤝 Contributing

This is an MVP built in 2 days. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this code for your own projects!

## 🆘 Support

Having issues? Check:
1. API keys are correctly set in `.env.local`
2. You have internet connection for API calls
3. Stock symbols are valid US symbols
4. API rate limits haven't been exceeded

For support, open an issue in the GitHub repository.

---

**Built with ❤️ in 2 days as an MVP - Ready for users who surpass the waitlist!**
