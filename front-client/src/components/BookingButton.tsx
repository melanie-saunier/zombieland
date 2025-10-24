import { Bell } from "lucide-react";

export default function BookingButton() {
  return (
    <button className="m-4 px-2 py-4 flex items-center button_booking text-neutral-50 width-inherit  md:px-12 justify-center font-bold">
      <Bell size={24} className="mx-2"/>
          Réserver
    </button>
  );
} 