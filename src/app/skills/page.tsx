import { Timeline } from "@/components/ui/timeline";
import React from "react";

function page() {
  const skillsData = [
    {
      title: "NextJS",
      content: (
        <div className="text-lg text-center">
          I have hands-on experience building full-stack web applications using
          Next.js, a powerful and flexible React framework that enables the
          creation of high-performance, scalable, and SEO-friendly websites.The
          website you are looking at right now, is made using NextJS and
          TypeScript. I regularly take advantage of Next.js features like
          server-side rendering (SSR), static site generation (SSG), and
          incremental static regeneration (ISR) to optimize performance and
          ensure fast load times across different devices and networks. With its
          file-based routing system, Next.js simplifies navigation logic, while
          allowing dynamic and nested routes to be created effortlessly.
          I&apos;ve also used API routes in Next.js to build backend
          functionality directly within the same codebase, enabling faster
          development and easier deployment of full-stack features. In terms of
          styling and UI, I frequently integrate Tailwind CSS for utility-first
          design and enjoy the smooth developer experience Next.js offers,
          especially with its built-in support for TypeScript, automatic code
          splitting, and fast refresh during development. I&apos;ve deployed
          applications on platforms like Vercel, leveraging features such as
          custom domains, automatic builds, and edge functions to ensure my apps
          are fast and reliable. Overall, Next.js is one of my go-to tools when
          building production-ready applications. It allows me to focus on both
          performance and user experience while maintaining clean, modular code
          and following best practices in frontend architecture.
        </div>
      ),
    },
    {
      title: "ReactJs",
      content: (
        <div className="text-center text-lg">
          I have extensive experience using React.js to build dynamic,
          component-driven user interfaces for web applications. React&apos;s
          declarative nature and efficient rendering with the virtual DOM allow
          me to develop fast, responsive frontends with reusable components and
          clean architecture. I work comfortably with React Hooks, Context API,
          and custom hooks to manage state and side effects effectively. I also
          use libraries like React Router for routing and Framer Motion for
          animation to enhance interactivity. React forms the core of most of my
          projects, enabling me to build modern SPAs and scalable UIs with a
          focus on performance and maintainability.
        </div>
      ),
    },
    {
      title: "NodeJs",
      content: (
        <div className="text-center text-lg">
          I use Node.js to build efficient, non-blocking, event-driven backend
          services and APIs. With its asynchronous nature and powerful
          ecosystem, Node.js allows me to create scalable server-side
          applications using modern JavaScript. I&apos;m familiar with using
          npm/yarn, managing packages, and handling processes like file system
          operations, authentication, and third-party API integrations. Combined
          with Express and MongoDB, Node.js powers the backend of many of my
          full-stack projects, enabling smooth communication between frontend
          and backend systems.
        </div>
      ),
    },
    {
      title: "ExpressJs",
      content: (
        <div className="text-center text-lg">
          Express.js is my go-to framework for building RESTful APIs and
          server-side logic with Node.js. I&apos;ve used it extensively to
          handle routing, middleware integration, request validation, error
          handling, and connecting with databases like MongoDB. Express allows
          me to quickly scaffold backend services while maintaining flexibility
          and control over request/response handling. I structure Express
          applications in a modular way, keeping routes, controllers, and
          middleware organized and scalable for larger codebases. I&apos;ve also
          implemented features such as authentication (JWT/session-based), form
          handling, and file uploads using Express.
        </div>
      ),
    },
    {
      title: "MongoDB",
      content: (
        <div className="text-center text-lg">
          I use MongoDB as the primary NoSQL database for storing and managing
          application data in a flexible, JSON-like format. With MongoDB, I can
          easily design scalable data models that align with modern web
          applications. I&apos;m proficient in performing CRUD operations,
          designing schemas with Mongoose, and managing relationships between
          collections. I&apos;ve also implemented features such as data
          validation, indexing, and aggregation pipelines. MongoDB integrates
          seamlessly into my Node.js/Express stack, enabling fast development
          and real-time updates for dynamic applications.
        </div>
      ),
    },
    {
      title: "TypeScript",
      content: (
        <div className="text-center text-lg">
          TypeScript is a crucial part of my development workflow, providing
          static typing that greatly improves code reliability, maintainability,
          and scalability. I use TypeScript in combination with React and
          Node.js to write clean, well-documented code with strong type safety
          and better tooling support, such as autocompletion and error detection
          during development. I&apos;m comfortable with advanced TypeScript
          features like generics, utility types, and interfaces, and I regularly
          define precise type contracts for props, APIs, and data models to
          avoid runtime errors and enhance code quality across the entire stack.
        </div>
      ),
    },
    {
      title: "JavaScript",
      content: (
        <div className="text-center text-lg">
          JavaScript is the foundation of all my web development work. I have a
          deep understanding of modern ES6+ features such as destructuring,
          arrow functions, template literals, spread/rest operators,
          async/await, and modular imports/exports. I write clean, modular
          JavaScript code across both frontend and backend environments.
          I&apos;m also familiar with concepts like closures, the event loop,
          promises, and functional programming patterns. Whether it&apos;s
          manipulating the DOM, handling asynchronous operations, or integrating
          third-party APIs, I use JavaScript to bring interactivity and logic to
          life in my applications.
        </div>
      ),
    },
    {
      title: "TailwindCSS",
      content: (
        <div className="text-center text-lg">
          I use Tailwind CSS as my primary utility-first CSS framework to
          rapidly build modern, responsive, and highly customizable user
          interfaces. Tailwind&apos;s approach allows me to style directly
          within my components, leading to faster development and more
          maintainable code. I&apos;m comfortable working with utility classes
          for layout, spacing, typography, colors, and responsive breakpoints,
          enabling pixel-perfect designs without writing custom CSS from
          scratch. I&apos;ve also leveraged Tailwind&apos;s theming, plugin
          system, and dark mode support to build cohesive design systems.
          Combined with frameworks like Next.js and tools like Framer Motion,
          Tailwind helps me create polished, production-ready frontends with
          excellent developer experience.
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-6xl text-center">Technologies that I know</h1>
      <Timeline data={skillsData} />
    </div>
  );
}

export default page;
