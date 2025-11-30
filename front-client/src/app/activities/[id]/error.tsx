"use client";

export default function Error() {
  return(
    <div className="flex flex-col items-center justify-center h-50 gap-4">
      <h1 className="text-xl md:text-2xl text-center">Oups, une erreur est survenue</h1>
      <p>Veuillez réessayer plus tard !</p>
    </div>
  );
}