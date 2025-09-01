# BikeHub - Premium Motorcycle Website

A modern, responsive motorcycle website built with React, featuring dark/light mode toggle, premium design, and a complete frontend/backend architecture.

## Features

### Frontend
- **Modern React Architecture**: Component-based design with proper separation of concerns
- **Context API**: Global theme management for dark/light mode switching
- **Responsive Design**: Optimized for all device sizes with Tailwind CSS
- **Premium UI/UX**: Apple-level design aesthetics with smooth animations
- **Interactive Components**: Hover effects, micro-interactions, and transitions
- **Theme Toggle**: Seamless dark/light mode switching with local storage persistence

### Backend
- **Express.js API**: RESTful API with proper routing structure
- **Modular Architecture**: Organized routes, controllers, and models
- **Sample Data**: Mock data for bikes, accessories, and user operations
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Cross-origin resource sharing enabled

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Lucide React (Icons)
- Context API
- Local Storage

### Backend
- Node.js
- Express.js
- CORS
- Environment Variables

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── context/          # React Context providers
│   │   ├── pages/            # Page components
│   │   └── assets/           # Static assets
├── backend/
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Route controllers
│   │   └── models/           # Data models
└── README.md
```

## Key Components

### Frontend Components
- **Header**: Navigation with theme toggle and responsive menu
- **Hero**: Impressive landing section with motorcycle showcase
- **BikeCollection**: Featured motorcycles with ratings and pricing
- **Accessories**: Premium motorcycle accessories gallery
- **Testimonials**: Customer reviews and feedback
- **Newsletter**: Email subscription with form handling
- **Footer**: Comprehensive site links and contact information

### Backend API Endpoints
- `GET /api/bikes` - Fetch all motorcycles with filtering
- `GET /api/bikes/:id` - Get specific motorcycle details
- `GET /api/accessories` - Fetch all accessories
- `POST /api/users/newsletter` - Newsletter subscription
- `POST /api/users/test-ride` - Test ride booking
- `POST /api/users/contact` - Contact form submission

## Theme System

The website features a comprehensive dark/light mode system:
- **Automatic Detection**: Respects user's system preference
- **Manual Toggle**: Easy switching with theme button
- **Persistent Storage**: Remembers user preference
- **Smooth Transitions**: Animated theme changes
- **Full Coverage**: All components support both themes

## Design Features

- **Color System**: Professional color palette with multiple shades
- **Typography**: Proper hierarchy with readable fonts
- **Spacing**: Consistent 8px spacing system
- **Animations**: Subtle micro-interactions and hover effects
- **Responsive**: Mobile-first design approach
- **Accessibility**: Proper contrast ratios and ARIA labels

## Getting Started

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
```

## API Usage Examples

### Get All Bikes
```javascript
const response = await fetch('/api/bikes?category=sport&sort=price-low');
const data = await response.json();
```

### Subscribe to Newsletter
```javascript
const response = await fetch('/api/users/newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
});
```

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication and profiles
- Payment gateway integration
- Real-time chat support
- Advanced filtering and search
- Admin dashboard
- Mobile app version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.