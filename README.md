# My (Your) First Basic Website

👋 Hi there! I’m <span style="color:purple">Lavi</span>, a 19-year-old woman taking her first steps in the tech world.

👩‍💻 I’m currently <span style="color:blue">studying C at 42 School in Rome</span> — an intense and enriching coding school found in cities all around the world. Its curriculum is focused on deep learning of the C language (with some basics of C++).

While I find C fascinating and love diving deep into it, I started to feel like I was missing out on other programming languages used for very different purposes.

🔍 That’s when I decided to explore the basics of <span style="color:orange">**Node.js**</span>, as I’ve always been intrigued by <span style="color:orange">back-end development</span>. This is how the <span style="color:orange">`server/`</span> part of this little project was born.

As I added more features to my back end — which started as a simple server with key *user-related APIs* — I found it harder to test my routes server-side only. That’s when I realized I wanted to build a <span style="color:pink">**front end**</span> as well.

👀 Choosing which language or framework to learn next wasn’t too hard. I had heard about <span style="color:pink">**React**</span> so many times that it felt counterintuitive *not* to consider it. After a little guidance from ChatGPT, I started reading the React documentation — and that’s how the <span style="color:pink">`client/`</span> part of this project started taking shape.

---

🎯 In this README, I’ll walk through the key concepts I’ve learned so far in both <span style="color:orange">**Node**</span> and <span style="color:pink">**React**</span>. If you’re someone starting from scratch like I did, I hope this gives you a general idea of the kinds of cool things you’ll learn — and maybe even a virtual companion on your journey.

**Enjoy ✨**

## 🪜 Project Structure

<pre><code>my-first-basic-website/ 
├── client/ # React front end 
├── server/ # Node.js back end 
└── README.md # You're reading it! </code></pre>


## ⚙️ How to Run

### 1. Clone the repository
```bash
git clone git@github.com:gcclaviiovino/my-first-basic-website.git
cd my-first-basic-website
```
### 2. Run the project

For the **first time** (install folder `dependencies` first!)
```bash
cd server && npm install
cd ../client && npm install
cd ..
```
✅ Now you're all set!

For **every time**
```bash
npm install
npm start
```
🚀 Now the project has launched!

> ℹ️ **Info:** The front end runs on Vite (port 5173 by default), and the back end runs on Express (port 3000). Both processes are started at the same time when running `npm start` thanks to a script in package.json file at the root of the project!

