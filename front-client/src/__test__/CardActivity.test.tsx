import { render, screen } from "@testing-library/react";
import CardActivity from "@/components/CardActivity";

const mockActivity = {
  id: 1,
  name: "The grinder",
  description: "Les visiteurs embarquent dans une machine à broyer les morts-vivants : nacelles rotatives, étincelles de métal, néons roses et verts, cris mécaniques et rires zombifiés en fond sonore. Sensations garanties !",
  duration: 5,
  min_height: 140,
  pregnancy_warning: true,
  image_ref: "the_grinder.png",
  category: { id: 1, name: "Frissons mécaniques", color: "#1BE7FF" },
  level: { id: 3, name: "Difficile", value: 3 }
};

describe("CardActivity", () => {
  it("Display the name of the activity", () => {
    //on met CardAcitvity dans le dom virtuel on ajoute le mock d'activity
    render(<CardActivity activity={mockActivity} />);
    // on vérifie que le nom de l'activity est présente 
    expect(screen.getByText(/The Grinder/i)).toBeInTheDocument();
  });
  it("displays the category badge with the correct color", () => {
    //on met CardAcitvity dans le dom virtuel on ajoute le mock d'activity
    render(<CardActivity activity={mockActivity} />);
    // on cherche le badge catégorie
    const categoryBadge = screen.getByText(/Frissons mécaniques/i);
    // on teste si il est présent
    expect(categoryBadge).toBeInTheDocument();
    //on vérifie que le style est juste
    expect(categoryBadge).toHaveStyle({ backgroundColor: mockActivity.category.color });
  });

  it("renders the image with correct alt and src", () => {
    //on met CardAcitvity dans le dom virtuel on ajoute le mock d'activity
    render(<CardActivity activity={mockActivity} />);
    //on cherche l'image de l'activité
    const img = screen.getByAltText(/Image de l'activité The grinder/i);
    // on vérifie sa présence
    expect(img).toBeInTheDocument();
    // et son lien src
    expect(img.getAttribute("src")).toContain(mockActivity.image_ref);
  });

  it("renders the explore link with correct href", () => {
    //on met CardAcitvity dans le dom virtuel on ajoute le mock d'activity
    render(<CardActivity activity={mockActivity} />);
    //on cherche le lien qui contient le texte "explore" dans une balise a
    const link = screen.getByText(/Explore/i).closest("a");
    //on vérifie qu'il contient la bonne route
    expect(link).toHaveAttribute("href", `/activities/${mockActivity.id}`);
  });
  
});