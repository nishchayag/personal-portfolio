"use client";
import React, { useState } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mailto link for now
    const subject = `Message from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.open(
      `mailto:nishchay.agar@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
    );
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="mt-20 mb-10">
      <h1 className="text-6xl text-center">About me</h1>

      <div className="text-lg w-full px-4 text-center mt-20 lg:px-20">
        <span>
          Hey there! I&apos;m Nishchay Agarwal, a Full-Stack Developer with a
          strong focus on building performant, modern web applications using the
          MERN stack and Next.js. I enjoy crafting seamless user experiences
          while keeping the codebase clean, modular, and scalable. My journey
          into web development started out of pure curiosity — wanting to
          understand how the apps I used every day actually worked. That
          curiosity quickly turned into a passion, and now I find myself
          spending hours building, debugging, learning, and refining projects
          that I genuinely care about. I&apos;ve worked on real-world
          applications both independently and through a few freelance projects,
          and I&apos;m now actively looking for internship opportunities where I
          can contribute, learn from experienced teams, and sharpen my skills in
          a professional setting.
        </span>
      </div>

      {/* Simple Contact Form */}
      <div className="max-w-2xl mx-auto mt-16 px-4">
        <h2 className="text-4xl text-center mb-10">Get In Touch</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            required
            rows={6}
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors resize-none"
          />

          <div className="text-center">
            <button
              type="submit"
              className="px-12 py-4 bg-black text-white text-lg font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Contact Info & Social Links */}
      <div className="flex flex-col items-center mt-16">
        <div className="flex justify-center gap-4 my-10 bg-white text-gray-300 w-fit px-4 py-2 rounded-md">
          <a
            href="https://github.com/nishchayag"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit my GitHub profile"
          >
            <Github className="hover:text-black w-10 h-10 transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/nishchay-agarwal/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit my LinkedIn profile"
          >
            <Linkedin className="hover:text-black w-10 h-10 transition-colors" />
          </a>
        </div>

        <div className="text-xl text-center flex flex-col gap-4">
          <div>Phone: +91 9351325580</div>
          <div>Email: nishchay.agar@gmail.com</div>
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mt-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Available for Freelance Work
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
