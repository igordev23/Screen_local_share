

# Local Screen Sharing Application

A real-time screen sharing application built with Next.js, WebRTC, PeerJS and Electron. Create or join rooms to share your screen with others instantly **on the same local network**.

## ✨ Features

- Real-time screen and audio sharing
- Room-based sharing system
- Cross-browser support
- Simple and intuitive interface

## 📱 Device Support

- **Hosting**: Desktop/laptop browsers **on the same local network only**
- **Viewing**: Works on all devices (desktop, tablet, mobile) connected to the same network


## 🌐 Browser Support

| Browser             | Screen Sharing | Audio Sharing                |
| ------------------- | -------------- | ---------------------------- |
| **Google Chrome**   | ✅             | ✅ (Only when sharing a tab) |
| **Microsoft Edge**  | ✅             | ✅ (Only when sharing a tab) |
| **Mozilla Firefox** | ✅             | ❌                           |
| **Apple Safari**    | ✅             | ❌                           |

### Important Notes

- For audio sharing to work, users have to select the **tab option** when sharing in **Google Chrome** or **Microsoft Edge**.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [PeerJS](https://peerjs.com/) - WebRTC abstraction
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Electron](https://www.electronjs.org/) - Desktop wrapper for cross-platform applications

## 🚀 Getting Started

First, clone the repository:

```bash
git clone https://github.com/igordev23/Screen_local_share.git
```

Navigate to the project directory:

```bash
cd Screen_local_share
```

### Using npm

Install the dependencies:

```bash
npm install
```

Build the project for the first time:

```bash
npm run build 
```

After building, you can run the Electron app with:

```bash
npm run electron
```

To create a standalone executable with Electron, run:

```bash
npm run dist
```

### Using Docker

Start the development container:

```bash
docker compose up
```

## 🙏 Credits

This project is based on the original repository [screen-sharing](https://github.com/tonghohin/screen-sharing) by [Hin](https://github.com/tonghohin).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  
The original project is also under the MIT License.
```

