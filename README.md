# Piano Buddy 🎹

A modern web application for learning piano through interactive music sheet visualization and playback. Built with Vue 3, TypeScript, and RxDB.

![Piano Buddy](./public/screenshot-playalong.png)

Use it online, for free, with no tracking or whatsoever: [🔗Piano Buddy](https://piano-buddy.netlify.app/)

## Features 🌟

- **Interactive Music Sheet Display**: Visualize sheet music using OpenSheetMusicDisplay
- **Colored Note Visualization**: Each note is color-coded for easier learning
- **Part Selection**: Support for multiple instrument parts in a single sheet
- **Pre-configured songs and upload feature**: Save and manage your music by either uploading a MusicXML file (there are
  many free "community sheets" at [MuseScore](https://musescore.com/sheetmusic/free-download) ). or selecting a
  pre-configured song from a library 📚
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack 💻

- **Frontend Framework**: Vue 3 with TypeScript
- **Router**: Vue Router
- **Database**: RxDB with IndexedDB storage
- **Music Sheet Rendering**: OpenSheetMusicDisplay
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started 🚀

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/piano-learning-app.git
   cd piano-learning-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure 📁

```
piano-learning-app/
├── src/
│   ├── components/         # Vue components
│   │   ├── layout/        # Layout components
│   │   ├── playalong/     # Playalong visualization
│   │   └── sheet/         # Music sheet components
│   ├── composables/       # Vue composables
│   ├── services/          # Business logic services
│   │   ├── parsers/       # MusicXML parsing
│   │   └── validators/    # Data validation
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── views/            # Page components
├── public/               # Static assets
└── tests/               # Test files
```

## Features in Detail 🎯

### Music Sheet Display

- Renders MusicXML files using OpenSheetMusicDisplay
- Supports multiple parts and voices
- Automatic page layout and scaling

### Note Visualization

- Color-coded notes for easier learning
- Dynamic width based on note duration
- Visual distinction between notes and rests
- Responsive layout with automatic line breaks

### Database Management

- Local storage using RxDB
- Automatic synchronization
- Offline-first architecture
- CRUD operations for music sheets

## Contributing 🤝

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 👏

- [OpenSheetMusicDisplay](https://opensheetmusicdisplay.org/) for music sheet rendering
- [RxDB](https://rxdb.info/) for local database management
- [Vue.js](https://vuejs.org/) for the reactive framework
- All contributors who have helped shape this project

## Support 💪

If you find this project useful, please consider giving it a star ⭭ on GitHub!
