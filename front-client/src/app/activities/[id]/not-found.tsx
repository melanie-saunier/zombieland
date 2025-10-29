import LinkButton from "@/components/LinkButton";
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center m-8">
      <h2 className="text-xl md:text-2xl m-4">Activité non trouvée</h2>
      <p>La ressource demandée n’a pas été trouvée</p>
      <LinkButton path="/" style="button_activity" text="Retour à la page d'accueil"/>
    </div>
  );
}