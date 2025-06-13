import { FocusCards } from "@/components/ui/focusCards";

function page() {
  const cardsContent = [
    {
      title: "Forest Adventure",
      tech: "html css js",
      src: "/sampleimg.jpg",
      to: "https://www.google.com",
    },
    {
      title: "Valley of life",
      tech: "html css js",
      src: "/sampleimg.jpg",
      to: "https://www.google.com",
    },
    {
      title: "Sala behta hi jayega",
      tech: "html css js",
      src: "/sampleimg.jpg",
      to: "https://www.google.com",
    },
    {
      title: "Camping is for pros",
      tech: "html css js",
      src: "/sampleimg.jpg",
      to: "https://www.google.com",
    },
    {
      title: "The road not taken",
      tech: "html css js",
      src: "/sampleimg.jpg",
      to: "https://www.google.com",
    },
    {
      title: "The First Rule",
      tech: "html css js",
      src: "/sampleimg.jpg",
      to: "https://www.google.com",
    },
  ];
  return (
    <div className="h-full w-full select-none">
      <div className=" mt-40">
        <h1 className="text-center text-6xl">My Previous Work</h1>
      </div>
      <div className="mt-20">
        <FocusCards cards={cardsContent} />
      </div>
    </div>
  );
}

export default page;
