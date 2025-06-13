import { FocusCards } from "@/components/ui/focusCards";

function page() {
  const cardsContent = [
    {
      title: "Personal Portfolio",
      tech: "NextJS, Framer-Motion,tailwindCSS",
      src: "/selfPortfolio.png",
      to: "/",
    },
    {
      title: "Freelance Portfolio",
      tech: "ReactJS, Framer-Motion, tailwindCSS",
      src: "/kaizenPortfolio.png",
      to: "https://www.kaizenn.in",
    },
    {
      title: "Currency Converter",
      tech: "ReactJS, RestAPI",
      src: "/currencyConverter.png",
      to: "https://nishchayag.github.io/currency-converter/",
    },
    {
      title: "Digital Signature",
      tech: "Javascript",
      src: "/digitalSignature.png",
      to: "https://nishchayag.github.io/Digital-Signature-App/",
    },
    {
      title: "Connect 4",
      tech: "Javascript",
      src: "/connectFour.png",
      to: "https://nishchayag.github.io/Connect-4/",
    },
    {
      title: "Random Password Generator",
      tech: "ReactJS",
      src: "/passwordGen.png",
      to: "https://nishchayag.github.io/password-generator/",
    },
    {
      title: "Tic-Tac-Toe",
      tech: "Javascript",
      src: "/tic-tac-toe.png",
      to: "https://nishchayag.github.io/Tic-Tac-Toe/",
    },
    {
      title: "Expense Tracker",
      tech: "Javascript",
      src: "/expenseTracker.png",
      to: "https://nishchayag.github.io/Expense-Tracker/",
    },
  ];
  return (
    <div className="h-full w-full select-none">
      <div className=" mt-40">
        <h1 className="text-center text-6xl">My Previous Work</h1>
      </div>
      <div className="my-20">
        <FocusCards cards={cardsContent} />
      </div>
    </div>
  );
}

export default page;
