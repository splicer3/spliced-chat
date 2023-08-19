# [Spliced](https://spliced-chat.vercel.app)

A **real-time chat web application** made from scratch using **Prisma**, **MongoDB**, **Next13** and **TailwindCSS**.

<p align="center">
<img src="https://user-images.githubusercontent.com/104271382/237925682-89be2835-2732-4574-aa30-cdeb7ad6d52f.png" alt="LogoFull-Blue" style="max-width: 100%; width:300px; height:300px;">
</p>

## How to run

You will need to provide a `.env` file containing your own **environment variables** to get this running. The environment variables are:  
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

- NEXT_PUBLIC_PUSHER_APP_KEY
- PUSHER_APP_ID
- PUSHER_SECRET
- GITHUB_ID
- GITHUB_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

Then `git clone` this repo, `npm install` and `npm run dev` to get it running on localhost:3000.  
The database url needs to be a mongoDB one, unless you want to change the prisma configuration. Github and Google keys are easy to get by going respectively on your own Github profile's developer settings and Google's Cloud dashboard.  
The Pusher keys need a Pusher account, which is free at the time of writing this.

## How it works

**Spliced** is heavily inspired by the likes of Messenger, *while not reaching it's full scope due to it being just a side project*. It features way more features other than **real-time messaging**, such as:
- Curated but simple **UI** with light/dark mode synced with the device
- **Real-time online statuses**
- **Real-time read receipts**
- Image messaging using **Cloudinary**
- **Group creation**
- **State-of-the-art message box** that expands with your message and fully supports line breaks using SHIFT+ENTER on desktop, or just ENTER on mobile.
- User deletion of conversations


## Purpose

**Spliced** is a *personal project* to put on my **portfolio**.  
The goal was to learn more about **mongoDB** and **Prisma**, to include them in my future stack.  
The experience gained with **Pusher** will also surely prove beneficial, as real-time communication is now the industry standard.
