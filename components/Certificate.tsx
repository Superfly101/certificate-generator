import { useRef } from "react";

import badge from "./assets/CATAYST.png";
import peaceIcon from "./assets/peace-icon.png";
import Image from "next/image";
import generatePDF, { Margin } from "react-to-pdf";
import { useRouter } from "next/router";
import { toJpeg, toPng } from "html-to-image";

const Certificate = () => {
  const certificateRef = useRef<HTMLElement>(null);

  const router = useRouter();

  const handleClick = () => {
    console.log("Downloading");

    switch (router.query.type) {
      case "pdf":
        // toPDF();
        generatePDF(certificateRef, {
          filename: "zuri-badge.pdf",

          page: {
            margin: Margin.SMALL,
            format: "letter",
            orientation: "landscape",
          },
          method: "open",
        });
        break;
      case "png":
        toPng(certificateRef.current!, {
          cacheBust: true,
          backgroundColor: "#fff",
          width: 800,
          height: 600,
        })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "zuri-badge.png";
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      default:
        toJpeg(certificateRef.current!, {
          quality: 0.95,
          backgroundColor: "#fff",
          width: 800,
          height: 600,
        })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "zuri-badge.png";
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
        break;
    }
  };
  return (
    <section>
      <section
        ref={certificateRef}
        className="min-h-[calc(100vh-80px)] w-full bg-white rounded-lg py-8 px-8 text-center flex flex-col gap-4 items-center justify-center"
      >
        <h4 className="text-[#009254] font-[700] text-xl">Congratulations!</h4>

        <h4 className="text-yellow-500 text-4xl font-[700]">Uzumaki Naruto</h4>

        <div className="min-w-[16rem]">
          <Image
            src={badge}
            alt="user badge"
            sizes="100vw"
            className="w-full"
            priority
          />
        </div>
        <div className="flex gap-2 my-1">
          <h4 className="font-[600] text-xl">Expert Badge</h4>
          <Image
            src={peaceIcon}
            alt="Peace icon"
            sizes="100vw"
            className="w-8"
          />
        </div>
        <p className="max-w-[25rem] w-full text-sm">
          You just unlocked the Expert Badge as you have scored 90 points or
          above by completing this assessment.
        </p>
      </section>

      <div className="text-center">
        <button
          className="bg-[#009254] px-4 py-2 rounded-lg text-[#fff]"
          onClick={handleClick}
        >
          Download
        </button>
      </div>
    </section>
  );
};

export default Certificate;
