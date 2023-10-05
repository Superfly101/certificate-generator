import Image from "next/image";
import badge from "./assets/CATAYST.png";
import peaceIcon from "./assets/peace-icon.png";
import { useState } from "react";
import { useRouter } from "next/router";

const Modal = () => {
  const [isShown, setIsShown] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [selection, setSelection] = useState<null | string>(null);

  const router = useRouter();

  const toggleSelection = (event: React.MouseEvent) => {
    setIsShown((prev) => !prev);
    event.stopPropagation();
  };

  const handleDownload = () => {
    if (!hasSelected) {
      setIsShown((prev) => !prev);

      return;
    }
    router.push(`/cert?type=${selection?.toLocaleLowerCase()}`);
  };

  const handleSelect = (event: React.MouseEvent) => {
    setHasSelected(true);
    setIsShown((prev) => !prev);
    setSelection(event.currentTarget.textContent);
  };

  return (
    <section className="px-4 bg-[#00000080] min-h-screen flex justify-center items-center text-center">
      <div className="max-w-[30rem] w-full bg-white rounded-lg py-8 px-8 text-center flex flex-col gap-4 items-center">
        <h4 className="text-[#009254] font-[700] text-xl">Congratulations!</h4>

        <Image src={badge} alt="user badge" className="w-40" priority />

        <div className="flex gap-2 my-1">
          <h4 className="font-[600] text-xl">Expert Badge</h4>
          <Image src={peaceIcon} alt="Peace icon" className="w-8" />
        </div>
        <p className="max-w-[25rem] w-full text-sm">
          You just unlocked the Expert Badge as you have scored 90 points or
          above by completing this assessment.
        </p>

        <div
          className={`flex flex-col gap-4 overflow-y-hidden duration-300 ${
            isShown ? "h-[11rem]" : "h-14"
          }`}
        >
          <button
            className="mt-2 px-6 py-3 text-white text-sm w-fit flex items-center gap-4 bg-[#009254] rounded-2xl"
            onClick={handleDownload}
          >
            <span>Download</span>
            {hasSelected ? (
              <p onClick={toggleSelection}>{selection}</p>
            ) : isShown ? (
              <span onClick={toggleSelection}>
                <svg
                  className="w-5"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.4201 15.7734L13.9001 9.25338C13.1301 8.48338 11.8701 8.48338 11.1001 9.25338L4.58008 15.7734"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : (
              <span onClick={toggleSelection}>
                <svg
                  className="w-5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </button>
          <div className="border border-[#4E4E4E] rounded-md">
            <ul className="text-left flex flex-col">
              <li
                className="py-1 px-2 cursor-pointer hover:bg-slate-300"
                onClick={handleSelect}
              >
                PDF
              </li>
              <li
                className="py-1 px-2 cursor-pointer hover:bg-slate-300"
                onClick={handleSelect}
              >
                JPG
              </li>
              <li
                className="py-1 px-2 cursor-pointer hover:bg-slate-300"
                onClick={handleSelect}
              >
                PNG
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
